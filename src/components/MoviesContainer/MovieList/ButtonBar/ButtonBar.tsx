import { NavLink, useLocation } from 'react-router-dom';
import React from 'react';
import { useMediaQuery } from '@react-hook/media-query';
import classes from './ButtonBar.module.css';

const ButtonBar = () => {
  const pagesNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const matches = useMediaQuery('(min-width: 768px)');
  const { pathname, search } = useLocation();

  const pageLinks = pagesNumber.filter(n => n <= 5 || matches).map((n) => {
    const pageLinkClasses = [classes.PageLink];

    const page = new URLSearchParams(search).get('page');

    const active = page && +page === n;

    if (active) {
      pageLinkClasses.push(classes.Active);
    }

    return (
      <NavLink
        key={n}
        className={pageLinkClasses.join(' ')}
        to={`${pathname}?page=${String(n)}`}
        exact
      >
        {n}
      </NavLink>
    );
  });

  return <ul className={classes.ButtonBar}>{pageLinks}</ul>;
};

export default ButtonBar;
