import React from "react";
import './bar.css';

import { Link } from 'react-router-dom';

import { RiShoppingBasketLine } from "react-icons/ri";
import { SlBasket } from "react-icons/sl";
import { BsCashCoin } from "react-icons/bs";
import { PiNewspaperClippingDuotone } from "react-icons/pi";
import { FaStrava } from "react-icons/fa";
import { MdCalculate } from "react-icons/md";
import { FaRegCreditCard } from "react-icons/fa6";

function BarFunc() {
    return (
        <div className="barContainer">
            <div className="bar-bazaar-statuses">
                <ul className="bar-bazaar-list-block">
                    <li className="bar-bazaar-status">
                        <Link to="/local-status">
                            <div className="bar-bazaar-line-icons">
                                <RiShoppingBasketLine />
                            </div>
                            <div className="bar-bazaar-line-text">
                                Local status
                            </div>
                        </Link>
                    </li>

                    <li className="bar-bazaar-status">
                        <Link to="/global-status">
                            <div className="bar-bazaar-line-icons">
                                <SlBasket />
                            </div>
                            <div className="bar-bazaar-line-text">
                                Global status
                            </div>
                        </Link>
                    </li>

                    <li className="bar-bazaar-status">
                        <Link to="/valute-status">
                            <div className="bar-bazaar-line-icons">
                                <BsCashCoin />
                            </div>
                            <div className="bar-bazaar-line-text">
                                Valute status
                            </div>
                        </Link>
                    </li>

                    <li className="bar-bazaar-status">
                        <Link to="/news">
                            <div className="bar-bazaar-line-icons">
                                <PiNewspaperClippingDuotone />
                            </div>
                            <div className="bar-bazaar-line-text">
                                News
                            </div>
                        </Link>
                    </li>

                    <li className="bar-bazaar-status">
                        <Link to="/analytics">
                            <div className="bar-bazaar-line-icons">
                                <FaStrava />
                            </div>
                            <div className="bar-bazaar-line-text">
                                Analytics
                            </div>
                        </Link>
                    </li>

                    <li className="bar-bazaar-status">
                        <Link to="/calculate">
                            <div className="bar-bazaar-line-icons">
                                <MdCalculate />
                            </div>
                            <div className="bar-bazaar-line-text">
                                Calculate
                            </div>
                        </Link>
                    </li>

                    <li className="bar-bazaar-status">
                        <Link to="/cards">
                            <div className="bar-bazaar-line-icons">
                                <FaRegCreditCard />
                            </div>
                            <div className="bar-bazaar-line-text">
                                Cards
                            </div>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default BarFunc;
