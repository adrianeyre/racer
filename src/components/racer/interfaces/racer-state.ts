import IGame from '../../../classes/interfaces/game';

export default interface IRacerState {
	game: IGame;
	spriteWidth: number;
	spriteHeight: number;
	containerWidth: number
	containerHeight: number;
	containerMargin: number;
	timer?: any;
	level: number;
	carTimer?: any;
	timerInterval: number;
	timerCarInterval: number;
}
