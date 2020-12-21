import React from 'react';
import classes from './Spinner.module.css';

const Spinner = (props) => <div className={classes.Spinner}>{props.text}</div>;

export default React.memo(Spinner);
