import React from 'react'
import classes from './SearchBar.module.css'
import searchIcon from '../../assets/img/search.svg'

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
                <img src={searchIcon} alt="Search"/>
            </button>
        </form>
    );

    
}