import SpriteTypeEnum from '../enums/sprite-type-enum';

export default interface ICarProps {
	key: string;
	name: string;
	startX: number;
	startY: number;
	type: SpriteTypeEnum;
	maxSpeed: number;
	startIteration: number;
	zIndex?: number;
	totalLaps: number;
}
