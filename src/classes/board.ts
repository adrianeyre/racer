import IBoard from './interfaces/board';
import ISprite from './interfaces/sprite';
import Sprite from './sprite';
import IFileService from '../services/interfaces/file-service';
import FileService from '../services/file-service';
import IPlayerStartData from '../services/interfaces/player-start-data';
import SpriteTypeEnum from './enums/sprite-type-enum';

export default class Board implements IBoard {
	public board: number[][];
	public sprites: ISprite[];
	public fileService: IFileService;
	public boardWidth: number;
	public boardHeight: number;
	public playerStartData: IPlayerStartData[];

	readonly SPRITE_BLOCKS_WIDTH: number = 50;
	readonly SPRITE_BLOCKS_HEIGHT: number = 30;

	constructor() {
		this.fileService = new FileService();
		this.board = [[]]
		this.boardWidth = this.SPRITE_BLOCKS_WIDTH;
		this.boardHeight = this.SPRITE_BLOCKS_HEIGHT;
		this.playerStartData = [];
		this.sprites = [];
	}

	public readLevel = async (level: number): Promise<void> => {
		this.board = await this.fileService.readLevel(level);

		const playerStartData = await this.fileService.readPlayerData(level)
		this.playerStartData = playerStartData.map((value: any) => ({ x: value[0], y: value[1]}));

		this.sprites = [
			new Sprite({
				key: 'board',
				x: 1,
				y: 1,
				width: this.boardWidth,
				height: this.boardHeight,
				type: SpriteTypeEnum[`Level${ level.toString().length === 1 ? '0' : '' }${ level }Board`],
				zIndex: 100,
			})
		]
	}

	public hasHitWall = (x: number, y: number): boolean => this.board[y-1][x-1] === 1;

	public findBlock = (block: number): any => {
		for (let y = 1; y < this.board.length; y++) {
			const x = this.board[y].indexOf(block);
			if (x > -1) {
				return { xPos: x + 1, yPos: y + 1};
			}
		}

		return { xPos: null, yPos: null };
	}
}