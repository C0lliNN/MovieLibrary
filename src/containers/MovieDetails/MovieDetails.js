import React, { Component } from 'react'
import Spinner from '../../components/Spinner/Spinner';
import axios from 'axios';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import MovieInformation from '../../components/MovieInformation/MovieInformation'
import {injectIntl} from 'react-intl'

class MovieDetails extends Component {

    state = {
        loading: true,
        movie: null,
        error: null
    }

    render() {

        let content = null;

        if (this.state.loading) {
            content = <Spinner text="Loading Movie Information..."/>
        }

        if (this.state.movie) {
            content = <MovieInformation movie={this.state.movie} />
        }

        if (this.state.error) {
            content = <ErrorMessage/>
        }

        return (
            <section>
                {content}
            </section>
        )
    }

    componentDidMount () {

        const queryLanguage = this.props.intl.formatMessage({
            id: 'languageAPIIdentifider',
            defaultMessage: 'en-US'
        })

        axios.get(`/movie/${this.props.match.params.id }?api_key=466eefcef086aaa1375e8ecfebc6a345&language=${queryLanguage}`)
        .then(response => {
            this.setState({
                loading: false,
                movie: response.data,
                error: null
            })
        })
        .catch(error => {
            this.setState({
                loading: false,
                movie: null,
                error: error
            })
        })
    }

}

export default injectIntl(MovieDetails);