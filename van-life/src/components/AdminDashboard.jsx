import React from "react";

export default function AdminDashboard() {
  return (
    <section className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <p>Welcome, admin! Here you can manage users, vans, and site settings.</p>

      {/* You can add links or components here */}
      <ul>
        <li>
          <strong>✔</strong> View all users
        </li>
        <li>
          <strong>✔</strong> Approve van listings
        </li>
        <li>
          <strong>✔</strong> Monitor transactions
        </li>
      </ul>
    </section>
  );
}
