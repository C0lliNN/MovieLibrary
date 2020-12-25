import React from 'react';
import LinkList from '../LinkList/LinkList';
import classes from './SideBar.module.css';
import SearchBar from '../SearchBar/SearchBar';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

/* While the SideDrawer component is used in mobile devices,
   this component is used in larger devices. */

interface Props {
  onclick: () => void;
}

const SideBar: React.FC<Props> = ({ onclick }) => (
  <div className={classes.SideBar}>
    <Header />
    <SearchBar />
    <LinkList onclick={onclick} />
    <Footer />
  </div>
);

export default React.memo(SideBar);
