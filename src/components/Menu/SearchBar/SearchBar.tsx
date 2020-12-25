import React, { createRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useFormatMessage } from 'react-intl-hooks';
import classes from './SearchBar.module.css';
import searchIcon from '../../../assets/img/search.svg';

const SearchBar: React.FC = () => {
  const translate = useFormatMessage();
  const inputRef = createRef<HTMLInputElement>();

  const history = useHistory();

  const onSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const search = inputRef?.current?.value;

    if (search) {
      history.push(`/search/${encodeURI(search)}`);
    }
  };

  return (
    <form className={classes.SearchBar} onSubmit={onSearchSubmit}>
      <input
        required
        ref={inputRef}
        className={classes.Input}
        placeholder={translate({
          id: 'SearchBar.placeholder',
          defaultMessage: 'Search',
        })?.toLocaleString()}
      />
      <button type="submit" className={classes.Button}>
        <img src={searchIcon} alt="Search" />
      </button>
    </form>
  );
};

export default React.memo(SearchBar);
