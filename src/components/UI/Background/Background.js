import React from 'react';
import classes from './Background.module.css';
import background from '../../../assets/img/background.jpg';

const Background = () => (
  <React.Fragment>
    <div className={classes.Background}>
      <img src={background} alt="" />
    </div>

    <div className={classes.Overlay}></div>
  </React.Fragment>
);

export default React.memo(Background);
