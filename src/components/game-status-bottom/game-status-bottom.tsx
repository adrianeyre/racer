import React, { FC } from 'react';

import IGameStatusBottomProps from './interfaces/game-status-bottom-props';
import ICar from '../../classes/interfaces/car';

import './styles/game-status-bottom.scss';

const GameStatusBottom: FC<IGameStatusBottomProps> = (props: IGameStatusBottomProps) => {
	return <div className="game-status-bottom">
		{ props.cars.map((car: ICar, carIndex: number) => <div key={ `car-status-${ carIndex }` } className="player-status">
			<div className="car-name">{ car.name }</div>
			<div className="car-details">Laps { car.laps } / { props.totalLaps }</div>
			<div className="car-details">Speed { car.speed * 10 } mph</div>
			<div className="car-time">Time { car.time / 100 }</div>
		</div> )}
	</div>
}

export default GameStatusBottom;
