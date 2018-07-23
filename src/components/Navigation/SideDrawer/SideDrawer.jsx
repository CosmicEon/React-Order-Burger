import React from 'react';
import Logo from '../../Logo/Logo';
import Backdrop from '../../UI/Backdrop/Backdrop';
import NavigationItems from '../NavigationItems/NavigationItems';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import './SideDrawer.css';

const sideDrawer = (props) => {
  let attachedClasses = [];
  if (props.open) {
    attachedClasses = ['SideDrawer', 'Open'];
  } else {
    attachedClasses = ['SideDrawer', 'Close'];
  }

  return (
    <Auxiliary>
      <Backdrop
        show={props.open}
        closeBackdrop={props.closed}
      />
      <div className={attachedClasses.join(' ')}>
        <div className="LogoWrapper">
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Auxiliary>
  );
};

export default sideDrawer;
