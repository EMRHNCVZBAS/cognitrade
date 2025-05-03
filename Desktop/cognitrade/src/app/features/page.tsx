'use client';

import React from 'react';
import Link from 'next/link';

export default function Features() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Header */}
      <header className="fixed w-full z-50 bg-gray-900/80 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-2xl font-bold text-white">
                <span className="text-emerald-400">COGNI</span>TRADE
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/features" className="text-emerald-400 px-3 py-2 text-sm font-medium border-b-2 border-emerald-400">
                Features
              </Link>
              <Link href="/pricing" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">
                Pricing
              </Link>
              <Link href="/demo" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">
                Demo
              </Link>
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
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-500">
              The Future of Trading is Shaped by CogniTrade
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-10">
            Take your trading experience to the next level with AI-powered analysis, real-time market data, 
            and advanced technical indicators.
          </p>
          <div className="text-gray-400 mb-16">
            Over 50,000 traders are making more informed and profitable trades with CogniTrade&apos;s advantages.
            <br />Be part of this success story.
          </div>
        </div>
      </section>

      {/* Features Title */}
      <section className="py-10 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-16 inline-block relative">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-500">
              Powerful Features with Smart Trading
            </span>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full"></div>
          </h2>
        </div>
      </section>

      {/* Features Cards */}
      <section className="pb-32 px-4">
        <div className="max-w-7xl mx-auto">
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
                  Social media sentiment detection
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
                Optimize your trading strategies with real-time price data through Binance API integration, 
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
                <li className="flex items-center">
                  <div className="bg-blue-500/20 rounded-full p-1 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  Pattern recognition algorithms
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
                <li className="flex items-center">
                  <div className="bg-purple-500/20 rounded-full p-1 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  Intelligent risk assessment
                </li>
                <li className="flex items-center">
                  <div className="bg-purple-500/20 rounded-full p-1 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  Automated stop-loss setup
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
                  Live webinars and tutorials
                </li>
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

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-gray-800 to-gray-900 py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">Ready to Transform Your Trading Experience?</h2>
          <p className="text-gray-400 mb-10 text-xl max-w-3xl mx-auto">
            Join over 50,000 traders who are already benefiting from CogniTrade&apos;s cutting-edge features.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link 
              href="/signup" 
              className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white px-8 py-4 rounded-lg font-medium text-lg shadow-lg hover:shadow-emerald-500/20 transition-all"
            >
              Start Free Trial
            </Link>
            <Link 
              href="/demo" 
              className="bg-gray-800 hover:bg-gray-700 text-white border border-gray-700 px-8 py-4 rounded-lg font-medium text-lg flex items-center justify-center space-x-2 transition-all"
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
      <footer className="bg-gray-900 py-12 border-t border-gray-800">
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
    </div>
  );
} 