import IGame from '../../../classes/interfaces/game';

/**
 * `setInterval` returns a number in the browser and a `Timeout` under Node, and
 * the tests run under jsdom with Node's typings loaded — so the handles are
 * typed by what the platform actually hands back rather than by either guess.
 */
type TimerHandle = ReturnType<typeof setInterval>;

export default interface IRacerState {
	game: IGame;
	spriteWidth: number;
	spriteHeight: number;
	containerWidth: number;
	containerHeight: number;
	containerMargin: number;
	timer?: TimerHandle;
	level: number;
	totalLaps: number;
	difficulty: number;
	players: number;
	carTimer?: TimerHandle;
	timerInterval: number;
	timerCarInterval: number;
}
