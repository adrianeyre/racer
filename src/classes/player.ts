import ICarProps from './interfaces/car-props';
import IPlayer from './interfaces/player';
import Car from './car';

export default class Player extends Car implements IPlayer {
	public score: number;

	constructor(config: ICarProps) {
		super(config);

		this.score = 0;
	}
}
