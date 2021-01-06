import SpriteTypeEnum from '../enums/sprite-type-enum';
import Sprite from '../sprite';
import ISpriteProps from '../interfaces/sprite-props';

describe('Sprite', () => {
	let defaultConfig: ISpriteProps

	beforeEach(() => {
		defaultConfig = {
			key: 'level01',
			visable: true,
			x: 10,
			y: 10,
			width: 1,
			height: 1,
			type: SpriteTypeEnum.Level01Board,
			zIndex: 1000,
		}
	})

	it('Should create Sprite class', () => {
		const sprite = new Sprite(defaultConfig);

		expect(sprite.key).toEqual('level01');
		expect(sprite.visable).toEqual(true);
		expect(sprite.x).toEqual(10);
		expect(sprite.y).toEqual(10);
		expect(sprite.width).toEqual(1);
		expect(sprite.height).toEqual(1);
		expect(sprite.zIndex).toEqual(1000);
		expect(sprite.image).toEqual('level-01.png');
		expect(sprite.type).toEqual(SpriteTypeEnum.Level01Board);
	});
});