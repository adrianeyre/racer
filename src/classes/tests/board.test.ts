import Board from '../board';
import IBoardProps from '../interfaces/board-props';

describe('Board', () => {
	let defaultConfig: IBoardProps

	beforeEach(() => {
		defaultConfig = {
			currentLevel: 1,
			playerX: 1,
			playerY: 1,
		}
	})

	it('Should create Board class', () => {
		const board = new Board(defaultConfig);

		expect(board.currentLevel).toEqual(1);
		expect(board.startX).toEqual(1);
		expect(board.startY).toEqual(1);
		expect(board.boardWidth).toEqual(0);
		expect(board.boardHeight).toEqual(0);
		expect(board.xMargin).toEqual(0);
		expect(board.yMargin).toEqual(0);
	});
});