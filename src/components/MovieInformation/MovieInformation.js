import React from 'react'
import classes from './MovieInformation.module.css'
import { FormattedMessage, FormattedDate } from 'react-intl'

export default (props) => {

    const information = []

    if (props.movie['production_companies']) {
        const companies = props.movie['production_companies'].map(company => company.name)

        information.push(
            <p key="companies">
                <span>
                    <FormattedMessage 
                        id="MovieInformation.production"
                        defaultMessage="Production:"/>
                </span>
                &nbsp;
                {companies.join(', ')}
            </p>
        )
    }

    if (props.movie['release_date']) {

        const releaseDate = new Date(props.movie['release_date']);

        

        information.push(
            <p key="releaseDate">
                <span>
                    <FormattedMessage
                        id="MovieInformation.releaseDate"
                        defaultMessage="Release Date:"/>
                    &nbsp;
                </span>
                <FormattedDate
                    value={releaseDate}
                    year="numeric"
                    month="2-digit"
                    day="2-digit"/>
            </p>
        )
    }

    if (props.movie.genres) {
        const genres = props.movie.genres.map(genre => genre.name)
        information.push(
            <p key="genres">
                <span>
                    <FormattedMessage
                        id="MovieInformation.genres" 
                        defaultMessage="Genres:"/>
                    &nbsp;
                </span>
                {genres.join(', ')}
            </p>
        )
    }

    if (props.movie.homepage) {
        information.push(
            <p key="website">
                <span>
                    <FormattedMessage
                        id="MovieInformation.website"
                        defaultMessage="Website:"/>
                    &nbsp;
                </span>
                <a 
                href={props.movie.homepage}
                target="_blank"
                rel="noopener noreferrer">{props.movie.homepage}</a>
            </p>
        )
    }

    if (props.movie.overview) {
        information.push(
            <p key="overview">
                <span>
                    <FormattedMessage
                        id="MovieInformation.overview"
                        defaultMessage="Overview:"/>
                    &nbsp;
                </span>
                {props.movie.overview}
            </p>
        )
    }

    return (
        <article className={classes.MovieInformation}>
            <h2>{props.movie.title}</h2>
            <div>
                <div>
                    <img 
                        src={`http://image.tmdb.org/t/p/w500/${props.movie['poster_path']}`}
                        alt={props.movie.title + " Poster"}/>
                </div>
                <div className={classes.TextInfo}>
                    {information}
                </div>
            </div>
        </article>
    )

    
}