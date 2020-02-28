import React from 'react'
import classes from './Movie.module.css'
import { Link } from 'react-router-dom'

export default (props) => {

    const notSpecifiedText = props.intl.formatMessage({
        id: 'Movie.notSpecified',
        defaultMessage: 'Not Specified'
    });

    const releaseYear = props.releaseYear ? props.releaseYear : notSpecifiedText;

    const noPosterAvailable = props.intl.formatMessage({
        id: 'Movie.noPosterAvailable',
        defaultMessage: 'No Poster Available'
    })

    const image = props.image ? <img src={props.image} alt={`${props.title} Poster`}/> : <h4>{noPosterAvailable}</h4>

    return (<article className={classes.Movie}>
        <Link to={"/movie/" + props.id}>
            <h3>{props.title}</h3>
            {image}
            <p>({releaseYear})</p>
        </Link>
        
    </article>)
}