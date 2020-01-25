import SpriteTypeEnum from '../enums/sprite-type-enum';

import Sprite from '../sprite';
import ISpriteProps from '../interfaces/sprite-props';
import ImageEnum from 'classes/enums/image-enum';

describe('Sprite', () => {
	let defaultConfig: ISpriteProps

	beforeEach(() => {
		defaultConfig = {
			key: 'sprite',
			visable: true,
			x: 10,
			y: 10,
			blockX: 1,
			blockY: 1,
			width: 8,
			height: 8,
			image: ImageEnum.SPRITE00,
			type: SpriteTypeEnum.BLANK,
			outline: false,
		}
	})

	it('Should create Sprite class', () => {
		const sprite = new Sprite(defaultConfig);

		expect(sprite.key).toEqual('sprite');
		expect(sprite.visable).toEqual(true);
		expect(sprite.x).toEqual(10);
		expect(sprite.y).toEqual(10);
		expect(sprite.width).toEqual(8);
		expect(sprite.height).toEqual(8);
		expect(sprite.zIndex).toEqual(5000);
		expect(sprite.image).toEqual('sprite00.png');
		expect(sprite.type).toEqual(SpriteTypeEnum.BLANK);
	});
});