import React from 'react';
import { Link } from 'react-router-dom';
import { useFormatMessage } from 'react-intl-hooks';
import classes from './Header.module.css';
import movieIcon from '../../../assets/img/movie-icon.png';

const Header: React.FC = () => {
  const translate = useFormatMessage();

  return (
    <header className={classes.Header}>
      <Link to="/">
        <img src={movieIcon} alt="Movie Library Icon" />
        <h1 className={classes.Title}>
          {translate({
            id: 'Header.title',
            defaultMessage: 'Movie Library',
          })}
        </h1>
      </Link>
    </header>
  );
};

export default React.memo(Header);
