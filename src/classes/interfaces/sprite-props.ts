import SpriteTypeEnum from '../enums/sprite-type-enum';
import ImageEnum from '../enums/image-enum';

export default interface ISpriteProps {
	key: string;
	visable: boolean;
	x: number;
	y: number;
	blockX: number;
	blockY: number;
	width: number;
	height: number;
	image: ImageEnum;
	type: SpriteTypeEnum;
	outline: boolean;
}
