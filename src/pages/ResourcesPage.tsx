import { useEffect, useRef, useState } from 'react';
import { 
  Book, Video, FileText, Code, Download, ExternalLink, 
  Search, ChevronRight, Play, ArrowRight, Filter, X,
  Sparkles, Zap, TrendingUp, Globe, Camera, Cpu
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Language } from '../hooks/useLanguage';
import { translations } from '../i18n/translations';

gsap.registerPlugin(ScrollTrigger);

interface ResourcesPageProps {
  language: Language;
}

export const ResourcesPage = ({ language }: ResourcesPageProps) => {
  const t = translations[language];
  const pageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  // Animaciones más sofisticadas
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animación hero con efecto parallax más fuerte
      gsap.fromTo(heroRef.current,
        { 
          y: -100, 
          opacity: 0,
          scale: 1.1 
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.8,
          ease: 'power4.out'
        }
      );

      // Animación de partículas flotantes en hero
      const particles = gsap.utils.toArray('.floating-particle');
      particles.forEach((particle: any, i) => {
        gsap.to(particle, {
          y: `+=${Math.random() * 100 - 50}`,
          x: `+=${Math.random() * 100 - 50}`,
          rotation: Math.random() * 360,
          duration: 3 + Math.random() * 2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.2
        });
      });

      // Animación del título con efecto de máquina de escribir
      const titleChars = gsap.utils.toArray('.title-char');
      gsap.from(titleChars, {
        y: 100,
        opacity: 0,
        rotationX: -90,
        stagger: 0.05,
        duration: 0.8,
        ease: 'back.out(1.7)',
        delay: 0.5
      });

      // Animación de los iconos de categoría con efecto de aparecimiento
      gsap.utils.toArray('.category-icon').forEach((icon: any, index) => {
        gsap.from(icon, {
          scale: 0,
          rotation: -180,
          duration: 0.8,
          delay: index * 0.1,
          ease: 'elastic.out(1, 0.5)',
          scrollTrigger: {
            trigger: icon,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        });
      });

      // Animación de las tarjetas de categoría con efecto hover 3D mejorado
      gsap.utils.toArray('.category-card').forEach((card: any) => {
        // Animación de entrada
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          y: 60,
          opacity: 0,
          scale: 0.95,
          rotationY: -15,
          duration: 1,
          ease: 'power3.out'
        });

        // Efecto hover 3D mejorado
        card.addEventListener('mousemove', (e: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;
          
          gsap.to(card, {
            rotateY: x * 15,
            rotateX: -y * 15,
            translateX: x * 20,
            translateY: y * 20,
            scale: 1.05,
            duration: 0.3,
            ease: 'power2.out'
          });

          // Efecto de luz dinámica
          const light = card.querySelector('.card-light');
          if (light) {
            gsap.to(light, {
              x: e.clientX - rect.left,
              y: e.clientY - rect.top,
              duration: 0.1,
              ease: 'power2.out'
            });
          }
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            translateX: 0,
            translateY: 0,
            scale: 1,
            duration: 0.6,
            ease: 'elastic.out(1, 0.5)'
          });
        });
      });

      // Animación de recursos con efecto de flotación
      gsap.utils.toArray('.resource-item').forEach((item: any, index) => {
        // Animación de entrada
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          y: 80,
          opacity: 0,
          rotationX: -10,
          duration: 1,
          delay: index * 0.15,
          ease: 'power3.out'
        });

        // Efecto hover para recursos
        item.addEventListener('mouseenter', () => {
          gsap.to(item, {
            y: -8,
            duration: 0.4,
            ease: 'power2.out'
          });
        });

        item.addEventListener('mouseleave', () => {
          gsap.to(item, {
            y: 0,
            duration: 0.4,
            ease: 'power2.out'
          });
        });
      });

      // Animación de elementos decorativos rojos
      gsap.utils.toArray('.red-element').forEach((element: any, index) => {
        gsap.to(element, {
          scale: 1.1,
          opacity: 0.8,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: index * 0.5
        });
      });

      // Animación de olas en el hero
      const waves = gsap.utils.toArray('.wave');
      waves.forEach((wave: any, index) => {
        gsap.to(wave, {
          x: '+=100',
          duration: 15 + index * 5,
          repeat: -1,
          ease: 'none'
        });
      });

    }, pageRef);

    return () => ctx.revert();
  }, []);

  const categories = [
    { 
      id: 'documentation',
      name: t.resources.documentation, 
      icon: <Book className="w-7 h-7 text-white" />, 
      count: 45, 
      color: 'from-red-500 to-red-600',
      gradient: 'bg-gradient-to-br from-red-500 to-red-600',
      accent: 'bg-red-100 text-red-600',
      iconColor: 'text-white'
    },
    { 
      id: 'videos',
      name: t.resources.videos, 
      icon: <Video className="w-7 h-7 text-white" />, 
      count: 28, 
      color: 'from-red-400 to-red-500',
      gradient: 'bg-gradient-to-br from-red-400 to-red-500',
      accent: 'bg-red-50 text-red-500',
      iconColor: 'text-white'
    },
    { 
      id: 'guides',
      name: t.resources.guides, 
      icon: <FileText className="w-7 h-7 text-red-600" />, 
      count: 32, 
      color: 'from-gray-100 to-white',
      gradient: 'bg-gradient-to-br from-gray-100 to-white',
      accent: 'bg-gray-100 text-gray-700 border border-gray-200',
      iconColor: 'text-red-600'
    },
    { 
      id: 'tutorials',
      name: t.resources.tutorials, 
      icon: <Code className="w-7 h-7 text-red-600" />, 
      count: 56, 
      color: 'from-gray-100 to-white',
      gradient: 'bg-gradient-to-br from-gray-100 to-white',
      accent: 'bg-gray-100 text-gray-700 border border-gray-200',
      iconColor: 'text-red-600'
    },
  ];

  const filters = [
    { id: 'all', label: language === 'en' ? 'All' : language === 'es' ? 'Todos' : 'Todos', color: 'red' },
    { id: 'documentation', label: t.resources.documentation, color: 'red' },
    { id: 'videos', label: t.resources.videos, color: 'red' },
    { id: 'guides', label: t.resources.guides, color: 'gray' },
    { id: 'tutorials', label: t.resources.tutorials, color: 'gray' },
  ];

  const resources = [
    {
      title: language === 'en' ? 'Quick Start Guide' : language === 'es' ? 'Guía Inicio Rápido' : 'Guia Início Rápido',
      description:
        language === 'en'
          ? 'Get your AI camera up and running in minutes with our comprehensive quick start guide'
          : language === 'es'
          ? 'Pon tu cámara IA en funcionamiento en minutos con nuestra guía completa de inicio rápido'
          : 'Coloque sua câmera IA em funcionamento em minutos com nosso guia completo de início rápido',
      category: 'documentation',
      type: 'PDF',
      size: '2.4 MB',
      image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: true,
      badgeColor: 'bg-red-500'
    },
    {
      title: language === 'en' ? 'API Reference' : language === 'es' ? 'Referencia API' : 'Referência API',
      description:
        language === 'en'
          ? 'Complete API documentation with code examples and best practices for integration'
          : language === 'es'
          ? 'Documentación API completa con ejemplos de código y mejores prácticas de integración'
          : 'Documentação API completa com exemplos de código e melhores práticas de integração',
      category: 'documentation',
      type: 'Web',
      size: '-',
      image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: false,
      badgeColor: 'bg-red-500'
    },
    {
      title:
        language === 'en' ? 'Installation Tutorial' : language === 'es' ? 'Tutorial de Instalación' : 'Tutorial de Instalação',
      description:
        language === 'en'
          ? 'Step-by-step video guide for hardware installation and initial setup'
          : language === 'es'
          ? 'Guía en video paso a paso para instalación de hardware y configuración inicial'
          : 'Guia em vídeo passo a passo para instalação de hardware e configuração inicial',
      category: 'videos',
      type: 'Video',
      size: '45 min',
      image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: true,
      badgeColor: 'bg-red-500'
    },
    {
      title:
        language === 'en'
          ? 'Machine Learning Integration'
          : language === 'es'
          ? 'Integración Machine Learning'
          : 'Integração Machine Learning',
      description:
        language === 'en'
          ? 'Learn how to integrate custom ML models with our AI camera platform'
          : language === 'es'
          ? 'Aprende cómo integrar modelos ML personalizados con nuestra plataforma de cámara IA'
          : 'Aprenda como integrar modelos ML personalizados com nossa plataforma de câmera IA',
      category: 'tutorials',
      type: 'Interactive',
      size: '2 hours',
      image: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: false,
      badgeColor: 'bg-gray-500'
    },
    {
      title:
        language === 'en'
          ? 'Production Deployment'
          : language === 'es'
          ? 'Despliegue en Producción'
          : 'Implantação em Produção',
      description:
        language === 'en'
          ? 'Best practices for deploying and scaling AI camera systems in production environments'
          : language === 'es'
          ? 'Mejores prácticas para desplegar y escalar sistemas de cámara IA en entornos de producción'
          : 'Melhores práticas para implantar e escalar sistemas de câmera IA em ambientes de produção',
      category: 'guides',
      type: 'Guide',
      size: '15 pages',
      image: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: true,
      badgeColor: 'bg-gray-500'
    },
    {
      title:
        language === 'en'
          ? 'Troubleshooting Guide'
          : language === 'es'
          ? 'Guía de Solución de Problemas'
          : 'Guia de Solução de Problemas',
      description:
        language === 'en'
          ? 'Common issues and their solutions for quick problem resolution'
          : language === 'es'
          ? 'Problemas comunes y sus soluciones para resolución rápida de problemas'
          : 'Problemas comuns e suas soluções para resolução rápida de problemas',
      category: 'guides',
      type: 'PDF',
      size: '3.1 MB',
      image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: false,
      badgeColor: 'bg-gray-500'
    },
  ];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'all' || resource.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div ref={pageRef} className="min-h-screen overflow-hidden">
      {/* Fondo de imagen que cubre toda la pantalla */}
      <div className="fixed inset-0 z-0">
        <div className="relative w-full h-full">
          {/* Imagen de fondo principal */}
          <img
            src="/img/resorces.png"
            alt="AI Background"
            className="w-full h-full object-cover"
          />
          
          {/* Overlay para oscurecer la imagen y que el texto sea legible */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/30" />
          
          {/* Elementos decorativos adicionales */}
          <div className="absolute inset-0 bg-gradient-to-tr from-red-500/10 via-transparent to-blue-500/10" />
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
        </div>
      </div>

      {/* Hero Section con fondo dinámico */}
      <div 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center pt-16"
      >
        {/* Patrones decorativos animados - se mantienen */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Olas animadas */}
          <div className="absolute bottom-0 left-0 right-0 h-40">
            <div className="wave absolute bottom-0 left-0 w-[200%] h-full bg-gradient-to-t from-red-500/20 to-transparent rounded-[50%]" />
            <div className="wave absolute bottom-0 left-0 w-[200%] h-32 bg-gradient-to-t from-red-500/10 to-transparent rounded-[50%]" />
          </div>
          
          {/* Partículas flotantes */}
          {[...Array(8)].map((_, i) => (
            <div 
              key={i}
              className={`floating-particle absolute ${i % 2 === 0 ? 'bg-red-500/30' : 'bg-white/20'} rounded-full`}
              style={{
                width: `${Math.random() * 6 + 2}px`,
                height: `${Math.random() * 6 + 2}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
            />
          ))}

          {/* Elementos geométricos rojos animados */}
          <div className="red-element absolute top-1/4 left-1/4 w-64 h-64 bg-red-500/20 rounded-full blur-3xl" />
          <div className="red-element absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl" />
        </div>

        {/* Contenido Hero */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge animado */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/20 backdrop-blur-sm rounded-full mb-8 animate-pulse">
            <Sparkles className="w-4 h-4 text-red-300" />
            <span className="text-sm font-medium text-red-200">
              {language === 'en' ? 'New Resources Available' : language === 'es' ? 'Nuevos Recursos Disponibles' : 'Novos Recursos Disponíveis'}
            </span>
          </div>

          {/* Título con efecto de máquina de escribir */}
          <h1 className="mb-6">
            <span className="block text-5xl sm:text-7xl md:text-8xl font-bold text-white mb-4 tracking-tighter">
              {Array.from(t.resources.title).map((char, index) => (
                <span 
                  key={index} 
                  className="title-char inline-block"
                  style={{ 
                    color: index % 3 === 0 ? '#ffffff' : 
                           index % 3 === 1 ? '#fecaca' : '#fef2f2'
                  }}
                >
                  {char}
                </span>
              ))}
            </span>
            <span className="block text-4xl sm:text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-red-300 to-white mb-6">
              {language === 'en' ? 'Elevate Your Vision' : language === 'es' ? 'Eleva Tu Visión' : 'Eleve Sua Visão'}
            </span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto leading-relaxed">
            {t.resources.subtitle}
          </p>

          {/* Stats animadas */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2 flex items-center justify-center">
                <Zap className="w-6 h-6 text-red-400 mr-2" />
                150+
              </div>
              <div className="text-gray-300">Resources</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2 flex items-center justify-center">
                <Globe className="w-6 h-6 text-red-400 mr-2" />
               3+
              </div>
              <div className="text-gray-300">Languages</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-red-400 mr-2" />
                100%
              </div>
              <div className="text-gray-300">Satisfaction</div>
            </div>
          </div>

          {/* Search Bar con diseño Apple */}
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/30 to-red-600/30 rounded-3xl blur-xl" />
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-300" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === 'en' ? 'Search documentation, videos, guides...' : language === 'es' ? 'Buscar documentación, videos, guías...' : 'Buscar documentação, vídeos, guias...'}
                className="w-full pl-12 pr-12 py-5 bg-white/15 backdrop-blur-md border border-white/30 rounded-2xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-5 flex items-center hover:text-red-300 transition-colors"
                >
                  <X className="h-5 w-5 text-gray-300" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="animate-bounce">
            <ChevronRight className="w-6 h-6 text-white rotate-90" />
          </div>
        </div>
      </div>

      {/* Contenido principal con fondo blanco que se superpone */}
      <div className="relative z-10 bg-gradient-to-b from-white via-white to-gray-50 pt-20">
        {/* Categories Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((category, index) => (
              <div
                key={index}
                className="category-card group cursor-pointer transform-gpu"
              >
                <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-200">
                  {/* Efecto de luz dinámica */}
                  <div className="card-light absolute inset-0 bg-gradient-to-br from-red-500/0 via-red-500/0 to-red-500/0 group-hover:via-red-500/5 group-hover:to-red-500/10 transition-all duration-300 pointer-events-none" />
                  
                  {/* Background gradient */}
                  <div className={`absolute inset-0 ${category.gradient} opacity-0 group-hover:opacity-[0.05] transition-opacity duration-500`} />
                  
                  {/* Glass effect */}
                  <div className="relative">
                    <div className={`category-icon inline-flex items-center justify-center w-16 h-16 ${category.gradient} rounded-2xl mb-6 shadow-lg ${category.iconColor}`}>
                      {category.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{category.name}</h3>
                    <div className="flex items-center justify-between">
                      <p className="text-3xl font-bold text-gray-900">{category.count}</p>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-red-600 group-hover:translate-x-2 transition-all" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-2">
                {language === 'en' ? 'Featured Resources' : language === 'es' ? 'Recursos Destacados' : 'Recursos em Destaque'}
              </h2>
              <p className="text-gray-600">
                {filteredResources.length} {language === 'en' ? 'resources found' : language === 'es' ? 'recursos encontrados' : 'recursos encontrados'}
              </p>
            </div>
            
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              <Filter className="w-5 h-5 text-gray-400" />
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                    activeFilter === filter.id
                      ? filter.color === 'red'
                        ? 'bg-red-600 text-white shadow-lg shadow-red-200'
                        : 'bg-gray-900 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Featured Resources Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            {filteredResources.filter(r => r.featured).map((resource, index) => (
              <div key={index} className="resource-item group">
                <div className="relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-200">
                  {/* Borde rojo animado en hover */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-red-500/30 rounded-3xl transition-all duration-300" />
                  
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={resource.image}
                      alt={resource.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm text-gray-900 text-sm font-semibold rounded-full">
                        ⭐ {language === 'en' ? 'Featured' : language === 'es' ? 'Destacado' : 'Destaque'}
                      </span>
                      <span className={`px-3 py-1.5 ${resource.badgeColor} text-white text-sm font-semibold rounded-full`}>
                        {resource.type}
                      </span>
                    </div>
                  </div>

                  <div className="p-8">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                      <span className="font-medium capitalize">{resource.category}</span>
                      <span>•</span>
                      <span>{resource.size}</span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors">
                      {resource.title}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed mb-6">{resource.description}</p>

                    <div className="flex gap-3">
                      <button className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl">
                        <Download className="w-4 h-4" />
                        <span>{language === 'en' ? 'Download' : language === 'es' ? 'Descargar' : 'Baixar'}</span>
                      </button>
                      <button className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border-2 border-gray-900 text-gray-900 font-semibold rounded-xl hover:bg-gray-900 hover:text-white transition-all hover:scale-[1.02] active:scale-[0.98]">
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* All Resources List */}
          <div className="space-y-4">
            {filteredResources.filter(r => !r.featured).map((resource, index) => (
              <div key={index} className="resource-item group">
                <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-200 hover:border-gray-300">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-48">
                      <div className="relative aspect-video md:aspect-square rounded-xl overflow-hidden">
                        <img
                          src={resource.image}
                          alt={resource.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className={`absolute top-3 right-3 ${resource.badgeColor} text-white px-2 py-1 rounded-md text-xs font-semibold`}>
                          {resource.type}
                        </div>
                        {resource.type === 'Video' && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-12 h-12 bg-red-600/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-red-700 transition-colors">
                              <Play className="w-5 h-5 text-white ml-1" />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex-1 flex flex-col">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                              <span className={`px-3 py-1 rounded-full font-medium ${
                                resource.category === 'documentation' || resource.category === 'videos'
                                  ? 'bg-red-50 text-red-600'
                                  : 'bg-gray-100 text-gray-700'
                              }`}>
                                {resource.category}
                              </span>
                              <span>•</span>
                              <span>{resource.size}</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                              {resource.title}
                            </h3>
                          </div>
                        </div>
                        <p className="text-gray-600 leading-relaxed mb-4">{resource.description}</p>
                      </div>

                      <div className="flex gap-3">
                        <button className={`inline-flex items-center gap-2 px-5 py-2.5 ${
                          resource.category === 'documentation' || resource.category === 'videos'
                            ? 'bg-red-600 hover:bg-red-700'
                            : 'bg-gray-900 hover:bg-gray-800'
                        } text-white font-medium rounded-lg transition-all hover:scale-[1.02]`}>
                          <Download className="w-4 h-4" />
                          <span>{language === 'en' ? 'Download' : language === 'es' ? 'Descargar' : 'Baixar'}</span>
                        </button>
                        <button className="inline-flex items-center gap-2 px-5 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all hover:scale-[1.02]">
                          <ExternalLink className="w-4 h-4" />
                          <span>{language === 'en' ? 'View' : language === 'es' ? 'Ver' : 'Ver'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredResources.length === 0 && (
            <div className="text-center py-20">
              <div className="w-24 h-24 mx-auto bg-red-50 rounded-full flex items-center justify-center mb-6">
                <Search className="w-12 h-12 text-red-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {language === 'en' ? 'No resources found' : language === 'es' ? 'No se encontraron recursos' : 'Nenhum recurso encontrado'}
              </h3>
              <p className="text-gray-600 max-w-md mx-auto mb-8">
                {language === 'en' 
                  ? 'Try adjusting your search or filter to find what you\'re looking for.'
                  : language === 'es'
                  ? 'Intenta ajustar tu búsqueda o filtro para encontrar lo que buscas.'
                  : 'Tente ajustar sua pesquisa ou filtro para encontrar o que procura.'}
              </p>
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setActiveFilter('all');
                }}
                className="px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
              >
                {language === 'en' ? 'Clear filters' : language === 'es' ? 'Limpiar filtros' : 'Limpar filtros'}
              </button>
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white py-24">
          {/* Elementos decorativos */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-red-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-600/5 rounded-full blur-3xl" />
          
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Cpu className="w-16 h-16 mx-auto mb-6 text-red-400" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {language === 'en' 
                ? 'Ready to Transform Your Vision?'
                : language === 'es'
                ? '¿Listo para Transformar Tu Visión?'
                : 'Pronto para Transformar Sua Visão?'}
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              {language === 'en'
                ? 'Join thousands of developers and companies using our AI camera technology to build the future.'
                : language === 'es'
                ? 'Únete a miles de desarrolladores y empresas usando nuestra tecnología de cámara IA para construir el futuro.'
                : 'Junte-se a milhares de desenvolvedores e empresas usando nossa tecnologia de câmera IA para construir o futuro.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-red-600 text-white font-semibold rounded-full hover:bg-red-700 transition-all hover:scale-105 shadow-lg hover:shadow-xl">
                <span>{language === 'en' ? 'Start Free Trial' : language === 'es' ? 'Comenzar Prueba Gratis' : 'Iniciar Teste Grátis'}</span>
              </button>
              <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full hover:bg-white/20 transition-all hover:scale-105 border border-white/20">
                <span>{language === 'en' ? 'Schedule a Demo' : language === 'es' ? 'Agendar una Demo' : 'Agendar uma Demonstração'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <Camera className="w-8 h-8 text-red-600 mx-auto mb-4" />
              <p className="text-gray-600">
                © 2024 AI Vision. {language === 'en' ? 'All rights reserved.' : language === 'es' ? 'Todos los derechos reservados.' : 'Todos os direitos reservados.'}
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};