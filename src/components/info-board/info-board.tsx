import React from 'react';

import IInfoBoardProps from './interfaces/info-board-props';
import IInfoBoardState from './interfaces/info.board.state';

import player1 from '../../images/player1.png';
import player2 from '../../images/player2.png';

import './styles/info-board.scss';

interface ILevels {
	name: string;
	value: number;
}

export default class InfoBoard extends React.Component<IInfoBoardProps, IInfoBoardState> {
	private levels: ILevels[] = [
		{ name: 'Level 1', value: 1 },
		{ name: 'Level 2', value: 2 },
		{ name: 'Level 3', value: 3 },
		{ name: 'Level 4', value: 4 },
		{ name: 'Level 5', value: 5 },
		{ name: 'Level 6', value: 6 },
		{ name: 'Level 7', value: 7 },
		{ name: 'Level 8', value: 8 },
		{ name: 'Level 9', value: 9 },
		{ name: 'Level 10', value: 10 },
	]

	constructor(props: IInfoBoardProps) {
		super(props);

		this.state = {
			level: this.props.level
		}

		this.handleLevelChange = this.handleLevelChange.bind(this);
		this.startGame = this.startGame.bind(this);
	}

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
				<p>The aim of the game is to navigate your car around the track avoiding the grass and other cars. Beware of the oil spills that will cause you to slip!</p>
				<table>
					<tbody>
						<tr>
							<td colSpan={2} className="title-player">Player 1 Keys</td>
							<td colSpan={2} className="title-player">Player 2 Keys</td>
						</tr>
						<tr>
							<td className="title">Direction</td>
							<td className="title">Key</td>
							<td className="title">Direction</td>
							<td className="title">Key</td>
						</tr>
						<tr>
							<td>Up</td>
							<td>Arrow Up</td>
							<td>Up</td>
							<td>w</td>
						</tr>
						<tr>
							<td>Down</td>
							<td>Arrow Down</td>
							<td>Down</td>
							<td>s</td>
						</tr>
						<tr>
							<td>Left</td>
							<td>Arrow Left</td>
							<td>Left</td>
							<td>a</td>
						</tr>
						<tr>
							<td>Right</td>
							<td>Arrow Right</td>
							<td>Right</td>
							<td>d</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div className="button-area">
				<select value={ this.state.level } onChange={ this.handleLevelChange.bind(this) }>
					{ this.levels.map((level: ILevels) => <option key={ `level-${ level.value }`} value={ level.value }>{ level.name }</option> )}
				</select>
				<button type="button" onClick={ this.startGame.bind(this) }>Play Game</button>
			</div>

		</div>
	}

	private styleInfoBoard = () => ({
		width: `80%`,
		maxWidth: `${ this.props.containerHeight }px`,
	})

	private handleLevelChange = async (event: any): Promise<void> => {
		event.preventDefault();
		const level = event.target.value
		await this.setState({ level });
	};

	private startGame = (): void => this.props.startGame(this.state.level);
}
