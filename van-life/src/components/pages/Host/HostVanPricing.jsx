import React from "react";
import { useOutletContext } from "react-router-dom";

export default function HostVanPricing() {
  const van = useOutletContext();

  return (
    <div>
      <h1>Host Van Pricing here</h1>
      <p>Price: {van.price}€/day </p>
    </div>
  );
}
