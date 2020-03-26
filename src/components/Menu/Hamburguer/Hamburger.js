import React from 'react'
import classes from './Hamburger.module.css'

const Hamburger = props => {

    const asignedClasses = [classes.Hamburger];

    if (props.show) {
        asignedClasses.push(classes.Show)
    } else {
        asignedClasses.push(classes.Hide)
    }

    return (
        <div className={asignedClasses.join(' ')} onClick={props.onclick}>
            <div className={classes.Rectangle}></div>
            <div className={classes.Rectangle}></div>
            <div className={classes.Rectangle}></div>
        </div>
    )
}

export default React.memo(Hamburger);
