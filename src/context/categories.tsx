import {
  createContext,
  useState,
  useEffect,
  useMemo,
  useCallback
} from 'react';
import axios from 'axios';
import React from 'react';
import { useFormatMessage } from 'react-intl-hooks';

interface Props {
  children: React.ReactNode;
}

interface Genres {
  [index: string]: {
    text: React.ReactNode;
    id?: number;
  };
}

export const GenresContext = createContext<Genres>({});

const GenresContextProvider: React.FC<Props> = (props) => {
  const translate = useFormatMessage();

  const [genres, setGenres] = useState<Genres>({
    '/': {
      text: translate({
        id: 'LinkContext.Popular',
        defaultMessage: 'Popular'
      })
    },
    '/upcoming': {
      text: translate({
        id: 'LinkContext.Upcoming',
        defaultMessage: 'Upcoming'
      })
    }
  });

  const queryLanguage = useMemo(
    () =>
      translate({
        id: 'languageAPIIdentifider',
        defaultMessage: 'en-US'
      }),
    []
  );

  const getGenres = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `/genre/movie/list?api_key=466eefcef086aaa1375e8ecfebc6a345&language=${queryLanguage}`
      );
      const newGenres = { ...genres };
      for (const genre of data.genres) {
        newGenres['/genre/' + genre.name] = {
          text: genre.name,
          id: genre.id
        };
      }
      setGenres(newGenres);
    } catch (err) {
      console.error('Invalid message');
    }
  }, [queryLanguage]);

  useEffect(() => {
    getGenres();
  }, []);

  return (
    <GenresContext.Provider value={genres}>
      {props.children}
    </GenresContext.Provider>
  );
};

export default GenresContextProvider;