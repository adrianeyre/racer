import React from 'react';
import { shallow } from 'enzyme';

import Racer from '../racer';
import IRacerProps from '../interfaces/racer-props';

describe('Racer Run', () => {
	it('Should render correctly', () => {
		const defaultProps: IRacerProps = {};
		const racer = shallow(<Racer {...defaultProps} />);
		expect(racer).toMatchSnapshot();
	});
});