import React from "react";
import { Link } from "react-router-dom";
import Scottland from "..//../images/Scottland.png";

export default function Home() {
  return (
    <div className="home-container">
      <img
        src={Scottland}
        className="scottland-image"
        alt="Scottland"
        aria-hidden="true"
      />
      <div className="scottland-overlay"></div>
      <div className="home-content">
        <h1>You got the travel plans, we got the travel vans.</h1>
        <p>
          Add adventure to your life by joining the #vanlife movement. Rent the
          perfect van to make your perfect road trip.
        </p>

        <Link to="vans">Find your van</Link>
      </div>
    </div>
  );
}
