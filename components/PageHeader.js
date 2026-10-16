
// Header halaman konsisten (gaya noelle: light, pill badge + judul tipis).
export default function PageHeader({ kicker, title, subtitle }) {
  return (
    <section className="bg-white px-6 pb-10 pt-28 md:pb-16 md:pt-32">
      <div className="mx-auto max-w-7xl">
        <div>
          {kicker && (
            <span className="mb-4 inline-block rounded-full bg-gray-200 px-3 py-1 text-xs uppercase tracking-wide text-gray-600">
              {kicker}
            </span>
          )}
          <h1 className="text-4xl font-light tracking-tight text-black md:text-6xl">{title}</h1>
          {subtitle && <p className="mt-5 max-w-2xl text-base leading-relaxed text-gray-600">{subtitle}</p>}
        </div>
      </div>
    </section>
  );
}
