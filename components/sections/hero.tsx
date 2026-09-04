import { siteConfig } from "@/config/site";
export function Hero() {
  return (
    <section
      className="section flex min-h-[calc(100svh-4rem)] items-center pt-24"
      aria-labelledby="hero-title"
    >
      <div className="shell w-full">
        <p className="eyebrow">Available for select collaborations</p>
        <h1
          id="hero-title"
          className="display mt-5 max-w-5xl text-[clamp(4rem,11vw,9rem)] font-semibold"
        >
          {siteConfig.name}
          <br />
          <span className="text-[var(--accent)]">builds with intent.</span>
        </h1>
        <div className="mt-10 grid max-w-3xl gap-7 border-t rule pt-7 md:grid-cols-[1.4fr_1fr]">
          <p className="text-xl leading-relaxed tracking-[-.025em]">
            {siteConfig.tagline}
          </p>
          <div>
            <p className="leading-relaxed text-[var(--muted)]">
              I turn ambitious ideas into useful interfaces, balancing
              thoughtful interaction with reliable implementation.
            </p>
            <a
              href="#projects"
              className="mt-5 inline-flex border-b-2 border-[var(--accent)] pb-1 font-medium hover:text-[var(--accent)]"
            >
              Explore selected work{" "}
              <span aria-hidden="true" className="ml-2">
                ↓
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
