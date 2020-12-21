import React, { useContext } from 'react';
import classes from './Movie.module.css';
import { useLocation, useRouteMatch } from 'react-router-dom';
import { GenresContext } from '../../../../context/genres';

import { useFormatMessage } from 'react-intl-hooks';

interface Props {
  id: number;
  title: string;
  image: string;
  releaseYear: string;
  genre_ids: Array<number>;
  showDetails: () => void;
}

const Movie: React.FC<Props> = ({
  title,
  image,
  releaseYear,
  genre_ids,
  showDetails,
}) => {
  const translate = useFormatMessage();

  const notSpecifiedText = translate({
    id: 'Movie.notSpecified',
    defaultMessage: 'Not Specified',
  });

  const location = useLocation();

  const match = useRouteMatch();

  const genresLink = useContext(GenresContext);

  const genres = Object.values(genresLink)
    .filter((g) => genre_ids.includes(g.id as number))
    .map((g) => g.text?.toLocaleString());

  let content = releaseYear ?? notSpecifiedText;

  if ((match.params || location.pathname === '/') && genres.length > 0) {
    content = genres.join(', ');
  }

  const noPosterAvailable = translate({
    id: 'Movie.noPosterAvailable',
    defaultMessage: 'No Poster Available',
  });

  const imageEl = image ? (
    <img src={image} alt={`${title} Poster`} />
  ) : (
    <h4>{noPosterAvailable}</h4>
  );

  return (
    <article className={classes.Movie} onClick={() => showDetails()}>
      <h3>{title}</h3>
      {imageEl}
      <p>({content})</p>
    </article>
  );
};

export default Movie;
