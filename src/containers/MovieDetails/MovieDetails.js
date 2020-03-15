import React, { useState, useEffect } from 'react'
import Spinner from '../../components/Spinner/Spinner';
import axios from 'axios';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import MovieInformation from '../../components/MovieInformation/MovieInformation'
import {injectIntl} from 'react-intl'

const MovieDetails = props => {

    const [ requestState, setRequestState ] = useState({
        isLoading: true,
        movie: null,
        error: null
    })

    useEffect(() => {
        const queryLanguage = props.intl.formatMessage({
            id: 'languageAPIIdentifider',
            defaultMessage: 'en-US'
        })

        axios.get(`/movie/${props.match.params.id }?api_key=466eefcef086aaa1375e8ecfebc6a345&language=${queryLanguage}`)
        .then(response => {
            setRequestState({
                isLoading: false,
                movie: response.data,
                error: null
            })
        })
        .catch(error => {
            setRequestState({
                isLoading: false,
                movie: null,
                error: error
            }) 
        })
    })

    let content = null;

    if (requestState.isLoading) {
        content = <Spinner text="Loading Movie Information..."/>
    }

    if (requestState.movie) {
        content = <MovieInformation movie={requestState.movie} />
    }

    if (requestState.error) {
        content = <ErrorMessage/>
    }

    return (
        <section>
            {content}
        </section>
    )
    

}

export default injectIntl(MovieDetails);