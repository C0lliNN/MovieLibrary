import React, { useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import Movie from './Movie/Movie';
import classes from './MovieList.module.css';
import ButtonBar from './ButtonBar/ButtonBar';
import MovieDetails from '../../MovieDetails/MovieDetails';

interface MovieData {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  genre_ids: Array<number>;
  showDetails?: () => void;
}

interface Props {
  movies: Array<MovieData>;
}

const MovieList: React.FC<Props> = (props: Props) => {
  const [movieDetails, setMovieDetails] = useState({
    show: false,
    movieId: -1,
  });

  const match = useRouteMatch();

  const showMovieDetailsHandler = (id: number) => {
    setMovieDetails({ show: true, movieId: id });
  };

  const hideMovieDetailsHandler = () => {
    setMovieDetails({ show: false, movieId: -1 });
  };

  const { movies } = props;

  let content = null;

  if (movies) {
    content = props.movies.map((movie) => {
      const image = movie.poster_path
        ? `http://image.tmdb.org/t/p/w342/${movie.poster_path}`
        : null;

      const releaseYear = movie.release_date
        ? movie.release_date.substring(0, 4)
        : null;

      return (
        <Movie
          key={movie.id}
          id={movie.id}
          title={movie.title}
          image={image}
          releaseYear={releaseYear}
          genre_ids={movie.genre_ids}
          showDetails={() => showMovieDetailsHandler(movie.id)}
        />
      );
    });
  }

  return (
    <div className={classes.MovieList}>
      <div className={classes.MoviesHolder}>{content}</div>
      {!(match.params as any).query && <ButtonBar />}
      <MovieDetails
        id={movieDetails.movieId}
        closeModal={hideMovieDetailsHandler}
        show={movieDetails.show}
      />
    </div>
  );
};

export default MovieList;
