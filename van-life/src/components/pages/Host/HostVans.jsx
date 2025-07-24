import React from "react";
import "../styles/HostVans.css";
import { Link, NavLink } from "react-router-dom";
import { getHostVans, getVans } from "../../../apiFirebase";
import { UserContext } from "../../users/UserContext";


export default function HostVans() {
  const [vans, setVans] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const { user, userLoading } = React.useContext(UserContext);

  React.useEffect(() => {
    if (userLoading) return;
    if (!user || !user.uid || !user.role) return;

    async function loadVans() {
      setLoading(true);
      try {
        let data;
        if (user.role === "admin") {
          data = await getVans();
        } else if (user.role === "host") {
          data = await getHostVans(user.uid);
        } else {
          data = [];
        }
        setVans(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    loadVans();
  }, [user, userLoading]);

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

  if (loading)
    return (
      <h2 style={{ color: "brown" }} aria-live="polite">
        Loading...
      </h2>
    );
  if (error)
    return (
      <h2 style={{ color: "red" }} aria-live="assertive">
        Ups! There was an error: {error.message}
      </h2>
    );
  return (
    <section className="host-vans-section">
      <h1 className="host-vans-title">Your Vans</h1>
      <div className="host-vans-list">
        {vans.length > 0 ? HostVansElements : <h2>Loading...</h2>}
      </div>
    </section>
  );
}
