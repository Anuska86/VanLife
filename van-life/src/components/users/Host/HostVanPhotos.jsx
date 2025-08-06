import React from "react";
import { useOutletContext } from "react-router-dom";

export default function HostVanPhotos() {
  const { chosenVan } = useOutletContext();

  return (
    <div>
      <img
        src={chosenVan.imageUrl}
        alt={chosenVan.name}
        className="host-van-detail-image"
      />
    </div>
  );
}
