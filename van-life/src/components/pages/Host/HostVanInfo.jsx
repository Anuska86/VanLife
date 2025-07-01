import React from "react";
import { useOutletContext } from "react-router-dom";

export default function HostVanInfo() {
  const { chosenVan } = useOutletContext();

  return (
    <section className="host-van-detail-info">
      <h4>
        <span>Name: {chosenVan.name}</span>
      </h4>
      <h4>
        <span>Type: {chosenVan.type}</span>
      </h4>
      <h4>
        <span>Description: {chosenVan.description}</span>
      </h4>
    </section>
  );
}
