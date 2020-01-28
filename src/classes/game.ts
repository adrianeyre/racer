import Board from './board';
import Player from './player';
import IGame from './interfaces/game';
import IBoard from './interfaces/board';
import PlayerResultEnum from './enums/player-result-enum';
import SpriteTypeEnum from './enums/sprite-type-enum';
import IRacerProps from '../components/racer/interfaces/racer-props';
import Computer from './computer';
import ICar from './interfaces/car';

export default class Game implements IGame {
	public cars: any;
	public board: IBoard;
	public level: number;
	public totalLaps: number;
	public increment: number;
	public isGameInPlay: boolean;
	public timerInterval: number;
	public timerCarInterval: number;
	public timer: number;
	
	private player1: number = -1;
	// private player2: number = -1;

	readonly DEFAULT_TIMER_INTERVAL: number = 30;
	readonly DEFAULT_CAR_TIMER_INTERVAL: number = 10;
	readonly MAX_INCREMENT: number = 10;
	readonly TOTAL_LAPS: number = 10;

	constructor(config: IRacerProps) {
		this.level = config.level || 1;
		this.totalLaps = this.TOTAL_LAPS;
		this.increment = 0;
		this.timer = 0;
		this.board = new Board();
		this.isGameInPlay = false;
		this.timerInterval = this.DEFAULT_TIMER_INTERVAL;
		this.timerCarInterval = this.DEFAULT_CAR_TIMER_INTERVAL;
		this.cars = []

		this.gameSetup();
	}

	public handleInput = (playerResult: PlayerResultEnum, car?: ICar): void => {
		switch (playerResult) {
			case PlayerResultEnum.SAFE:
				break;
			case PlayerResultEnum.CRASHED:
				this.resetCarStart(car); break;
			case PlayerResultEnum.ARROW_UP:
				this.cars[this.player1].speedUp(); break;
			case PlayerResultEnum.ARROW_DOWN:
				this.cars[this.player1].slowDown(); break;
			case PlayerResultEnum.ARROW_RIGHT:
				this.cars[this.player1].turnRight(); break;
			case PlayerResultEnum.ARROW_LEFT:
				this.cars[this.player1].turnLeft(); break;
		}
	}

	public handleTimer = (): void => {
		this.increment ++;
		if (this.increment > this.MAX_INCREMENT) this.increment = 0;

		this.cars.forEach((car: ICar) => this.checkCar(car));
	}

	public handleCarTimer = (): void => {
		this.timer ++;
		this.cars.forEach((car: ICar) => car.updateTimer(this.timer));
	}

	private checkCar = (car: ICar): void => {
		if (this.increment % (11 - car.speed) !== 0) return;
		this.speedUp(car);
		this.directCar(car);
		this.moveCar(car);
	}

	private speedUp = (car: ICar): void => {
		if (car.type !== SpriteTypeEnum.Computer) return;
		car.speedUp();
	}

	private directCar = (car: ICar): void => {
		if (car.type !== SpriteTypeEnum.Computer) return;
		car.directCar(this.board);
	}

	private moveCar = (car: ICar): void => {
		if (car.speed === 0) return;
		this.handleInput(car.move(this.board, car, this.cars), car);
	}

	private resetCarStart = (car?: ICar): void => {
		if (!car) return;

		const carIndex = this.cars.indexOf(car);
		car.resetStart(this.board.playerStartData[carIndex].x, this.board.playerStartData[carIndex].y);
	}

	private gameSetup = async (): Promise<void> => {
		await this.board.readLevel(this.level);

		this.cars = [
			new Player({
				key: 'player01',
				name: 'Player 1',
				startX: this.board.playerStartData[0].x,
				startY: this.board.playerStartData[0].y,
				type: SpriteTypeEnum.Player01,
				maxSpeed: 10,
				zIndex: 7000,
				startIteration: 0,
			}),
			new Computer({
				key: 'computer01',
				name: 'Computer 1',
				startX: this.board.playerStartData[1].x,
				startY: this.board.playerStartData[1].y,
				type: SpriteTypeEnum.Computer,
				maxSpeed: 8,
				startIteration: 11,
			}),
			new Computer({
				key: 'computer02',
				name: 'Computer 2',
				startX: this.board.playerStartData[2].x,
				startY: this.board.playerStartData[2].y,
				type: SpriteTypeEnum.Computer,
				maxSpeed: 8,
				startIteration: 31,
			}),
			new Computer({
				key: 'computer03',
				name: 'Computer 3',
				startX: this.board.playerStartData[3].x,
				startY: this.board.playerStartData[3].y,
				type: SpriteTypeEnum.Computer,
				maxSpeed: 7,
				startIteration: 61,
			}),
		];

		this.player1 = 0;
	}
}
