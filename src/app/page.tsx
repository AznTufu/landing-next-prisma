<<<<<<< HEAD
import UserForm from '@/app/components/userForm';

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create User</h1>
      <UserForm />
=======
import Hero from "@/components/Hero/Hero";
import purplesCircles from "../../public/img/purpulesCircles.webp";
import Image from "next/image";
import AdvantagesCards from "@/components/AdvantagesCards/AdvantagesCards";
import MainValuesCards from "@/components/MainValuesCards/MainValuesCards";
import Testimonials from "@/components/Testimonials/Testimonials";
import TeamPresentation from "@/components/TeamPresentation/TeamPresentation";

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
>>>>>>> 4c4384b8ac115ceab300a8db5778013d2d268b2e
    </div>
  );
}