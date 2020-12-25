/* eslint-disable camelcase */
import React, { useState, useEffect, useCallback } from 'react';
import { useFormatDate, useFormatMessage } from 'react-intl-hooks';
import classes from './MovieDetails.module.css';
import Backdrop from '../UI/Backdrop/Backdrop';
import api from '../../services/api';
import Spinner from '../UI/Spinner/Spinner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import useQueryLanguage from '../../hooks/use-query-language';

interface Props {
  id: number;
  show: boolean;
  closeModal: () => void;
}

interface Company {
  name: string;
}

interface Genre {
  name: string;
}

interface MovieInformation {
  production_companies: Array<Company>;
  release_date: string;
  homepage: string;
  genres: Array<Genre>;
  overview: string;
  title: string;
  poster_path: string;
}

const MovieDetails: React.FC<Props> = (props) => {
  const [
    movieInformation,
    setMovieInformation,
  ] = useState<MovieInformation | null>();
  const [isLoading, setIsLoading] = useState(true);

  const { id, show, closeModal } = props;

  const formatMessage = useFormatMessage();
  const formatDate = useFormatDate();
  const queryLanguage = useQueryLanguage();

  const getMovieDetails = useCallback(async () => {
    if (id && id > 0) {
      const url = `/movie/${id}`;
      setIsLoading(true);

      try {
        const { data } = await api.get(url, {
          params: {
            language: queryLanguage,
          },
        });
        setMovieInformation(data);
      } catch (err) {
        setMovieInformation(null);
      } finally {
        setIsLoading(false);
      }
    }
  }, [queryLanguage, id]);

  useEffect(() => {
    getMovieDetails();
  }, [getMovieDetails]);

  let content = null;

  const information = [];

  if (isLoading) {
    content = <Spinner />;
  } else if (movieInformation) {
    if (movieInformation.production_companies) {
      const companies = movieInformation.production_companies.map(
        (company) => company.name,
      );

      information.push(
        <p key="companies">
          <span>
            {formatMessage({
              id: 'MovieInformation.production',
              defaultMessage: 'Production:',
            })}
          </span>
          &nbsp;
          {companies.join(', ')}
        </p>,
      );
    }

    if (movieInformation.release_date) {
      const releaseDate = new Date(movieInformation.release_date);

      information.push(
        <p key="releaseDate">
          <span>
            {formatMessage({
              id: 'MovieInformation.releaseDate',
              defaultMessage: 'Release Date:',
            })}
            &nbsp;
          </span>
          {formatDate(releaseDate, {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          })}
        </p>,
      );
    }

    if (movieInformation.genres) {
      const genres = movieInformation.genres.map((genre) => genre.name);
      information.push(
        <p key="genres">
          <span>
            {formatMessage({
              id: 'MovieInformation.genres',
              defaultMessage: 'Genres:',
            })}
            &nbsp;
          </span>
          {genres.join(', ')}
        </p>,
      );
    }

    if (movieInformation.homepage) {
      information.push(
        <p key="website">
          <span>
            {formatMessage({
              id: 'MovieInformation.website',
              defaultMessage: 'Website:',
            })}
            &nbsp;
          </span>
          <a
            href={movieInformation.homepage}
            target="_blank"
            rel="noopener noreferrer"
          >
            {movieInformation.homepage}
          </a>
        </p>,
      );
    }

    if (movieInformation.overview) {
      information.push(
        <p key="overview">
          <span>
            {formatMessage({
              id: 'MovieInformation.overview',
              defaultMessage: 'Overview:',
            })}
            &nbsp;
          </span>
          {movieInformation.overview}
        </p>,
      );
    }

    content = (
      <>
        <h2>{movieInformation.title}</h2>
        <div>
          <div className={classes.ImageHolder}>
            <img
              src={`http://image.tmdb.org/t/p/w500/${movieInformation.poster_path}`}
              alt={`${movieInformation.title} Poster`}
            />
          </div>
          <div className={classes.TextInfo}>{information}</div>
        </div>
      </>
    );
  } else {
    content = <ErrorMessage message={"Can't load the movie details"} />;
  }

  const assignedClasses = [classes.MovieDetails];

  if (show) {
    assignedClasses.push(classes.Show);
  } else {
    assignedClasses.push(classes.Hide);
  }

  return (
    <div className={assignedClasses.join(' ')}>
      <Backdrop onclick={closeModal} />
      <article>{content}</article>
    </div>
  );
};

export default MovieDetails;
