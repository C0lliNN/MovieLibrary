import React, { Component } from 'react'
import SearchBar from '../../components/SearchBar/SearchBar'
import Spinner from '../../components/Spinner/Spinner'
import Movies from '../../components/Movies/Movies';
import axios from 'axios'
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import {injectIntl} from 'react-intl'

class MovieSearch extends Component {

    state = {
        movies: null,
        loading: true,
        error: false,
        searchFieldValue: '',
        queryString: ''
    }

    onValueChangeHandler = (event) => {
        this.setState({
            searchFieldValue: event.target.value
        })
    }

    onSearchSubmitHandler = (event) => {
        event.preventDefault();

        if (this.state.searchFieldValue.trim() === '') {
            
            this.props.history.push('/');

        } else {

            this.setState({
                loading: true,
                error: null,
                movies: null,
            })

            this.props.history.push('?query=' + encodeURI(this.state.searchFieldValue));
       
        }
    }

    render() {

        let content = null; 

        if (this.state.loading) {
            content = <Spinner text="Loading Most Popular Movies"/>
        }

        if (this.state.movies) {
            content = <Movies 
                movies={this.state.movies} 
                query={this.state.queryString}
                intl={this.props.intl}/>
        }

        if (this.state.error) {
            content = <ErrorMessage message={this.state.error.message}/>
        }

        return (
            
            <section>
                <SearchBar 
                    value={this.state.searchFieldValue}
                    onValueChange={this.onValueChangeHandler}
                    onSearchSubmit={this.onSearchSubmitHandler}
                    intl={this.props.intl}
                />
                {content}
            </section>
        )
    }


    componentDidMount() {

        const queryLanguage = this.props.intl.formatMessage({
            id: 'languageAPIIdentifider',
            defaultMessage: 'en-US'
        })

        axios.get(`/movie/popular?api_key=466eefcef086aaa1375e8ecfebc6a345&language=${queryLanguage}&page=1`).then(response => {

          this.setState({
            movies: response.data.results,
            loading: false,
            error: null
          })

        })
        .catch(error => {
            this.setState({
                error: error,
                movies: null,
                loading: false
            })
        })
    }

    static getDerivedStateFromProps(props, state) {
    
        const queryString = new URLSearchParams(props.location.search).get('query')

        if (state.queryString !== queryString) {
            return {
                queryString: queryString
            }
        }

        return null;

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.queryString !== this.state.queryString) {

            const queryLanguage = this.props.intl.formatMessage({
                id: 'languageAPIIdentifider',
                defaultMessage: 'en-US'
            })

            const url = this.state.queryString ? `/search/movie?api_key=466eefcef086aaa1375e8ecfebc6a345&language=${queryLanguage}&page=1&include_adult=true&query=${this.state.queryString}` : `/movie/popular?api_key=466eefcef086aaa1375e8ecfebc6a345&language=${queryLanguage}&page=1`;

            axios.get(url).then(response => {
                this.setState({
                  movies: response.data.results,
                  loading: false,
                  error: null
                })
      
            })
            .catch(error => {
                this.setState({
                    error: error,
                    movies: null,
                    loading: false
                })
            })
        }
    }

    

}

export default injectIntl(MovieSearch);
