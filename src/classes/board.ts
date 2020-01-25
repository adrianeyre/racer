import IBoard from './interfaces/board';
import ISprite from './interfaces/sprite';
import IPlayer from './interfaces/player';
import Player from './player';
import IBoardProps from './interfaces/board-props';
import IFileService from '../services/interfaces/file-service';
import FileService from '../services/file-service';

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

export default class Board implements IBoard {
	public board: number[][];
	public player: IPlayer;
	public sprites: ISprite[];
	public currentLevel: number;
	public startX: number;
	public startY: number;
	public fileService: IFileService;
	public boardWidth: number;
	public boardHeight: number;
	public boardImage: string;

	readonly SPRITE_BLOCKS_WIDTH: number = 12;
	readonly SPRITE_BLOCKS_HEIGHT: number = 12;
	readonly SPRITE_WIDTH: number = 3;
	readonly SPRITE_HEIGHT: number = 3;
	readonly boards = [
		level01Board, level02Board, level03Board, level04Board, level05Board,
		level06Board, level07Board, level08Board, level09Board, level10Board
	]

	constructor(config: IBoardProps) {
		this.player = new Player({});
		this.fileService = new FileService();
		this.currentLevel = config.currentLevel
		this.board = [[]]
		this.startX = 0;
		this.startY = 0;
		this.sprites = [];
		this.boardWidth = 0;
		this.boardHeight = 0;
		this.boardImage = this.getBoardImage();
	}

	private getBoardImage = (): string => this.boards[this.currentLevel - 1];
}