import DirectionEnum from '../enums/direction-enum';
import SpriteTypeEnum from '../enums/sprite-type-enum';

import Player from '../player';

describe('Player', () => {
	it('Should create Player class', () => {
		const player = new Player({
			key: 'player01',
				startX: 1,
				startY: 1,
				type: SpriteTypeEnum.Player01,
				zIndex: 7000,
		});

		expect(player.key).toEqual('player01');
		expect(player.visable).toEqual(true);
		expect(player.x).toEqual(1);
		expect(player.y).toEqual(1);
		expect(player.width).toEqual(1);
		expect(player.height).toEqual(1);
		expect(player.zIndex).toEqual(7000);
		expect(player.direction).toEqual(DirectionEnum.RIGHT);
		expect(player.score).toEqual(0);
		expect(player.image).toEqual('player-01-03.png');
		expect(player.isAlive).toEqual(true);
	});
});