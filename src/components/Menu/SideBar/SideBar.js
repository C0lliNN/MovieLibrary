import React from 'react'
import LinkList from '../LinkList/LinkList'
import classes from './SideBar.module.css'
import SearchBar from '../SearchBar/SearchBar';
import { injectIntl } from 'react-intl';
import Header from '../Header/Header';
import Footer from '../Footer/Footer'

/* While the SideDrawer component is used in mobile devices,
   this component is used in larger devices. */

const SideBar = props => (
    <div className={classes.SideBar}>
        <Header/>
        <SearchBar 
            intl={props.intl}/>
        <LinkList/>
        <Footer/>
    </div>
);

export default React.memo(injectIntl(SideBar));