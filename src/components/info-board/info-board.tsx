import React from 'react';

import IInfoBoardProps from './interfaces/info-board-props';

import player1 from '../../images/player1.png';
import player2 from '../../images/player2.png';

import './styles/info-board.scss';

export default class InfoBoard extends React.Component<IInfoBoardProps, {}> {
	public render() {
		return <div className="info-board" style={ this.styleInfoBoard() }>
			<div className="info-board-header">
				<img src={ player1 } alt="player" />
				<span className="header-text">Racer</span>
				<img src={ player2 } alt="player" />
			</div>

			{ this.props.gameOver && <div className="game-over-area">
				<div className="game-over-title">Game Over</div>
				<div className="game-over-text">You scored { this.props.score }, better luck next time!</div>
			</div> }

			<div className="info-board-instructions">
				<p></p>
			</div>

			<div className="button-area">
				<button type="button" onClick={ this.props.startGame }>Play Game</button>
			</div>
		</div>
	}

	private styleInfoBoard = () => ({
		width: `80%`,
		maxWidth: `${ this.props.containerHeight }px`,
	})
}
