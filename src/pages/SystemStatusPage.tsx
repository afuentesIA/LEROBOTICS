import { useEffect, useRef, useState } from 'react';
import { 
  Shield, Zap, Cpu, Clock, Wrench, AlertCircle, 
  Lock, Rocket, Palette, Download, ExternalLink,
  ChevronRight, Sparkles, Bell, BarChart, Server,
  Users, Calendar, Mail, Phone, MessageSquare, Cog,
  Database, Globe, ShieldCheck, TrendingUp, Award,
  Battery, Cctv, Cloud, Key
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Language } from '../hooks/useLanguage';
import { translations } from '../i18n/translations';

gsap.registerPlugin(ScrollTrigger);

interface SystemStatusPageProps {
  language: Language;
}

export const SystemStatusPage = ({ language }: SystemStatusPageProps) => {
  const pageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [currentPage, setCurrentPage] = useState<'support' | 'client' | 'status'>(
    window.location.pathname === '/support-login' ? 'support' : 
    window.location.pathname === '/client-login' ? 'client' : 'status'
  );

  // Animaciones sofisticadas
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animación hero con efecto parallax
      gsap.fromTo(heroRef.current,
        { 
          y: -80, 
          opacity: 0,
          scale: 1.05 
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: 'power4.out'
        }
      );

      // Animación de elementos flotantes rojos
      gsap.utils.toArray('.floating-element').forEach((element: any, i) => {
        gsap.to(element, {
          y: `+=${Math.random() * 40 - 20}`,
          x: `+=${Math.random() * 40 - 20}`,
          rotation: Math.random() * 20 - 10,
          duration: 3 + Math.random() * 2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.3
        });
      });

      // Animación del título principal
      gsap.from('.main-title', {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out',
        delay: 0.3
      });

      // Animación del subtítulo
      gsap.from('.subtitle', {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.6
      });

      // Animación de las tarjetas de features
      gsap.utils.toArray('.feature-card').forEach((card: any, index) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          y: 80,
          opacity: 0,
          rotationY: -15,
          duration: 0.8,
          delay: index * 0.15,
          ease: 'power3.out'
        });
      });

      // Animación del contador
      const counter = document.querySelector('.counter-number');
      if (counter) {
        gsap.from(counter, {
          textContent: 0,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: counter,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          },
          snap: { textContent: 1 }
        });
      }

      // Animación del timeline
      gsap.utils.toArray('.timeline-item').forEach((item: any, index) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          x: index % 2 === 0 ? -100 : 100,
          opacity: 0,
          duration: 0.8,
          delay: index * 0.2,
          ease: 'power3.out'
        });
      });

    }, pageRef);

    return () => ctx.revert();
  }, []);

  const t = translations[language];

  // Determinar título según la página
  const getPageTitle = () => {
    if (currentPage === 'support') {
      return language === 'en' ? 'Support Portal' : language === 'es' ? 'Portal de Soporte' : 'Portal de Suporte';
    } else if (currentPage === 'client') {
      return language === 'en' ? 'Client Portal' : language === 'es' ? 'Portal de Clientes' : 'Portal de Clientes';
    } else {
      return language === 'en' ? 'System Status' : language === 'es' ? 'Estado del Sistema' : 'Status do Sistema';
    }
  };

  const getPageSubtitle = () => {
    if (currentPage === 'support') {
      return language === 'en' 
        ? 'Our support system is currently being upgraded with enhanced security and features'
        : language === 'es'
        ? 'Nuestro sistema de soporte está siendo actualizado con seguridad y funciones mejoradas'
        : 'Nosso sistema de suporte está sendo atualizado com segurança e recursos aprimorados';
    } else if (currentPage === 'client') {
      return language === 'en'
        ? 'Our client portal is getting a major upgrade with new analytics and management tools'
        : language === 'es'
        ? 'Nuestro portal de clientes está recibiendo una importante actualización con nuevas herramientas de análisis y gestión'
        : 'Nosso portal de clientes está recebendo uma grande atualização com novas ferramentas de análise e gestão';
    } else {
      return language === 'en'
        ? 'Our platform is currently being enhanced with new features and improved performance'
        : language === 'es'
        ? 'Nuestra plataforma está siendo mejorada con nuevas funciones y rendimiento mejorado'
        : 'Nossa plataforma está sendo aprimorada com novos recursos e desempenho melhorado';
    }
  };

  const features = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: language === 'en' ? 'Enhanced Security' : language === 'es' ? 'Seguridad Mejorada' : 'Segurança Aprimorada',
      description: language === 'en' 
        ? 'Implementing advanced authentication protocols and security measures'
        : language === 'es'
        ? 'Implementando protocolos de autenticación avanzados y medidas de seguridad'
        : 'Implementando protocolos de autenticação avançados e medidas de segurança',
      color: 'from-red-600 to-red-500',
      progress: 85,
      iconBg: 'bg-red-100'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: language === 'en' ? 'Performance Boost' : language === 'es' ? 'Mejora de Rendimiento' : 'Melhoria de Desempenho',
      description: language === 'en'
        ? 'Optimizing system performance and speed for better user experience'
        : language === 'es'
        ? 'Optimizando el rendimiento y velocidad del sistema para mejor experiencia'
        : 'Otimizando o desempenho e velocidade do sistema para melhor experiência',
      color: 'from-white to-gray-100',
      progress: 70,
      iconBg: 'bg-gray-100'
    },
    {
      icon: <Cpu className="w-8 h-8" />,
      title: language === 'en' ? 'AI Integration' : language === 'es' ? 'Integración IA' : 'Integração IA',
      description: language === 'en'
        ? 'Adding artificial intelligence features for smarter automation'
        : language === 'es'
        ? 'Añadiendo características de inteligencia artificial para automatización inteligente'
        : 'Adicionando recursos de inteligência artificial para automação inteligente',
      color: 'from-red-600 to-red-500',
      progress: 60,
      iconBg: 'bg-red-100'
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: language === 'en' ? 'Data Analytics' : language === 'es' ? 'Analítica de Datos' : 'Análise de Dados',
      description: language === 'en'
        ? 'Advanced data processing and real-time analytics dashboard'
        : language === 'es'
        ? 'Procesamiento de datos avanzado y panel de análisis en tiempo real'
        : 'Processamento de dados avançado e painel de análise em tempo real',
      color: 'from-white to-gray-100',
      progress: 45,
      iconBg: 'bg-gray-100'
    }
  ];

  const stats = [
    {
      icon: <Server className="w-6 h-6" />,
      label: language === 'en' ? 'System Uptime' : language === 'es' ? 'Tiempo Activo' : 'Tempo Ativo',
      value: '99.9%',
      description: language === 'en' ? 'Guaranteed' : language === 'es' ? 'Garantizado' : 'Garantido'
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      label: language === 'en' ? 'Security Level' : language === 'es' ? 'Nivel Seguridad' : 'Nível Segurança',
      value: 'A+',
      description: language === 'en' ? 'Enterprise Grade' : language === 'es' ? 'Grado Empresarial' : 'Nível Empresarial'
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      label: language === 'en' ? 'Performance Gain' : language === 'es' ? 'Ganancia Rendimiento' : 'Ganho Desempenho',
      value: '3.5x',
      description: language === 'en' ? 'Expected' : language === 'es' ? 'Esperado' : 'Esperado'
    },
    {
      icon: <Users className="w-6 h-6" />,
      label: language === 'en' ? 'Team Working' : language === 'es' ? 'Equipo Trabajando' : 'Equipe Trabalhando',
      value: '50+',
      description: language === 'en' ? 'Developers' : language === 'es' ? 'Desarrolladores' : 'Desenvolvedores'
    }
  ];

  const timeline = [
    {
      phase: language === 'en' ? 'Planning Phase' : language === 'es' ? 'Fase de Planificación' : 'Fase de Planejamento',
      date: language === 'en' ? 'Jan - Mar 2024' : language === 'es' ? 'Ene - Mar 2024' : 'Jan - Mar 2024',
      description: language === 'en'
        ? 'Initial architecture design and requirement gathering'
        : language === 'es'
        ? 'Diseño inicial de arquitectura y recopilación de requisitos'
        : 'Design inicial da arquitetura e coleta de requisitos',
      status: 'completed',
      icon: <Calendar className="w-5 h-5" />
    },
    {
      phase: language === 'en' ? 'Development Phase' : language === 'es' ? 'Fase de Desarrollo' : 'Fase de Desenvolvimento',
      date: language === 'en' ? 'Apr - Sep 2024' : language === 'es' ? 'Abr - Sep 2024' : 'Abr - Set 2024',
      description: language === 'en'
        ? 'Core feature development and security implementation'
        : language === 'es'
        ? 'Desarrollo de características principales e implementación de seguridad'
        : 'Desenvolvimento de funcionalidades principais e implementação de segurança',
      status: 'current',
      icon: <Wrench className="w-5 h-5" />
    },
    {
      phase: language === 'en' ? 'Testing Phase' : language === 'es' ? 'Fase de Pruebas' : 'Fase de Testes',
      date: language === 'en' ? 'Oct - Dec 2024' : language === 'es' ? 'Oct - Dic 2024' : 'Out - Dez 2024',
      description: language === 'en'
        ? 'Quality assurance, security audits and performance testing'
        : language === 'es'
        ? 'Aseguramiento de calidad, auditorías de seguridad y pruebas de rendimiento'
        : 'Garantia de qualidade, auditorias de segurança e testes de desempenho',
      status: 'upcoming',
      icon: <Shield className="w-5 h-5" />
    },
    {
      phase: language === 'en' ? 'Launch Phase' : language === 'es' ? 'Fase de Lanzamiento' : 'Fase de Lançamento',
      date: language === 'en' ? 'Jan 2025' : language === 'es' ? 'Ene 2025' : 'Jan 2025',
      description: language === 'en'
        ? 'Official release and deployment to all users'
        : language === 'es'
        ? 'Lanzamiento oficial y despliegue a todos los usuarios'
        : 'Lançamento oficial e implantação para todos os usuários',
      status: 'upcoming',
      icon: <Rocket className="w-5 h-5" />
    }
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setIsSubscribed(false);
      }, 3000);
    }
  };

  return (
    <div ref={pageRef} className="min-h-screen bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      {/* Fondo decorativo con patrón y logo */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Logo de fondo sutil */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-gray-200 text-[400px] font-bold select-none">RV</div>
          </div>
        </div>
        
        {/* Elementos geométricos rojos */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-600/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-red-500/3 to-white/3 rounded-full blur-3xl" />
        
        {/* Elementos flotantes */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`floating-element absolute ${i % 2 === 0 ? 'bg-red-500/20' : 'bg-white/20'} rounded-full`}
            style={{
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
        
        {/* Grid pattern sutil */}
        <div className="absolute inset-0 bg-grid-red-500/[0.02] bg-[size:60px_60px]" />
      </div>

      {/* Hero Section con tema rojo/blanco */}
      <div 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center pt-20"
      >
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Status Badge rojo */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-500/15 backdrop-blur-sm rounded-full mb-8 animate-pulse border border-red-200/30">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <span className="text-sm font-semibold text-red-700">
              {currentPage === 'support' 
                ? (language === 'en' ? 'Support Portal' : language === 'es' ? 'Portal de Soporte' : 'Portal de Suporte')
                : currentPage === 'client'
                ? (language === 'en' ? 'Client Portal' : language === 'es' ? 'Portal Cliente' : 'Portal Cliente')
                : (language === 'en' ? 'System Status' : language === 'es' ? 'Estado del Sistema' : 'Status do Sistema')
              }
            </span>
          </div>

          {/* Main Title */}
          <h1 className="main-title text-5xl sm:text-7xl md:text-8xl font-bold mb-6">
            <span className="block text-gray-900 mb-4">
              {language === 'en' ? 'System Under' : language === 'es' ? 'Sistema en' : 'Sistema em'}
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-500 to-red-400">
              {language === 'en' ? 'Development' : language === 'es' ? 'Desarrollo' : 'Desenvolvimento'}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="subtitle text-xl sm:text-2xl text-gray-700 max-w-3xl mx-auto mb-12 leading-relaxed">
            {getPageSubtitle()}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
            <button className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold rounded-full hover:from-red-700 hover:to-red-600 transition-all hover:scale-105 shadow-lg hover:shadow-xl shadow-red-200">
              <span className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                {language === 'en' ? 'Notify Me' : language === 'es' ? 'Notificarme' : 'Notificar-me'}
              </span>
            </button>
            <button className="px-8 py-4 bg-white/90 backdrop-blur-sm border-2 border-red-600 text-red-600 font-semibold rounded-full hover:bg-red-600 hover:text-white transition-all hover:scale-105">
              <span className="flex items-center gap-2">
                <ExternalLink className="w-5 h-5" />
                {language === 'en' ? 'View Progress' : language === 'es' ? 'Ver Progreso' : 'Ver Progresso'}
              </span>
            </button>
          </div>

          {/* Live Counter */}
          <div className="inline-flex items-center gap-4 px-6 py-3.5 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-gray-200">
            <Clock className="w-5 h-5 text-red-600 animate-pulse" />
            <span className="text-sm font-medium text-gray-700">
              {language === 'en' ? 'Estimated Launch' : language === 'es' ? 'Lanzamiento Estimado' : 'Lançamento Estimado'}
            </span>
            <span className="counter-number text-3xl font-bold text-gray-900">45</span>
            <span className="text-sm font-medium text-gray-700">
              {language === 'en' ? 'Days' : language === 'es' ? 'Días' : 'Dias'}
            </span>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <div className="animate-bounce">
            <ChevronRight className="w-6 h-6 text-red-600 rotate-90" />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {language === 'en' ? 'What We\'re Building' : language === 'es' ? 'Lo Que Estamos Construyendo' : 'O Que Estamos Construindo'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {language === 'en'
              ? 'Exciting new features and improvements coming your way'
              : language === 'es'
              ? 'Nuevas funciones y mejoras emocionantes que llegarán pronto'
              : 'Novos recursos e melhorias emocionantes chegando em breve'}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {features.map((feature, index) => (
            <div key={index} className="feature-card group">
              <div className={`relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border ${
                feature.color.includes('red') ? 'border-red-100' : 'border-gray-200'
              } hover:border-red-200`}>
                {/* Progress Bar */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gray-100 rounded-t-3xl overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${feature.color} transition-all duration-1000`}
                    style={{ width: `${feature.progress}%` }}
                  />
                </div>

                <div className="mt-3">
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 ${feature.iconBg} rounded-2xl mb-6 group-hover:scale-110 transition-transform ${
                    feature.color.includes('red') ? 'text-red-600' : 'text-gray-700'
                  }`}>
                    {feature.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  
                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed mb-4">{feature.description}</p>

                  {/* Progress */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500">
                      {feature.progress}% {language === 'en' ? 'Complete' : language === 'es' ? 'Completado' : 'Completo'}
                    </span>
                    <span className={`text-sm font-bold ${
                      feature.color.includes('red') ? 'text-red-600' : 'text-gray-900'
                    }`}>
                      {feature.progress}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-200">
                <div className={`inline-flex items-center justify-center w-12 h-12 ${
                  index % 2 === 0 ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-700'
                } rounded-xl mb-4`}>
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-sm font-medium text-gray-600 mb-1">{stat.label}</div>
                <div className="text-xs text-gray-500">{stat.description}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Timeline Section */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {language === 'en' ? 'Development Timeline' : language === 'es' ? 'Cronograma de Desarrollo' : 'Cronograma de Desenvolvimento'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {language === 'en'
                ? 'Follow our journey from planning to launch'
                : language === 'es'
                ? 'Sigue nuestro viaje desde la planificación hasta el lanzamiento'
                : 'Acompanhe nossa jornada desde o planejamento até o lançamento'}
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line roja */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1.5 bg-gradient-to-b from-red-600 via-red-500 to-red-400" />

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div key={index} className="timeline-item relative">
                  <div className={`flex flex-col lg:flex-row items-center lg:items-start gap-8 ${index % 2 === 0 ? 'lg:flex-row-reverse' : ''}`}>
                    {/* Content */}
                    <div className="lg:w-1/2">
                      <div className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 border ${
                        item.status === 'current' ? 'border-2 border-red-500' : 'border border-gray-200'
                      }`}>
                        {/* Status Badge */}
                        <div className="inline-flex items-center gap-2 mb-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            item.status === 'completed' 
                              ? 'bg-red-100 text-red-600'
                              : item.status === 'current'
                              ? 'bg-red-500 text-white'
                              : 'bg-gray-100 text-gray-600'
                          }`}>
                            {item.status === 'completed' 
                              ? (language === 'en' ? 'Completed' : language === 'es' ? 'Completado' : 'Completado')
                              : item.status === 'current'
                              ? (language === 'en' ? 'In Progress' : language === 'es' ? 'En Progreso' : 'Em Progresso')
                              : (language === 'en' ? 'Upcoming' : language === 'es' ? 'Próximo' : 'Próximo')
                            }
                          </span>
                          <span className="text-sm text-gray-500">{item.date}</span>
                        </div>

                        <div className="flex items-start gap-4">
                          <div className={`p-3 rounded-lg ${
                            item.status === 'completed' 
                              ? 'bg-red-50 text-red-600'
                              : item.status === 'current'
                              ? 'bg-red-100 text-red-600'
                              : 'bg-gray-50 text-gray-600'
                          }`}>
                            {item.icon}
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{item.phase}</h3>
                            <p className="text-gray-600">{item.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Timeline Dot */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                      <div className={`w-6 h-6 rounded-full border-4 border-white shadow-lg ${
                        item.status === 'completed' 
                          ? 'bg-red-500'
                          : item.status === 'current'
                          ? 'bg-red-600 animate-pulse'
                          : 'bg-gray-400'
                      }`} />
                    </div>

                    {/* Empty Space */}
                    <div className="lg:w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact & Newsletter Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-24">
          {/* Contact Support */}
          <div className="bg-gradient-to-br from-red-900 via-red-800 to-red-700 rounded-3xl p-8 text-white">
            <div className="flex items-center gap-3 mb-6">
              <MessageSquare className="w-8 h-8 text-red-300" />
              <h3 className="text-2xl font-bold">{language === 'en' ? 'Contact Support' : language === 'es' ? 'Contactar Soporte' : 'Contatar Suporte'}</h3>
            </div>
            
            <p className="text-red-100 mb-8 leading-relaxed">
              {language === 'en'
                ? 'Have questions about our development progress? Our team is here to help.'
                : language === 'es'
                ? '¿Tienes preguntas sobre nuestro progreso de desarrollo? Nuestro equipo está aquí para ayudar.'
                : 'Tem dúvidas sobre nosso progresso de desenvolvimento? Nossa equipe está aqui para ajudar.'}
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-red-300" />
                <span className="text-red-100">support@robo-vision.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-red-300" />
                <span className="text-red-100">+1 (555) 123-4567</span>
              </div>
            </div>

            <button className="mt-8 w-full px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/20 transition-all text-white font-medium">
              {language === 'en' ? 'Send Message' : language === 'es' ? 'Enviar Mensaje' : 'Enviar Mensagem'}
            </button>
          </div>

          {/* Newsletter */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <Bell className="w-8 h-8 text-red-600" />
              <h3 className="text-2xl font-bold text-gray-900">
                {language === 'en' ? 'Stay Updated' : language === 'es' ? 'Mantente Actualizado' : 'Mantenha-se Atualizado'}
              </h3>
            </div>
            
            <p className="text-gray-600 mb-8 leading-relaxed">
              {language === 'en'
                ? 'Get notified when we launch. Be the first to experience our enhanced platform.'
                : language === 'es'
                ? 'Recibe notificaciones cuando lancemos. Sé el primero en experimentar nuestra plataforma mejorada.'
                : 'Seja notificado quando lançarmos. Seja o primeiro a experimentar nossa plataforma aprimorada.'}
            </p>

            {isSubscribed ? (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                <div className="flex items-center gap-3 text-red-700">
                  <Sparkles className="w-5 h-5" />
                  <span className="font-medium">
                    {language === 'en' ? 'Thank you for subscribing!' : language === 'es' ? '¡Gracias por suscribirte!' : 'Obrigado por se inscrever!'}
                  </span>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={language === 'en' ? 'Enter your email' : language === 'es' ? 'Ingresa tu email' : 'Digite seu email'}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold rounded-xl hover:from-red-700 hover:to-red-600 transition-all"
                >
                  {language === 'en' ? 'Subscribe for Updates' : language === 'es' ? 'Suscribirse para Actualizaciones' : 'Inscrever-se para Atualizações'}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 rounded-full mb-6 border border-red-100">
            <Sparkles className="w-4 h-4 text-red-600" />
            <span className="text-sm font-medium text-red-600">
              {language === 'en' ? 'Estimated Launch' : language === 'es' ? 'Lanzamiento Estimado' : 'Lançamento Estimado'}
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {language === 'en' ? 'Coming Soon' : language === 'es' ? 'Próximamente' : 'Em Breve'}
          </h2>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            {language === 'en'
              ? "We're working around the clock to bring you the best experience. Thank you for your patience!"
              : language === 'es'
              ? "Estamos trabajando día y noche para brindarte la mejor experiencia. ¡Gracias por tu paciencia!"
              : "Estamos trabalhando dia e noite para lhe trazer a melhor experiência. Obrigado pela sua paciência!"}
          </p>

          <div className="inline-flex items-center gap-3 px-6 py-3.5 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all">
            <Rocket className="w-5 h-5" />
            <span className="font-semibold">
              {language === 'en' ? 'Launch Countdown: 45 Days' : language === 'es' ? 'Cuenta Regresiva: 45 Días' : 'Contagem Regressiva: 45 Dias'}
            </span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Cctv className="w-8 h-8 text-red-600" />
              <span className="text-2xl font-bold text-gray-900">RoboVision</span>
            </div>
            <p className="text-gray-600">
              © 2024 RoboVision. {language === 'en' ? 'All rights reserved.' : language === 'es' ? 'Todos los derechos reservados.' : 'Todos os direitos reservados.'}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};