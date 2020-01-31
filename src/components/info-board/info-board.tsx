import React from 'react';

import IInfoBoardProps from './interfaces/info-board-props';
import IInfoBoardState from './interfaces/info.board.state';

import player1 from '../../images/player1.png';
import player2 from '../../images/player2.png';

import './styles/info-board.scss';

interface IDropDown {
	name: string;
	value: number;
}

export default class InfoBoard extends React.Component<IInfoBoardProps, IInfoBoardState> {
	private levels: IDropDown[] = [
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

	private laps: IDropDown[] = [
		{ name: '1 Lap', value: 1 },
		{ name: '5 Laps', value: 5 },
		{ name: '10 Laps', value: 10 },
		{ name: '20 Laps', value: 20 },
		{ name: '50 Laps', value: 50 },
		{ name: '100 Laps', value: 100 },
	]

	private difficulty: IDropDown[] = [
		{ name: 'Easy', value: 1 },
		{ name: 'Medium', value: 2 },
		{ name: 'Hard', value: 3 },
		{ name: 'Ultra', value: 4 },
	]

	private players: IDropDown[] = [
		{ name: '1 Player', value: 1 },
		{ name: '2 Players', value: 2 },
	]

	constructor(props: IInfoBoardProps) {
		super(props);

		this.state = {
			level: this.props.level,
			totalLaps: this.props.totalLaps,
			difficulty: this.props.difficulty,
			players: this.props.players,
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
				<span className="button-title">Laps</span>
				<select value={ this.state.totalLaps } onChange={ this.handleLapsChange.bind(this) }>
					{ this.laps.map((lap: IDropDown) => <option key={ `lap-${ lap.value }`} value={ lap.value }>{ lap.name }</option> )}
				</select>
			</div>
			<div className="button-area">
				<span className="button-title">Track</span>
				<select value={ this.state.level } onChange={ this.handleLevelChange.bind(this) }>
					{ this.levels.map((level: IDropDown) => <option key={ `level-${ level.value }`} value={ level.value }>{ level.name }</option> )}
				</select>
			</div>
			<div className="button-area">
				<span className="button-title">Players</span>
				<select value={ this.state.players } onChange={ this.handlePlayersChange.bind(this) }>
					{ this.players.map((player: IDropDown) => <option key={ `player-${ player.value }`} value={ player.value }>{ player.name }</option> )}
				</select>
			</div>
			<div className="button-area">
				<span className="button-title">Difficulty</span>
				<select value={ this.state.difficulty } onChange={ this.handleDifficultyChange.bind(this) }>
					{ this.difficulty.map((difficulty: IDropDown) => <option key={ `level-${ difficulty.value }`} value={ difficulty.value }>{ difficulty.name }</option> )}
				</select>
			</div>
			<div className="button-area">
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

	private handleLapsChange = async (event: any): Promise<void> => {
		event.preventDefault();
		const totalLaps = event.target.value
		await this.setState({ totalLaps });
	};

	private handleDifficultyChange = async (event: any): Promise<void> => {
		event.preventDefault();
		const difficulty = event.target.value
		await this.setState({ difficulty });
	};

	private handlePlayersChange = async (event: any): Promise<void> => {
		event.preventDefault();
		const players = event.target.value
		await this.setState({ players });
	};

	private startGame = (): void => this.props.startGame(this.state.level, this.state.totalLaps, this.state.difficulty, this.state.players);
}
