export default function DevelopmentPage() {
  const currentYear = new Date().getFullYear();

  const styles = `
    .particle {
      position: absolute;
      background: rgba(220, 38, 38, 0.1);
      border-radius: 50%;
      pointer-events: none;
    }

    .particle-1 {
      width: 6px;
      height: 6px;
      top: 15%;
      left: 10%;
      animation: float-particle-404 8s ease-in-out infinite;
    }

    .particle-2 {
      width: 4px;
      height: 4px;
      top: 70%;
      left: 85%;
      animation: float-particle-404 10s ease-in-out infinite reverse;
    }

    .particle-3 {
      width: 8px;
      height: 8px;
      top: 40%;
      left: 20%;
      animation: float-particle-404 12s ease-in-out infinite;
    }

    .particle-4 {
      width: 5px;
      height: 5px;
      top: 80%;
      left: 70%;
      animation: float-particle-404 9s ease-in-out infinite reverse;
    }

    .particle-5 {
      width: 7px;
      height: 7px;
      top: 25%;
      left: 80%;
      animation: float-particle-404 11s ease-in-out infinite;
    }

    @keyframes float-particle-404 {
      0%, 100% {
        transform: translateY(0px) translateX(0px) rotate(0deg);
        opacity: 0.2;
      }
      25% {
        transform: translateY(-30px) translateX(15px) rotate(90deg);
        opacity: 0.6;
      }
      50% {
        transform: translateY(-60px) translateX(-10px) rotate(180deg);
        opacity: 1;
      }
      75% {
        transform: translateY(-30px) translateX(-20px) rotate(270deg);
        opacity: 0.6;
      }
    }

    .company-logo {
      animation: logoEntry404 1.5s cubic-bezier(0.34, 1.56, 0.64, 1);
      position: relative;
      overflow: hidden;
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
    }

    .company-logo::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: linear-gradient(45deg, transparent, rgba(220, 38, 38, 0.1), transparent);
      transform: rotate(45deg);
      animation: logoShine404 4s ease-in-out infinite;
    }

    @keyframes logoEntry404 {
      0% {
        opacity: 0;
        transform: scale(0.2) rotate(-360deg);
      }
      40% {
        transform: scale(1.3) rotate(-180deg);
      }
      60% {
        transform: scale(0.8) rotate(-90deg);
      }
      80% {
        transform: scale(1.1) rotate(0deg);
      }
      100% {
        opacity: 1;
        transform: scale(1) rotate(0deg);
      }
    }

    @keyframes logoShine404 {
      0%, 100% {
        transform: translateX(-100%) translateY(-100%) rotate(45deg);
      }
      50% {
        transform: translateX(100%) translateY(100%) rotate(45deg);
      }
    }

    .animate-fade-in-up {
      animation: fadeInUp 1s ease-out;
    }

    .animate-fade-in-up-delayed {
      animation: fadeInUp 1s ease-out 0.3s both;
    }

    .animate-fade-in-up-delayed-2 {
      animation: fadeInUp 1s ease-out 0.6s both;
    }

    .animate-fade-in-up-delayed-4 {
      animation: fadeInUp 1s ease-out 1.2s both;
    }

    @keyframes fadeInUp {
      0% {
        opacity: 0;
        transform: translateY(30px) scale(0.95);
      }
      60% {
        transform: translateY(-5px) scale(1.02);
      }
      100% {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    .animate-pulse-slow {
      animation: pulseSlow 3s ease-in-out infinite;
    }

    @keyframes pulseSlow {
      0%, 100% {
        opacity: 1;
        transform: scale(1);
      }
      50% {
        opacity: 0.8;
        transform: scale(1.05);
      }
    }

    @media (max-width: 640px) {
      .particle {
        display: none;
      }

      .company-logo {
        width: 6rem;
        height: 6rem;
      }

      .company-logo img {
        width: 3rem;
        height: 3rem;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      *,
      *::before,
      *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }

      .particle {
        display: none;
      }
    }

    @media (prefers-reduced-motion: no-preference) {
      .company-logo,
      .animate-fade-in-up,
      .animate-fade-in-up-delayed,
      .animate-fade-in-up-delayed-2,
      .animate-fade-in-up-delayed-4 {
        will-change: transform, opacity;
      }
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <div className="min-h-screen font-sans antialiased bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <a href="/" className="flex items-center">
              <span className="text-2xl font-bold text-corporate-red-600">LE Robotics</span>
            </a>
          </div>
        </div>
      </nav>

      <div className="flex items-center justify-center min-h-screen pt-20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-red-100/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-red-50/30 to-transparent rounded-full blur-2xl"></div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="particle particle-1"></div>
          <div className="particle particle-2"></div>
          <div className="particle particle-3"></div>
          <div className="particle particle-4"></div>
          <div className="particle particle-5"></div>
        </div>

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="mb-12">
            <div className="company-logo w-32 h-32 mx-auto mb-8 bg-white rounded-3xl flex items-center justify-center shadow-2xl relative overflow-hidden border-2 border-gray-100">
              <div className="w-16 h-20 relative z-10 flex items-center justify-center">
                <span className="text-3xl font-bold text-red-600">LE</span>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-yellow-100 border border-yellow-300 text-yellow-800 text-sm font-medium animate-pulse-slow">
              <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3 animate-ping"></div>
              <span>System Status</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 animate-fade-in-up">
              System Under
              <span className="text-red-600 block">Development</span>
            </h1>

            <p className="text-xl sm:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in-up-delayed">
              Our platform is currently being enhanced with new features.
              We'll be back online soon with an improved experience.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 animate-fade-in-up-delayed-2">
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Enhanced Security</h3>
                <p className="text-gray-600 text-sm">Implementing advanced authentication protocols</p>
              </div>

              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Performance Boost</h3>
                <p className="text-gray-600 text-sm">Optimizing system performance and speed</p>
              </div>

              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Better UX</h3>
                <p className="text-gray-600 text-sm">Redesigning user interface for better experience</p>
              </div>
            </div>

            <a
              href="https://lerobotics.ai/contact.html"
              className="inline-flex items-center px-8 py-4 bg-white/80 backdrop-blur-sm text-red-600 rounded-xl font-semibold text-lg shadow-lg border border-red-200 hover:bg-white hover:shadow-xl hover:transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-red-500/20"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
              </svg>
              Contact Support
            </a>

            <div className="mt-12 p-6 bg-white/40 backdrop-blur-sm rounded-2xl border border-white/50 max-w-md mx-auto animate-fade-in-up-delayed-4">
              <div className="flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span className="text-gray-700 font-medium">Estimated Launch</span>
              </div>
              <p className="text-2xl font-bold text-red-600">Coming Soon</p>
              <p className="text-sm text-gray-600 mt-1">We're working around the clock to bring you the best experience</p>
            </div>
          </div>
        </div>
      </div>

      <footer className="relative z-10 bg-white/80 backdrop-blur-sm border-t border-gray-200/50 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-600">
              &copy; {currentYear} LE Robotics. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
      </div>
    </>
  );
}
