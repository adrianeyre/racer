import ISpriteProps from './interfaces/sprite-props';
import ISprite from './interfaces/sprite';
import SpriteTypeEnum from './enums/sprite-type-enum';
import ImageEnum from './enums/image-enum';

export default class Sprite implements ISprite {
	public key: string;
	public visable: boolean;
	public outline: boolean;
	public x: number;
	public y: number;
	public blockX: number;
	public blockY: number;
	public width: number;
	public height: number;
	public zIndex: number;
	public image: string;
	public type: SpriteTypeEnum;

	readonly Z_INDEX: number = 5000;
	readonly playerImages = {}

	constructor(config: ISpriteProps) {
		this.key = config.key;
		this.visable = config.visable;
		this.outline = config.outline;
		this.x = config.x;
		this.y = config.y;
		this.blockX = config.blockX;
		this.blockY = config.blockY;
		this.width = config.width;
		this.height = config.height;
		this.zIndex = this.Z_INDEX;
		this.image = this.playerImages[config.image];
		this.type = config.type;
	}

	public updateImage = (image: ImageEnum): string => this.image = this.playerImages[image];
	public updateType = (type: SpriteTypeEnum): SpriteTypeEnum => this.type = type;
}
