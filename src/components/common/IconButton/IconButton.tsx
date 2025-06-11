import React, { ButtonHTMLAttributes, CSSProperties, ReactElement } from 'react';
import classes from './IconButton.module.scss';
import classnames from 'classnames';

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	style?: CSSProperties;
	className?: string;
	disabled?: boolean;
	onClick: () => void;
	Icon: ReactElement;
};

const IconButton = (props: IconButtonProps) => {
	const { onClick, Icon, disabled, ...rest } = { ...props };
	return (
		<button
			className={classnames([classes.button])}
			onClick={onClick}
			disabled={disabled}
			{...rest}>
			{Icon}
		</button>
	);
};

export default IconButton;
