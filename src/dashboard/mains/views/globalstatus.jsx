import React, { useState, useEffect } from "react";
import './globalstatus.css';

function GlobalstatusFunc() {
    const [globalCurrency, setGlobalCurrency] = useState([]);

    useEffect(() => {
        const fetchCurrency = async () => {
            try {
                const response = await fetch('http://localhost:1972/api/currency/global');
                const data = await response.json();
                setGlobalCurrency(data.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchCurrency();
        const interval = setInterval(fetchCurrency, 10000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="globalStatusContainer">
            <div className="global-status-trade-table-block">
                <table className="global-status-trade-table">
                    <thead>
                    <tr className="global-status-main-rows-part">
                        <th className="global-status-th-row">№</th>
                        <th className="global-status-th-row">Logo</th>
                        <th className="global-status-th-row">Mahsulot nomi</th>
                        <th className="global-status-th-row">Mahsulot narxi ($)</th>
                        <th className="global-status-th-row">Trade</th>
                    </tr>
                    </thead>

                    <tbody>
                    {globalCurrency.length > 0 ? (
                        globalCurrency.map((item, index) => (
                            <tr key={index} className="global-status-row-notes">
                                <td className="global-status-value-table-td">{index + 1}</td>
                                <td className="global-status-value-table-td">
                                    <img
                                        src={item.logoUrl}
                                        width="30"
                                        height="30"
                                        alt={item.name}
                                        className="global-status-trade-logo"
                                    />
                                </td>
                                <td className="global-status-value-table-td">{item.name}</td>
                                <td className="global-status-value-table-td">${item.values.toFixed(2)}</td>
                                <td className="global-status-value-table-td">
                                    <a href="#" className="global-status-value-link-trade">Trade</a>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr className="global-status-trade-else-part">
                            <td colSpan="5">Ma'lumot yuklanmoqda...</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default GlobalstatusFunc;
