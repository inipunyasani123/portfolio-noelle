import { pageMeta, SITE_NAME } from '@/lib/seo';

// Judul pakai { default, template } supaya halaman di bawahnya tetap berakhiran " — Noelle".
const meta = pageMeta({ title: 'Work', description: "Six case studies by Noelle: three to-do apps, a clinic booking flow, a rent-or-buy comparison, and a restaurant table picker, all live.", path: '/work' });
export const metadata = { ...meta, title: { default: 'Work', template: `%s — ${SITE_NAME}` } };

export default function Layout({ children }) {
  return children;
}
