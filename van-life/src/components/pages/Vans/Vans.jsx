import React, { useDeferredValue } from "react";
import "../styles/Vans.css";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { getVans } from "../../../api";

export default function Vans() {
  const [vans, setVans] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const typeFilter = searchParams.get("type");

  const displayedVans = typeFilter
    ? vans.filter((van) => van.type.toLowerCase() === typeFilter)
    : vans;

  React.useEffect(() => {
    async function loadVans() {
      try {
        const data = await getVans();
        setVans(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }
    loadVans();
  }, []);

  if (loading) return <h2 aria-live="polite">Loading...</h2>;
  if (error)
    return (
      <h2 aria-live="assertive">Ups! There was an error: {error.message}</h2>
    );

  const vanElements = displayedVans.map((van) => (
    <div key={van.id} className="van-tile">
      <Link
        to={van.id}
        state={{ search: `?${searchParams.toString()}`, type: typeFilter }}
      >
        <img src={van.imageUrl} alt={van.name} />
        <div className="van-info">
          <h3>{van.name}</h3>
          <p>
            {" "}
            €{van.price}
            <span>/day</span>
          </p>
        </div>
        <i className={`van-type ${van.type} selected`}>{van.type}</i>
      </Link>
    </div>
  ));

  function handleFilterChange(key, value) {
    setSearchParams((prevParams) => {
      if (value === null) {
        prevParams.delete(key);
      } else {
        prevParams.set(key, value);
      }
      return prevParams;
    });
  }

  return (
    <div className="van-list-container">
      <h1>Choose the van that suits you</h1>
      <div className="van-list-filter-buttons">
        <button
          onClick={() => handleFilterChange("type", "simple")}
          className={`van-type simple${
            typeFilter === "simple" ? " selected" : ""
          }`}
        >
          Simple
        </button>
        <button
          onClick={() => handleFilterChange("type", "luxury")}
          className={`van-type luxury${
            typeFilter === "luxury" ? " selected" : ""
          }`}
        >
          Luxury
        </button>
        <button
          onClick={() => handleFilterChange("type", "rugged")}
          className={`van-type rugged${
            typeFilter === "rugged" ? " selected" : ""
          }`}
        >
          Rugged
        </button>
        {typeFilter ? (
          <button
            onClick={() => handleFilterChange("type", null)}
            className="van-type clear-filters"
          >
            Clear all filters
          </button>
        ) : null}
      </div>
      <div className="van-list">{vanElements}</div>
    </div>
  );
}
