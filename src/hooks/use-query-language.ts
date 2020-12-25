import { useMemo } from 'react'
import { useFormatMessage } from 'react-intl-hooks';

const useQueryLanguage = () => {
  const formatMessage = useFormatMessage();

  const queryLanguage = useMemo(
    () =>
    formatMessage({
        id: 'languageAPIIdentifider',
        defaultMessage: 'en-US',
      })?.toLocaleString(),
    [formatMessage],
  );

  return queryLanguage;
}

export default useQueryLanguage;