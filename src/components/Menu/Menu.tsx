import React, { useState, useCallback } from 'react';
import { useMediaQuery } from '@react-hook/media-query';
import SideDrawer from './SideDrawer/SideDrawer';
import Hamburger from './Hamburguer/Hamburger';
import Backdrop from '../UI/Backdrop/Backdrop';
import SideBar from './SideBar/SideBar';

const Menu: React.FC = () => {
  const matches = useMediaQuery('(min-width: 700px)');
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  const showSideDrawerHandler = useCallback(() => {
    setShowSideDrawer(true);
  }, []);

  const hideSideDrawerHandler = useCallback(() => {
    setShowSideDrawer(false);
  }, []);

  return matches ? (
    <SideBar onclick={showSideDrawerHandler} />
  ) : (
    <>
      <SideDrawer show={showSideDrawer} onclick={hideSideDrawerHandler} />
      <Hamburger onclick={showSideDrawerHandler} show={!showSideDrawer} />
      {showSideDrawer && <Backdrop onclick={hideSideDrawerHandler} />}
    </>
  );
};

export default React.memo(Menu);
