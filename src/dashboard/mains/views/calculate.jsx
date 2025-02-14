import React, { useState } from "react";
import './calculate.css';

function CalculateFunc() {
    const [currency1, setCurrency1] = useState("USD");
    const [currency2, setCurrency2] = useState("UZS");
    const [amount, setAmount] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const calculateExchangeRate = async () => {
        setLoading(true);
        setError(null);
        setResult(null);

        const parsedAmount = parseFloat(amount);
        console.log("Amount:", amount);
        console.log("Parsed Amount:", parsedAmount);

        if (!amount.trim() || isNaN(parsedAmount) || parsedAmount <= 0) {
            setError("Iltimos, to'g'ri musbat raqam kiriting!");
            setLoading(false);
            return;
        }

        try {
            console.log("Making API request with:", {
                from: currency1,
                to: currency2,
                amount: parsedAmount
            });

            const response = await fetch(
                `http://localhost:1972/api/calculate/rates?from=${currency1}&to=${currency2}&amount=${parsedAmount}`
            );

            const data = await response.json();
            console.log("API Response:", data);

            if (data.success && data.result) {
                console.log("Qaytarilgan kurs:", data.result);
                const convertedAmount = (parsedAmount * data.result).toFixed(2);
                console.log("Hisoblangan qiymat:", convertedAmount);
                setResult(convertedAmount);
            } else {
                console.error("Kursni olishda xatolik:", data);
                setError(data.message || "Kurs ma'lumotlarini olishda xatolik yuz berdi!");
            }


        } catch (error) {
            console.error("API Error:", error);
            setError("Server bilan bog'lanishda xatolik yuz berdi!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="calculateContainer">
            <h2 className="calculateTitle">Kurs Hisoblash Kalkulyatori</h2>
            <div className="calculateForm">
                <div className="calculateFormGroup">
                    <label htmlFor="currency1" className="calculateLabel">Birinchi Kurs:</label>
                    <select
                        id="currency1"
                        className="calculateSelect"
                        value={currency1}
                        onChange={(e) => setCurrency1(e.target.value)}
                    >
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="GBP">GBP</option>
                        <option value="JPY">JPY</option>
                        <option value="UZS">UZS</option>
                    </select>
                </div>

                <div className="calculateFormGroup">
                    <label htmlFor="currency2" className="calculateLabel">Ikkinchi Kurs:</label>
                    <div style={{ position: "relative" }}>
                        <select
                            id="currency2"
                            className="calculateSelect"
                            value={currency2}
                            onChange={(e) => setCurrency2(e.target.value)}
                        >
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                            <option value="GBP">GBP</option>
                            <option value="JPY">JPY</option>
                            <option value="UZS">UZS</option>
                        </select>
                        <i className="fas fa-exchange-alt"></i>
                    </div>
                </div>

                <div className="calculateFormGroup">
                    <label htmlFor="amount" className="calculateLabel">Qiymat Kiriting:</label>
                    <div style={{ position: "relative" }}>
                        <input
                            type="number"
                            id="amount"
                            className="calculateInput"
                            value={amount}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (value === '' || (!isNaN(value) && parseFloat(value) >= 0)) {
                                    setAmount(value);
                                }
                            }}
                            min="0"
                            step="0.01"
                            placeholder="0.00"
                        />
                        <i className="fas fa-coins"></i>
                    </div>
                </div>

                <button
                    className="calculateButton"
                    onClick={calculateExchangeRate}
                    disabled={loading}
                >
                    {loading ? <i className="fas fa-spinner fa-spin"></i> : "Hisoblash"}
                </button>

                {result && (
                    <div className="calculateResult">
                        <h3 className="calculateResultText">
                            <i className="fas fa-check-circle"></i> Natija: {result} {currency2}
                        </h3>
                    </div>
                )}

                {error && <div className="calculateError"><i className="fas fa-exclamation-circle"></i> {error}</div>}

            </div>
        </div>
    );
}

export default CalculateFunc;
