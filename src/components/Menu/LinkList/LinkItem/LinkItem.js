
import React from 'react'
import { NavLink } from 'react-router-dom'
import classes from './LinkItem.module.css'

const LinkItem = props => (
    <NavLink 
        className={classes.LinkItem}
        exact
        activeClassName={classes.Active}
        to={encodeURI(props.to)}>{props.text}</NavLink>
)

export default React.memo(LinkItem);