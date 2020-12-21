import React, { useState } from 'react';
import Movie from './Movie/Movie.tsx';
import classes from './MovieList.module.css';
import ButtonBar from './ButtonBar/ButtonBar';
import { withRouter } from 'react-router-dom';
import MovieDetails from '../../MovieDetails/MovieDetails';

const MovieList = (props) => {
  let movies = null;

  const [movieDetails, setMovieDetails] = useState({
    show: false,
    movieId: -1,
  });

  const showMovieDetailsHandler = (id) => {
    setMovieDetails({ show: true, movieId: id });
  };

  const hideMovieDetailsHandler = () => {
    setMovieDetails({ show: false, movieId: -1 });
  };

  if (props.movies) {
    movies = props.movies.map((movie) => {
      const image = movie['poster_path']
        ? `http://image.tmdb.org/t/p/w342/${movie['poster_path']}`
        : null;

      const releaseYear = movie['release_date']
        ? movie['release_date'].substring(0, 4)
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
      <div className={classes.MoviesHolder}>{movies}</div>
      {!props.match.params.query && <ButtonBar />}
      <MovieDetails
        id={movieDetails.movieId}
        closeModal={hideMovieDetailsHandler}
        show={movieDetails.show}
      />
    </div>
  );
};

export default withRouter(MovieList);
