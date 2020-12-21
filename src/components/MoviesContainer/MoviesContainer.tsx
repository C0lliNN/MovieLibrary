import React, { useEffect, useMemo, useReducer, useCallback } from 'react';
import { useFormatMessage } from 'react-intl-hooks';
import { useLocation, useRouteMatch } from 'react-router-dom';
import api from '../../services/api';
import MovieList from './MovieList/MovieList';
import Spinner from '../UI/Spinner/Spinner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import classes from './MoviesContainer.module.css';
// import { GenresContext } from '../../context/genres';

const endpoints = {
  popular: '/movie/popular',
  upcoming: '/movie/upcoming',
  genre: '/discover/movie',
  search: '/search/movie',
};

type Action =
  | { type: 'start' }
  | {
      type: 'success';
      movies: Array<object>;
    }
  | { type: 'failure'; error: Error };

  interface State {
    isLoading: boolean,
    movies: Array<object>,
    error: Error | null
  };


function reducer(state: State, action: Action): State {
    switch(action.type) {
      case 'start': {
        return {
          ...state,
          isLoading: true
        }
      }
      case 'success': {
        return {
          isLoading: false,
          error: null,
          movies: action.movies
        }
      }
      case 'failure': {
        return {
          isLoading: false,
          error: action.error,
          movies: []
        }
    }
    default:
        return state;
  }
};

const MoviesContainer: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, {
    isLoading: false,
    movies: [],
    error: null
  });

  const translate = useFormatMessage();

  const match = useRouteMatch();
  const location = useLocation();

  // const [page, setPage] = useState();

  // const genres = useContext(GenresContext);

  const { params } = match;
  // const { pathname, search } = location;

  const queryLanguage = useMemo(() => 
    translate({
      id: 'languageAPIIdentifider',
      defaultMessage: 'en-US',
    })?.toLocaleString()
  , []);

  const getMovies = useCallback(async () => {
    dispatch({ type: 'start'});
    try {

      const { data } = await api.get(endpoints.popular, {
        params: {
          language: queryLanguage
        }
      });
      dispatch({ type: 'success', movies: data.results });
    } catch(error) {
      dispatch({ type: 'failure', error})
    }
  }, [params, location]);

  useEffect(() => {
    getMovies();
  }, [
  ]);

  let content = null;

  if (state.isLoading) {
    content = <Spinner text="Loading Most Popular Movies" />;
  }

  if (state.movies) {
    content = <MovieList movies={state.movies} />;
  }

  if (state.error) {
    content = <ErrorMessage message={state.error.message} />;
  }

  return <section className={classes.MoviesContainer}>{content}</section>;
};

export default MoviesContainer;
