import React, {
	CSSProperties,
	Dispatch,
	InputHTMLAttributes,
	memo,
	SetStateAction,
	useState,
} from 'react';

import classes from './Input.module.scss';
import classnames from 'classnames';

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
	className?: string;
	style?: CSSProperties;
	value?: string;
	onChange?: Dispatch<SetStateAction<string>>;
};

const Input = (props: InputProps) => {
	// controlledValue, to controll the inputValue via own provided state value (passing state value into <Input/>)
	const { defaultValue, className, value: controlledValue, ...rest } = props;
	// value, to controll the value inputValue for the input field itself (by typing text in and triggering onChange)
	const [value, setValue] = useState(defaultValue);

	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = event.target.value;
		// set the component state (for UI changes)
		setValue(newValue);
		// set the provided props state (for own logic)
		props.onChange?.(newValue);
	};

	return (
		<input
			// use own class (.input) and additionally use className prop, if passed
			className={classnames(className, classes.input)}
			// original onChange value from input should always override controlledValue provided by props
			value={value || controlledValue}
			// pass the rest of the props -> allows to use all the HTMLInputElement Props inside <Input/>
			{...rest}
			// onChange needs to override ...rest, therefore must be afterwards
			onChange={onChange}
		/>
	);
};

export default memo(Input);
