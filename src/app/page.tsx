import Hero from "@/components/Hero/Hero";
import purplesCircles from "../../public/img/purpulesCircles.webp";
import Image from "next/image";
import AdvantagesCards from "@/components/AdvantagesCards/AdvantagesCards";
import MainValuesCards from "@/components/MainValuesCards/MainValuesCards";
import Testimonials from "@/components/Testimonials/Testimonials";

export default function Home() {
  return (
    <div>
      <section className="sectionHero">
        <Hero />
      </section>

      <section className="sectionAdvantages">
        <AdvantagesCards />
      </section>

      <section className="sectionMainValues">
        <MainValuesCards />
        <Image
          className="backgroundCirclesImage"
          src={purplesCircles}
          alt="background design image"
        />
      </section>

      <section className="sectionTestimonials">
        <Testimonials />
      </section>
    </div>
  );
}
