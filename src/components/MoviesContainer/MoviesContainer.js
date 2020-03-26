import React, { useState, useEffect, useContext } from 'react'
import MovieList from './MovieList/MovieList';
import Spinner from '../UI/Spinner/Spinner'
import axios from 'axios'
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import {injectIntl} from 'react-intl'
import classes from './MoviesContainer.module.css';
import { LinkContext } from '../../link-context';

const MoviesContainer = props => {

    const apiEndpoints = {
        popular: '/movie/popular?api_key=466eefcef086aaa1375e8ecfebc6a345&language={}',
        upcoming: '/movie/upcoming?api_key=466eefcef086aaa1375e8ecfebc6a345&language={}',
        genre: '/discover/movie?api_key=466eefcef086aaa1375e8ecfebc6a345&language={}&with_genres=$',
        search: '/search/movie?api_key=466eefcef086aaa1375e8ecfebc6a345&language={}&include_adult=true&query=$'
    }

    const [ requestState, setRequestState ] = useState({
        movies: null,
        isLoading: true,
        error: false
    })

    const [ currentPathname, setPathname ] = useState();
    const [ page, setPage] = useState();
    
    const navigationLinks = useContext(LinkContext);

    const { intl } = props
    const { params } = props.match
    const { pathname, search } = props.location;

    useEffect(() =>  {

        if (currentPathname !== pathname || page !== search) {

            setRequestState({
                movies: null,
                isLoading: true,
                error: false
            })

            const queryLanguage = intl.formatMessage({
                id: 'languageAPIIdentifider',
                defaultMessage: 'en-US'
            })
    
            let url = apiEndpoints.popular.replace('{}', queryLanguage);
    
            const filter = params.filter;
    
            if (filter) {
                if (filter === 'top-rated') {
                    url = apiEndpoints.topRated.replace('{}', queryLanguage);
                } else if (filter === 'upcoming') {
                    url = apiEndpoints.upcoming.replace('{}', queryLanguage);
                }
            }
    
            const genre = params.genre;
    
            if (genre) {
                const link = navigationLinks[pathname];
                
                if (link) {
                    url = apiEndpoints.genre.replace('{}', queryLanguage).replace('$', link.id);
                } 
            }
    
            const query = params.query;
    
            if (query) {
                url = apiEndpoints.search.replace('{}', queryLanguage)
                    .replace('$', query);
            }

            url += search.replace("?", "&");
            setPage(search)
    
            axios.get(url).then(response => {
              setRequestState({
                movies: response.data.results,
                isLoading: false,
                error: null
              })
    
            })
            .catch(error => {
                setRequestState({
                    error: error,
                    movies: null,
                    loading: false
                })
            })
    
            setPathname(pathname);
        }
        
    }, [intl, params, navigationLinks, apiEndpoints, pathname, currentPathname, page, search])


    let content = null; 

    if (requestState.isLoading) {
        content = <Spinner text="Loading Most Popular Movies"/>
    }

    if (requestState.movies) {
        content = (
            <MovieList 
                movies={requestState.movies}
                intl={props.intl}/>
        )
    }

    if (requestState.error) {
        content = <ErrorMessage message={requestState.error.message}/>
    }

    return (    
        <section className={classes.MoviesContainer}>
            {content}
        </section>
    )    
}

export default injectIntl(MoviesContainer);
