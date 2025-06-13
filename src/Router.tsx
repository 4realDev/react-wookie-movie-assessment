import HomePage from './pages/HomePage/HomePage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MovieDetailsPage from 'pages/MovieDetailsPage/MovieDetailsPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import { Layout } from './layouts/Layout';
import AboutPage from 'pages/AboutPage/AboutPage';

// When you run npm start → NODE_ENV is automatically set to 'development'
// When you run npm run build → NODE_ENV is automatically set to 'production'
const baseName = process.env.NODE_ENV === 'production' ? '/react-wookie-movie-assessment' : '';

export enum NavigationRoutes {
	HOME = '/',
	MOVIES = '/movies',
	MOVIE = '/movies/:slug',
	ABOUT = '/about',
}

const router = createBrowserRouter(
	[
		{
			element: <Layout />,
			errorElement: <NotFoundPage />,
			children: [
				{ path: NavigationRoutes.HOME, element: <HomePage /> },
				{ path: NavigationRoutes.MOVIES, element: <HomePage /> },
				{ path: NavigationRoutes.MOVIE, element: <MovieDetailsPage /> },
				{ path: NavigationRoutes.ABOUT, element: <AboutPage /> },
			],
		},
	],
	{ basename: baseName }
);

// basename: base URL for all locations - if app is served from sub-directory on your server, you’ll want to set this to the sub-directory.
export const Router = () => {
	return (
		<RouterProvider
			basename={baseName}
			router={router}></RouterProvider>
	);
};
