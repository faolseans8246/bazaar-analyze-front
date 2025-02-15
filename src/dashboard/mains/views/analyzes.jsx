import React, { useEffect, useState } from "react";
import "./analyzes.css";
import { Line } from "react-chartjs-2";
import axios from "axios";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const cryptos = ["btc", "eth"];

function AnalyzesFunc() {
    const [cryptoData, setCryptoData] = useState({ btc: [], eth: [] });
    const [updateInterval, setUpdateInterval] = useState(1000);

    useEffect(() => {
        let intervalId;

        const fetchData = async () => {
            try {
                const newData = {};
                for (const crypto of cryptos) {
                    const response = await axios.get(`http://localhost:1972/api/crypt/${crypto}`);

                    console.log(`Response for ${crypto}:`, response.data); // API dan kelayotgan ma'lumotni tekshirish

                    const price = response.data?.data?.[crypto.toUpperCase()];

                    if (price) {
                        const newPoint = { time: new Date().toLocaleTimeString(), price };

                        // Eski ma'lumotlarni saqlab qolib, yangisini qo'shamiz
                        newData[crypto] = [...(cryptoData[crypto] || []), newPoint].slice(-20);
                    } else {
                        console.warn(`Price not found for ${crypto}`);
                    }
                }

                setCryptoData((prevData) => ({
                    btc: newData.btc || prevData.btc,
                    eth: newData.eth || prevData.eth,
                }));

            } catch (error) {
                console.error("Error fetching crypto data:", error);
            }
        };

        fetchData();
        intervalId = setInterval(fetchData, updateInterval);

        return () => clearInterval(intervalId);
    }, [updateInterval]); // `cryptoData` ni dependency-ga qo‘shmadim, aks holda cheksiz render loop bo‘ladi

    return (
        <div className="analyzeContainer">
            <h2>Crypto Prices Chart</h2>

            <label className="analyze-label-part" htmlFor="interval">Update Interval: </label>
            <select
                className="analyze-select-part"
                id="interval"
                value={updateInterval}
                onChange={(e) => setUpdateInterval(Number(e.target.value))}
            >
                <option value="1000">1 sec</option>
                <option value="2000">2 sec</option>
                <option value="5000">5 sec</option>
                <option value="10000">10 sec</option>
                <option value="25000">25 sec</option>
            </select>

            <div className="grid-container">
                {cryptos.map((crypto) => {
                    const data = {
                        labels: cryptoData[crypto]?.length
                            ? cryptoData[crypto].map((item) => item.time).slice(-10)
                            : [],
                        datasets: [
                            {
                                label: `${crypto.toUpperCase()} Price (USD)`,
                                data: cryptoData[crypto]?.length
                                    ? cryptoData[crypto].map((item) => item.price).slice(-10)
                                    : [],
                                borderColor: "rgb(8,238,132)",
                                backgroundColor: "rgba(239,203,9,0.5)",
                                borderWidth: 2,
                                fill: true,
                            },
                        ],
                    };

                    return (
                        <div key={crypto} className="chartWrapper">
                            <h3>{crypto.toUpperCase()} Price Chart</h3>
                            <Line
                                className="analyze-status-line"
                                data={data}
                                options={{
                                    responsive: true,
                                    plugins: { legend: { labels: { color: "#fff" } } },
                                }}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default AnalyzesFunc;
