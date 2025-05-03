'use client';

import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';

// Nokta/yıldız efekti için ayrı bir bileşen oluşturalım
const BackgroundDots = () => {
  // TypeScript için interface tanımlayalım
  interface Dot {
    id: number;
    left: string;
    top: string;
    animationDuration: string;
  }
  
  const [dots, setDots] = useState<Dot[]>([]);
  
  useEffect(() => {
    // Sadece istemci tarafında çalışacak
    const newDots = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDuration: `${3 + Math.random() * 3}s`
    }));
    
    setDots(newDots);
  }, []);
  
  return (
    <>
      {dots.map(dot => (
        <div 
          key={dot.id}
          className="absolute w-1 h-1 bg-emerald-400 rounded-full opacity-30"
          style={{
            left: dot.left,
            top: dot.top,
            animation: `pulse ${dot.animationDuration} infinite`
          }}
        ></div>
      ))}
    </>
  );
};

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState("none");
  const lastScrollY = useRef(0);
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    // İstemci tarafında olduğumuzu belirtiyoruz
    setIsBrowser(true);
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Detect scroll direction
      if (currentScrollY > lastScrollY.current) {
        setScrollDirection("down");
      } else if (currentScrollY < lastScrollY.current) {
        setScrollDirection("up");
      }
      
      lastScrollY.current = currentScrollY;
      setScrollY(currentScrollY);
      
      // Add animation to sections as they come into view
      const sections = document.querySelectorAll('section');
      sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionBottom = section.getBoundingClientRect().bottom;
        
        // Element is in viewport
        if (sectionTop < window.innerHeight * 0.85 && sectionBottom > 0) {
          section.classList.add('in-view');
          section.classList.add(scrollDirection === "down" ? 'scroll-down' : 'scroll-up');
        } else {
          section.classList.remove('in-view');
        }
      });
      
      // Apply parallax effect to background elements
      document.querySelectorAll('.parallax').forEach(element => {
        const speed = parseFloat(element.getAttribute('data-speed') || '0.5');
        const yPos = -(currentScrollY * speed);
        if (element instanceof HTMLElement) {
          element.style.transform = `translateY(${yPos}px)`;
        }
      });
    };
    
    // Add scroll event listener sadece istemci tarafında
    if (isBrowser) {
      window.addEventListener('scroll', handleScroll);
      
      // Initial check for sections in view
      setTimeout(() => {
        handleScroll();
      }, 100);
    }
    
    // Remove event listener on cleanup
    return () => {
      if (isBrowser) {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, [scrollDirection, isBrowser]);

  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Header/Navigation */}
      <header className="fixed w-full z-50 bg-black/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-2xl font-bold text-white">
                <span className="text-emerald-400">COGNI</span>TRADE
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">
                Features
              </a>
              <a href="#benefits" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">
                Benefits
              </a>
              <a href="#testimonials" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">
                Testimonials
              </a>
              <Link href="/login" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">
                Login
              </Link>
              <Link 
                href="/signup" 
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md text-sm font-medium transition"
              >
                Get Started
              </Link>
            </nav>
            <div className="md:hidden">
              <button className="text-gray-400 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section 
        id="hero" 
        className={`flex flex-col justify-center items-center relative overflow-hidden transition-all duration-700 ${
          isBrowser && scrollY > 100 ? 'min-h-0 py-20' : 'min-h-screen'
        }`}
      >
        {/* Background grid effect with parallax */}
        <div className="absolute inset-0 grid-background opacity-10 parallax" data-speed="0.2"></div>
        
        {/* Background dots/stars effect */}
        <div className="absolute inset-0 parallax" data-speed="0.3">
          {isBrowser && <BackgroundDots />}
        </div>

        <div className={`relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto transition-all duration-700 ${
          isBrowser && scrollY > 100 ? 'transform scale-90 opacity-90' : 'transform scale-100 opacity-100'
        }`}>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">
            <span className="block text-emerald-400 mb-2 animate-text-slide">Trade Smarter</span>
            <span className="block animate-text-slide" style={{animationDelay: '0.2s'}}>with CogniTrade</span>
          </h1>
          
          <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto animate-text-slide" style={{animationDelay: '0.4s'}}>
            Empower your trades with CogniTrade, blending sentiment analysis and live market data for razor-sharp decisions.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 animate-text-slide" style={{animationDelay: '0.6s'}}>
            <Link 
              href="/signup" 
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-md font-medium text-lg transition-colors duration-200"
            >
              Try for Free
            </Link>
            <Link 
              href="/demo" 
              className="bg-gray-800 hover:bg-gray-700 text-white border border-gray-600 px-8 py-4 rounded-md font-medium text-lg flex items-center justify-center space-x-2 transition-colors duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Watch Demo</span>
            </Link>
          </div>
          

        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-gray-500">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Features Title */}
      <section id="features" className="py-20 px-4 bg-gradient-to-b from-black to-gray-900 animate-on-scroll">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-500">
              The Future of Trading is Shaped by CogniTrade
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-16">
            Take your trading experience to the next level with AI-powered analysis, real-time market data, 
            and advanced technical indicators.
          </p>
          
          <div className="mb-16 inline-block relative">
            <h3 className="text-2xl font-bold inline-block relative">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-500">
                Powerful Features with Smart Trading
              </span>
            </h3>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full mt-2"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* AI Power */}
            <div className="rounded-2xl bg-gradient-to-b from-gray-800 to-gray-900 p-8 shadow-xl hover:shadow-emerald-500/10 transition-all border border-gray-800 hover:border-emerald-500/30 group">
              <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center mb-6 shadow-lg group-hover:shadow-emerald-400/20 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-emerald-400 transition-colors">AI Power</h3>
              <p className="text-gray-400 mb-6">
                Our FinBERT-based sentiment analysis engine analyzes news and social media trends in real-time. 
                With 89% accuracy, it helps you predict market direction in advance.
              </p>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-center">
                  <div className="bg-emerald-500/20 rounded-full p-1 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  Real-time news analysis
                </li>

                <li className="flex items-center">
                  <div className="bg-emerald-500/20 rounded-full p-1 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  Market direction predictions
                </li>
              </ul>
            </div>

            {/* Advanced Technical Analysis */}
            <div className="rounded-2xl bg-gradient-to-b from-gray-800 to-gray-900 p-8 shadow-xl hover:shadow-blue-500/10 transition-all border border-gray-800 hover:border-blue-500/30 group">
              <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center mb-6 shadow-lg group-hover:shadow-blue-400/20 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-blue-400 transition-colors">Advanced Technical Analysis</h3>
              <p className="text-gray-400 mb-6">
                Optimize your trading strategies with real-time price data through CoinMarketCap API integration, 
                customizable technical indicators, and professional charting tools.
              </p>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-center">
                  <div className="bg-blue-500/20 rounded-full p-1 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  Multiple timeframe analysis
                </li>
                <li className="flex items-center">
                  <div className="bg-blue-500/20 rounded-full p-1 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  40+ technical indicators
                </li>

              </ul>
            </div>

            {/* Smart Portfolio Management */}
            <div className="rounded-2xl bg-gradient-to-b from-gray-800 to-gray-900 p-8 shadow-xl hover:shadow-purple-500/10 transition-all border border-gray-800 hover:border-purple-500/30 group">
              <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center mb-6 shadow-lg group-hover:shadow-purple-400/20 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-purple-400 transition-colors">Smart Portfolio Management</h3>
              <p className="text-gray-400 mb-6">
                Secure your investments with risk management tools, automatic stop-loss suggestions, 
                and portfolio diversification recommendations.
              </p>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-center">
                  <div className="bg-purple-500/20 rounded-full p-1 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  Dynamic portfolio balancing
                </li>


              </ul>
            </div>

            {/* 24/7 Support and Education */}
            <div className="rounded-2xl bg-gradient-to-b from-gray-800 to-gray-900 p-8 shadow-xl hover:shadow-amber-500/10 transition-all border border-gray-800 hover:border-amber-500/30 group">
              <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mb-6 shadow-lg group-hover:shadow-amber-400/20 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-amber-400 transition-colors">24/7 Support and Education</h3>
              <p className="text-gray-400 mb-6">
                We&apos;re here to support your trading journey with comprehensive educational materials, 
                webinars, and professional support team.
              </p>
              <ul className="space-y-3 text-gray-400">

                <li className="flex items-center">
                  <div className="bg-amber-500/20 rounded-full p-1 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  Trading strategy guides
                </li>
                <li className="flex items-center">
                  <div className="bg-amber-500/20 rounded-full p-1 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  Responsive customer service
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section id="benefits" className="py-20 px-4 bg-black animate-on-scroll">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-500">
                Why Choose CogniTrade?
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              The sharp distinctions that set us apart from other platforms.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-900/50 rounded-xl border border-gray-800 hover:border-emerald-500/30 transition-all">
              <div className="w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Unified Analysis</h3>
              <p className="text-gray-400">
                The only platform that combines technical and fundamental analysis for comprehensive market insights.
              </p>
            </div>
            
            <div className="p-6 bg-gray-900/50 rounded-xl border border-gray-800 hover:border-emerald-500/30 transition-all">
              <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">AI-Powered News Analysis</h3>
              <p className="text-gray-400">
                Scoring news from 0-100 using our AI system for easy understanding and clear investment decisions.
              </p>
            </div>
            
            <div className="p-6 bg-gray-900/50 rounded-xl border border-gray-800 hover:border-emerald-500/30 transition-all">
              <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Time Efficiency</h3>
              <p className="text-gray-400">
                No need to spend hours on news sources, you can access all news with a single click on our platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 bg-gradient-to-b from-black to-gray-900 animate-on-scroll">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-500">
                Why Choose CogniTrade?
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              The sharp distinctions that set us apart from other platforms.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                userName: "Alex K.",
                role: "Day Trader",
                quote: "The AI-powered sentiment analysis has been a game-changer for my day trading strategy. I&apos;m catching market shifts before they happen.",
                avatarUrl: "/avatar1.jpg"
              },
              {
                userName: "Sarah M.",
                role: "Swing Trader",
                quote: "As a swing trader, the technical analysis tools have helped me identify optimal entry and exit points with much greater precision.",
                avatarUrl: "/avatar2.jpg"
              },
              {
                userName: "Michael T.",
                role: "Long-term Investor",
                quote: "The portfolio management features help me maintain the perfect balance in my crypto investments. The diversification recommendations are spot on.",
                avatarUrl: "/avatar3.jpg"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-800 rounded-xl p-8 border border-gray-700">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-gray-700 flex-shrink-0 mr-4 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center text-white font-bold text-lg">
                      {testimonial.userName.charAt(0)}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{testimonial.userName}</h3>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-300 italic">&quot;{testimonial.quote}&quot;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-emerald-900 to-blue-900 animate-on-scroll">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">Ready to Transform Your Trading Experience?</h2>
          <p className="text-xl text-white/80 mb-10 max-w-3xl mx-auto">
            Experience the platform that combines technical and fundamental analysis with AI-powered news scoring.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link 
              href="/signup" 
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-md font-medium text-lg shadow-lg transition-all"
            >
              Start Free Trial
            </Link>
            <Link 
              href="/demo" 
              className="bg-gray-800/50 hover:bg-gray-800 text-white border border-white/20 px-8 py-4 rounded-md font-medium text-lg flex items-center justify-center space-x-2 transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Request Demo</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <Link href="/" className="text-2xl font-bold text-white">
                <span className="text-emerald-400">COGNI</span>TRADE
              </Link>
              <p className="text-gray-500 mt-2">Trade smarter, not harder.</p>
            </div>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-gray-400 hover:text-white">
                Privacy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white">
                Terms
              </Link>
              <Link href="/contact" className="text-gray-400 hover:text-white">
                Contact
              </Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} CogniTrade. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Style for animations */}
      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
        
        .grid-background {
          background-size: 50px 50px;
          background-image:
            linear-gradient(to right, #333 1px, transparent 1px),
            linear-gradient(to bottom, #333 1px, transparent 1px);
        }

        html {
          scroll-behavior: smooth;
        }

        .animate-in {
          animation: fadeIn 0.5s ease-in-out forwards;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes textSlide {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }

        .animate-text-slide {
          opacity: 0;
          animation: textSlide 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        .animate-on-scroll {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }

        section {
          opacity: 0;
          transition: opacity 0.6s ease-in-out, transform 0.6s ease-in-out;
        }

        section.in-view {
          opacity: 1;
          transform: translateY(0);
        }

        section.scroll-down {
          animation: scrollDown 0.6s ease-out forwards;
        }

        section.scroll-up {
          animation: scrollUp 0.6s ease-out forwards;
        }

        @keyframes scrollDown {
          from { transform: translateY(-10px); }
          to { transform: translateY(0); }
        }

        @keyframes scrollUp {
          from { transform: translateY(10px); }
          to { transform: translateY(0); }
        }

        .parallax {
          will-change: transform;
          transition: transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        @media (prefers-reduced-motion: reduce) {
          .parallax {
            transition: none;
          }
          section {
            transition: opacity 0.1s linear;
          }
          .animate-text-slide {
            opacity: 1;
            animation: none;
          }
        }
      `}</style>
    </main>
  );
}
