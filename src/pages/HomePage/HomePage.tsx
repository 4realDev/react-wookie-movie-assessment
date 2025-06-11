import { useMovies } from '../../api/modules/movies';
import { IMovie } from 'types/movie';
import { useSearchParams } from 'react-router-dom';
import React, { useMemo } from 'react';
import classes from './HomePage.module.scss';
import Slider from 'components/Slider/Slider';
import Typography from 'components/common/Typography/Typography';

// key - value pair
// key is the gerne, which is a string, value are multiple movies, which belong to the gerne
type MoviesByGenreList = {
	[gerne: string]: IMovie[];
};

const HomePage = () => {
	const [searchParams] = useSearchParams();
	const { data: movies, isLoading: moviesLoading } = useMovies(searchParams.get('q') ?? '', true);
	const moviesByGenre = useMemo(
		() =>
			movies?.reduce((result: MoviesByGenreList, movie) => {
				movie.genres.forEach((genre) => {
					if (result[genre]) {
						result[genre].push(movie);
					} else {
						result[genre] = [movie];
					}
				});
				return result;
			}, {}) || {},
		[movies]
	);

	if (!movies) return <div></div>;
	return moviesLoading ? (
		<div>LOADING...</div>
	) : (
		<div>
			{movies.length ? (
				<>
					{Object.keys(moviesByGenre).map((genre) => (
						<div key={genre}>
							<Typography variant='body'>{genre}</Typography>
							<div className={classes.movieListContainer}>
								<Slider sliderData={moviesByGenre[genre]} />
							</div>
						</div>
					))}
				</>
			) : (
				<>No Movies Found</>
			)}
		</div>
	);
};

export default HomePage;
