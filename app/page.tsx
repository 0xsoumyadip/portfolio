import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Resume } from "@/components/sections/resume";
import { Skills } from "@/components/sections/skills";

export default function Home() {
  return (
    <main id="main-content">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Resume />
      <Contact />
    </main>
  );
}
