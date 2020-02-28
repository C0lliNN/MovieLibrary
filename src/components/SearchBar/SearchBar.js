import React from 'react'
import classes from './SearchBar.module.css'
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default (props) => {

    return(
        <form 
            className={classes.SearchBar}
            onSubmit={props.onSearchSubmit}>
            <input
                required 
                value={props.value}
                onChange={props.onValueChange}
                className={classes.Input}
                placeholder={props.intl.formatMessage({
                    id: 'SearchBar.placeholder',
                    defaultMessage: 'Search a Movie...'
                })}/>
            <button className={classes.Button}>
                <FontAwesomeIcon icon={faSearch} size="3x"/>
            </button>
        </form>
    );

    
}