import React, { useDeferredValue } from "react";
import "./styles/Vans.css";
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

  const vanElements = vans.map((van) => (
    <div key={van.id} className="van-tile">
      <Link to={`/vans/${van.id}`}>
        <img src={van.imageUrl} alt={van.name} />
        <div className="van-info">
          <h3>{van.name}</h3>
          <p>${van.price}/day</p>
        </div>
        <i className={`van-type ${van.type}selected`}>{van.type}</i>
      </Link>
    </div>
  ));

  return (
    <div className="van-list-container">
      <h1>Choose the van that suits you</h1>
      <div className="van-list">{vanElements}</div>
    </div>
  );
}
