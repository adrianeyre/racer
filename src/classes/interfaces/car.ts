import PlayerResultEnum from '../enums/player-result-enum';
import SpriteTypeEnum from '../enums/sprite-type-enum';
import DirectionEnum from '../enums/direction-enum';
import IBoard from './board';

export default interface ICar {
	key: string;
	visable: boolean;
	outline: boolean;
	speed: number;
	laps: number;
	x: number;
	y: number;
	startX: number;
	startY: number;
	width: number;
	height: number;
	zIndex: number
	score: number;
	direction: DirectionEnum;
	image: string;
	type: SpriteTypeEnum;
	isAlive: boolean;
	crashing: number;
	move(board: IBoard, car: ICar, cars: ICar[]): PlayerResultEnum;
	resetStart(x: number, y: number): void;
	speedUp(): void;
	slowDown(): void;
	turnRight(): void;
	turnLeft(): void;
}
