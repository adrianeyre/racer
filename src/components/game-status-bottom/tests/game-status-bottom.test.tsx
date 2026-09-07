import { render } from '@testing-library/react';

import GameStatusBottom from '../game-status-bottom';
import IGameStatusBottomProps from '../interfaces/game-status-bottom-props';

describe('Game Status Bottom', () => {
	it('Should render correctly', () => {
		const defaultProps: IGameStatusBottomProps = {
			cars: [],
			totalLaps: 100,
		};

		const { asFragment } = render(<GameStatusBottom {...defaultProps} />);
		expect(asFragment()).toMatchSnapshot();
	});
});
