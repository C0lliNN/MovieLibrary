import React, { useContext, useState, useEffect } from 'react'
import classes from './Movie.module.css'
import { withRouter } from 'react-router-dom'
import { LinkContext } from '../../../../link-context'

const Movie = props => {

    const [ genres, setGenres ] = useState([]);

    const notSpecifiedText = props.intl.formatMessage({
        id: 'Movie.notSpecified',
        defaultMessage: 'Not Specified'
    });

    const genresLink = useContext(LinkContext)
    const { genre_ids } = props

    useEffect(() => {

        const newGenres = []

        for (const genre_id of genre_ids) {
            for (const genre in genresLink) {
                if (genresLink[genre].id === genre_id) {
                    newGenres.push(genresLink[genre].text);
                    break;
                }
            }
            if (newGenres.length >= 2) break;
        }

        setGenres(newGenres);
        
    }, [genresLink, genre_ids])

    let content = props.releaseYear ? props.releaseYear : notSpecifiedText;

    if ((props.match.params.filter || props.location.pathname === '/') && genres.length > 0) {
        content = genres.join(', ');
    }

    const noPosterAvailable = props.intl.formatMessage({
        id: 'Movie.noPosterAvailable',
        defaultMessage: 'No Poster Available'
    })

    const image = props.image ? <img src={props.image} alt={`${props.title} Poster`}/> : <h4>{noPosterAvailable}</h4>

    return (
        <article className={classes.Movie} onClick={props.onclick}>
            <h3>{props.title}</h3>
            {image}
            <p>({content})</p>
        </article>
    )
}

export default withRouter(Movie);