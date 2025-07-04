import React from "react";
import "./styles/NotFound.css";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="not-found-container">
      <h1>404. NOT FOUND</h1>
      <h1>Something's wrong here...</h1>
      <h3>Sorry, we can't finde the page you're looking for.</h3>
      <Link className="nf-return-button" to="/">
        Return Home
      </Link>
    </div>
  );
}
