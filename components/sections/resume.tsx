export function Resume() {
  return (
    <section className="section border-y rule" aria-labelledby="resume-title">
      <div className="shell flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <div>
        <p className="eyebrow">04 / Resume</p>
          <h2
            id="resume-title"
            className="display mt-4 text-4xl font-semibold md:text-6xl"
          >
            Want the details?
          </h2>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-[var(--muted)]">
            Add your PDF to{" "}
            <code className="rounded bg-white px-1.5 py-1 text-sm">
              public/resume.pdf
            </code>{" "}
            and this link will be ready to use.
          </p>
        </div>
        <a
          href="/resume.pdf"
          className="inline-flex w-fit rounded-full bg-[var(--accent)] px-6 py-3 font-medium text-white"
        >
          Download resume{" "}
          <span aria-hidden="true" className="ml-3">
            ↓
          </span>
        </a>
      </div>
    </section>
  );
}
