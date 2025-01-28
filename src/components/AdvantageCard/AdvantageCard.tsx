import React from "react";
import "./AdvantageCard.css";
import { FaCircleCheck } from "react-icons/fa6";

interface AdvantageCardProps {
  title: string;
  items: string[];
  color?: "orange" | "blue";
}

function AdvantageCard({ title, items, color = "orange" }: AdvantageCardProps) {
  const iconColor = color === "orange" ? "#fc6d36" : "#322be1";

  return (
    <div className="advantageCard">
      <div>
        <h4>{title}</h4>
      </div>
      <div>
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              <FaCircleCheck style={{ color: iconColor, marginRight: "8px" }} />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AdvantageCard;
