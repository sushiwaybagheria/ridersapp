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
  switch (tipo) {
    case "AUTO":
      return <FaCarSide title="Auto" />;
    case "MINICAR":
      return <FaTruckPickup title="Minicar" />;
    case "MOTO":
      return <GiScooter title="Scooter" />;
    case "BICI":
      return <FaBicycle title="Bici" />;
    case "ALTRO":
    default:
      return <FaTruckMonster title="Altro" />;
  }
};

export default MezzoIcon;
