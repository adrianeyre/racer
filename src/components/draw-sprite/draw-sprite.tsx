import React from 'react';

import IDrawSpriteProps from './interfaces/draw-sprite-props';

import './styles/draw-sprite.scss';

export default class DrawSprite extends React.Component<IDrawSpriteProps, {}> {
	private offsetHeight: number = 0;
	private offsetWidth: number = 0;

	public render() {
		if (!this.props.sprite.visable) return <div></div>

		return <div
				key={ this.props.sprite.key }
				onClick={ this.props.handleClick.bind(this, this.props.sprite) }
				style={ this.styleSprite(this.props.sprite.x, this.props.sprite.y) }
				className="game-sprite"
			>
			<img
				className={ this.props.sprite.outline ? 'outline' : '' }
				src={ this.props.sprite.image }
				height={ this.props.height * this.props.sprite.height }
				width={ this.props.width * this.props.sprite.width }
				alt="sprite"
			/>
		</div>
	}

	private styleSprite = (x: number, y: number) => ({
		width: 0,
		height: 0,
		opacity: 1,
		WebkitTransform: `translate3d(${ (x - 1) * this.props.width + this.offsetWidth }px, ${ this.offsetHeight + (y - 1) * this.props.height }px, 0)`,
		transform: `translate3d(${ (x - 1) * this.props.width + this.offsetWidth }px, ${ this.offsetHeight + (y - 1) * this.props.height }px, 0)`,
		zIndex: this.props.sprite.zIndex,
	})
}
