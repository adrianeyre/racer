import IBoard from './board';
import DirectionEnum from '../enums/direction-enum';

/**
 * What a computer-driven car can do that a player-driven one cannot: steer
 * itself towards the next numbered waypoint, and pick a way out when the way
 * ahead is blocked. `Car` declares both so the game can call them uniformly,
 * but only this subclass has an answer for them.
 */
export default interface IComputer {
	directCar(board: IBoard): DirectionEnum;
	alterDirection(): DirectionEnum;
}
