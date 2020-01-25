import IPlayerProps from './interfaces/player-props';
import IPlayer from './interfaces/player';
import DirectionEnum from './enums/direction-enum';

import playerImage01 from '../images/player-01-01.png';
import playerImage02 from '../images/player-01-02.png';
import playerImage03 from '../images/player-01-03.png';
import playerImage04 from '../images/player-01-04.png';
import playerImage05 from '../images/player-01-05.png';
import playerImage06 from '../images/player-01-06.png';
import playerImage07 from '../images/player-01-07.png';
import playerImage08 from '../images/player-01-08.png';


export default class Player implements IPlayer {
	public key: string;
	public visable: boolean;
	public outline: boolean;
	public x: number;
	public y: number;
	public blockX: number;
	public blockY: number
	public startX: number;
	public startY: number;
	public width: number;
	public height: number;
	public zIndex: number
	public direction: DirectionEnum;
	public score: number;
	public lives: number;
	public image: string;
	public isAlive: boolean;

	readonly INITIAL_PLAYER_LIVES: number = 3;
	readonly INITIAL_PLAYER_X: number = 1;
	readonly INITIAL_PLAYER_Y: number = 1;
	readonly PLAYER_WIDTH: number = 1;
	readonly PLATER_HEIGHT: number = 1;
	readonly PLAYER_ZINDEX: number = 6000;
	readonly playerImages: string[] = [
		playerImage01,
		playerImage02,
		playerImage03,
		playerImage04,
		playerImage05,
		playerImage06,
		playerImage07,
		playerImage08,
	];

	constructor(config: IPlayerProps) {
		this.key = 'player';
		this.visable = true;
		this.outline = false;
		this.x = (this.INITIAL_PLAYER_X - 1 ) * this.PLAYER_WIDTH + 1;
		this.y = (this.INITIAL_PLAYER_Y - 1 ) * this.PLATER_HEIGHT + 1;
		this.blockX = this.INITIAL_PLAYER_X;
		this.blockY = this.INITIAL_PLAYER_Y;
		this.startX = 0;
		this.startY = 0;
		this.width = this.PLAYER_WIDTH;
		this.height = this.PLATER_HEIGHT;
		this.zIndex = this.PLAYER_ZINDEX;
		this.direction = DirectionEnum.STAND;
		this.score = 0;
		this.lives = config.initialPlayerLives || this.INITIAL_PLAYER_LIVES;
		this.image = this.setImage();
		this.isAlive = true;
	}

	private setImage = (): string => this.playerImages[this.direction];
}
