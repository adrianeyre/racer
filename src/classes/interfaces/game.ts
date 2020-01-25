import ISprite from './sprite';
import IBoard from './board';
import PlayerResultEnum from '../enums/player-result-enum';

export default interface IGame {
	board: IBoard;
	level: number;
	isGameInPlay: boolean;
	timerInterval: number;
	handleInput(playerResult: PlayerResultEnum, sprite?: ISprite): void;
	handleTimer(): void;
}
