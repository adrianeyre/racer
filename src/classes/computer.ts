import IComputer from './interfaces/computer';
import IBoard from './interfaces/board';
import Car from './car';
import DirectionEnum from './enums/direction-enum';

export default class Computer extends Car implements IComputer {
	public directCar = (board: IBoard): DirectionEnum => {
		const { xPos, yPos } = board.findBlock(this.iteration);

		if (!xPos && !yPos) {
			this.iteration = this.startIteration;
			return this.directCar(board);
		}

		if (xPos === this.x && yPos === this.y) this.iteration ++;

		if (xPos > this.x && yPos < this.y) return this.direction = DirectionEnum.UP_RIGHT;
		if (xPos > this.x && yPos > this.y) return this.direction = DirectionEnum.DOWN_RIGHT;
		if (xPos < this.x && yPos > this.y) return this.direction = DirectionEnum.DOWN_LEFT;
		if (xPos < this.x && yPos < this.y) return this.direction = DirectionEnum.UP_LEFT;

		if (xPos === this.x && yPos < this.y) return this.direction = DirectionEnum.UP;
		if (xPos === this.x && yPos > this.y) return this.direction = DirectionEnum.DOWN;
		if (xPos > this.x && yPos === this.y) return this.direction = DirectionEnum.RIGHT;
		if (xPos < this.x && yPos === this.y) return this.direction = DirectionEnum.LEFT;

		return DirectionEnum.STOOD;
	}

	public alterDirection = (): DirectionEnum => {
		let direction = this.direction;
		direction ++;
		if (direction > DirectionEnum.UP_LEFT) direction = DirectionEnum.UP;

		return this.direction = direction
	}
}
