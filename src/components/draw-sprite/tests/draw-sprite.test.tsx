import React from 'react';
import { shallow } from 'enzyme';

import DrawSprite from '../draw-sprite';
import IDrawSpriteProps from '../interfaces/draw-sprite-props';
import Player from '../../../classes/player';
import SpriteTypeEnum from '../../../classes/enums/sprite-type-enum';

describe('Draw Sprite', () => {
	it('Should render correctly', () => {
		const defaultProps: IDrawSpriteProps = {
			sprite: new Player({
				key: 'player01',
				name: 'player01',
				startX: 1,
				startY: 1,
				type: SpriteTypeEnum.Player01,
				maxSpeed: 100,
				startIteration: 1,
				zIndex: 7000,
				totalLaps: 100,
			}),
			height: 1,
			width: 1,
			containerWidth: 100,
			handleClick: jest.fn(),
		};

		const drawSprite = shallow(<DrawSprite {...defaultProps} />);
		expect(drawSprite).toMatchSnapshot();
	});
});