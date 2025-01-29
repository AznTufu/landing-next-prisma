"use client";

import React from "react";
import "./TeamPresentation.css";
import TonyImage from "../../../public/img/TonyImage.webp";
import RomainImage from "../../../public/img/RomainImage.webp";
import Image from "next/image";

function TeamPresentation() {
  return (
    <div className="teamPresentation">
      <div
        className="teamPresentationMember"
        onClick={() =>
          window.open("https://www.linkedin.com/in/tony-zhang-tufu/")
        }
      >
        <Image
          className="teamPresentationImage"
          src={TonyImage}
          alt="team member image"
        />
        <h3>Tony ZHANG</h3>
        <p>Back-end Developer</p>
      </div>
      <div
        className="teamPresentationMember"
        onClick={() =>
          window.open("https://www.linkedin.com/in/romainparisot-/")
        }
      >
        <Image
          className="teamPresentationImage"
          src={RomainImage}
          alt="team member image"
        />
        <h3>Romain PARISOT</h3>
        <p>Front-end Developer</p>
      </div>
    </div>
  );
}

export default TeamPresentation;
