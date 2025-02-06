import React, {useState, useEffect} from "react";
import './header.css';

import AvatarMain from '../../images/avatar_main.jpg';

import { FaSearch } from "react-icons/fa";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { LuMessageSquareText } from "react-icons/lu";


function HeaderFunc() {

    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(
            () => {
                setTime(new Date());
            }, 1000
        );

        return () => clearInterval(interval);
    }, []);

    return (

        <div className="headerContainer">

            {/* time zone bilan ishlash qismi */}
            <div className="header-time-date">
                <div className="header-time-part">
                    {time.toLocaleTimeString()}
                </div>

                <div className="header-date-part">
                    {time.toLocaleDateString().slice(0, 10)}
                </div>
            </div>

            {/* Qidiruv qismini shakllantirish */}
            <div className="header-search-block">
                <div className="header-search-frame">
                    <input type="text" className="header-search-input" placeholder="Search ..."/>
                    <FaSearch className="header-search-icon" />
                </div>
            </div>

            {/* Admin panel qismi bilan ishlash */}
            <div className="header-admin-panel-block">

                {/* Bildirishnomalar bilan ishlash qismi */}
                <div className="header-notifications-block">
                    <button className="header-notification-bell-button">
                        <MdOutlineNotificationsActive className="header-notifications-bell-icon" />
                    </button>

                    <button className="header-notifications-message-button">
                        <LuMessageSquareText className="header-notifications-message-icon" />
                    </button>
                </div>

                {/* Avatar bilan ishlash qismi */}
                <div className="header-avatar-blocks">
                    <button className="header-avatar-image-button">
                        <img src={ AvatarMain } alt="" className="header-avatar-image"/>
                    </button>
                </div>
            </div>

        </div>
    )
}

export default HeaderFunc;