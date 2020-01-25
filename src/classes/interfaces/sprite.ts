import SpriteTypeEnum from '../enums/sprite-type-enum';
import ImageEnum from '../enums/image-enum';

export default interface ISprite {
	key: string;
	visable: boolean;
	outline: boolean;
	x: number;
	y: number;
	blockX: number;
	blockY: number;
	width: number;
	height: number;
	zIndex: number
	image: string;
	type: SpriteTypeEnum;
	updateImage(image: ImageEnum): string
	updateType(type: SpriteTypeEnum): SpriteTypeEnum
}
