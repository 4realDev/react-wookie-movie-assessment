import Logo from '../../../../assets/illustrations/logo.png';
import classes from './Navigation.module.scss';
import { Link } from 'react-router-dom';
import SearchBarPress from 'components/SearchBarPress/SearchBarPress';
import { NavigationRoutes } from 'constants/routes';

export const Navigation = () => {
	return (
		<div className={classes.navigation}>
			<Link
				to={NavigationRoutes.HOME}
				className={classes.logo}>
				<img
					src={Logo}
					alt='Logo'
				/>
			</Link>
			<SearchBarPress />
		</div>
	);
};
