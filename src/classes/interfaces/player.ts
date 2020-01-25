import DirectionEnum from '../enums/direction-enum';

export default interface IPlayer {
	key: string;
	visable: boolean;
	outline: boolean;
	x: number;
	y: number;
	blockX: number;
	blockY: number
	startX: number;
	startY: number;
	width: number;
	height: number;
	zIndex: number
	direction: DirectionEnum;
	score: number;
	lives: number;
	image: string;
	isAlive: boolean;
}
