export default interface IInfoBoardProps {
	gameOver: boolean;
	score: number;
	level: number;
	containerHeight: number;
	startGame(level: number): void;
}
