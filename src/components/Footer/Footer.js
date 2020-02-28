import React from 'react'
import classes from './Footer.module.css'

export default () => (
    <footer className={classes.Footer}>
        <h3>Raphael Collin &copy; {new Date().getFullYear()}</h3>
    </footer>
)