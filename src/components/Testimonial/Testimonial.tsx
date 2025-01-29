import React from "react";
import { FaQuoteLeft } from "react-icons/fa";
import "./Testimonial.css";

interface TestimonialProps {
  description: string;
  name: string;
  role: string;
}

function Testimonial({ description, name, role }: TestimonialProps) {
  return (
    <div className="testimonial">
      <FaQuoteLeft className="quoteIcon" />
      <p className="testimonialDescription">{description}</p>
      <div className="testimonialInfo">
        <p className="testimonialName">{name}</p>
        <p className="testimonialRole">{role}</p>
      </div>
    </div>
  );
}

export default Testimonial;
