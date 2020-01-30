import IBoard from './board';
import ICar from './car';
import PlayerResultEnum from '../enums/player-result-enum';

export default interface IGame {
	cars: ICar[];
	board: IBoard;
	level: number;
	totalLaps: number;
	increment: number;
	speedUpIncrement: number;
	oilIncrement: number;
	timer: number;
	isGameInPlay: boolean;
	timerInterval: number;
	timerCarInterval: number;
	handleInput(playerResult: PlayerResultEnum, car?: ICar): void;
	handleTimer(): void;
	handleCarTimer(): void;
}
