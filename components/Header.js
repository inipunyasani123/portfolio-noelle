'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import clsx from 'clsx';
import { nav } from '@/lib/data';

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = useCallback(() => setScrolled(window.scrollY > 20), []);
  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const isActive = (href) => (href === '/' ? pathname === '/' : pathname.startsWith(href));
  const links = nav.slice(0, -1); // tanpa Contact (jadi tombol)

  // Esc menutup menu ponsel; pindah halaman juga menutupnya.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') setIsOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen]);
  useEffect(() => setIsOpen(false), [pathname]);

  return (
    <header className="fixed z-50 w-full">
      <div
        className={clsx(
          'mx-auto flex items-center justify-between py-3 pl-6 pr-3 backdrop-blur-md md:py-4 md:pr-6 xl:max-w-7xl',
          scrolled ? 'bg-black/80 text-white shadow-sm' : 'bg-white text-black'
        )}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span aria-hidden="true" className={clsx('flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-bold', scrolled ? 'border-white' : 'border-black')}>N</span>
          <span className="text-2xl font-bold tracking-tight">Noelle</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden space-x-8 text-sm font-medium md:flex" aria-label="Main">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? 'page' : undefined}
              className={clsx('group relative py-2 transition-opacity', isActive(item.href) ? 'opacity-100' : 'opacity-80 hover:opacity-100')}
            >
              {item.label}
              <span aria-hidden="true" className={clsx('absolute bottom-1 left-0 h-[2px] bg-current transition-all', isActive(item.href) ? 'w-full' : 'w-0 group-hover:w-full')} />
            </Link>
          ))}
        </nav>

        {/* Contact button */}
        <Link
          href="/contact"
          className={clsx(
            'hidden rounded-full border px-5 py-2 text-sm font-medium md:block',
            scrolled ? 'border-white text-white hover:bg-white hover:text-black' : 'border-black text-black hover:bg-black hover:text-white'
          )}
        >
          Contact
        </Link>

        {/* Mobile toggle */}
        <button type="button" className="grid h-11 w-11 place-items-center rounded-full text-current md:hidden" onClick={() => setIsOpen((v) => !v)} aria-expanded={isOpen} aria-controls="menu-ponsel" aria-label="Menu">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        id="menu-ponsel"
        className={clsx('fixed inset-x-0 top-[68px] overflow-hidden bg-white text-gray-800 shadow-sm transition-all duration-300 ease-in-out md:hidden', isOpen ? 'max-h-screen py-4' : 'invisible max-h-0')}
        inert={!isOpen}
      >
        <nav className="flex flex-col items-center" aria-label="Mobile navigation">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)} aria-current={isActive(item.href) ? 'page' : undefined} className={clsx('inline-flex min-h-12 items-center px-6 text-base font-medium transition-colors', isActive(item.href) ? 'text-black' : 'text-gray-600 hover:text-black')}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
