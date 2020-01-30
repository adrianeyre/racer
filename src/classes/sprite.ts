import ISpriteProps from './interfaces/sprite-props';
import ISprite from './interfaces/sprite';
import SpriteTypeEnum from './enums/sprite-type-enum';

import level01Board from '../images/level-01.png';
import level02Board from '../images/level-02.png';
import level03Board from '../images/level-03.png';
import level04Board from '../images/level-04.png';
import level05Board from '../images/level-05.png';
import level06Board from '../images/level-06.png';
import level07Board from '../images/level-07.png';
import level08Board from '../images/level-08.png';
import level09Board from '../images/level-09.png';
import level10Board from '../images/level-10.png';
import oil from '../images/oil.png';

export default class Sprite implements ISprite {
	public key: string;
	public visable: boolean;
	public outline: boolean;
	public x: number;
	public y: number;
	public width: number;
	public height: number;
	public zIndex: number;
	public image: string;
	public type: SpriteTypeEnum;

	readonly Z_INDEX: number = 5000;
	readonly spriteImages = {
		level01Board, level02Board, level03Board, level04Board, level05Board,
		level06Board, level07Board, level08Board, level09Board, level10Board,
		oil
	}

	constructor(config: ISpriteProps) {
		this.key = config.key;
		this.visable = config.visable;
		this.outline = false;
		this.x = config.x;
		this.y = config.y;
		this.width = config.width;
		this.height = config.height;
		this.zIndex = config.zIndex || this.Z_INDEX;
		this.type = config.type;
		this.image = this.spriteImages[this.type];
	}
}
