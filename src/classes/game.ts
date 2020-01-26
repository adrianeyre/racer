import Board from './board';
import Player from './player';
import IGame from './interfaces/game';
import IBoard from './interfaces/board';
import PlayerResultEnum from './enums/player-result-enum';
import SpriteTypeEnum from './enums/sprite-type-enum';
import IRacerProps from '../components/racer/interfaces/racer-props';
import Car from './car';
import ICar from './interfaces/car';

export default class Game implements IGame {
	public cars: any;
	public board: IBoard;
	public level: number;
	public increment: number;
	public isGameInPlay: boolean;
	public timerInterval: number;
	
	private player1: number = -1;
	// private player2: number = -1;

	readonly DEFAULT_TIMER_INTERVAL: number = 30;
	readonly MAX_INCREMENT: number = 10;

	constructor(config: IRacerProps) {
		this.level = 1;
		this.increment = 0;
		this.board = new Board();
		this.isGameInPlay = false;
		this.timerInterval = this.DEFAULT_TIMER_INTERVAL;
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

		this.cars.forEach((car: ICar) => {
			if (car.speed > 0 && this.increment % (11 - car.speed) === 0) this.handleInput(car.move(this.board, car, this.cars), car);
		})
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
				startX: this.board.playerStartData[0].x,
				startY: this.board.playerStartData[0].y,
				type: SpriteTypeEnum.Player01,
				zIndex: 7000,
			}),
			new Car({
				key: 'computer01',
				startX: this.board.playerStartData[1].x,
				startY: this.board.playerStartData[1].y,
				type: SpriteTypeEnum.Computer,
			}),
			new Car({
				key: 'computer02',
				startX: this.board.playerStartData[2].x,
				startY: this.board.playerStartData[2].y,
				type: SpriteTypeEnum.Computer,
			}),
			new Car({
				key: 'computer03',
				startX: this.board.playerStartData[3].x,
				startY: this.board.playerStartData[3].y,
				type: SpriteTypeEnum.Computer,
			}),
		];

		this.player1 = 0;
	}
}
