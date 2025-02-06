import React from "react";
import './dashboard.css';

import HeaderPage from './header/header';
import BarPage from './bar/bar';
import MainPage from './mains/main';
import FooterPage from './footer/footer';

function DashboardFunc() {

    return (

        <div className="dashboardContainer">
            <div className="dash-header"><HeaderPage /></div>
            <div className="dash-bar"><BarPage /></div>
            <div className="dash-main"><MainPage /></div>
            <div className="dash-footer"><FooterPage /></div>
        </div>
    )
}

export default DashboardFunc;