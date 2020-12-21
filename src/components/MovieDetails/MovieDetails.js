import React, { useState, useEffect } from 'react';
import classes from './MovieDetails.module.css';
import { FormattedMessage, FormattedDate, injectIntl } from 'react-intl';
import Backdrop from '../UI/Backdrop/Backdrop';
import axios from 'axios';
import Spinner from '../UI/Spinner/Spinner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const MovieDetails = (props) => {
  const [movieInformation, setMovieInformation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { id, intl, show } = props;

  useEffect(() => {
    if (!show) {
      setIsLoading(false);
      setMovieInformation(null);
    } else {
      setIsLoading(true);

      const queryLanguage = intl.formatMessage({
        id: 'languageAPIIdentifider',
        defaultMessage: 'en-US',
      });

      const url = `/movie/${id}?api_key=466eefcef086aaa1375e8ecfebc6a345&language=${queryLanguage}`;

      axios
        .get(url)
        .then((response) => {
          setMovieInformation(response.data);
          setIsLoading(false);
        })
        .catch(() => {
          setMovieInformation(null);
          setIsLoading(false);
        });
    }
  }, [id, setMovieInformation, intl, show]);

  let content = null;

  const information = [];

  if (isLoading) {
    content = <Spinner />;
  } else if (movieInformation) {
    if (movieInformation['production_companies']) {
      const companies = movieInformation['production_companies'].map(
        (company) => company.name,
      );

      information.push(
        <p key="companies">
          <span>
            <FormattedMessage
              id="MovieInformation.production"
              defaultMessage="Production:"
            />
          </span>
          &nbsp;
          {companies.join(', ')}
        </p>,
      );
    }

    if (movieInformation['release_date']) {
      const releaseDate = new Date(movieInformation['release_date']);

      information.push(
        <p key="releaseDate">
          <span>
            <FormattedMessage
              id="MovieInformation.releaseDate"
              defaultMessage="Release Date:"
            />
            &nbsp;
          </span>
          <FormattedDate
            value={releaseDate}
            year="numeric"
            month="2-digit"
            day="2-digit"
          />
        </p>,
      );
    }

    if (movieInformation.genres) {
      const genres = movieInformation.genres.map((genre) => genre.name);
      information.push(
        <p key="genres">
          <span>
            <FormattedMessage
              id="MovieInformation.genres"
              defaultMessage="Genres:"
            />
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
            <FormattedMessage
              id="MovieInformation.website"
              defaultMessage="Website:"
            />
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
            <FormattedMessage
              id="MovieInformation.overview"
              defaultMessage="Overview:"
            />
            &nbsp;
          </span>
          {movieInformation.overview}
        </p>,
      );
    }

    content = (
      <React.Fragment>
        <h2>{movieInformation.title}</h2>
        <div>
          <div className={classes.ImageHolder}>
            <img
              src={`http://image.tmdb.org/t/p/w500/${movieInformation['poster_path']}`}
              alt={movieInformation.title + ' Poster'}
            />
          </div>
          <div className={classes.TextInfo}>{information}</div>
        </div>
      </React.Fragment>
    );
  } else {
    content = <ErrorMessage message={"Can't load the movie details"} />;
  }

  const asignedClasses = [classes.MovieDetails];

  if (show) {
    asignedClasses.push(classes.Show);
  } else {
    asignedClasses.push(classes.Hide);
  }

  return (
    <div className={asignedClasses.join(' ')}>
      <Backdrop show={true} onclick={props.closeModal} />
      <article>{content}</article>
    </div>
  );
};

export default injectIntl(MovieDetails);
