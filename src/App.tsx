import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useLanguage } from './hooks/useLanguage';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { ProductsPage } from './pages/ProductsPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { NewsPage } from './pages/NewsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { ChatBot } from './components/ChatBot';
import { SupportLoginPage } from './pages/SupportLoginPage';
import { ClientLoginPage } from './pages/ClientLoginPage';

// Componente para scroll al tope
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const { language, setLanguage } = useLanguage();

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white">
        <ScrollToTop />
        <Navigation language={language} onLanguageChange={setLanguage} />
        <main className="relative z-10">
          <Routes>
            {/* Ruta para Privacy Policy */}
            <Route path="/privacy" element={<PrivacyPolicy language={language} />} />
            
            {/* Páginas de Login (ambas muestran el mensaje de desarrollo) */}
            <Route path="/support-login" element={<SupportLoginPage language={language} />} />
            <Route path="/client-login" element={<ClientLoginPage language={language} />} />
            
            {/* NOTA: Eliminada la ruta /system-status ya que no está en el menú */}
            
            {/* Resto de rutas existentes */}
            <Route path="/" element={<Home language={language} onLanguageChange={setLanguage} />} />
            <Route path="/products" element={<ProductsPage language={language} />} />
            <Route path="/resources" element={<ResourcesPage language={language} />} />
            <Route path="/news" element={<NewsPage language={language} />} />
            <Route path="/about" element={<AboutPage language={language} />} />
            <Route path="/contact" element={<ContactPage language={language} />} />
          </Routes>
        </main>
        
        {/* Footer con z-index alto para que aparezca sobre el fondo fijo */}
        <div className="relative z-50">
          <Footer language={language} />
        </div>
        
        {/* ChatBot en TODAS las páginas */}
        <ChatBot language={language} onLanguageChange={setLanguage} />
      </div>
    </BrowserRouter>
  );
}

export default App;
