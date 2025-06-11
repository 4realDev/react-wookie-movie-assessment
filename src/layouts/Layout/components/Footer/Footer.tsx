import React from 'react';
import classes from './Footer.module.scss';
import { Link } from 'react-router-dom';

const Footer = () => {
	return (
		<div className={classes.footer}>
			<p>Copyright &copy; 2025</p>
			<Link to='/about'>About</Link>
		</div>
	);
};

export default Footer;
