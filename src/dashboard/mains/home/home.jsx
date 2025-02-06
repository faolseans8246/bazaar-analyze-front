import React from "react";
import './home.css';

function HomeFunc() {

    return (

        <div className="homeContainer">

            {/* Iqlim ma'lumotlarini kiritish qismi */}
            <div className="home-global-climate-part">
                Climate
            </div>

            {/* Internet tezligini o'lchab beruvchi qism */}
            <div className="home-network-status">
                Network status
            </div>

            {/* Sizning joylashuvingizni ko'rsatib beruvchi */}
            <div className="home-your-location">
                Your location
            </div>

            {/* Dunyo aholisi haqida ma'lumot beruvchi qism */}
            <div className="home-number-of-humans">
                Enumerator
            </div>
        </div>
    )
}

export default HomeFunc;