import React, { useDeferredValue } from "react";
import { Link } from "react-router-dom";

export default function Vans() {
  const [vans, setVans] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(function () {
    fetch("/api/vans")
      .then((response) => response.json())
      .then((data) => {
        setVans(data.vans);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>Error loading vans</h2>;

  return (
    <div className="vans-page-container">
      <h1>Our Vans 🚐</h1>
      <div className="vans-list">
        {vans.map((van) => (
          <div key={van.id} className="van-type">
            <img src={van.imageUrl} alt={van.name} />
            <h3>{van.name}</h3>
            <p>${van.price}/day</p>
            <Link to={`/vans/${van.id}`}>View</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
