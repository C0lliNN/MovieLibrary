import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { useFormatMessage } from 'react-intl-hooks';
import useQueryLanguage from '../hooks/use-query-language';
import api from '../services/api';

interface Props {
  children: React.ReactNode;
}

interface Genre {
  text?: string;
  id?: number;
  name?: string;
}

interface Genres {
  [index: string]: Genre;
}

export const GenresContext = createContext<Genres>({});

const GenresContextProvider: React.FC<Props> = (props: Props) => {
  const translate = useFormatMessage();

  const { children } = props;

  const [genres, setGenres] = useState<Genres>({
    '/': {
      text: translate({
        id: 'LinkContext.Popular',
        defaultMessage: 'Popular',
      })?.toLocaleString(),
    },
    '/upcoming': {
      text: translate({
        id: 'LinkContext.Upcoming',
        defaultMessage: 'Upcoming',
      })?.toLocaleString(),
    },
  });

  const queryLanguage = useQueryLanguage();

  const getGenres = useCallback(async () => {
    try {
      const { data } = await api.get(`/genre/movie/list`, {
        params: {
          language: queryLanguage,
        },
      });
      const newGenres = { ...genres };

      data.genres.forEach((genre: Genre) => {
        newGenres[`/genre/${genre.name}`] = {
          text: genre.name,
          id: genre.id,
        };
      });
      setGenres(newGenres);
    } catch (err) {
      console.error('Invalid message');
    }
  }, [queryLanguage, genres]);

  useEffect(() => {
    getGenres();
  }, [getGenres]);

  return (
    <GenresContext.Provider value={genres}>{children}</GenresContext.Provider>
  );
};

export default GenresContextProvider;
