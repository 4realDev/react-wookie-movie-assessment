import React from 'react';
import cn from 'classnames';
import './LayoutContainer.scss';

type LayoutContainerProps = {
	noPaddingX?: boolean;
	noPaddingY?: boolean;
	padding?: number;
	paddingTop?: number;
	paddingBottom?: number;
	paddingLeft?: number;
	paddingRight?: number;
	card?: boolean;
	center?: boolean;
	style?: React.CSSProperties;
	className?: string;
	children: React.ReactNode;
};

const LayoutContainer = ({
	noPaddingX,
	noPaddingY,
	padding,
	paddingTop,
	paddingBottom,
	paddingLeft,
	paddingRight,
	card,
	center,
	style,
	className,
	children,
}: LayoutContainerProps) => {
	const layoutContainerClasses = cn(
		'layoutContainer',
		{
			'layoutContainer--noPaddingX': noPaddingX,
			'layoutContainer--noPaddingY': noPaddingY,
			'layoutContainer--center': center,
			'layoutContainer--card': card,
		},
		className
	);

	const customStyle: React.CSSProperties = {
		...style,
		padding: `${padding}px`,
		paddingTop: `${paddingTop}px`,
		paddingBottom: `${paddingBottom}px`,
		paddingLeft: `${paddingLeft}px`,
		paddingRight: `${paddingRight}px`,
	};

	// Inline styles (the style prop) override CSS classes (classname), regardless of the order they appear in your JSX.
	return (
		<div
			className={layoutContainerClasses}
			style={customStyle}>
			{children}
		</div>
	);
};

export default LayoutContainer;
