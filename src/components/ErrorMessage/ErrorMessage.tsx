import React from 'react';
import { useFormatMessage } from 'react-intl-hooks';
import classes from './ErrorMessage.module.css';

interface Props {
  message: string
}

const ErrorMessage: React.FC<Props> = (props) => {
  const translate = useFormatMessage();

  const { message } = props;

  return (
    <div className={classes.ErrorMessage}>
      <h2>
        {translate({
          id: 'ErrorMessage.title',
          defaultMessage: 'Something unexpected has happened!',
        })}
      </h2>
      <p>
        {translate({
          id: 'ErrorMessage.error',
          defaultMessage: 'Error:',
        })}
        {message}
      </p>
    </div>
  );
};

export default React.memo(ErrorMessage);
