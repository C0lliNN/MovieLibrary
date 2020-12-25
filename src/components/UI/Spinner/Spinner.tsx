import React from 'react';
import classes from './Spinner.module.css';

interface Props {
  text?: string;
}

const Spinner: React.FC<Props> = ({ text }) => <div className={classes.Spinner}>{text}</div>;

export default React.memo(Spinner);
