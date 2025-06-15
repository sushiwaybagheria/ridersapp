// MezzoIcon.js
import React from "react";
import { GiScooter } from "react-icons/gi";
import {
  FaCarSide,
  FaTruckPickup,
  FaBicycle,
  FaTruckMonster,
} from "react-icons/fa";

const MezzoIcon = ({ tipo }) => {
  const iconStyle = { fontSize: "1.8rem" }; // 👈 puoi anche provare 2rem o 2.2rem

  switch (tipo) {
    case "AUTO":
      return <FaCarSide title="Auto" style={iconStyle} />;
    case "MINICAR":
      return <FaTruckPickup title="Minicar" style={iconStyle} />;
    case "MOTO":
      return <GiScooter title="Scooter" style={iconStyle} />;
    case "BICI":
      return <FaBicycle title="Bici" style={iconStyle} />;
    case "ALTRO":
    default:
      return <FaTruckMonster title="Altro" style={iconStyle} />;
  }
};

export default MezzoIcon;
