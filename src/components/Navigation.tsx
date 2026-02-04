import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, LogIn, Users, Lock, Shield } from 'lucide-react';
import { Language } from '../hooks/useLanguage';
import { translations } from '../i18n/translations';

interface NavigationProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

export const Navigation = ({ language, onLanguageChange }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showResourcesMenu, setShowResourcesMenu] = useState(false);
  const [isResourcesMenuHovered, setIsResourcesMenuHovered] = useState(false);
  const location = useLocation();
  const langMenuRef = useRef<HTMLDivElement>(null);
  const langButtonRef = useRef<HTMLButtonElement>(null);
  const resourcesMenuRef = useRef<HTMLDivElement>(null);
  const resourcesContainerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const t = translations[language];

  // Eliminamos el efecto de scroll ya que siempre queremos el diseño scrolled
  useEffect(() => {
    setIsOpen(false);
    setShowLangMenu(false);
    setShowResourcesMenu(false);
    setIsResourcesMenuHovered(false);
  }, [location]);

  // Cerrar menús al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        langMenuRef.current && 
        !langMenuRef.current.contains(event.target as Node) &&
        langButtonRef.current &&
        !langButtonRef.current.contains(event.target as Node)
      ) {
        setShowLangMenu(false);
      }
      if (navRef.current && !navRef.current.contains(event.target as Node) && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, showLangMenu]);

  // Efecto para manejar el menú de Resources con delay
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (!isResourcesMenuHovered && !showResourcesMenu) {
      return;
    }
    
    if (!isResourcesMenuHovered && showResourcesMenu) {
      timer = setTimeout(() => {
        if (!isResourcesMenuHovered) {
          setShowResourcesMenu(false);
        }
      }, 300);
    } else if (isResourcesMenuHovered && !showResourcesMenu) {
      setShowResourcesMenu(true);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isResourcesMenuHovered, showResourcesMenu]);

  const languages: { code: Language; name: string; nativeName: string; flag: string }[] = [
    { 
      code: 'en', 
      name: 'English', 
      nativeName: 'English',
      flag: 'https://flagcdn.com/w40/us.png'
    },
    { 
      code: 'es', 
      name: 'Spanish', 
      nativeName: 'Español',
      flag: 'https://flagcdn.com/w40/mx.png'
    },
    { 
      code: 'pt', 
      name: 'Portuguese', 
      nativeName: 'Português',
      flag: 'https://flagcdn.com/w40/br.png'
    },
  ];

  // Opciones principales de navegación
  const navItems = [
    { path: '/', label: t.nav.home },
    { path: '/products', label: t.nav.products },
    { 
      path: '/resources', 
      label: t.nav.resources,
      hasSubmenu: true 
    },
    { path: '/news', label: t.nav.news },
    { path: '/about', label: t.nav.about },
    { path: '/contact', label: t.nav.contact },
  ];

  // Submenú de Resources SIMPLIFICADO - SOLO LOGINS
  const resourcesSubmenu = [
    { 
      path: '/support-login', 
      label: 'Support LogIn',
      icon: <LogIn className="w-4 h-4" />,
      description: 'Technical support portal',
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    { 
      path: '/client-login', 
      label: 'Client LogIn',
      icon: <Users className="w-4 h-4" />,
      description: 'Client dashboard access',
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    }
  ];

  const isResourcesActive = location.pathname === '/resources';

  const currentLanguage = languages.find(lang => lang.code === language);

  // Función para manejar el cambio de idioma
  const handleLanguageChange = (langCode: Language) => {
    console.log('Changing language to:', langCode);
    onLanguageChange(langCode);
    setShowLangMenu(false);
    setIsOpen(false);
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-200/50"
    >
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link
            to="/"
            className="flex items-center transition-all duration-300 hover:opacity-80 flex-shrink-0 group"
          >
            <img
              src="/img/Logo.png"
              alt="RoboVision"
              className="h-40 transition-all duration-500 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation - Centered */}
          <div className="hidden lg:flex items-center space-x-1 flex-1 justify-center">
            {navItems.map((item) => (
              <div 
                key={item.path}
                className="relative"
              >
                {item.hasSubmenu ? (
                  <div 
                    ref={resourcesContainerRef}
                    className="relative"
                    onMouseEnter={() => setIsResourcesMenuHovered(true)}
                    onMouseLeave={() => setIsResourcesMenuHovered(false)}
                  >
                    <Link
                      to={item.path}
                      className={`relative px-6 py-3 text-base font-semibold transition-all duration-300 rounded-2xl mx-1 group flex items-center gap-1 ${
                        isResourcesActive
                          ? 'text-white bg-gradient-to-r from-red-600 to-red-500 shadow-lg shadow-red-500/25'
                          : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100/80'
                      } ${
                        showResourcesMenu && !isResourcesActive
                          ? 'bg-gray-100/80 text-gray-900'
                          : ''
                      }`}
                    >
                      {item.label}
                      <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${
                        showResourcesMenu ? 'rotate-180' : ''
                      }`} />
                    </Link>
                    
                    {/* Submenú de Resources - SOLO LOGINS */}
                    {showResourcesMenu && (
                      <div 
                        ref={resourcesMenuRef}
                        className="absolute left-0 top-full pt-1"
                      >
                        <div 
                          className="w-64 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-gray-200 z-50 animate-in slide-in-from-top-2 duration-200"
                        >
                          <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-red-50 to-white">
                            <div className="flex items-center gap-2">
                              <Shield className="w-4 h-4 text-red-600" />
                              <div className="text-sm font-bold text-gray-900">Secure Access</div>
                            </div>
                            <div className="text-xs text-gray-500 mt-1">Login to platform services</div>
                          </div>
                          {resourcesSubmenu.map((subItem) => {
                            const isActive = location.pathname === subItem.path;
                            return (
                              <Link
                                key={subItem.path}
                                to={subItem.path}
                                className={`block px-4 py-3 transition-all duration-200 border-b border-gray-100 last:border-b-0 hover:bg-red-50/50 group ${
                                  isActive
                                    ? 'bg-gradient-to-r from-red-600 to-red-500 text-white'
                                    : 'text-gray-700'
                                }`}
                                onClick={() => {
                                  setShowResourcesMenu(false);
                                  setIsResourcesMenuHovered(false);
                                }}
                              >
                                <div className="flex items-start gap-3">
                                  <div className={`p-2 rounded-lg transition-colors duration-200 ${
                                    isActive 
                                      ? 'bg-white/20 text-white' 
                                      : `${subItem.bgColor} ${subItem.color} group-hover:bg-red-100`
                                  }`}>
                                    {subItem.icon}
                                  </div>
                                  <div className="flex-1">
                                    <div className="text-sm font-medium">{subItem.label}</div>
                                    <div className={`text-xs mt-1 ${
                                      isActive ? 'text-white/80' : 'text-gray-500'
                                    }`}>
                                      {subItem.description}
                                    </div>
                                  </div>
                                  {isActive && (
                                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                                  )}
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className={`relative px-6 py-3 text-base font-semibold transition-all duration-300 rounded-2xl mx-1 group ${
                      location.pathname === item.path
                        ? 'text-white bg-gradient-to-r from-red-600 to-red-500 shadow-lg shadow-red-500/25'
                        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100/80'
                    }`}
                  >
                    {item.label}
                    {location.pathname === item.path && (
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-600 to-red-500 -z-10" />
                    )}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Desktop Language Selector */}
          <div className="hidden lg:flex items-center space-x-4 flex-shrink-0">
            <div className="relative">
              <button
                ref={langButtonRef}
                onClick={(e) => {
                  console.log('Desktop language button clicked');
                  e.stopPropagation();
                  setShowLangMenu(prev => !prev);
                }}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-2xl transition-all duration-300 border text-gray-700 border-gray-300 hover:bg-gray-100 ${
                  showLangMenu ? 'bg-gray-100' : ''
                }`}
              >
                {currentLanguage && (
                  <img 
                    src={currentLanguage.flag} 
                    alt={currentLanguage.name}
                    className="w-6 h-4 rounded object-cover"
                  />
                )}
                <span className="text-sm font-semibold capitalize">{language}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showLangMenu ? 'rotate-180' : ''}`} />
              </button>
              
              {showLangMenu && (
                <div 
                  ref={langMenuRef}
                  className="absolute right-0 mt-2 w-56 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-gray-200 z-50"
                >
                  <div className="p-3 border-b border-gray-200">
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Select Language</div>
                  </div>
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        console.log('Desktop selected language:', lang.code);
                        handleLanguageChange(lang.code);
                      }}
                      className={`w-full text-left px-4 py-3 transition-all duration-200 border-b border-gray-100 last:border-b-0 flex items-center gap-4 hover:bg-gray-50 group ${
                        language === lang.code
                          ? 'bg-gradient-to-r from-red-600 to-red-500 text-white'
                          : 'text-gray-700'
                      }`}
                    >
                      <img 
                        src={lang.flag} 
                        alt={lang.name}
                        className={`w-7 h-5 rounded object-cover transition-all duration-200 ${
                          language === lang.code ? 'ring-2 ring-white' : 'group-hover:scale-110'
                        }`}
                      />
                      <div className="flex flex-col items-start">
                        <span className="text-sm font-medium">{lang.nativeName}</span>
                        <span className={`text-xs ${
                          language === lang.code ? 'text-white/80' : 'text-gray-500'
                        }`}>
                          {lang.name}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Controls */}
          <div className="lg:hidden flex items-center space-x-2">
            <div className="flex items-center p-3">
              {currentLanguage && (
                <img 
                  src={currentLanguage.flag} 
                  alt={currentLanguage.name}
                  className="w-6 h-4 rounded object-cover"
                />
              )}
            </div>

            <button
              onClick={() => {
                setIsOpen(!isOpen);
                setShowLangMenu(false);
              }}
              className="p-3 rounded-xl transition-colors text-gray-700 hover:bg-gray-100"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div 
          ref={mobileMenuRef}
          className="lg:hidden bg-white/98 backdrop-blur-xl shadow-2xl border-t border-gray-200"
          style={{
            maxHeight: 'calc(100vh - 80px)',
            overflowY: 'auto'
          }}
        >
          <div className="px-4 pt-2 pb-8 space-y-2">
            {navItems.map((item) => (
              <div key={item.path}>
                {item.hasSubmenu ? (
                  <div className="space-y-0">
                    {/* EN MÓVIL: Mostramos directamente el enlace a Resources (sin toggle) */}
                    <Link
                      to={item.path}
                      className={`block w-full text-left px-6 py-4 text-lg font-semibold rounded-xl transition-all duration-300 ${
                        isResourcesActive
                          ? 'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="flex items-center justify-between">
                        <span>{item.label}</span>
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      </div>
                    </Link>
                    
                    {/* EN MÓVIL: Submenú SIEMPRE visible debajo de Resources */}
                    <div className="pl-8 space-y-1 mt-1">
                      {/* Separador visual */}
                      <div className="px-4 py-1">
                        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                          Secure Access
                        </div>
                      </div>
                      
                      {resourcesSubmenu.map((subItem) => (
                        <Link
                          key={subItem.path}
                          to={subItem.path}
                          className={`block w-full text-left px-6 py-3 text-base font-medium rounded-xl transition-all duration-300 flex items-center gap-3 ${
                            location.pathname === subItem.path
                              ? 'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg'
                              : 'text-gray-700 hover:bg-red-50'
                          }`}
                          onClick={() => setIsOpen(false)}
                        >
                          <div className={`p-2 rounded-lg ${
                            location.pathname === subItem.path 
                              ? 'bg-white/20 text-white' 
                              : `${subItem.bgColor} ${subItem.color}`
                          }`}>
                            {subItem.icon}
                          </div>
                          <div className="flex-1">
                            <div className="font-medium">{subItem.label}</div>
                            <div className="text-xs text-gray-500 mt-1">{subItem.description}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className={`block w-full text-left px-6 py-4 text-lg font-semibold rounded-xl transition-all duration-300 ${
                      location.pathname === item.path
                        ? 'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            
            {/* Mobile Language Selector */}
            <div className="pt-6 border-t border-gray-200 mt-4">
              <div className="px-6">
                <div className="text-sm font-semibold text-gray-500 mb-4">Select Language</div>
                <div className="grid grid-cols-1 gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        console.log('Mobile menu selected language:', lang.code);
                        handleLanguageChange(lang.code);
                      }}
                      className={`w-full px-4 py-3 text-base font-medium rounded-xl transition-all duration-200 flex items-center gap-4 ${
                        language === lang.code
                          ? 'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <img 
                        src={lang.flag} 
                        alt={lang.name}
                        className="w-7 h-5 rounded object-cover"
                      />
                      <div className="flex flex-col items-start">
                        <span className="text-sm font-medium">{lang.nativeName}</span>
                        <span className="text-xs text-gray-500">{lang.name}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
