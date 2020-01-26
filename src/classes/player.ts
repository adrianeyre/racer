import ICarProps from './interfaces/car-props';
import IPlayer from './interfaces/player';
import Car from './car';

export default class Player extends Car implements IPlayer {
	public score: number;

	readonly INITIAL_PLAYER_LIVES: number = 3;
	readonly INITIAL_PLAYER_X: number = 1;
	readonly INITIAL_PLAYER_Y: number = 1;
	readonly PLAYER_WIDTH: number = 1;
	readonly PLATER_HEIGHT: number = 1;
	readonly PLAYER_ZINDEX: number = 6000;

	constructor(config: ICarProps) {
		super(config);

		this.score = 0;
	}
}
