import ICarProps from './interfaces/car-props';
import ICar from './interfaces/car';
import IBoard from './interfaces/board';
import SpriteTypeEnum from './enums/sprite-type-enum';
import DirectionEnum from './enums/direction-enum';
import PlayerResultEnum from './enums/player-result-enum';
import BlockEnum from './enums/block-enum';

import player01Image01 from '../images/player-01-01.png';
import player01Image02 from '../images/player-01-02.png';
import player01Image03 from '../images/player-01-03.png';
import player01Image04 from '../images/player-01-04.png';
import player01Image05 from '../images/player-01-05.png';
import player01Image06 from '../images/player-01-06.png';
import player01Image07 from '../images/player-01-07.png';
import player01Image08 from '../images/player-01-08.png';
import player02Image01 from '../images/player-02-01.png';
import player02Image02 from '../images/player-02-02.png';
import player02Image03 from '../images/player-02-03.png';
import player02Image04 from '../images/player-02-04.png';
import player02Image05 from '../images/player-02-05.png';
import player02Image06 from '../images/player-02-06.png';
import player02Image07 from '../images/player-02-07.png';
import player02Image08 from '../images/player-02-08.png';
import player03Image01 from '../images/player-03-01.png';
import player03Image02 from '../images/player-03-02.png';
import player03Image03 from '../images/player-03-03.png';
import player03Image04 from '../images/player-03-04.png';
import player03Image05 from '../images/player-03-05.png';
import player03Image06 from '../images/player-03-06.png';
import player03Image07 from '../images/player-03-07.png';
import player03Image08 from '../images/player-03-08.png';
import crash01 from '../images/crash-01.png';
import crash02 from '../images/crash-02.png';
import crash03 from '../images/crash-03.png';
import crash04 from '../images/crash-04.png';

export default class Car implements ICar {
	public key: string;
	public name: string;
	public visable: boolean;
	public outline: boolean;
	public x: number;
	public y: number;
	public score: number;
	public laps: number;
	public startX: number;
	public startY: number;
	public width: number;
	public height: number;
	public zIndex: number;
	public speed: number;
	public image: string;
	public type: SpriteTypeEnum;
	public direction: DirectionEnum;
	public isAlive: boolean;
	public crashIteration: number;
	public crashed: boolean;
	public maxSpeed: number
	public startIteration: number;
	public iteration: number;
	public time: number;
	public checkPoint: BlockEnum;
	public totalLaps: number;
	public finished: boolean;

	readonly CAR_WIDTH: number = 1;
	readonly CAR_HEIGHT: number = 1;
	readonly SPEED_INCREMENT: number = 1;
	readonly Z_INDEX: number = 5000;
	readonly playerImages = {
		player01: [
			player01Image01, player01Image02, player01Image03, player01Image04,
			player01Image05, player01Image06, player01Image07, player01Image08,
		],
		player02: [
			player02Image01, player02Image02, player02Image03, player02Image04,
			player02Image05, player02Image06, player02Image07, player02Image08,
		],
		computer: [
			player03Image01, player03Image02, player03Image03, player03Image04,
			player03Image05, player03Image06, player03Image07, player03Image08,
		],
		crash: [
			crash01, crash02, crash03, crash04
		]
	}

	constructor(config: ICarProps) {
		this.key = config.key;
		this.name = config.name;
		this.visable = true;
		this.outline = false;
		this.speed = 0;
		this.time = 0;
		this.startX = config.startX;
		this.startY = config.startY;
		this.x = this.startX;
		this.y = this.startY;
		this.score = 0;
		this.laps = 0;
		this.width = this.CAR_WIDTH;
		this.height = this.CAR_HEIGHT;
		this.zIndex = config.zIndex || this.Z_INDEX;
		this.direction = DirectionEnum.RIGHT;
		this.image = '';
		this.type = config.type;
		this.isAlive = true;
		this.crashIteration = -1;
		this.crashed = false;
		this.finished = false;
		this.maxSpeed = config.maxSpeed;
		this.startIteration = config.startIteration;
		this.iteration = this.startIteration;
		this.checkPoint = BlockEnum.START;
		this.totalLaps = config.totalLaps;

		this.updateImage();
	}

	public move = (board: IBoard, car: ICar, cars: ICar[]): PlayerResultEnum => {
		if (this.finished) return this.finishSpin();

		let result = PlayerResultEnum.SAFE;
		this.visable = true;
		const { x, y } = this.updateCarPosition();
		const hasHitWall = board.isBlock(x, y, BlockEnum.WALL);
		const hasHitCar = this.hitCar(x, y, car, cars)

		if (
			x < 0 ||
			x > board.boardWidth ||
			y < 0 ||
			y > board.boardHeight ||
			hasHitWall ||
			hasHitCar
		) {
			if (hasHitCar && car.type === SpriteTypeEnum.Computer) {
				this.alterDirection();
				return this.move(board, car, cars);
			}

			this.crashed = true;
		};

		if (this.crashed) {
			result = this.crashCar();
		} else {
			this.x = x;
			this.y = y;
		}
		
		if (board.isBlock(this.x, this.y, BlockEnum.GRASS)) this.visable = false;
		if (board.isBlock(this.x, this.y, BlockEnum.OIL)) this.carSpin();
		this.isAtCheckPoint(board);
		this.updateImage();
		
		return result;
	}

	public speedUp = (): void => {
		this.speed += this.SPEED_INCREMENT;
		if (this.speed > this.maxSpeed) this.speed = this.maxSpeed;
	}

	public slowDown = (): void => {
		this.speed -= this.SPEED_INCREMENT;
		if (this.speed < 0) this.speed = 0;
	}

	public turnRight = (): void => {
		this.direction ++;
		if (this.direction > DirectionEnum.UP_LEFT) this.direction = DirectionEnum.UP;
		if (this.speed === 0) this.updateImage();
	}

	public turnLeft = (): void => {
		this.direction --;
		if (this.direction < DirectionEnum.UP) this.direction = DirectionEnum.UP_LEFT;
		if (this.speed === 0) this.updateImage();
	}

	public updateTimer = (time: number): number => this.time = time;

	public resetStart = (x: number, y: number): void => {
		this.crashIteration = -1;
		this.crashed = false;
		this.speed = 0;
		this.updateImage();
	}

	public directCar = (board: IBoard): void => {
		new Error('method not available on parent class');
	}

	public alterDirection = (): DirectionEnum => {
		new Error('method not available on parent class');
		return DirectionEnum.STOOD;
	}

	public finishSpin = (): PlayerResultEnum => {
		this.direction ++;
		this.speed = 0;
		if (this.direction > DirectionEnum.UP_LEFT) this.direction = DirectionEnum.UP;
		this.updateImage();

		return PlayerResultEnum.FINISH;
	}

	private carSpin = (): void => {
		this.direction ++;
		if (this.direction > DirectionEnum.UP_LEFT) this.direction = DirectionEnum.UP;
	}

	private updateImage = (): void => {
		if (!this.crashed) return this.image = this.playerImages[this.type][this.direction - 1];

		this.image = this.playerImages.crash[this.crashIteration];
	}

	private isAtCheckPoint = (board: IBoard): void => {
		if (board.isBlock(this.x, this.y, this.checkPoint + 1)) {
			this.checkPoint ++;
			if (this.laps >= this.totalLaps) this.finished = true;

			if (this.checkPoint === BlockEnum.LAST_CHECK_POINT) {
				this.checkPoint = BlockEnum.PRE_START;
				this.laps ++;
			}
		} 
	}

	private hitCar = (x: number, y: number, car: ICar, cars: ICar[]): boolean => {
		let result = false;
		const otherCars = cars.filter((otherCar: ICar) => otherCar.key !== car.key);
		if (!otherCars) return result;

		otherCars.forEach((otherCar: ICar) => {
			if (otherCar.x === x && otherCar.y === y) result = true;
		});

		return result;
	}

	private crashCar = (): PlayerResultEnum => {
		this.crashIteration ++;
		this.crashed = true;
		this.speed = 1;
		// this.direction = DirectionEnum.STOOD;
		
		if (this.crashIteration > this.playerImages.crash.length - 1) {
			this.crashIteration = -1;
			this.crashed = false;
			return PlayerResultEnum.CRASHED;
		}

		return PlayerResultEnum.CRASHING;
	}

	private updateCarPosition = (): any => {
		let x = this.x,
			y = this.y;

		switch (this.direction) {
			case DirectionEnum.UP:
				y -= this.CAR_HEIGHT; break;
			case DirectionEnum.UP_RIGHT:
				x += this.CAR_WIDTH; y -= this.CAR_HEIGHT; break;
			case DirectionEnum.RIGHT:
				x += this.CAR_WIDTH; break;
			case DirectionEnum.DOWN_RIGHT:
				x += this.CAR_WIDTH; y += this.CAR_HEIGHT; break;
			case DirectionEnum.DOWN:
				y += this.CAR_HEIGHT; break;
			case DirectionEnum.DOWN_LEFT:
				x -= this.CAR_WIDTH; y += this.CAR_HEIGHT; break;
			case DirectionEnum.LEFT:
				x -= this.CAR_WIDTH; break;
			case DirectionEnum.UP_LEFT:
				x -= this.CAR_WIDTH; y -= this.CAR_HEIGHT; break;
		}

		return { x, y };
	}
}
