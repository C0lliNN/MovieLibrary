import React from 'react';
import classes from './SideDrawer.module.css';
import Header from '../Header/Header';
import SearchBar from '../SearchBar/SearchBar';
import LinkList from '../LinkList/LinkList';
import Footer from '../Footer/Footer';
import { injectIntl } from 'react-intl';

/* While the SideBar component is used larger devices,
   this component is used in mobile devices. */

const SideDrawer = (props) => {
  const asignedClasses = [classes.SideDrawer];

  if (props.show) {
    asignedClasses.push(classes.Show);
  } else {
    asignedClasses.push(classes.Hide);
  }

  return (
    <div className={asignedClasses.join(' ')}>
      <Header />
      <SearchBar intl={props.intl} />
      <LinkList onclick={props.onclick} />
      <Footer />
    </div>
  );
};

export default React.memo(injectIntl(SideDrawer));
