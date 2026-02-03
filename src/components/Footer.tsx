import { Link } from 'react-router-dom';
import { Language } from '../hooks/useLanguage';
import { translations } from '../i18n/translations';

interface FooterProps {
  language: Language;
}

export const Footer = ({ language }: FooterProps) => {
  const t = translations[language];
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white text-gray-900 py-16 sm:py-20 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-8 hover:opacity-80 transition-opacity">
              <img
                src="/img/Logo.png"
                alt="LE Robotics"
                className="h-16"
              />
            </Link>
            <p className="text-gray-600 text-lg leading-relaxed max-w-2xl">
              Revolutionizing industrial automation with cutting-edge robotics solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-gray-900">
              {language === 'en' ? 'Explore' : language === 'es' ? 'Explorar' : 'Explorar'}
            </h3>
            <ul className="space-y-3">
              {[
                { path: '/products', label: t.nav.products },
                { path: '/resources', label: t.nav.resources },
                { path: '/news', label: t.nav.news },
                { path: '/about', label: t.nav.about },
                { path: '/contact', label: t.nav.contact },
              ].map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-gray-600 hover:text-red-600 transition-colors duration-300 text-lg"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-gray-900">
              {language === 'en' ? 'Legal' : language === 'es' ? 'Legal' : 'Legal'}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/privacy" 
                  className="text-gray-600 hover:text-red-600 transition-colors duration-300 text-lg"
                >
                  {t.footer.privacy}
                </Link>
              </li>
              <li>
                <Link 
                  to="#" 
                  className="text-gray-600 hover:text-red-600 transition-colors duration-300 text-lg"
                >
                  {t.footer.terms}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-300 pt-8 text-center text-gray-600 text-lg">
          <p>
            &copy; {currentYear} LE Robotics. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
};