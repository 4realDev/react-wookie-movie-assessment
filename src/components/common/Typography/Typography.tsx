import React, { PropsWithChildren } from 'react';
import cn from 'classnames';
import './Typegraphy.scss';

type TypographyVariant = 'header' | 'subheader' | 'body';

type TypographyProps = {
	variant?: TypographyVariant;
	size?: number;
	height?: number;
	weight?: number;
	upper?: boolean;
	color?: string;
	tag?: string;
	spacing?: number;
	center?: boolean;
	noWrap?: boolean;
	marginBottom?: number;
	style?: React.CSSProperties;
	className?: string;
	onClick?: React.MouseEventHandler<HTMLParagraphElement>;
};

const Typography = (props: PropsWithChildren<TypographyProps>) => {
	const {
		variant = 'text',
		size,
		height,
		weight,
		upper,
		color,
		tag,
		spacing,
		center,
		noWrap,
		marginBottom,
		style = {},
		className,
		onClick,
		children,
	} = props;

	const Tag = (tag ? tag : 'p') as React.ElementType;

	const customStyles: React.CSSProperties = {
		color: color,
		fontWeight: weight,
		fontSize: size ?? `${size}px`,
		lineHeight: height ?? `${height}px`,
		letterSpacing: spacing ?? `${spacing}px`,
		whiteSpace: noWrap ? 'nowrap' : 'normal',
		textAlign: center ? 'center' : 'left',
		textTransform: upper ? 'uppercase' : 'inherit',
		marginBottom: `${marginBottom}px`,
		...style,
	};

	const typographyClasses = cn('typography', `typography--${variant}`, className);

	return (
		<Tag
			className={typographyClasses}
			style={customStyles}
			onClick={onClick}>
			{children}
		</Tag>
	);
};

export default Typography;
