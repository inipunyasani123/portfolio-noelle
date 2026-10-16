'use client';
import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { projects } from '@/lib/data';

const CATS = ['All', ...new Set(projects.map((p) => p.category))];
const MotionLink = motion.create(Link);

export default function WorkPage() {
  const [cat, setCat] = useState('All');
  const reduce = useReducedMotion();
  const count = (c) => (c === 'All' ? projects.length : projects.filter((p) => p.category === c).length);
  const list = useMemo(() => (cat === 'All' ? projects : projects.filter((p) => p.category === cat)), [cat]);

  return (
    <main className="bg-white">
      <section className="px-6 pb-10 pt-28 md:pt-32">
        <div className="mx-auto max-w-7xl">
          <span className="mb-4 inline-block rounded-full bg-gray-200 px-3 py-1 text-xs uppercase tracking-wide text-gray-600">Work</span>
          <h1 className="text-4xl font-light tracking-tight text-black md:text-6xl">Selected projects.</h1>
          <p className="mt-5 max-w-2xl text-gray-600">Six live projects: three to-do apps, two booking flows, and a rent-or-buy comparison. Each card opens a short case study with a link to the live site.</p>

          <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter projects">
            {CATS.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCat(c)}
                aria-pressed={cat === c}
                className={`inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-medium transition ${cat === c ? 'bg-black text-white' : 'border border-gray-300 text-gray-700 hover:border-black'}`}
              >
                {c} <span className="text-xs opacity-80">{count(c)}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-20">
        <p className="sr-only" aria-live="polite">{list.length} projects shown</p>
        <motion.div layout={!reduce} className="mx-auto grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {list.map((p) => (
              <MotionLink
                key={p.slug}
                href={`/work/${p.slug}`}
                layout={!reduce}
                initial={reduce ? false : { opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? undefined : { opacity: 0, scale: 0.96 }}
                transition={{ duration: reduce ? 0 : 0.3 }}
                className="group block"
              >
                <div className="relative mb-4 h-64 w-full overflow-hidden rounded-xl shadow-md transition group-hover:shadow-xl">
                  <Image src={p.image} alt="" fill sizes="(max-width:640px) 100vw, 33vw" className="object-cover object-top transition-transform duration-700 group-hover:scale-105" />
                  <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-medium text-black">{p.category}</span>
                </div>
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-black">{p.title}</h2>
                  <span className="text-xs text-gray-500">{p.year}</span>
                </div>
                <p className="mt-1 text-sm text-gray-600">{p.desc}</p>
              </MotionLink>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>
    </main>
  );
}
