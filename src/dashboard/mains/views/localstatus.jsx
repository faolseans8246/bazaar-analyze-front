import React, { useState, useEffect } from "react";
import './localstatus.css';

function LocalstatusFunc() {

    const [currencyData, setCurrencyData] = useState([]);

    useEffect(() => {
        const fetchCurrency = async () => {
            try {
                const response = await fetch('http://localhost:1972/api/currency/all');
                const data = await response.json();
                setCurrencyData(data.data); // API javobidan valyutalar ro‘yxatini olish
            } catch (error) {
                console.error(error);
            }
        };

        fetchCurrency();
        const interval = setInterval(fetchCurrency, 1000);
        return () => clearInterval(interval);
    }, []);

    if (!currencyData) return <p>Yuklanish ...</p>;

    return (
        <div className="localStatusContainer">

            {/* kartalar bilan ishlash qismi */}
            <div className="local-status-map-blocks">
                <div className="local-status-map-image-part">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5843751.853333024!2d60.47771572500001!3d42.24908616344702!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b20a5d676b1%3A0xca0a6dad7e841e20!2z0KPQt9Cx0LXQutC40YHRgtCw0L0!5e1!3m2!1sru!2s!4v1739090579404!5m2!1sru!2s"
                        referrerPolicy="no-referrer-when-downgrade">

                    </iframe>
                </div>

                <div className="local-status-country-notes-block">
                    <div className="local-status-country-datas">
                        <div className="local-status-country-data-text">
                            <h3 className="local-status-country-notes-main-text">
                                Uzbekistan
                            </h3>
                        </div>

                        <div className="local-status-country-full-notes">
                            <p className="local-status-counter-note-line">
                                <b className="local-status-weight-letter-note-line">
                                    Counter:
                                </b>
                                <i className="local-status-second-line-text">
                                    Uzbekistan
                                </i>
                            </p>

                            <p className="local-status-counter-note-line">
                                <b className="local-status-weight-letter-note-line">
                                    Capital:
                                </b>
                                <i className="local-status-second-line-text">
                                    Tashkent
                                </i>
                            </p>

                            <p className="local-status-counter-note-line">
                                <b className="local-status-weight-letter-note-line">
                                    Indepondency year:
                                </b>
                                <i className="local-status-second-line-text">
                                    1991
                                </i>
                            </p>

                            <p className="local-status-counter-note-line">
                                <b className="local-status-weight-letter-note-line">
                                    Govarnment:
                                </b>
                                <i className="local-status-second-line-text">
                                    Democratic Republic
                                </i>
                            </p>

                            <p className="local-status-counter-note-line">
                                <b className="local-status-weight-letter-note-line">
                                    Regions number:
                                </b>
                                <i className="local-status-second-line-text">
                                    12
                                </i>
                            </p>
                        </div>

                    </div>
                </div>
            </div>


            {/* Local dinamik maydonini yartish qismi */}
            <div className="local-status-dinamic-block">

                <h2 className="local-status-title">O‘zbekiston So‘mi</h2>

                <table className="local-status-table" border="0" width="50%" align="center">
                    <thead className="local-status-thead">
                        <tr className="local-status-tr">
                            <th className="local-status-th">Valyuta</th>
                            <th className="local-status-th">Kurs</th>
                            <th className="local-status-th">Trend</th>
                        </tr>
                    </thead>
                    <tbody className="local-status-tbody">
                    {currencyData.map((currency, index) => (
                        <tr key={index} className="local-status-tr">
                            <td className="local-status-td">1 {currency.ccy}</td>
                            <td className="local-status-td">{currency.rate} UZS</td>
                            <td className="local-status-td" style={{ color: currency.trend === "UP" ? "green" : "red" }}>
                                {currency.trend === "UP" ? "🔺 O‘smoqda" : "🔻 Tushmoqda"}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

            </div>

        </div>
    )
}

export default LocalstatusFunc;