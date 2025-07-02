import React from "react";
import "../styles/HostVans.css";
import { Link, NavLink } from "react-router-dom";

export default function HostVans() {
  const [vans, setVans] = React.useState([]);

  React.useEffect(() => {
    fetch("/api/host/vans")
      .then((response) => response.json())
      .then((data) => setVans(data.vans));
  }, []);

  const HostVansElements = vans.map((van) => (
    <Link to={van.id} key={van.id} className="host-van-link-wrapper">
      <div className="host-van-single" key={van.id}>
        <img src={van.imageUrl} alt={`Photo of ${van.name}`} />
        <div className="host-van-info">
          <h3>{van.name}</h3>
          <p>{van.price}€ /day</p>
        </div>
      </div>
    </Link>
  ));

  return (
    <section className="host-vans-section">
      <h1 className="host-vans-title">Your Vans</h1>
      <div className="host-vans-list">
        {vans.length > 0 ? (
          <section>{HostVansElements}</section>
        ) : (
          <h2>Loading...</h2>
        )}
      </div>
    </section>
  );
}
