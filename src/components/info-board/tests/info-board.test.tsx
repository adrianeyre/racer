import React from 'react';
import { shallow } from 'enzyme';

import InfoBoard from '../info-board';
import IInfoBoardProps from '../interfaces/info-board-props';

describe('Info Board', () => {
	it('Should render correctly', () => {
		const defaultProps: IInfoBoardProps = {
			gameOver: true,
			score: 1000,
			level: 1,
			totalLaps: 1,
			difficulty: 1,
			players: 1,
			containerHeight: 1,
			startGame: jest.fn(),
		};

		const infoBoard = shallow(<InfoBoard {...defaultProps} />);
		expect(infoBoard).toMatchSnapshot();
	});
});