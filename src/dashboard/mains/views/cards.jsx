import React, { useState, useEffect } from "react";
import axios from "axios";

import './cards.css';

const CardManager = () => {
    const [cards, setCards] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [newCard, setNewCard] = useState({ cardNumber: "", cardHolder: "", balance: 0 });
    const [newTransaction, setNewTransaction] = useState({ cardId: "", toCardId: "", amount: 0 });

    useEffect(() => {
        fetchCards();
    }, []);

    const fetchCards = () => {
        axios.get("http://localhost:1972/api/cards")
            .then(response => setCards(response.data))
            .catch(error => console.error("Error fetching cards:", error));
    };

    const addCard = () => {
        axios.post("http://localhost:1972/api/cards/create", newCard)
            .then(response => {
                if (response.data.success) {
                    setCards([...cards, response.data.data]);
                    setNewCard({ cardNumber: "", cardHolder: "", balance: 0 });
                }
            })
            .catch(error => console.error("Error adding card:", error));
    };

    const fetchTransactions = (cardId) => {
        axios.get(`http://localhost:1972/api/transaction/by-card/${cardId}`)
            .then(response => setTransactions(response.data))
            .catch(error => console.error("Error fetching transactions:", error));
    };

    const addTransaction = () => {
        console.log("New Transaction Data:", newTransaction);

        if (!newTransaction.cardId || !newTransaction.toCardId || newTransaction.amount <= 0) {
            console.error("Invalid transaction data!");
            return;
        }

        axios.post(`http://localhost:1972/api/transaction/update/${newTransaction.cardId}/${newTransaction.toCardId}`, {
            amount: newTransaction.amount
        })
            .then(response => {
                console.log("Transaction Response:", response.data);
                if (response.data.success) {
                    fetchTransactions(newTransaction.cardId);
                    setNewTransaction({ cardId: "", toCardId: "", amount: 0 });
                }
            })
            .catch(error => console.error("Error adding transaction:", error));
    };

    return (
        <div className="card-container">
            {/* Card Section */}
            <div className="card-section">
                <h2 className="card-title">Card Management</h2>
                <div className="card-add-form">
                    <input type="text" placeholder="Card Number" value={newCard.cardNumber}
                           onChange={(e) => setNewCard({ ...newCard, cardNumber: e.target.value })} />
                    <input type="text" placeholder="Card Holder" value={newCard.cardHolder}
                           onChange={(e) => setNewCard({ ...newCard, cardHolder: e.target.value })} />
                    <input type="number" placeholder="Balance" value={newCard.balance}
                           onChange={(e) => setNewCard({ ...newCard, balance: parseFloat(e.target.value) })} />
                    <button className="card-add-button" onClick={addCard}>Add Card</button>
                </div>

                <h3 className="card-list-title">Existing Cards</h3>
                <ul className="card-list">
                    {cards.map(card => (
                        <li key={card.id} className="card-item">
                            {card.cardNumber} - {card.cardHolder} - Balance: {card.balance}
                            <button className="card-transaction-button" onClick={() => fetchTransactions(card.id)}>View Transactions</button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Transaction Section */}
            <div className="card-section">
                <h3 className="card-transaction-title">Add Transaction</h3>
                <div className="card-transaction-form">
                    <select value={newTransaction.cardId} onChange={(e) => setNewTransaction({ ...newTransaction, cardId: e.target.value })}>
                        <option value="">Select Card</option>
                        {cards.map(card => <option key={card.id} value={card.id}>{card.cardNumber} - {card.cardHolder}</option>)}
                    </select>
                    <select value={newTransaction.toCardId} onChange={(e) => setNewTransaction({ ...newTransaction, toCardId: e.target.value })}>
                        <option value="">Select Receiver Card</option>
                        {cards.map(card => <option key={card.id} value={card.id}>{card.cardNumber} - {card.cardHolder}</option>)}
                    </select>
                    <input type="number" placeholder="Amount" value={newTransaction.amount}
                           onChange={(e) => setNewTransaction({ ...newTransaction, amount: parseFloat(e.target.value) })} />
                    <button className="card-transaction-button" onClick={addTransaction}>Make Transaction</button>
                </div>

                <h3 className="card-history-title">Transaction History</h3>
                <ul className="card-history-list">
                    {transactions.map(tx => (
                        <li key={tx.id} className="card-history-item">{tx.amount} from {tx.fromCard} to {tx.toCard}</li>
                    ))}
                </ul>
            </div>
        </div>
    );

};

export default CardManager;
