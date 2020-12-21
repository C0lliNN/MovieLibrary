import { NavLink, withRouter } from 'react-router-dom';
import React from 'react';
import classes from './ButtonBar.module.css';

const ButtonBar = (props) => {
  const pagesNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const pathname = props.location.pathname;

  const pageLinks = pagesNumber.map((pageNumber) => {
    const pageLinkClasses = [classes.PageLink];

    if (pageNumber > 5) {
      pageLinkClasses.push(classes.Hide);
    }

    return (
      <NavLink
        key={pageNumber}
        className={pageLinkClasses.join(' ')}
        to={
          !pathname.indexOf('?') !== -1 &&
          pathname + '?page=' + String(pageNumber)
        }
      >
        {pageNumber}
      </NavLink>
    );
  });

  return <ul className={classes.ButtonBar}>{pageLinks}</ul>;
};

export default withRouter(ButtonBar);
