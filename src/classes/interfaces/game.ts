import IBoard from './board';
import ICar from './car';
import PlayerResultEnum from '../enums/player-result-enum';

export default interface IGame {
	cars: ICar[];
	board: IBoard;
	level: number;
	increment: number;
	isGameInPlay: boolean;
	timerInterval: number;
	handleInput(playerResult: PlayerResultEnum, car?: ICar): void;
	handleTimer(): void;
}
