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

  if (loading)
    return (
      <h2 style={{ color: "brown" }} aria-live="polite">
        Loading...
      </h2>
    );
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
          <div className="host-card-list">
            {hosts.map((host) => (
              <div key={host.id} className="host-card">
                <h3>{host.alias || host.email}</h3>
                <p>{host.email}</p>
                <p>
                  <strong>Role:</strong> {host.role}
                </p>
                <p>
                  <strong>Status:</strong> {host.status || "active"}
                </p>
                <div className="host-vans">
                  <h4>Vans:</h4>
                  {vansByHost[host.id]?.length > 0 ? (
                    <ul>
                      {vansByHost[host.id].map((van) => (
                        <li key={van.id}>
                          🚐 <strong>{van.name}</strong> — ${van.price}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No vans</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="admin-dashboard-add-user">
          <AddUserForm />
        </div>
      </div>
    </section>
  );
}
