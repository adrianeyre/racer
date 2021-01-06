import React, { FC } from 'react';

import IDrawSpriteProps from './interfaces/draw-sprite-props';

import './styles/draw-sprite.scss';

const DrawSprite: FC<IDrawSpriteProps> = (props: IDrawSpriteProps) => {
	const offsetHeight = 0;
	const offsetWidth = 0;

	const styleSprite = (x: number, y: number) => ({
		width: 0,
		height: 0,
		opacity: 1,
		WebkitTransform: `translate3d(${ (x - 1) * props.width + offsetWidth }px, ${ offsetHeight + (y - 1) * props.height }px, 0)`,
		transform: `translate3d(${ (x - 1) * props.width + offsetWidth }px, ${ offsetHeight + (y - 1) * props.height }px, 0)`,
		zIndex: props.sprite.zIndex,
	})

	if (!props.sprite.visable) return <div></div>

	return <div
			key={ props.sprite.key }
			onClick={ () => props.handleClick(props.sprite) }
			style={ styleSprite(props.sprite.x, props.sprite.y) }
			className="game-sprite"
		>
		<img
			className={ props.sprite.outline ? 'outline' : '' }
			src={ props.sprite.image }
			height={ props.height * props.sprite.height }
			width={ props.width * props.sprite.width }
			alt="sprite"
		/>
	</div>
}

export default DrawSprite;
