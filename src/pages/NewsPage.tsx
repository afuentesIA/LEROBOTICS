import { useEffect, useRef, useState } from 'react';
import { Calendar, MapPin, Users, Play, ChevronRight, ExternalLink, Clock } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Language } from '../hooks/useLanguage';
import { translations } from '../i18n/translations';

gsap.registerPlugin(ScrollTrigger);

interface NewsPageProps {
  language: Language;
}

export const NewsPage = ({ language }: NewsPageProps) => {
  const t = translations[language];
  const pageRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Hero Data
  const heroData = {
    title: language === 'en' ? 'News' : language === 'es' ? 'Noticias' : 'Notícias',
    subtitle: language === 'en' ? 'Latest Updates & Events' : language === 'es' ? 'Últimas Actualizaciones y Eventos' : 'Últimas Atualizações e Eventos',
    description: language === 'en' 
      ? "Stay informed about our latest achievements, upcoming events, and groundbreaking innovations in AI vision technology."
      : language === 'es'
      ? "Manténgase informado sobre nuestros últimos logros, próximos eventos e innovaciones revolucionarias en tecnología de visión IA."
      : "Mantenha-se informado sobre nossas últimas conquistas, próximos eventos e inovações revolucionárias em tecnologia de visão IA.",
    backgroundImage: './img/hero2.png' // Imagen tenue para el hero
  };

  // Past Events Data (Eventos en los que ya estuvimos)
  const pastEvents = [
    {
      category: language === 'en' ? 'MANUFACTURING' : language === 'es' ? 'MANUFACTURA' : 'MANUFATURA',
      title: language === 'en' ? 'FABTECH 2024' : language === 'es' ? 'FABTECH 2024' : 'FABTECH 2024',
      description: language === 'en'
        ? "Successfully showcased our latest robotic vision systems to industry leaders from across North America."
        : language === 'es'
        ? "Exhibimos con éxito nuestros últimos sistemas de visión robótica a líderes de la industria de toda América del Norte."
        : "Apresentamos com sucesso nossos últimos sistemas de visão robótica para líderes do setor de toda a América do Norte.",
      location: 'Chicago, IL',
      date: 'September 2024',
      image: './img/Banner.png',
      highlights: [
        language === 'en' ? '500+ Industry Visits' : language === 'es' ? '500+ Visitas Industriales' : '500+ Visitas da Indústria',
        language === 'en' ? 'Live Demos' : language === 'es' ? 'Demostraciones en Vivo' : 'Demonstrações ao Vivo',
        language === 'en' ? 'New Partnerships' : language === 'es' ? 'Nuevas Asociaciones' : 'Novas Parcerias'
      ]
    },
    {
      category: language === 'en' ? 'ENERGY INDUSTRY' : language === 'es' ? 'INDUSTRIA ENERGÉTICA' : 'INDÚSTRIA DE ENERGIA',
      title: language === 'en' ? 'Energy Show Calgary' : language === 'es' ? 'Exposición Energía Calgary' : 'Show de Energia Calgary',
      description: language === 'en'
        ? "Demonstrated AI vision solutions for energy sector applications including pipeline inspection and safety monitoring."
        : language === 'es'
        ? "Demostramos soluciones de visión IA para aplicaciones del sector energético incluyendo inspección de tuberías y monitoreo de seguridad."
        : "Demonstramos soluções de visão IA para aplicações do setor de energia incluindo inspeção de dutos e monitoramento de segurança.",
      location: 'Calgary, Canada',
      date: 'June 2024',
      image: './img/energy.jpg',
      highlights: [
        language === 'en' ? 'Safety Innovations' : language === 'es' ? 'Innovaciones en Seguridad' : 'Inovações em Segurança',
        language === 'en' ? 'Industry Recognition' : language === 'es' ? 'Reconocimiento de la Industria' : 'Reconhecimento da Indústria'
      ]
    },
    {
      category: language === 'en' ? 'INDUSTRIAL' : language === 'es' ? 'INDUSTRIAL' : 'INDUSTRIAL',
      title: language === 'en' ? 'Abu Dhabi Industrial' : language === 'es' ? 'Industrial Abu Dhabi' : 'Industrial Abu Dhabi',
      description: language === 'en'
        ? "Expanded our presence in Middle Eastern markets with cutting-edge vision systems for industrial automation."
        : language === 'es'
        ? "Expandimos nuestra presencia en mercados de Medio Oriente con sistemas de visión de vanguardia para automatización industrial."
        : "Expandimos nossa presença nos mercados do Oriente Médio com sistemas de visão de ponta para automação industrial.",
      location: 'Abu Dhabi, UAE',
      date: 'March 2024',
      image: './img/abudabi.jpg',
      highlights: [
        language === 'en' ? 'Market Expansion' : language === 'es' ? 'Expansión de Mercado' : 'Expansão de Mercado',
        language === 'en' ? 'Regional Partners' : language === 'es' ? 'Socios Regionales' : 'Parceiros Regionais'
      ]
    }
  ];

  // Upcoming Events Data (Donde estaremos)
  const upcomingEvents = [
    {
      category: language === 'en' ? 'TECHNOLOGY' : language === 'es' ? 'TECNOLOGÍA' : 'TECNOLOGIA',
      title: language === 'en' ? 'Essen Technology Fair' : language === 'es' ? 'Feria Tecnológica Essen' : 'Feira Tecnológica Essen',
      description: language === 'en'
        ? "Join us at Germany's premier industrial technology fair to discover our latest innovations in AI vision systems."
        : language === 'es'
        ? "Únase a nosotros en la principal feria tecnológica industrial de Alemania para descubrir nuestras últimas innovaciones en sistemas de visión IA."
        : "Junte-se a nós na principal feira tecnológica industrial da Alemanha para descobrir nossas últimas inovações em sistemas de visão IA.",
      location: 'Essen, Germany',
      date: 'November 2024',
      image: './img/essen.jpg',
      status: 'confirmed',
      booth: 'A205',
      registerLink: '#'
    },
    {
      category: language === 'en' ? 'MANUFACTURING' : language === 'es' ? 'MANUFACTURA' : 'MANUFATURA',
      title: language === 'en' ? 'FABTECH 2025' : language === 'es' ? 'FABTECH 2025' : 'FABTECH 2025',
      description: language === 'en'
        ? "Returning to North America's largest manufacturing event with groundbreaking AI vision solutions."
        : language === 'es'
        ? "Regresamos al evento de manufactura más grande de América del Norte con soluciones de visión IA revolucionarias."
        : "Retornamos ao maior evento de manufatura da América do Norte com soluções revolucionárias de visão IA.",
      location: 'Chicago, IL',
      date: 'September 2025',
      image: './img/Banner.png',
      status: 'planned',
      booth: 'B15063',
      registerLink: 'https://www.xpressreg.net/register/fabt0925/landing.asp'
    },
    {
      category: language === 'en' ? 'VIRTUAL' : language === 'es' ? 'VIRTUAL' : 'VIRTUAL',
      title: language === 'en' ? 'AI Vision Summit' : language === 'es' ? 'Cumbre de Visión IA' : 'Cúpula de Visão IA',
      description: language === 'en'
        ? "Participate in our virtual summit featuring live demonstrations and expert panels on AI vision technology."
        : language === 'es'
        ? "Participe en nuestra cumbre virtual con demostraciones en vivo y paneles de expertos sobre tecnología de visión IA."
        : "Participe da nossa cúpula virtual com demonstrações ao vivo e painéis de especialistas sobre tecnologia de visão IA.",
      location: 'Online',
      date: 'December 2024',
      image: './img/live.png',
      status: 'confirmed',
      registerLink: '#'
    }
  ];

  // Live Stream Data
  const liveStreamData = {
    title: language === 'en' ? 'Live From Our Lab' : language === 'es' ? 'En Vivo Desde Nuestro Laboratorio' : 'Ao Vivo do Nosso Laboratório',
    description: language === 'en'
      ? "Watch real-time demonstrations of our latest AI vision technology and interact with our engineering team."
      : language === 'es'
      ? "Vea demostraciones en tiempo real de nuestra última tecnología de visión IA e interactúe con nuestro equipo de ingeniería."
      : "Assista a demonstrações em tempo real de nossa mais recente tecnologia de visão IA e interaja com nossa equipe de engenharia.",
    currentStream: {
      title: language === 'en' ? 'AI Vision Technology Demo' : language === 'es' ? 'Demostración de Tecnología de Visión IA' : 'Demonstração de Tecnologia de Visão IA',
      description: language === 'en'
        ? "Live demonstration of our latest object detection and recognition systems in real-world scenarios."
        : language === 'es'
        ? "Demostración en vivo de nuestros últimos sistemas de detección y reconocimiento de objetos en escenarios del mundo real."
        : "Demonstração ao vivo de nossos últimos sistemas de detecção e reconhecimento de objetos em cenários do mundo real.",
      viewers: '1,247',
      duration: language === 'en' ? 'Live since 2:00 PM EST' : language === 'es' ? 'En vivo desde 2:00 PM EST' : 'Ao vivo desde 14:00 EST'
    },
    upcomingStreams: [
      {
        time: '10:00 AM',
        title: language === 'en' ? 'Robotics Integration' : language === 'es' ? 'Integración Robótica' : 'Integração Robótica',
        description: language === 'en' ? 'Live from R&D Lab' : language === 'es' ? 'En vivo desde Laboratorio I+D' : 'Ao vivo do Laboratório P&D'
      },
      {
        time: '2:00 PM',
        title: language === 'en' ? 'Case Study: Manufacturing' : language === 'es' ? 'Caso de Estudio: Manufactura' : 'Estudo de Caso: Manufatura',
        description: language === 'en' ? 'Success stories presentation' : language === 'es' ? 'Presentación de casos de éxito' : 'Apresentação de casos de sucesso'
      },
      {
        time: '4:30 PM',
        title: language === 'en' ? 'Q&A with Engineers' : language === 'es' ? 'Preguntas y Respuestas' : 'Perguntas e Respostas',
        description: language === 'en' ? 'Live technical session' : language === 'es' ? 'Sesión técnica en vivo' : 'Sessão técnica ao vivo'
      }
    ]
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      gsap.from('.hero-title', {
        y: 100,
        opacity: 0,
        duration: 1.4,
        ease: 'power4.out',
        delay: 0.2,
      });

      gsap.from('.hero-subtitle', {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out',
        delay: 0.4,
      });

      gsap.from('.hero-description', {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power4.out',
        delay: 0.6,
      });

      // Section animations
      gsap.utils.toArray('.section-title').forEach((title) => {
        gsap.from(title as Element, {
          scrollTrigger: {
            trigger: title as Element,
            start: 'top 85%',
            end: 'top 60%',
            scrub: 1,
          },
          y: 50,
          opacity: 0,
        });
      });

      gsap.utils.toArray('.event-card, .live-card').forEach((card) => {
        gsap.from(card as Element, {
          scrollTrigger: {
            trigger: card as Element,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 1,
          },
          y: 60,
          opacity: 0,
          duration: 0.8,
        });
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen bg-white">
      {/* Hero Section con imagen tenue */}
      <section 
        className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative min-h-screen flex items-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('${heroData.backgroundImage}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="hero-title">
            <h1 className="text-7xl sm:text-8xl lg:text-9xl font-bold text-white tracking-tight leading-none mb-8">
              {heroData.title}
            </h1>
          </div>
          
          <div className="hero-subtitle">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white/90 mb-8 leading-tight">
              {heroData.subtitle}
            </h2>
          </div>

          <div className="hero-description">
            <p className="text-xl sm:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              {heroData.description}
            </p>
          </div>
        </div>
      </section>

      {/* Past Events Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="section-title text-5xl sm:text-6xl font-bold text-black text-center mb-16">
            {language === 'en' ? 'Where We\'ve Been' : language === 'es' ? 'Donde Hemos Estado' : 'Onde Estivemos'}
          </h2>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {pastEvents.map((event, index) => (
              <div key={index} className="event-card group cursor-pointer">
                <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-black text-white text-xs font-semibold rounded-full">
                        {event.category}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded-full">
                        {language === 'en' ? 'COMPLETED' : language === 'es' ? 'COMPLETADO' : 'CONCLUÍDO'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-black mb-3">{event.title}</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">{event.description}</p>
                    
                    <div className="flex items-center gap-4 text-sm text-red-600 mb-4">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{event.date}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {event.highlights.map((highlight, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>

                    <button className="w-full py-3 border-2 border-red-300 text-red-600 font-semibold rounded-xl hover:border-red-500 hover:text-red-700 transition-all duration-300">
                      {language === 'en' ? 'View Recap' : language === 'es' ? 'Ver Resumen' : 'Ver Resumo'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="section-title text-5xl sm:text-6xl font-bold text-black text-center mb-16">
            {language === 'en' ? 'Where We\'ll Be' : language === 'es' ? 'Donde Estaremos' : 'Onde Estaremos'}
          </h2>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="event-card group cursor-pointer">
                <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-red-500">
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-red-600 text-white text-xs font-semibold rounded-full">
                        {event.category}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        event.status === 'confirmed' 
                          ? 'bg-red-500 text-white' 
                          : 'bg-red-300 text-red-700'
                      }`}>
                        {event.status === 'confirmed' 
                          ? (language === 'en' ? 'CONFIRMED' : language === 'es' ? 'CONFIRMADO' : 'CONFIRMADO')
                          : (language === 'en' ? 'PLANNED' : language === 'es' ? 'PLANEADO' : 'PLANEJADO')
                        }
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-black mb-3">{event.title}</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">{event.description}</p>
                    
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center gap-2 text-sm text-red-600">
                        <MapPin className="w-4 h-4" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-red-600">
                        <Calendar className="w-4 h-4" />
                        <span>{event.date}</span>
                      </div>
                      {event.booth && (
                        <div className="flex items-center gap-2 text-sm text-red-600 font-semibold">
                          <span>{language === 'en' ? 'Booth' : language === 'es' ? 'Stand' : 'Estande'}: {event.booth}</span>
                        </div>
                      )}
                    </div>

                    <a
                      href={event.registerLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-all duration-300 text-center"
                    >
                      {language === 'en' ? 'Register Now' : language === 'es' ? 'Registrarse' : 'Registrar-se'}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Stream Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="section-title text-5xl sm:text-6xl font-bold text-center mb-16">
            {liveStreamData.title}
          </h2>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Stream con carátula */}
            <div className="lg:col-span-2">
              <div className="live-card rounded-3xl overflow-hidden bg-gray-900">
                <div className="relative aspect-video">
                  <img
                    src="./img/livesoon.jpg" // Carátula para cuando no hay video
                    alt="Live Stream Cover"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-6 left-6 flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                    <span className="px-3 py-1 bg-red-500 text-white text-sm font-bold rounded-full">
                      {language === 'en' ? 'LIVE NOW' : language === 'es' ? 'EN VIVO' : 'AO VIVO'}
                    </span>
                  </div>
                  <div className="absolute bottom-6 left-6 flex items-center gap-2 text-white">
                    <Users className="w-5 h-5" />
                    <span>{liveStreamData.currentStream.viewers} {language === 'en' ? 'watching' : language === 'es' ? 'viendo' : 'assistindo'}</span>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-300">
                      <Play className="w-8 h-8 text-black ml-1" />
                    </button>
                  </div>
                </div>
                
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-4">{liveStreamData.currentStream.title}</h3>
                  <p className="text-gray-300 mb-6">{liveStreamData.currentStream.description}</p>
                  <div className="flex items-center gap-6 text-red-400">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>{liveStreamData.currentStream.viewers} {language === 'en' ? 'viewers' : language === 'es' ? 'espectadores' : 'espectadores'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{liveStreamData.currentStream.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Upcoming Streams */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold mb-6">
                {language === 'en' ? 'Upcoming Streams' : language === 'es' ? 'Próximas Transmisiones' : 'Próximas Transmissões'}
              </h3>
              
              {liveStreamData.upcomingStreams.map((stream, index) => (
                <div key={index} className="bg-gray-800 rounded-2xl p-6 hover:bg-gray-700 transition-all duration-300 group cursor-pointer">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-red-500/20 rounded-xl flex items-center justify-center group-hover:bg-red-500/30 transition-colors duration-300">
                        <div className="text-red-400 font-semibold text-sm text-center">
                          {stream.time}
                        </div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-white mb-2 group-hover:text-red-400 transition-colors duration-300">
                        {stream.title}
                      </h4>
                      <p className="text-gray-400 text-sm">{stream.description}</p>
                      <button className="mt-3 text-red-400 text-sm font-semibold hover:text-red-300 transition-colors flex items-center gap-1">
                        {language === 'en' ? 'Set reminder' : language === 'es' ? 'Recordatorio' : 'Lembrete'}
                        <Clock className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-xl text-gray-400 mb-6">
              {liveStreamData.description}
            </p>
            <button className="px-8 py-4 bg-red-600 text-white font-semibold rounded-2xl hover:bg-red-700 transition-all duration-300 hover:scale-105">
              {language === 'en' ? 'View All Streams' : language === 'es' ? 'Ver Todas las Transmisiones' : 'Ver Todas as Transmissões'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};