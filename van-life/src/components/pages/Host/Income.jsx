import React from "react";
import "../styles/Income.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// import { getIncomeTransactions } from "../../../api";

export default function Income() {
  const [error, setError] = React.useState(null);

  const transactionsData = [
    { amount: 720, date: "Jan 3, '23", id: "1" },
    { amount: 560, date: "Dec 12, '22", id: "2" },
    { amount: 980, date: "Dec 3, '22", id: "3" },
  ];

  const totalIncome = transactionsData.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  if (error)
    return (
      <h2 style={{ color: "red" }} aria-live="assertive">
        Ups!Error loading Vans Details... {error.message}
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
          <LineChart data={transactionsData}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="amount" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="info-header">
        <h3>Your transactions ({transactionsData.length})</h3>
        <p>
          Last <span>30 days</span>
        </p>
      </div>
      <div className="transactions">
        {transactionsData.map((item) => {
          const formattedDate = new Date(
            item.date.replace("'", "20")
          ).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          });

          return (
            <div key={item.id} className="transaction">
              <div className="transaction-info">
                <h3>${item.amount.toLocaleString()}</h3>
                <p>{formattedDate}</p>
              </div>
              <p className="transaction-id">#Income-{item.id}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
