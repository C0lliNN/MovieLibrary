import React, { useState, useEffect } from 'react'
import SearchBar from '../../components/SearchBar/SearchBar'
import Spinner from '../../components/Spinner/Spinner'
import Movies from '../../components/Movies/Movies';
import axios from 'axios'
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import {injectIntl} from 'react-intl'

const MovieSearch = props => {

    console.log(props)

    const [ requestState, setRequestState ] = useState({
        movies: null,
        isLoading: true,
        error: false
    })

    const [ searchFieldValue, setSearchFieldValue ] = useState('')
    const [ queryString, setQueryString ] = useState('')

    
    const onValueChangeHandler = (event) => {
        setSearchFieldValue(event.target.value)
    }

    const onSearchSubmitHandler = (event) => {
        event.preventDefault();

        if (searchFieldValue.trim() === '') {
            
            props.history.push('/');

        } else {

            setRequestState({
                isLoading: true,
                error: null,
                movies: null,
            })

            props.history.push('?query=' + encodeURI(this.state.searchFieldValue));
       
        }
    }

    const { intl } = props

    useEffect(() =>  {

        const queryLanguage = intl.formatMessage({
            id: 'languageAPIIdentifider',
            defaultMessage: 'en-US'
        })

        axios.get(`/movie/popular?api_key=466eefcef086aaa1375e8ecfebc6a345&language=${queryLanguage}&page=1`).then(response => {

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
    }, [intl])

    const { location } = props

    useEffect(() => {
        
        const queryLanguage = intl.formatMessage({
            id: 'languageAPIIdentifider',
            defaultMessage: 'en-US'
        })

        const url = location.search ? `/search/movie?api_key=466eefcef086aaa1375e8ecfebc6a345&language=${queryLanguage}&page=1&include_adult=true&query=${location.search}` : `/movie/popular?api_key=466eefcef086aaa1375e8ecfebc6a345&language=${queryLanguage}&page=1`;

        axios.get(url).then(response => {
            setRequestState({
                movies: response.data.results,
                loading: false,
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

        setQueryString(location.search)
        
    }, [location, intl])
    

    let content = null; 

    if (requestState.isLoading) {
        content = <Spinner text="Loading Most Popular Movies"/>
    }

    if (requestState.movies) {
        content = <Movies 
            movies={requestState.movies} 
            query={queryString}
            intl={props.intl}/>
    }

    if (requestState.error) {
        content = <ErrorMessage message={requestState.error.message}/>
    }

    return (
        
        <section>
            <SearchBar 
                value={searchFieldValue}
                onValueChange={onValueChangeHandler}
                onSearchSubmit={onSearchSubmitHandler}
                intl={props.intl}
            />
            {content}
        </section>
    )    

}

export default injectIntl(MovieSearch);
