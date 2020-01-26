import Board from '../board';

describe('Board', () => {
	it('Should create Board class', () => {
		const board = new Board();

		expect(board.boardWidth).toEqual(50);
		expect(board.boardHeight).toEqual(30);
	});
});