import React from 'react'
import classes from './Spinner.module.css'

export default (props) => (
    <div className={classes.Spinner}>{props.text}</div>
)