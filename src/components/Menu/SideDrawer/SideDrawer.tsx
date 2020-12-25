import React from 'react';
import classes from './SideDrawer.module.css';
import Header from '../Header/Header';
import SearchBar from '../SearchBar/SearchBar';
import LinkList from '../LinkList/LinkList';
import Footer from '../Footer/Footer';

/* While the SideBar component is used larger devices,
   this component is used in mobile devices. */

interface Props {
  show: boolean;
  onclick: () => void;
}

const SideDrawer: React.FC<Props> = (props) => {
  const { show, onclick } = props;

  const assignedClasses = [classes.SideDrawer];

  if (show) {
    assignedClasses.push(classes.Show);
  } else {
    assignedClasses.push(classes.Hide);
  }

  return (
    <div className={assignedClasses.join(' ')}>
      <Header />
      <SearchBar />
      <LinkList onclick={onclick} />
      <Footer />
    </div>
  );
};

export default React.memo(SideDrawer);
