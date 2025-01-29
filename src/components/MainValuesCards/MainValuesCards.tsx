import React from "react";
import "./MainValuesCards.css";

import MainValueCard from "../MainValueCard/MainValueCard";

function MainValuesCards() {
  return (
    <div className="mainValuesCards">
      <MainValueCard label="Project Done" value="50+" />
      <MainValueCard label="Client Satisfaction" value="4.8/5" />
      <MainValueCard label="Online Traffic" value="+250%" />
    </div>
  );
}

export default MainValuesCards;
