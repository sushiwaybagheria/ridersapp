// MezzoIcon.js
import React from "react";
import {
  FaCarSide,
  FaTruckPickup,
  FaBicycle,
  FaTruckMonster,
} from "react-icons/fa";

const MezzoIcon = ({ tipo }) => {
  const iconStyle = { fontSize: "1.8rem" };
  const imgStyle = { width: "32px", height: "32px" }; // Puoi regolare la dimensione qui

  switch (tipo) {
    case "AUTO":
      return <FaCarSide title="Auto" style={iconStyle} />;
    case "MINICAR":
      return <FaTruckPickup title="Minicar" style={iconStyle} />;
    case "MOTO":
      return (
        <img
          src="/icons/scooter.svg"
          alt="Scooter"
          title="Scooter"
          style={imgStyle}
        />
      );
    case "BICI":
      return <FaBicycle title="Bici" style={iconStyle} />;
    case "ALTRO":
    default:
      return <FaTruckMonster title="Altro" style={iconStyle} />;
  }
};

export default MezzoIcon;
