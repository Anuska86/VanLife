import React from "react";
import "../components/pages/styles/AdminDashboard.css";
import { getHostsData, getVansByHostId } from "../apiFirebase";
import AddUserForm from "./users/AddUser";

export default function AdminDashboard() {
  const [hosts, setHosts] = React.useState([]);
  const [vansByHost, setVansByHost] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    async function fetchHostsAndVans() {
      try {
        const hostsData = await getHostsData();
        setHosts(hostsData);
        const vansData = {};
        for (const host of hostsData) {
          vansData[host.id] = await getVansByHostId(host.id);
        }
        setVansByHost(vansData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    fetchHostsAndVans();
  }, []);

  if (loading) return <p>Loading hosts...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error.message}</p>;

  return (
    <section className="admin-dashboard">
      <div className="admin-dashboard-header">
        <h1>Admin Dashboard</h1>
        <p>
          Welcome, admin! Here you can manage users, vans, and site settings.
        </p>
      </div>
      <div className="admin-dashboard-wrapper">
        <div>
          <h2 className="admin-dashboard-title">Registered Hosts</h2>
        </div>
        <div className="admin-dasboard-host-list">
          <ul>
            {hosts.map((host) => (
              <li key={host.id}>
                <strong>{host.alias || host.email}</strong>
                {host.email && <> - {host.email}</>}
                <ul>
                  {vansByHost[host.id]?.length > 0 ? (
                    vansByHost[host.id].map((van) => (
                      <li key={van.id}>
                        {van.name} (${van.price})
                      </li>
                    ))
                  ) : (
                    <li>No vans</li>
                  )}
                </ul>
              </li>
            ))}
          </ul>
        </div>

        <div className="admin-dashboard-add-user">
          <h2 className="admin-dashboard-title"></h2>
          <AddUserForm />
        </div>
      </div>
    </section>
  );
}
