/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import classes from './Hamburger.module.css';

interface Props {
  show: boolean,
  onclick: () => void,
}

const Hamburger: React.FC<Props> = (props) => {

  const { show, onclick } = props;

  const assignedClasses = [classes.Hamburger];

  if (show) {
    assignedClasses.push(classes.Show);
  } else {
    assignedClasses.push(classes.Hide);
  }

  return (
    <div className={assignedClasses.join(' ')} onClick={onclick}>
      <div className={classes.Rectangle}></div>
      <div className={classes.Rectangle}></div>
      <div className={classes.Rectangle}></div>
    </div>
  );
};

export default React.memo(Hamburger);
