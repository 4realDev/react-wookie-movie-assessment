import React from 'react';
import classes from './Footer.module.scss';
import { Link } from 'react-router-dom';
import { NavigationRoutes } from 'Router';

const Footer = () => {
	return (
		<div className={classes.footer}>
			<p>Copyright &copy; 2025</p>
			<Link to={NavigationRoutes.ABOUT}>About</Link>
		</div>
	);
};

export default Footer;
