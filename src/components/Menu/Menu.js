import React, { useState, useCallback } from 'react';
import SideDrawer from './SideDrawer/SideDrawer';
import Hamburger from './Hamburguer/Hamburger';
import Backdrop from '../UI/Backdrop/Backdrop';
import Navigation from './SideBar/SideBar';

const Menu = () => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  const showSideDrawerHandler = useCallback(() => {
    setShowSideDrawer(true);
  }, []);

  const hideSideDrawerHandler = useCallback(() => {
    setShowSideDrawer(false);
  }, []);

  return (
    <React.Fragment>
      <SideDrawer show={showSideDrawer} onclick={hideSideDrawerHandler} />
      <Hamburger onclick={showSideDrawerHandler} show={!showSideDrawer} />
      <Backdrop show={showSideDrawer} onclick={hideSideDrawerHandler} />
      <Navigation />
    </React.Fragment>
  );
};

export default React.memo(Menu);
