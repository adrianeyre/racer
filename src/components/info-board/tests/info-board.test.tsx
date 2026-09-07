import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import InfoBoard from '../info-board';
import IInfoBoardProps from '../interfaces/info-board-props';

const defaultProps = (): IInfoBoardProps => ({
	gameOver: true,
	score: 1000,
	level: 1,
	totalLaps: 1,
	difficulty: 1,
	players: 1,
	containerHeight: 1,
	startGame: vi.fn(),
});

describe('Info Board', () => {
	it('Should render correctly', () => {
		const { asFragment } = render(<InfoBoard {...defaultProps()} />);
		expect(asFragment()).toMatchSnapshot();
	});

	// A `<select>` hands back its value as a string. This asserts the numbers,
	// because `startGame` is typed for numbers and the game arithmetic breaks
	// quietly on strings — `'5' - 1` works, `'5' + 1` gives `'51'`.
	it('Should start the game with the chosen settings as numbers', async () => {
		const props = defaultProps();
		render(<InfoBoard {...props} />);

		const [laps, track, players, difficulty] = screen.getAllByRole('combobox');
		await userEvent.selectOptions(laps, '20');
		await userEvent.selectOptions(track, '7');
		await userEvent.selectOptions(players, '2');
		await userEvent.selectOptions(difficulty, '3');
		await userEvent.click(screen.getByRole('button', { name: 'Play Game' }));

		expect(props.startGame).toHaveBeenCalledWith(7, 20, 3, 2);
	});
});
