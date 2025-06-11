import { useMovie } from 'api/modules/movies';
import { useParams } from 'react-router-dom';
import classes from './MovieDetailsPage.module.scss';
import { FilledStar, UnfilledStar } from 'assets/icons';
import LoadingSpinner from 'components/common/LoadingSpinner/LoadingSpinner';
import Typography from 'components/common/Typography/Typography';

const MovieDetailsPage = () => {
	const params = useParams<{ slug: string }>();
	const {
		data: movie,
		isError: movieError,
		isFetching: movieFetching,
		isLoading: movieLoading,
	} = useMovie(params.slug!!, true);

	const starRating = [1, 2, 3, 4, 5];

	if (movieError) {
		return <div>Server error occured</div>;
	}

	if (movieFetching || movieLoading) {
		return (
			<>
				<div className='loadingSpinnerContainer'>
					<LoadingSpinner />
				</div>
			</>
		);
	}

	if (movie === undefined) return <></>;

	const movieYear = new Date(movie.released_on).getFullYear();
	const movieRating = movie.imdb_rating ? Math.round(movie.imdb_rating / 2) : undefined;
	const movieDirector = Array.isArray(movie?.director) ? movie.director.join(', ') : movie.director;

	return (
		<div className={classes.movieDetailsPageContainer}>
			<img
				src={movie.poster}
				alt={movie.title}
				className={classes.poster}
			/>
			<div className={classes.movieDescriptionContainer}>
				<div className={classes.movieDescriptionMovieTitleAndRatingWrapper}>
					<Typography variant='header'>{movie.title}</Typography>
					{movieRating && (
						<div className={classes.movieRating}>
							{starRating.map((starRating) =>
								starRating > movieRating ? <UnfilledStar /> : <FilledStar />
							)}
						</div>
					)}
				</div>
				<div className={classes.movieDescriptionMovieDetailsWrapper}>
					<Typography
						variant='subheader'
						tag='span'>
						{`${movieYear} | `}
					</Typography>
					<Typography
						variant='subheader'
						tag='span'>
						{`${movie.length} | `}
					</Typography>
					<Typography
						variant='subheader'
						tag='span'>
						{movieDirector}
					</Typography>
				</div>
				<Typography variant='body'>{movie.overview}</Typography>
			</div>
		</div>
	);
};

export default MovieDetailsPage;
