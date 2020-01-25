import Board from './board';
import IGame from './interfaces/game';
import ISprite from './interfaces/sprite';
import IBoard from './interfaces/board';
import PlayerResultEnum from './enums/player-result-enum';
import IRacerProps from '../components/racer/interfaces/racer-props';

export default class Game implements IGame {
	public board: IBoard;
	public level: number;
	public isGameInPlay: boolean;
	public timerInterval: number;

	readonly DEFAULT_TIMER_INTERVAL: number = 1000;

	constructor(config: IRacerProps) {
		this.level = 1;
		this.board = new Board({ currentLevel: this.level });
		this.isGameInPlay = false;
		this.timerInterval = this.DEFAULT_TIMER_INTERVAL;
	}

	public handleInput = (playerResult: PlayerResultEnum, sprite?: ISprite): void => {
		switch (playerResult) {
			case PlayerResultEnum.SAFE:
		}
	}

	public handleTimer = (): void => {
		
	}
}
