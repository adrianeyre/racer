import ISprite from '../../../classes/interfaces/sprite';
import ICar from '../../../classes/interfaces/car';

export default interface IDrawSpriteProps {
	sprite: ISprite | ICar;
	height: number;
	width: number;
	containerWidth: number;
	handleClick(sprite:  ISprite | ICar): void;
}
