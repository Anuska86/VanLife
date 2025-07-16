import React from "react";
import "../components/pages/styles/AdminDashboard.css";
import { getHostsData, getVansByHostId } from "../apiFirebase";

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
      <h1>Admin Dashboard</h1>
      <p>Welcome, admin! Here you can manage users, vans, and site settings.</p>
      <h2>Registered Hosts</h2>
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
    </section>
  );
}
