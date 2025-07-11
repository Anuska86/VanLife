import React from "react";
import "../styles/Income.css";
import { getTransactions } from "../../../apiFirebase";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Income() {
  const [transactions, setTransactions] = React.useState([]);
  const [error, setError] = React.useState(null);

  /*
  const transactionsData = [
    { amount: 720, date: "Jan 3, '23", id: "1" },
    { amount: 560, date: "Dec 12, '22", id: "2" },
    { amount: 980, date: "Dec 3, '22", id: "3" },
  ];

  */

  const totalIncome = transactions.reduce((sum, item) => sum + item.amount, 0);

  React.useEffect(() => {
    async function loadTransactions() {
      try {
        const data = await getTransactions();
        setTransactions(data);
      } catch (error) {
        setError(error);
      }
    }
    loadTransactions();
  }, []);

  if (error)
    return (
      <h2 style={{ color: "red" }} aria-live="assertive">
        Ups!Error loading transactions details... {error.message}
      </h2>
    );

  return (
    <section className="host-income">
      <h1>Income</h1>
      <p>
        Last <span>30 days</span>
      </p>
      <h2>${totalIncome.toLocaleString()}</h2>
      <div className="income-graph">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={transactions}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="amount" stroke="#ca7842" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="info-header">
        <h3>Your transactions ({transactions.length})</h3>
        <p>
          Last <span>30 days</span>
        </p>
      </div>
      <div className="transactions">
        {transactions.map((item) => {
          const formattedDate = new Date(
            item.date.replace(/'(\d{2})/, "20$1")
          ).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          });

          return (
            <div key={item.id} className="transaction">
              <div className="transaction-info">
                <h3>Amount: {item.amount.toLocaleString()} €</h3>
                <p>Date of transaction: {formattedDate}</p>
              </div>
              <p className="transaction-id">Transaction id: 
                {" "}
                #
                {new Date(
                  item.date.replace(/'(\d{2})/, "20$1")
                ).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
                -{item.amount}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
