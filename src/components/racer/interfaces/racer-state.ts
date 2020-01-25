import IGame from '../../../classes/interfaces/game';

export default interface IRacerState {
	game: IGame;
	spriteWidth: number;
	spriteHeight: number;
	containerWidth: number
	containerHeight: number;
	containerMargin: number;
	timer?: any;
	timerInterval: number;
}
