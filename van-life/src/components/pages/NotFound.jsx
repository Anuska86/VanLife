import React from "react";
import "./styles/NotFound.css";
import { Link } from "react-router-dom";
import worriedVan from "../../images/worriedVan.png";

export default function NotFound() {
  return (
    <div className="not-found-container">
      <div className="speech-bubble">
        <h1>404. NOT FOUND</h1>
        <h1>Something's wrong here...</h1>
        <h3>Sorry, we can't finde the page you're looking for.</h3>
        <Link className="nf-return-button" to="/">
          Return Home
        </Link>
      </div>
      <img src={worriedVan} alt="Worried Van" className="worried-van-img" />
    </div>
  );
}
