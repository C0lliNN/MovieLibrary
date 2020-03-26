import React from 'react'
import classes from './Backdrop.module.css'

const Backdrop = props => {

    const asignedClasses = [classes.Backdrop];

    if (props.show) {
        asignedClasses.push(classes.Show)
    } else {
        asignedClasses.push(classes.Hide)
    }

    return (
        <div 
            className={asignedClasses.join(' ')}
            onClick={props.onclick}></div>
    )
}

export default React.memo(Backdrop);