import SpriteTypeEnum from '../enums/sprite-type-enum';

export default interface ICarProps {
	key: string;
	startX: number;
	startY: number;
	type: SpriteTypeEnum;
	maxSpeed: number;
	startIteration: number;
	zIndex?: number;
}
