import React from "react";
import { useOutletContext } from "react-router-dom";

export default function HostVanPricing() {
  const { chosenVan } = useOutletContext();

  return (
    <div>
      <h3 className="host-van-price">
        <span>Price: {chosenVan.price}€/day </span>
      </h3>
    </div>
  );
}
