
import React, { useContext } from 'react'
import LinkItem from './LinkItem/LinkItem';
import classes from './LinkList.module.css';
import { LinkContext } from '../../../link-context';
import Spinner from '../../UI/Spinner/Spinner'
import ErrorMessage from '../../ErrorMessage/ErrorMessage'

export default props => {

    const links = useContext(LinkContext);
    let content = <ErrorMessage message="Can't load the Categories"/>;

    if (links) {
        if (Object.keys(links).length > 3) {
            content = Object.keys(links).map(key =>(
                <LinkItem 
                    key={key}
                    to={key} 
                    text={links[key].text}/>
            ))
        } else {
            content = <Spinner/>
        }
    }

    return (
        <ul className={classes.LinkList} onClick={props.onclick}> 
            { content }
        </ul>
    )
}