import React from "react";
import "../styles/VanDetail.css";
import { useParams, Link } from "react-router-dom";

export default function VanDetail() {
  const params = useParams();
  const [van, setVan] = React.useState(null);

  React.useEffect(() => {
    fetch(`/api/vans/${params.id}`)
      .then((response) => response.json())
      .then((data) => {
        setVan(data.vans);
      })
      .catch((error) => {
        console.error("Error fetching van details:", error);
      });
  }, [params.id]);

  return (
    <div className="van-detail-container">
      <Link to=".." relative="path" className="back-button">
        &larr;<span>Back to all vans</span>
      </Link>
      {van ? (
        <div className="van-detail">
          <img src={van.imageUrl} />
          <i className={`van-type ${van.type} selected`}>{van.type}</i>
          <h2>{van.name}</h2>
          <p className="van-price">
            <span>${van.price}</span>/day
          </p>
          <p>{van.description}</p>
          <button className="link-button">Rent this van</button>
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
}
