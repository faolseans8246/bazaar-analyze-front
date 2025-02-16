import React, { useState } from "react";
import "./calculate.css";

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
        if (!amount.trim() || isNaN(parsedAmount) || parsedAmount <= 0) {
            setError("Iltimos, to'g'ri musbat raqam kiriting!");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`https://bazaar-analyze-c1d62cd1ada0.herokuapp.com/api/calculate/rates?from=${currency1}&to=${currency2}&amount=${parsedAmount}`);
            const data = await response.json();

            console.log("Backenddan kelgan javob:", data);

            if (!data.success) {
                console.error("Xatolik: success false bo'ldi!", data);
                setError("Ma'lumot olishda xatolik yuz berdi!");
                return;
            }

            if (!data.data || !data.data.convertedAmount || !data.data.rate) {
                console.error("Xatolik: Backenddan noto‘g‘ri ma'lumot keldi!", data);
                setError("Natijani olishda muammo yuz berdi!");
                return;
            }

            setResult({
                amount: data.data.convertedAmount.toFixed(2),
                rate: data.data.rate
            });

        } catch (error) {
            console.error("Server yoki tarmoq xatosi:", error);
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
                    <label htmlFor="currency1" className="calculateLabel">Kerakli valyutani tanlang:</label>
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
                    <label htmlFor="currency2" className="calculateLabel">Konvertatsiya qilmoqchi bo'lgan valuta:</label>
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
                </div>

                <div className="calculateFormGroup">
                    <label htmlFor="amount" className="calculateLabel">Qiymat Kiriting:</label>
                    <input
                        type="number"
                        id="amount"
                        className="calculateInput"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        min="0"
                        step="0.01"
                        placeholder="0.00"
                    />
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
                            <i className="fas fa-check-circle"></i>
                            {amount} {currency1} ≈ <span className="highlight">{parseFloat(result.amount).toLocaleString()}</span> {currency2}
                        </h3>
                        <p className="calculateRate">1 {currency1} ≈ {result.rate.toLocaleString()} {currency2}</p>
                    </div>
                )}

                {error && <div className="calculateError"><i className="fas fa-exclamation-circle"></i> {error}</div>}
            </div>
        </div>
    );
}

export default CalculateFunc;
