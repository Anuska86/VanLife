import React from "react";
import "../../pages/styles/Dashboard.css";
import { Link } from "react-router-dom";
import { getHostVans, getVans } from "../../../apiFirebase";
import { UserContext } from "../../users/UserContext";

export default function Dashboard() {
  const [vans, setVans] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const { user, userLoading } = React.useContext(UserContext);

  React.useEffect(() => {
    console.log("userLoading:", userLoading, "user:", user);
    if (userLoading) return;
    if (!user || !user.uid || !user.role) {
      console.log("User not ready for fetching vans:", user);
      return;
    }
    const fetchVans = async () => {
      setLoading(true);
      try {
        console.log("FETCH: user.role =", user.role, "| user.uid =", user.uid);
        if (user.role === "admin") {
          const data = await getVans();
          setVans(data);
        } else if (user.role === "host") {
          if (!user.uid) {
            console.error("Host user missing UID:", user);
            setVans([]);
            return;
          }
          console.log("Calling getHostVans with", user.uid);
          const data = await getHostVans(user.uid);
          setVans(data);
        } else {
          console.log("Unknown user.role, not fetching vans:", user.role);
          setVans([]);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchVans();
  }, [user, userLoading]);

  if (userLoading)
    return (
      <h2 style={{ color: "brown" }} aria-live="polite">
        Loading user...
      </h2>
    );
  if (error)
    return (
      <h2 style={{ color: "red" }} aria-live="assertive">
        Ups! There was an error: {error.message}
      </h2>
    );

  function renderVanElements(vans) {
    const hostVansElements = vans.map((van) => (
      <div className="host-van-single" key={van.id}>
        {van.imageUrl && (
          <img
            src={van.imageUrl}
            alt={`Photo of ${van.name || "van"}`}
            width="100"
            height="70"
            loading="lazy"
          />
        )}
        <div className="host-van-info">
          <h3>{van.name || "No name"}</h3>
          <p> {van.price ? `${van.price} €/day` : "No price"} </p>
        </div>
        <Link to={`vans/${van.id}`}>View</Link>
      </div>
    ));

    return <div className="host-vans-list">{hostVansElements}</div>;
  }

  if (error)
    return (
      <h2 style={{ color: "red" }} aria-live="assertive">
        Ups! There was an error: {error.message}
      </h2>
    );

  return (
    <>
      <section className="host-dashboard-earnings">
        <div className="info">
          <h1>Welcome!</h1>
          <h2>
            {user?.alias && user?.role && `Hello, ${user.alias} (${user.role})`}
          </h2>
          <p>
            Income last <span>30 days</span>
          </p>
          <h2>$2,260</h2>
        </div>
        <Link to="income">Details</Link>
      </section>
      <section className="host-dashboard-reviews">
        <h2>Review score</h2>

        <svg
          className="star"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          width="1em"
          height="1em"
          aria-hidden="true"
        >
          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.32-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.63.282.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
        </svg>

        <p>
          <span>5.0</span>/5
        </p>
        <Link to="reviews">Details</Link>
      </section>
      <section className="host-dashboard-vans">
        <div className="top">
          <h2>Your listed vans</h2>
          <Link to="vans">View all</Link>
        </div>
        {loading ? <h1>Loading...</h1> : <>{renderVanElements(vans)}</>}
      </section>
    </>
  );
}
