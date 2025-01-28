import Hero from "@/components/Hero/Hero";
import underHero from "../../public/img/webdev-05-2.webp";
import Image from "next/image";
import AdvantagesCards from "@/components/AdvantagesCards/AdvantagesCards";

export default function Home() {
  return (
    <div>
      <section className="sectionHero">
        <Hero />
      </section>

      <section className="sectionAdvantages">
        <AdvantagesCards />
      </section>

      <Image
        style={{
          width: "100%",
          height: "auto",
          display: "block",
          margin: "0 auto",
        }}
        src={underHero}
        alt="illustration of website development"
      />
    </div>
  );
}
