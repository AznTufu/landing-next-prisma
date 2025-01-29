import React from "react";
import AdvantageCard from "../AdvantageCard/AdvantageCard";
import "./AdvantagesCards.css";

function AdvantagesCards() {
  return (
    <div className="advantagesCards">
      <AdvantageCard
        title="Web Development Services"
        items={[
          "Custom Website Development",
          "E-commerce Solutions",
          "Responsive Design",
          "CMS Integration",
          "Website Maintenance",
        ]}
        color="blue"
      />
      <AdvantageCard
        title="Our Guarantees"
        items={[
          "Fast Turnaround Time",
          "24/7 Technical Support",
          "SEO Optimization",
          "Mobile-First Approach",
          "Quality Driven Development",
        ]}
      />
    </div>
  );
}

export default AdvantagesCards;
