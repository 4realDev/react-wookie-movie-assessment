import React from 'react';
import classes from './LoadingSpinner.module.scss';

const LoadingSpinner = () => {
	return (
		<div className={classes.loaderContainer}>
			<div className={classes.loader}>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	);
};

export default LoadingSpinner;
