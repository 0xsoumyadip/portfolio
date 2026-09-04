import { skillGroups } from "@/config/skills";
export function Skills() {
  return (
    <section id="skills" className="section" aria-labelledby="skills-title">
      <div className="shell">
        <p className="eyebrow">02 / Capabilities</p>
        <h2
          id="skills-title"
          className="display mt-4 text-4xl font-semibold md:text-6xl"
        >
          Tools are only useful
          <br />
          when they serve the work.
        </h2>
        <div className="mt-12 grid gap-px overflow-hidden border rule bg-[var(--line)] md:grid-cols-3">
          {skillGroups.map((group) => (
            <div key={group.name} className="bg-[var(--canvas)] p-7">
              <h3 className="font-semibold">{group.name}</h3>
              <ul className="mt-6 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border rule px-3 py-1.5 text-sm text-[var(--muted)]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
