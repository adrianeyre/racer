import { render } from '@testing-library/react';

import Racer from '../racer';
import IRacerProps from '../interfaces/racer-props';

// The board is read over HTTP in the real game, and nothing here should reach
// the network. The shape matters, though: `Game` builds four cars from the
// player start data as soon as it is constructed, so a stub that returned less
// would fail inside an unawaited promise rather than in the test.
vi.mock('../../../services/file-service', () => ({
	default: class {
		public readLevel = async (): Promise<number[][]> =>
			Array.from({ length: 30 }, () => Array.from({ length: 50 }, () => 0));

		public readPlayerData = async (): Promise<number[][]> => [
			[19, 5],
			[19, 6],
			[19, 7],
			[19, 8],
		];
	},
}));

describe('Racer Run', () => {
	it('Should render correctly', () => {
		const defaultProps: IRacerProps = {};
		const { asFragment } = render(<Racer {...defaultProps} />);
		expect(asFragment()).toMatchSnapshot();
	});
});
