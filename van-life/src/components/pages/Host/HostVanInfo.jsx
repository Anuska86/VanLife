import React from "react";
import { useOutletContext } from "react-router-dom";

export default function HostVanInfo() {
  const van = useOutletContext();

  return (
    <div>
      <h1>Host Van Info here</h1>
      <p>Name: {van.name}</p>
      <p>Type: {van.type}</p>
      <p>Price:{van.price} €/day</p>
    </div>
  );
}
