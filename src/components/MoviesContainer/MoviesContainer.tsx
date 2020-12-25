/* eslint-disable camelcase */
import React, {
  useEffect,
  useReducer,
  useCallback,
  useContext,
} from 'react';
import { useLocation, useRouteMatch } from 'react-router-dom';
import api from '../../services/api';
import MovieList from './MovieList/MovieList';
import Spinner from '../UI/Spinner/Spinner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import classes from './MoviesContainer.module.css';
import { GenresContext } from '../../context/genres';
import useQueryLanguage from '../../hooks/use-query-language';

const endpoints = {
  popular: '/movie/popular',
  upcoming: '/movie/upcoming',
  genre: '/discover/movie',
  search: '/search/movie',
};

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  genre_ids: Array<number>;
}

type Action =
  | { type: 'start' }
  | {
      type: 'success';
      movies: Array<Movie>;
    }
  | { type: 'failure'; error: Error };

interface State {
  isLoading: boolean;
  movies: Array<Movie>;
  error: Error | null;
}

interface Config {
  params: {
    [index: string]: string | number | null | undefined;
  };
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'start': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'success': {
      return {
        isLoading: false,
        error: null,
        movies: action.movies,
      };
    }
    case 'failure': {
      return {
        isLoading: false,
        error: action.error,
        movies: [],
      };
    }
    default:
      return state;
  }
}

const MoviesContainer: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, {
    isLoading: false,
    movies: [],
    error: null,
  });

  const match = useRouteMatch();
  const location = useLocation();

  const genres = useContext(GenresContext);

  const { params } = match;
  const { pathname, search } = location;

  const queryLanguage = useQueryLanguage();

  const getMovies = useCallback(async () => {
    dispatch({ type: 'start' });
    const page = new URLSearchParams(search).get('page');
    try {
      const { filter, genre, query } = params as any;
      const config: Config = {
        params: {
          language: queryLanguage,
          page,
        },
      };

      let url = endpoints.popular;

      if (filter) {
        url = endpoints.upcoming;
      } else if (genre) {
        const link = genres[pathname];

        if (link) {
          config.params.with_genres = link.id;
          url = endpoints.genre;
        }
      } else if (query) {
        config.params.query = query;
        url = endpoints.search;
      }

      const { data } = await api.get(url, config);
      dispatch({ type: 'success', movies: data.results });
    } catch (error) {
      dispatch({ type: 'failure', error });
    }
  }, [queryLanguage, pathname, search, params]);

  useEffect(() => {
    getMovies();
  }, [getMovies]);

  let content = null;

  if (state.isLoading) {
    content = <Spinner text="Loading Most Popular Movies" />;
  } else if (state.movies) {
    content = <MovieList movies={state.movies} />;
  } else if (state.error) {
    content = <ErrorMessage message={state.error.message} />;
  }

  return <section className={classes.MoviesContainer}>{content}</section>;
};

export default MoviesContainer;
