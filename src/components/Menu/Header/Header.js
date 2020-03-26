import React from 'react'
import classes from './Header.module.css'
import { FormattedMessage } from 'react-intl'
import movieIcon from '../../../assets/img/movie-icon.png'
import { Link } from 'react-router-dom'

const Header = () => (
    <header className={classes.Header}>
        <Link to="/">
            <img src={movieIcon} alt="Movie Library Icon"/>
            <h1 className={classes.Title}>
            <FormattedMessage
                id="Header.title"
                defaultMessage="Movie Library"/>
            </h1>
        </Link>
        
        
    </header>
)

export default React.memo(Header);