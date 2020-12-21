import React, { createRef } from 'react';
import classes from './SearchBar.module.css';
import searchIcon from '../../../assets/img/search.svg';
import { withRouter } from 'react-router-dom';

const SearchBar = (props) => {
  const inputRef = createRef();

  const onSearchSubmit = (event) => {
    event.preventDefault();

    props.history.push('/search/' + encodeURI(inputRef.current.value));
  };

  return (
    <form className={classes.SearchBar} onSubmit={onSearchSubmit}>
      <input
        required
        ref={inputRef}
        className={classes.Input}
        placeholder={props.intl.formatMessage({
          id: 'SearchBar.placeholder',
          defaultMessage: 'Search',
        })}
      />
      <button className={classes.Button}>
        <img src={searchIcon} alt="Search" />
      </button>
    </form>
  );
};

export default React.memo(withRouter(SearchBar));
