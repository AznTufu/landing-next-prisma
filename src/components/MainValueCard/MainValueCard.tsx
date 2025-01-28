import React from "react";
import "./MainValueCard.css";

interface MainValueCardProps {
  value: string;
  label: string;
}

function MainValueCard({
  value = "40+",
  label = "Project Done",
}: MainValueCardProps) {
  return (
    <div className="mainValueCard">
      <h4>{value}</h4>
      <p>{label}</p>
    </div>
  );
}

export default MainValueCard;
