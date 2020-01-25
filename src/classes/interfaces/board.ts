import ISprite from './sprite';
import IPlayer from './player';
import IFileService from '../../services/interfaces/file-service';

export default interface IBoard {
	board: number[][];
	player: IPlayer;
	sprites: ISprite[];
	startX: number;
	startY: number;
	boardWidth: number;
	boardHeight: number;
	boardImage: string;
	fileService: IFileService;
}
