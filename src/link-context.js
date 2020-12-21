import { createContext, useState, useEffect } from 'react';
import { injectIntl } from 'react-intl';
import axios from 'axios';
import React from 'react';

export const LinkContext = createContext({});

export default injectIntl((props) => {
  const [links, setLinks] = useState({
    '/': {
      text: props.intl.formatMessage({
        id: 'LinkContext.Popular',
        defaultMessage: 'Popular',
      }),
    },
    '/upcoming': {
      text: props.intl.formatMessage({
        id: 'LinkContext.Upcoming',
        defaultMessage: 'Upcoming',
      }),
    },
  });

  const queryLanguage = props.intl.formatMessage({
    id: 'languageAPIIdentifider',
    defaultMessage: 'en-US',
  });

  useEffect(() => {
    axios
      .get(
        '/genre/movie/list?api_key=466eefcef086aaa1375e8ecfebc6a345&language=' +
          queryLanguage,
      )
      .then((response) => {
        setLinks((prevState) => {
          const newState = { ...prevState };
          for (const genre of response.data.genres) {
            newState['/genre/' + genre.name] = {
              text: genre.name,
              id: genre.id,
            };
          }
          return newState;
        });
      })
      .catch(() => {
        setLinks(null);
      });
  }, [queryLanguage]);

  return (
    <LinkContext.Provider value={links}>{props.children}</LinkContext.Provider>
  );
});
