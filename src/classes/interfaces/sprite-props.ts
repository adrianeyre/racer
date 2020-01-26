import SpriteTypeEnum from '../enums/sprite-type-enum';

export default interface ISpriteProps {
	key: string;
	x: number;
	y: number;
	width: number;
	height: number;
	type: SpriteTypeEnum;
	zIndex: number;
}
