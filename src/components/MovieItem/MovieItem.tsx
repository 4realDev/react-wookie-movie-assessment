import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { IMovie } from 'types/movie';
import classes from './MovieItem.module.scss';

type MovieItemProps = {
	movie: IMovie;
};

const MovieItem = ({ movie }: MovieItemProps) => {
	const navigate = useNavigate();
	const navigateToMovieDetails = useCallback(() => {
		navigate(`/movies/${movie.slug}`);
	}, [movie, navigate]);

	return (
		<div
			key={movie.id}
			className={classes.card}
			onClick={() => {
				navigateToMovieDetails();
			}}>
			<img
				className={classes.sliderImage}
				src={movie.poster}
				alt={movie.id}
			/>
		</div>
	);
};

export default MovieItem;
