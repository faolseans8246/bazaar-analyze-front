import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './dashboard.css';

import HeaderPage from './header/header';
import BarPage from './bar/bar';
import MainPage from './mains/main';
import FooterPage from './footer/footer';

import LocalStatus from './mains/views/localstatus';
import GlobalStatus from './mains/views/globalstatus';
import ValuteStatus from './mains/views/valutestatus';
import News from './mains/views/news';
import Analytics from './mains/views/analyzes';
import Calculate from './mains/views/calculate';
import Cards from './mains/views/cards';

function DashboardFunc() {
    return (
        <Router>
            <div className="dashboardContainer">
                <div className="dash-header">
                    <HeaderPage />
                </div>
                <div className="dash-bar">
                    <BarPage />
                </div>
                <div className="dash-main">
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/local-status" element={<LocalStatus />} />
                        <Route path="/global-status" element={<GlobalStatus />} />
                        <Route path="/valute-status" element={<ValuteStatus />} />
                        <Route path="/news" element={<News />} />
                        <Route path="/analytics" element={<Analytics />} />
                        <Route path="/calculate" element={<Calculate />} />
                        <Route path="/cards" element={<Cards />} />
                    </Routes>
                </div>
                <div className="dash-footer">
                    <FooterPage />
                </div>
            </div>
        </Router>
    );
}

export default DashboardFunc;
