export const NavigationRoutes = {
	HOME: '/',
	MOVIES: '/movies',
	MOVIE: '/movies/:slug',
	ABOUT: '/about',
} as const;

export const ApiRoutes = {
	movies: {
		getByQuery: (q: string) => (q ? `/movies?q=${q}` : '/movies'),
		getBySlug: (slug: string) => `/movies/${slug ?? ''}`,
	},
};
