export default interface IInfoBoardProps {
	gameOver: boolean;
	score: number;
	level: number;
	totalLaps: number;
	difficulty: number;
	containerHeight: number;
	startGame(level: number, totalLaps: number, difficulty: number): void;
}
