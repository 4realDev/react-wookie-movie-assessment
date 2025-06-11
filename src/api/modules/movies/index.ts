import { useQuery } from '@tanstack/react-query';
import { IMovie, IMoviesResponse } from 'types/movie';
import { request } from '../../config/axios';

/*
useQuery:
main hook you use, everytime you want to create a query (to fetch some data)
queryKey: used as a form of identification for the "caching-data-table" -> react-query creates cache for the specified query (results of queryFn saved with the queryKey)
instead of fetching from backend over and over, cached value can be used where it is needed / called via useMovies
*/

/* 
useMutation:
hook that tells react query to refetch data, when mutation on data was executed and there is new data to be fetched (otherwise react query would not automatically refetch new data, but instead use the cached (old) data)
by linking useQuery fetching function with useMutation function, react query automatically knows, when to refetch the new data
*/

// http://localhost:3000/?q=badmen
// GET all movies with or without searchQuery
// If no searchQuery exists, just GET all existing movies
// If searchQuery exists, GET all movies matching query
const getMovies = async (q: string) => {
	const result = await request<IMoviesResponse>({
		url: '/movies',
		method: 'GET',
		params: q ? { q } : {},
	});
	return result.movies;
};

// http://localhost:3000/movies/batman-begins-2005
// slug: end part of URL after backslash ("/"") -> identifies specific page or post
const getMovieBySlug = async (slug: string) => {
	await sleep(2000);
	return request<IMovie>({ url: `movies/${slug ?? ''}` });
};

export const useMovie = (slug: string, enabled = true) => {
	return useQuery({
		queryKey: ['movies', slug],
		queryFn: () => getMovieBySlug(slug),
		enabled,
	});
};

// query: movies/?q=dark
export const useMovies = (query: string, enabled = true) => {
	return useQuery<IMovie[]>({
		// queryKey: ['movies'],
		// queryFn: () => getMovies(),
		queryKey: ['movies', query ?? ''],
		queryFn: () => getMovies(query ?? ''),
		enabled,
	});
};

// in App.tsx
// usage of destruction "query variable": 	use only  properties that are actually needed in component
// usage of alias "data as movies": 		to make code-readibility better
// const { data: movies, isLoading: isMoviesLoading, error: isMoviesError } = useMovies(true);

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
