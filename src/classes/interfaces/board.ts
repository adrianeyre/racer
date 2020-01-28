import IFileService from '../../services/interfaces/file-service';
import IPlayerStartData from '../../services/interfaces/player-start-data';
import ISprite from '../interfaces/sprite';

export default interface IBoard {
	board: number[][];
	sprites: ISprite[];
	boardWidth: number;
	boardHeight: number;
	fileService: IFileService;
	playerStartData: IPlayerStartData[];
	readLevel(level: number): Promise<void>;
	hasHitWall(x: number, y: number): boolean;
	findBlock(block: number): any;
	isHalfWay(x: number, y: number): boolean;
	isLapFinished(x: number, y: number): boolean;
}
