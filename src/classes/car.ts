import ICarProps from './interfaces/car-props';
import ICar from './interfaces/car';
import IBoard from './interfaces/board';
import SpriteTypeEnum from './enums/sprite-type-enum';
import DirectEnum from './enums/direction-enum';
import PlayerResultEnum from './enums/player-result-enum';

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
	public direction: DirectEnum;
	public isAlive: boolean;
	public crashing: number;
	public maxSpeed: number
	public startIteration: number;
	public iteration: number;

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
		this.visable = true;
		this.outline = false;
		this.speed = 0;
		this.startX = config.startX;
		this.startY = config.startY;
		this.x = this.startX;
		this.y = this.startY;
		this.score = 0;
		this.laps = 0;
		this.width = this.CAR_WIDTH;
		this.height = this.CAR_HEIGHT;
		this.zIndex = config.zIndex || this.Z_INDEX;
		this.direction = DirectEnum.RIGHT;
		this.image = '';
		this.type = config.type;
		this.isAlive = true;
		this.crashing = -1;
		this.maxSpeed = config.maxSpeed;
		this.startIteration = config.startIteration;
		this.iteration = this.startIteration;

		this.updateImage();
	}

	public move = (board: IBoard, car: ICar, cars: ICar[]): PlayerResultEnum => {
		let result = PlayerResultEnum.SAFE;
		if (this.crashing < 0) this.updateCarPosition();

		if (
			this.x < 0 ||
			this.x > board.boardWidth ||
			this.y < 0 ||
			this.y > board.boardHeight ||
			board.hasHitWall(this.x, this.y) ||
			this.hitCar(car, cars)
		) {
			result = this.crashCar();
		};

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
		if (this.speed === 0) return;
		this.direction ++;
		if (this.direction > DirectEnum.UP_LEFT) this.direction = DirectEnum.UP;
	}

	public turnLeft = (): void => {
		if (this.speed === 0) return;
		this.direction --;
		if (this.direction < DirectEnum.UP) this.direction = DirectEnum.UP_LEFT;
	}

	public resetStart = (x: number, y: number): void => {
		this.x = x;
		this.y = y;
		this.direction = DirectEnum.RIGHT;
		this.crashing = -1;
		this.speed = 0;
		this.iteration = 11;
		this.updateImage();
	}

	public directCar = (board: IBoard): void => {
		new Error('method not available on parent class');
	}

	private updateImage = (): void => {
		if (this.crashing < 0) return this.image = this.playerImages[this.type][this.direction - 1];

		this.image = this.playerImages.crash[this.crashing];
	}

	private hitCar = (car: ICar, cars: ICar[]): boolean => {
		let result = false;
		const otherCars = cars.filter((otherCar: ICar) => otherCar.key !== car.key);
		if (!otherCars) return result;

		otherCars.forEach((otherCar: ICar) => {
			if (otherCar.x === car.x && otherCar.y === car.y) result = true;
		});

		return result;
	}

	private crashCar = (): PlayerResultEnum => {
		this.crashing ++;
		this.speed = 1;
		this.direction = DirectEnum.STOOD;
		
		if (this.crashing > this.playerImages.crash.length - 1) {
			this.crashing = -1;
			return PlayerResultEnum.CRASHED;
		}

		return PlayerResultEnum.CRASHING;
	}

	private updateCarPosition = (): void => {
		switch (this.direction) {
			case DirectEnum.UP:
				this.y -= this.CAR_HEIGHT; break;
			case DirectEnum.UP_RIGHT:
				this.x += this.CAR_WIDTH; this.y -= this.CAR_HEIGHT; break;
			case DirectEnum.RIGHT:
				this.x += this.CAR_WIDTH; break;
			case DirectEnum.DOWN_RIGHT:
				this.x += this.CAR_WIDTH; this.y += this.CAR_HEIGHT; break;
			case DirectEnum.DOWN:
				this.y += this.CAR_HEIGHT; break;
			case DirectEnum.DOWN_LEFT:
				this.x -= this.CAR_WIDTH; this.y += this.CAR_HEIGHT; break;
			case DirectEnum.LEFT:
				this.x -= this.CAR_WIDTH; break;
			case DirectEnum.UP_LEFT:
				this.x -= this.CAR_WIDTH; this.y -= this.CAR_HEIGHT; break;
		}
	}
}
