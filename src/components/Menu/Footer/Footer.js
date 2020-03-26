import React from 'react'
import classes from './Footer.module.css'

const Footer = () => (
    <footer className={classes.Footer}>
        <h3>Raphael Collin <br/>&copy; {new Date().getFullYear()}</h3>
    </footer>
)

export default React.memo(Footer);