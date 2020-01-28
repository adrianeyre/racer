import React from 'react';

import IGameStatusBottomProps from './interfaces/game-status-bottom-props';
import ICar from '../../classes/interfaces/car';

import './styles/game-status-bottom.scss';

export default class GameStatusBottom extends React.Component<IGameStatusBottomProps, {}> {

	public render() {
		return <div className="game-status-bottom">
			{ this.props.cars.map((car: ICar) => <div className="player-status">
				<div className="car-name">{ car.name }</div>
				<div className="car-details">Laps { car.laps } / { this.props.totalLaps }</div>
				<div className="car-details">Speed { car.speed * 10 } mph</div>
				<div className="car-time">Time { car.time / 100 }</div>
			</div> )}
		</div>
	}
}
