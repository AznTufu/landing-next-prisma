"use client";

import React, { useState, useEffect } from "react";
import Testimonial from "../Testimonial/Testimonial";
import "./Testimonials.css";

const testimonialData = [
  {
    description:
      "Working with this team has been an absolute game-changer for our business. Their attention to detail and innovative approach to web development perfectly captured our brand's essence. The final product exceeded all our expectations.",
    name: "John Smith",
    role: "CEO at TechStart",
  },
  {
    description:
      "From the initial consultation to the final launch, their professionalism was outstanding. They didn't just build a website; they created a powerful digital platform that has significantly improved our online engagement and conversion rates.",
    name: "Sarah Johnson",
    role: "Marketing Director",
  },
  {
    description:
      "The team's technical expertise and creative vision transformed our outdated website into a modern, user-friendly platform. Their responsive design approach ensures our site looks and performs perfectly across all devices.",
    name: "Mike Williams",
    role: "Business Owner",
  },
  {
    description:
      "What impressed me most was their ability to understand our unique needs and translate them into effective solutions. Their collaborative approach made the entire development process smooth and enjoyable.",
    name: "Emily Brown",
    role: "Project Manager",
  },
  {
    description:
      "The level of support and dedication we received was exceptional. They went above and beyond to ensure every aspect of our website was optimized for performance and user experience. Truly a remarkable team.",
    name: "David Chen",
    role: "Startup Founder",
  },
  {
    description:
      "Their innovative approach to web design and development has given us a competitive edge in our industry. The custom solutions they implemented have streamlined our operations and boosted our online presence.",
    name: "Lisa Anderson",
    role: "Art Director",
  },
];

function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    let interval: NodeJS.Timeout;
    const slidesPerView = windowWidth <= 1000 ? 1 : windowWidth <= 1200 ? 2 : 3;

    if (!isPaused) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === testimonialData.length - slidesPerView
            ? 0
            : prevIndex + 1
        );
      }, 3000);
    }

    return () => clearInterval(interval);
  }, [isPaused, windowWidth, isClient]);

  if (!isClient) return null;

  const slideWidth =
    windowWidth <= 1000 ? 100 : windowWidth <= 1200 ? 50 : 33.33;

  return (
    <div
      className="testimonialsContainer"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className="testimonialsSlider"
        style={{
          transform: `translateX(-${currentIndex * slideWidth}%)`,
          transition: "transform 1s ease-in-out",
        }}
      >
        {testimonialData.map((testimonial, index) => (
          <div
            key={index}
            className="testimonialSlide"
            style={{ width: `${slideWidth}%` }}
          >
            <Testimonial
              description={testimonial.description}
              name={testimonial.name}
              role={testimonial.role}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Testimonials;
