import React from 'react'
import Movie from './Movie/Movie'
import classes from './Movies.module.css'

export default (props) => {

    let movies = null;

    if (props.movies) {
        movies = props.movies.map(movie => {

            const image = movie['poster_path'] ? `http://image.tmdb.org/t/p/w342/${movie['poster_path']}` : null;

            const releaseYear = movie['release_date'] ? movie['release_date'].substring(0, 4) : null;

            return (<Movie 
                key={movie.id}
                id={movie.id}
                title={movie.title} 
                image={image} 
                releaseYear={releaseYear} 
                intl={props.intl}/>)
        })
    }

    const searchByText = props.intl.formatMessage({
        id: 'Movies.searchBy',
        defaultMessage: 'Search By'
    })

    const mostPopularMoviesText = props.intl.formatMessage({
        id: 'Movies.mostPopularMovies',
        defaultMessage: 'Most Popular Movies'
    })

    const sectionTitle = props.query ? searchByText + " " + props.query : mostPopularMoviesText;

    return (
        <div className={classes.Movies}>
            <h2>{sectionTitle}</h2><br/>
            <div>{movies}</div>
        </div>
    )
}