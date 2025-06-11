import React from 'react';
import './Sidebar.css';
import dashboardIcon from '../assets/dashboard.png';
import cartIcon from '../assets/cart.png';
import settingsIcon from '../assets/settings.png';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <button className="sidebar-btn">
        <img src={dashboardIcon} alt="Dashboard"/>
      
      </button>
      <button className="sidebar-btn">
        <img src={cartIcon} alt="Cart" />
      </button>
      <button className="sidebar-btn">
        <img src={settingsIcon} alt="Settings" />
      </button>
    </div>
  );
};

export default Sidebar;
