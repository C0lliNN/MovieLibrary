import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './LinkItem.module.css';

interface Props {
  to: string;
  text?: string | null;
}

const LinkItem: React.FC<Props> = ({ to, text }) => (
  <NavLink
    className={classes.LinkItem}
    exact
    activeClassName={classes.Active}
    to={encodeURI(to)}
  >
    {text}
  </NavLink>
);

export default React.memo(LinkItem);
