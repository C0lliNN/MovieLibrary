/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import classes from './Backdrop.module.css';

interface Props {
  onclick: () => void;
}

const Backdrop: React.FC<Props> = (props) => {
  const assignedClasses = [classes.Backdrop];
  const { onclick } = props;

  return <div className={assignedClasses.join(' ')} onClick={onclick}></div>;
};

export default React.memo(Backdrop);
