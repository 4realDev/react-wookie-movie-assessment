export enum NavigationRoutes {
	HOME = '/',
	MOVIES = '/movies',
	MOVIE = '/movies/:slug',
	ABOUT = '/about',
}

export const ApiRoutes = {
	movies: {
		getByQuery: (q: string) => (q ? `/movies?q=${q}` : '/movies'),
		getBySlug: (slug: string) => `/movies/${slug ?? ''}`,
	},
};
