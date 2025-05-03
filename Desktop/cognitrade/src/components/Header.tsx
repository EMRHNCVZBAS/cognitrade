'use client';

import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <a 
                href="#hero" 
                className="text-xl font-bold text-emerald-400 cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('hero');
                }}
              >
                CogniTrade
              </a>
            </div>
            <nav className="hidden md:ml-6 md:flex md:space-x-8">
              <a
                href="#features"
                className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-slate-700 cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('features');
                }}
              >
                Özellikler
              </a>
              <a
                href="#testimonials"
                className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-slate-700 cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('testimonials');
                }}
              >
                Kullanıcı Yorumları
              </a>
            </nav>
          </div>
          <div className="flex items-center">
            <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
              Ücretsiz Dene
            </button>
          </div>
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-slate-700 focus:outline-none"
            >
              <span className="sr-only">Menü</span>
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobil menü */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a
            href="#features"
            className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-slate-700 cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('features');
            }}
          >
            Özellikler
          </a>
          <a
            href="#testimonials"
            className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-slate-700 cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('testimonials');
            }}
          >
            Kullanıcı Yorumları
          </a>
        </div>
      </div>
    </header>
  );
} 