import React from 'react'
import classes from './ErrorMessage.module.css'
import { FormattedMessage } from 'react-intl'

export default (props) => (
    <div className={classes.ErrorMessage}>
        <h2>
            <FormattedMessage 
                id="ErrorMessage.title"
                defaultMessage="Something unexpected has happened!"/>
        </h2>
        <p>
            <FormattedMessage
                id="ErrorMessage.error"
                defaultMessage="Error:"/> 
            {props.message}
        </p>
    </div>
)