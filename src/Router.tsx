import HomePage from './pages/HomePage/HomePage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MovieDetailsPage from 'pages/MovieDetailsPage/MovieDetailsPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import { Layout } from './layouts/Layout';
import AboutPage from 'pages/AboutPage/AboutPage';

export enum NavigationRoutes {
	HOME = '/',
	MOVIES = '/movies',
	MOVIE = '/movies/:slug',
	ABOUT = '/about',
}

const router = createBrowserRouter([
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
]);

export const Router = () => {
	return <RouterProvider router={router}></RouterProvider>;
};
