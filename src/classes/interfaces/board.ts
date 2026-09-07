import IFileService from '../../services/interfaces/file-service';
import IPlayerStartData from '../../services/interfaces/player-start-data';
import ISprite from '../interfaces/sprite';
import BlockEnum from '../enums/block-enum';

/** Where a numbered block sits on the board, or `null` twice if it has none. */
export interface IBlockPosition {
	xPos: number | null;
	yPos: number | null;
}

export default interface IBoard {
	board: number[][];
	sprites: ISprite[];
	boardWidth: number;
	boardHeight: number;
	fileService: IFileService;
	playerStartData: IPlayerStartData[];
	oilX: number;
	oilY: number;
	readLevel(level: number): Promise<void>;
	findBlock(block: number): IBlockPosition;
	isBlock(x: number, y: number, block: BlockEnum): boolean;
	setOil(): void;
	removeOil(): void;
}
