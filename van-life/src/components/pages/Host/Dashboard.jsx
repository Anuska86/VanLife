import React from "react";
import "../../pages/styles/Dashboard.css";
import { Link } from "react-router-dom";
import { getHostVans, getVans } from "../../../apiFirebase";
import { UserContext } from "../../users/UserContext";
import StarIcon from "../../StarIcon";

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
        <StarIcon className="star" />

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
