import React from "react";
import { useOutletContext } from "react-router-dom";

export default function HostVanPhotos() {
  const van = useOutletContext();

  return (
    <div>
      <h1>Host Van Photos</h1>
      <img src={van.imageUrl} alt={van.name} style={{ maxWidth: "300px" }} />
    </div>
  );
}
