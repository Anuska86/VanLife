import React from "react";
import "../styles/HostVansDetails.css";
import { useParams, Link, Outlet } from "react-router-dom";
import HostDetailsNav from "./HostDetailsNav";
import { getVan } from "../../../apiFirebase";

//import { getVan } from "../../../api";
//import { getHostVans } from "../../../api";

export default function HostVansDetails() {
  const [chosenVan, setChosenVan] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const { id } = useParams();

  React.useEffect(() => {
    async function loadVans() {
      setLoading(true);
      try {
        const data = await getVan(id);
        setChosenVan(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    loadVans();
  }, [id]);

  if (loading)
    return (
      <h2 style={{ color: "brown" }} aria-live="polite">
        Loading van data
      </h2>
    );
  if (error)
    return (
      <h2 style={{ color: "red" }} aria-live="assertive">
        Ups!Error loading Vans Details... {error.message}
      </h2>
    );

  return (
    <section>
      <Link to=".." relative="path" className="back-button">
        &larr;<span>Back to all vans</span>
      </Link>
      {chosenVan && (
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
              <Outlet context={{ chosenVan }} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
