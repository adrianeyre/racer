import DirectionEnum from '../enums/direction-enum';

import Player from '../player';

describe('Player', () => {
	it('Should create Player class', () => {
		const player = new Player({});

		expect(player.key).toEqual('player');
		expect(player.visable).toEqual(true);
		expect(player.x).toEqual(19);
		expect(player.y).toEqual(19);
		expect(player.width).toEqual(3);
		expect(player.height).toEqual(3);
		expect(player.zIndex).toEqual(6000);
		expect(player.direction).toEqual(DirectionEnum.STAND);
		expect(player.score).toEqual(0);
		expect(player.lives).toEqual(3);
		expect(player.image).toEqual('player-stand1.png');
		expect(player.isAlive).toEqual(true);
	});
});