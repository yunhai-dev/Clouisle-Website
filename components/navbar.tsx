'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Github, Globe, Menu, X } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

const labels = {
  en: {
    product: 'Platform',
    architecture: 'Architecture',
    security: 'Security & Deployment',
    useCases: 'Use Cases',
    docs: 'Docs',
    cta: 'Try Beta',
  },
  zh: {
    product: '平台能力',
    architecture: '架构',
    security: '安全与部署',
    useCases: '应用场景',
    docs: '文档',
    cta: '开始体验',
  },
};

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);

  const lang = pathname.split('/')[1] === 'zh' ? 'zh' : 'en';
  const altLang = lang === 'zh' ? 'en' : 'zh';
  const altPath = pathname.replace(`/${lang}`, `/${altLang}`);
  const t = labels[lang];

  const navLinks = useMemo(
    () => [
      { href: `/${lang}#platform`, text: t.product, docs: false },
      { href: `/${lang}#architecture`, text: t.architecture, docs: false },
      { href: `/${lang}#security`, text: t.security, docs: false },
      { href: `/${lang}#use-cases`, text: t.useCases, docs: false },
      { href: 'https://deepwiki.com/yunhai-dev/Clouisle', text: t.docs, docs: true },
    ],
    [lang, t.architecture, t.docs, t.product, t.security, t.useCases]
  );

  const docsActive = pathname.startsWith(`/${lang}/docs`);

  useEffect(() => {
    let raf = 0;
    const commit = () => {
      raf = 0;
      setIsAtTop(window.scrollY <= 12);
    };
    const onScroll = () => {
      if (raf === 0) raf = requestAnimationFrame(commit);
    };

    commit();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 z-50 transition-all duration-700 ease-in-out',
        isAtTop ? 'top-0 px-0' : 'top-3 px-4'
      )}
    >
      <div
        className="mx-auto flex h-14 items-center justify-between px-4 backdrop-blur-sm transition-all duration-700 ease-in-out md:px-6"
        style={{
          maxWidth: isAtTop ? '100%' : '72rem',
          borderRadius: isAtTop ? '0' : '0.75rem',
          backgroundColor: isAtTop ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.5)',
          border: isAtTop ? 'none' : '1px solid rgba(255,255,255,0.06)',
          borderBottom: isAtTop ? '1px solid rgba(255,255,255,0.06)' : undefined,
          boxShadow: isAtTop ? 'none' : '0 10px 15px -3px rgba(0,0,0,0.2)',
        }}
      >
        <Link href={`/${lang}`} className="flex items-center gap-2">
          <Image src="/clouise-dark.svg" alt="Clouisle" width={24} height={24} />
          <span className="text-sm font-medium tracking-wide text-zinc-100">{lang === 'zh' ? '云屿' : 'Clouisle'}</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map(link =>
            link.href.startsWith('http') ? (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg px-3 py-2 text-sm text-zinc-400 transition-colors hover:bg-white/8 hover:text-zinc-100"
              >
                {link.text}
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'rounded-lg px-3 py-2 text-sm transition-colors',
                  link.docs && docsActive
                    ? 'bg-white/12 text-white'
                    : 'text-zinc-400 hover:bg-white/8 hover:text-zinc-100'
                )}
              >
                {link.text}
              </Link>
            )
          )}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            href={altPath}
            aria-label={altLang === 'zh' ? '切换到中文' : 'Switch to English'}
            className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs text-zinc-400 transition-colors hover:bg-white/8 hover:text-zinc-100"
          >
            <Globe className="h-3.5 w-3.5" />
            {altLang === 'zh' ? '中文' : 'EN'}
          </Link>
          <a
            href="https://github.com/yunhai-dev/Clouisle"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-white/8 hover:text-zinc-100"
          >
            <Github className="h-4 w-4" />
          </a>
          <Link href={`/${lang}/beta`} className="cl-btn-primary h-10 px-4 text-sm">
            {t.cta}
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(v => !v)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          className="rounded-lg p-2 text-zinc-300 transition-colors hover:bg-white/8 hover:text-zinc-100 md:hidden"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        {isOpen && (
          <div
            ref={mobileMenuRef}
            className="absolute left-4 right-4 top-[4.4rem] rounded-2xl border border-white/10 bg-black/80 p-3 backdrop-blur-md md:hidden"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map(link =>
                link.href.startsWith('http') ? (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg px-3 py-2 text-sm text-zinc-300 hover:bg-white/8 hover:text-zinc-100"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.text}
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-lg px-3 py-2 text-sm text-zinc-300 hover:bg-white/8 hover:text-zinc-100"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.text}
                  </Link>
                )
              )}
              <Link
                href={altPath}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-zinc-300 hover:bg-white/8 hover:text-zinc-100"
                onClick={() => setIsOpen(false)}
              >
                <Globe className="h-3.5 w-3.5" />
                {altLang === 'zh' ? '切换到中文' : 'Switch to English'}
              </Link>
              <Link
                href={`/${lang}/beta`}
                className="mt-2 rounded-lg bg-white px-3 py-2 text-sm font-medium text-zinc-900"
                onClick={() => setIsOpen(false)}
              >
                {t.cta}
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
