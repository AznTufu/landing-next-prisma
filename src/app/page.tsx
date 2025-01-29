import Hero from "@/components/Hero/Hero";
import purplesCircles from "../../public/img/purpulesCircles.webp";
import Image from "next/image";
import AdvantagesCards from "@/components/AdvantagesCards/AdvantagesCards";
import MainValuesCards from "@/components/MainValuesCards/MainValuesCards";
import Testimonials from "@/components/Testimonials/Testimonials";
import TeamPresentation from "@/components/TeamPresentation/TeamPresentation";
import UserForm from "@/components/UserFrom/UserForm";

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
        <h2>Testimonials</h2>
        <Testimonials />
      </section>

      <section className="sectionTeamPresentation">
        <h2>Team Presentation</h2>
        <TeamPresentation />
      </section>

      <section className="sectionContact">
        <h2>Contact Us</h2>
        <UserForm />
      </section>
    </div>
  );
}
