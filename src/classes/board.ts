import IBoard from './interfaces/board';
import ISprite from './interfaces/sprite';
import Sprite from './sprite';
import IFileService from '../services/interfaces/file-service';
import FileService from '../services/file-service';
import IPlayerStartData from '../services/interfaces/player-start-data';
import SpriteTypeEnum from './enums/sprite-type-enum';
import BlockEnum from './enums/block-enum';

export default class Board implements IBoard {
	public board: number[][];
	public sprites: ISprite[];
	public fileService: IFileService;
	public boardWidth: number;
	public boardHeight: number;
	public playerStartData: IPlayerStartData[];
	public oilX: number;
	public oilY: number;

	readonly SPRITE_BLOCKS_WIDTH: number = 50;
	readonly SPRITE_BLOCKS_HEIGHT: number = 30;

	constructor() {
		this.fileService = new FileService();
		this.board = [[]]
		this.boardWidth = this.SPRITE_BLOCKS_WIDTH;
		this.boardHeight = this.SPRITE_BLOCKS_HEIGHT;
		this.playerStartData = [];
		this.sprites = [];
		this.oilX = 0;
		this.oilY = 0;
	}

	public readLevel = async (level: number): Promise<void> => {
		this.board = await this.fileService.readLevel(level);

		const playerStartData = await this.fileService.readPlayerData(level)
		this.playerStartData = playerStartData.map((value: any) => ({ x: value[0], y: value[1]}));

		this.sprites = [
			new Sprite({
				key: 'board',
				visable: true,
				x: 1,
				y: 1,
				width: this.boardWidth,
				height: this.boardHeight,
				type: SpriteTypeEnum[`Level${ level.toString().length === 1 ? '0' : '' }${ level }Board`],
				zIndex: 100,
			}),
			new Sprite({
				key: 'oil',
				visable: false,
				x: 1,
				y: 1,
				width: 1,
				height: 1,
				type: SpriteTypeEnum.Oil,
				zIndex: 4000,
			}),
		]
	}

	public isBlock = (x: number, y: number, block: BlockEnum): boolean => this.board[y-1][x-1] === block;

	public findBlock = (block: number): any => {
		for (let y = 1; y < this.board.length; y++) {
			const x = this.board[y].indexOf(block);
			if (x > -1) {
				return { xPos: x + 1, yPos: y + 1};
			}
		}

		return { xPos: null, yPos: null };
	}

	public setOil = (): void => {
		let blockIsRoad = false

		do {
			this.oilX = Math.floor(Math.random() * this.board[0].length);
			this.oilY = Math.floor(Math.random() * this.board.length);
			if (this.board[this.oilY-1][this.oilX-1] === BlockEnum.ROAD) blockIsRoad = true;
		} while (!blockIsRoad);

		this.board[this.oilY-1][this.oilX-1] = 99;
		const oil = this.sprites.find((sprite: ISprite) => sprite.key === 'oil');
		if (!oil) return;

		oil.x = this.oilX;
		oil.y = this.oilY;
		oil.visable = true;
	}

	public removeOil = (): void => {
		const oil = this.sprites.find((sprite: ISprite) => sprite.key === 'oil');
		if (!oil) return;

		this.board[this.oilY-1][this.oilX-1] = 0;
		oil.x = 1;
		oil.y = 1;
		oil.visable = false;
	}
}