import React from "react";
import "../styles/HostVansDetails.css";
import { useParams, Link, Outlet } from "react-router-dom";
import HostDetailsNav from "./HostDetailsNav";

export default function HostVansDetails() {
  const params = useParams();
  const [chosenVan, setChosenVan] = React.useState([]);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    fetch(`/api/host/vans/${params.id}`)
      .then((response) => response.json())
      .then((data) => {
        setChosenVan(data.vans);
      })
      .catch((error) => {
        setError(error);
      });
  }),
    [];

  if (error) return <h2>Error loading Van Details</h2>;

  return (
    <section>
      <Link to=".." relative="path" className="back-button">
        &larr;<span>Back to all vans</span>
      </Link>
      <div className="van-details-container">
        <h1>Your Vans Details Here: </h1>
        <div className="van-card">
          <div className="van-info">
            <img src={chosenVan.imageUrl} alt={chosenVan.name} />
            <div className="van-text">
              <h3>Van name: {chosenVan.name}</h3>
              <h3>Van type: {chosenVan.type}</h3>
              <h4>Price: {chosenVan.price} €/day</h4>
            </div>
          </div>
          <div className="details-nav">
            <HostDetailsNav />
            <Outlet context={chosenVan} />
          </div>
        </div>
      </div>
    </section>
  );
}
