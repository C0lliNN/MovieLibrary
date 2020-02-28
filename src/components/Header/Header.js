import React from 'react'
import classes from './Header.module.css'
import {Link} from 'react-router-dom'
import { FormattedMessage } from 'react-intl'

export default () => (
    <header className={classes.Header}>
        <Link to="/">
            <h1 className={classes.Title}>
            <FormattedMessage
                id="Header.title"
                defaultMessage="Movie Library"/>
            </h1>
        </Link>
        
    </header>
)