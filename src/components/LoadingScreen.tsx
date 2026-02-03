import { useEffect, useState } from 'react';

interface LoadingScreenWithLanguageProps {
  language: 'en' | 'es' | 'pt';
  onLoadingComplete?: () => void;
}

export const LoadingScreenWithLanguage = ({ 
  onLoadingComplete, 
  language = 'en' 
}: LoadingScreenWithLanguageProps) => {
  const messages = {
    en: {
      loading: 'Initializing RoboVision System...',
      message: 'Precision Welding Solutions'
    },
    es: {
      loading: 'Inicializando Sistema RoboVision...',
      message: 'Soluciones de Soldadura de Precisión'
    },
    pt: {
      loading: 'Inicializando Sistema RoboVision...',
      message: 'Soluções de Soldagem de Precisão'
    }
  };

  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Mostrar con retraso para suavizar la transición
    const showTimer = setTimeout(() => setIsVisible(true), 100);
    
    // Simular progreso real
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Incremento más realista
        const increment = Math.random() * 8 + 4;
        return Math.min(prev + increment, 100);
      });
    }, 250);

    return () => {
      clearTimeout(showTimer);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      // Esperar un momento para mostrar el 100%
      const timer = setTimeout(() => {
        setIsLoading(false);
        if (onLoadingComplete) {
          onLoadingComplete();
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [progress, onLoadingComplete]);

  if (!isLoading) return null;

  return (
    <div className={`fixed inset-0 z-[9999] bg-white flex items-center justify-center transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="max-w-md w-full px-8">
        {/* Logo Centrado */}
        <div className="flex justify-center mb-12">
          <div className="relative">
            <img
              src="/img/Logo.png"
              alt="RoboVision"
              className="w-40 h-40 md:w-48 md:h-48 object-contain filter drop-shadow-lg"
            />
          </div>
        </div>

        {/* Texto de Carga */}
        <div className="text-center mb-8">
          <div className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
            {messages[language].loading}
          </div>
          <div className="text-xs text-gray-400 font-light">
            {messages[language].message}
          </div>
        </div>

        {/* Barra de Progreso Minimalista */}
        <div className="relative">
          {/* Barra de fondo sutil */}
          <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
            {/* Barra de progreso animada */}
            <div 
              className="h-full bg-gradient-to-r from-red-500 to-red-600 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          {/* Indicador de progreso */}
          <div className="absolute -top-6 right-0 text-right">
            <span className="text-lg font-semibold text-gray-800">
              {Math.round(progress)}%
            </span>
          </div>
        </div>

        {/* Indicadores de proceso */}
        <div className="flex justify-between mt-2">
          <span className="text-xs text-gray-400">System Check</span>
          <span className="text-xs text-gray-400">Initializing</span>
          <span className="text-xs text-gray-400">Ready</span>
        </div>
      </div>

      {/* Copyright en la parte inferior */}
      <div className="absolute bottom-6 left-0 right-0 text-center">
        <div className="text-xs text-gray-400 font-light">
          © {new Date().getFullYear()} LE Robotics. All rights reserved.
        </div>
      </div>
    </div>
  );
};