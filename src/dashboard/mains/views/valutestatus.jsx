import React, { useEffect, useState } from "react";
import './valutestatus.css';

function ValutestatusFunc() {
    const [prices, setPrices] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("https://bazaar-analyze-c1d62cd1ada0.herokuapp.com/api/combinant/metalls")
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setPrices(data.data);
                } else {
                    setError("API javobi muvaffaqiyatsiz!");
                }
                setLoading(false);
            })
            .catch(() => {
                setError("Server bilan bog‘lanishda xatolik yuz berdi!");
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Yuklanmoqda...</div>;
    if (error) return <div>{error}</div>;

    const priceData = [
        { label: "Oltin (Gold)", value: prices.Gold },
        { label: "Kumush (Silver)", value: prices.Silver },
        { label: "Neft (Oil)", value: prices.Oil },
        { label: "Tabiiy Gaz (Gas)", value: prices.Gas },
    ];

    return (
        <div className="valuteStatusContainer">
            <h2 className="tableTitle">Oltin, Kumush va Boshqa Boyliklar Narxi</h2>
            <table className="forexTable">
                <thead>
                <tr>
                    <th className="tableHeader">№</th>
                    <th className="tableHeader">Boylik</th>
                    <th className="tableHeader">Narx (USD)</th>
                </tr>
                </thead>
                <tbody>
                {priceData.map((item, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td><strong>{item.label}:</strong></td>
                        <td>{item.value || "N/A"}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default ValutestatusFunc;
