import { Navigation } from './components/Navigation/Navigation';
import classes from './Layout.module.scss';
import { Outlet } from 'react-router-dom';
import LayoutContainer from 'components/common/LayoutContainer/LayoutContainer';
import Footer from './components/Footer/Footer';

export const Layout = () => {
	return (
		<div className={classes.layout}>
			<Navigation />
			<div className={classes.content}>
				<LayoutContainer>
					<Outlet />
				</LayoutContainer>
			</div>
			<Footer />
		</div>
	);
};
