import { useEffect, useRef, useState } from 'react';
import { 
  Target, Eye, Lightbulb, Users, Zap, DollarSign, BarChart3, 
  Library, Scan, Cpu, Wrench, CheckCircle, Globe, MapPin,
  ArrowRight, Play, Pause, Volume2, VolumeX, Sparkles, Shield, Clock, Database
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Language } from '../hooks/useLanguage';
import { translations } from '../i18n/translations';

gsap.registerPlugin(ScrollTrigger);

interface AboutPageProps {
  language: Language;
}

export const AboutPage = ({ language }: AboutPageProps) => {
  const t = translations[language];
  const pageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showControls, setShowControls] = useState(false);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero sequence animation
      const tl = gsap.timeline();
      tl.from('.hero-badge', {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      })
      .from('.hero-title', {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out'
      }, '-=0.3')
      .from('.hero-description', {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      }, '-=0.6')
      .from('.hero-cta', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.4');

      // Process steps animation
      gsap.utils.toArray('.process-step').forEach((step, index) => {
        gsap.from(step as Element, {
          scrollTrigger: {
            trigger: step as Element,
            start: 'top 85%',
            end: 'top 50%',
            scrub: 1,
          },
          y: 60,
          opacity: 0,
          duration: 1.2,
          delay: index * 0.1,
        });
      });

      // Global presence cards
      gsap.utils.toArray('.location-card').forEach((card, index) => {
        gsap.from(card as Element, {
          scrollTrigger: {
            trigger: card as Element,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 1,
          },
          y: 80,
          opacity: 0,
          duration: 1.4,
          delay: index * 0.1,
        });
      });

      // Advantages cards
      gsap.utils.toArray('.advantage-card').forEach((card, index) => {
        gsap.from(card as Element, {
          scrollTrigger: {
            trigger: card as Element,
            start: 'top 85%',
            end: 'top 55%',
            scrub: 1,
          },
          y: 60,
          opacity: 0,
          scale: 0.9,
          duration: 1.2,
          delay: index * 0.15,
        });
      });

    }, pageRef);

    return () => ctx.revert();
  }, []);

  const globalPresence = [
    {
      flag: 'https://flagcdn.com/w160/ca.png',
      title: language === 'en' ? 'LE Robotics Canada' : language === 'es' ? 'LE Robotics Canadá' : 'LE Robotics Canadá',
      location: 'Grande Prairie, Alberta',
      description: language === 'en'
        ? 'Strategic hub for Western Canadian operations, delivering cutting-edge AI welding technology to the thriving oil and gas sector.'
        : language === 'es'
        ? 'Centro estratégico para operaciones del oeste canadiense, ofreciendo tecnología de soldadura IA de vanguardia al próspero sector de petróleo y gas.'
        : 'Hub estratégico para operações do oeste canadense, oferecendo tecnologia de soldagem IA de ponta ao próspero setor de petróleo e gás.'
    },
    {
      flag: 'https://flagcdn.com/w160/us.png',
      title: language === 'en' ? 'LE Robotics Houston' : language === 'es' ? 'LE Robotics Houston' : 'LE Robotics Houston',
      location: 'Houston, Texas',
      description: language === 'en'
        ? 'Heart of America\'s energy industry, providing innovative AI solutions to major pipeline projects throughout the Gulf Coast.'
        : language === 'es'
        ? 'Corazón de la industria energética estadounidense, proporcionando soluciones IA innovadoras a importantes proyectos de tuberías en toda la Costa del Golfo.'
        : 'Coração da indústria de energia americana, fornecendo soluções IA inovadoras para grandes projetos de pipeline em toda a Costa do Golfo.'
    },
    {
      flag: 'https://flagcdn.com/w160/mx.png',
      title: language === 'en' ? 'LE Robotics Mexico' : language === 'es' ? 'LE Robotics México' : 'LE Robotics México',
      location: 'Mexico City',
      description: language === 'en'
        ? 'Gateway to Latin America\'s industrial growth, deploying advanced humanoid technology and AI solutions to transform manufacturing.'
        : language === 'es'
        ? 'Puerta de entrada al crecimiento industrial de América Latina, implementando tecnología humanoide avanzada y soluciones IA para transformar la manufactura.'
        : 'Porta de entrada para o crescimento industrial da América Latina, implantando tecnologia humanoide avançada e soluções IA para transformar a manufatura.'
    },
    {
      flag: 'https://flagcdn.com/w160/br.png',
      title: language === 'en' ? 'LE Robotics Brazil' : language === 'es' ? 'LE Robotics Brasil' : 'LE Robotics Brasil',
      location: 'São Paulo',
      description: language === 'en'
        ? 'Serving South America\'s largest market with cutting-edge welding automation for petroleum, mining, and heavy manufacturing sectors.'
        : language === 'es'
        ? 'Atendiendo al mercado más grande de Sudamérica con automatización de soldadura de vanguardia para los sectores de petróleo, minería y fabricación pesada.'
        : 'Atendendo o maior mercado da América do Sul com automação de soldagem de ponta para os setores de petróleo, mineração e manufatura pesada.'
    }
  ];

  const expertiseItems = [
    {
      icon: <Zap className="w-7 h-7" />,
      title: language === 'en' ? 'LE Robotics Welding Systems' : language === 'es' ? 'Sistemas de Soldadura LE Robotics' : 'Sistemas de Soldagem LE Robotics',
      description: language === 'en'
        ? 'Advanced robotic welding platforms engineered for precision and efficiency in industrial environments.'
        : language === 'es'
        ? 'Plataformas de soldadura robótica avanzada diseñadas para precisión y eficiencia en entornos industriales.'
        : 'Plataformas de soldagem robótica avançada projetadas para precisão e eficiência em ambientes industriais.'
    },
    {
      icon: <Cpu className="w-7 h-7" />,
      title: language === 'en' ? 'LE Robotics AI Solutions' : language === 'es' ? 'Soluciones IA LE Robotics' : 'Soluções IA LE Robotics',
      description: language === 'en'
        ? 'Artificial intelligence integration that optimizes welding parameters and ensures consistent quality.'
        : language === 'es'
        ? 'Integración de inteligencia artificial que optimiza los parámetros de soldadura y garantiza calidad consistente.'
        : 'Integração de inteligência artificial que otimiza parâmetros de soldagem e garante qualidade consistente.'
    },
    {
      icon: <Wrench className="w-7 h-7" />,
      title: language === 'en' ? 'LE Robotics Automation' : language === 'es' ? 'Automatización LE Robotics' : 'Automação LE Robotics',
      description: language === 'en'
        ? 'Comprehensive automation solutions that transform traditional welding processes into smart operations.'
        : language === 'es'
        ? 'Soluciones integrales de automatización que transforman los procesos de soldadura tradicionales en operaciones inteligentes.'
        : 'Soluções abrangentes de automação que transformam processos de soldagem tradicionais em operações inteligentes.'
    },
    {
      icon: <Users className="w-7 h-7" />,
      title: language === 'en' ? 'LE Robotics Humanoid Technology' : language === 'es' ? 'Tecnología Humanoide LE Robotics' : 'Tecnologia Humanoide LE Robotics',
      description: language === 'en'
        ? 'Next-generation humanoid robotics designed to work alongside human operators in complex scenarios.'
        : language === 'es'
        ? 'Robótica humanoide de próxima generación diseñada para trabajar junto con operadores humanos en escenarios complejos.'
        : 'Robótica humanoide de próxima geração projetada para trabalhar junto com operadores humanos em cenários complexos.'
    }
  ];

  const processSteps = [
    {
      step: '01',
      title: language === 'en' ? 'Custom Library Development' : language === 'es' ? 'Desarrollo de Biblioteca' : 'Desenvolvimento de Biblioteca',
      description: language === 'en'
        ? 'Each client\'s unique requirements are assessed, and a customized welding library is created.'
        : language === 'es'
        ? 'Se evalúan los requisitos únicos de cada cliente y se crea una biblioteca de soldadura personalizada.'
        : 'Os requisitos exclusivos de cada cliente são avaliados e uma biblioteca de soldagem personalizada é criada.',
      icon: <Database className="w-8 h-8" />
    },
    {
      step: '02',
      title: language === 'en' ? '3D Vision Scan' : language === 'es' ? 'Escaneo 3D' : 'Varredura 3D',
      description: language === 'en'
        ? 'Our automated robot scans the joints using advanced 3D Vision technology.'
        : language === 'es'
        ? 'Nuestro robot automatizado escanea las uniones utilizando tecnología de visión 3D avanzada.'
        : 'Nosso robô automatizado escaneia as juntas usando tecnologia de visão 3D avançada.',
      icon: <Scan className="w-8 h-8" />
    },
    {
      step: '03',
      title: language === 'en' ? 'AI Processing' : language === 'es' ? 'Procesamiento IA' : 'Processamento IA',
      description: language === 'en'
        ? 'The AI analyzes the scanned data and creates the optimal welding path.'
        : language === 'es'
        ? 'La IA analiza los datos escaneados y crea la ruta de soldadura óptima.'
        : 'A IA analisa os dados escaneados e cria o caminho de soldagem ideal.',
      icon: <Cpu className="w-8 h-8" />
    },
    {
      step: '04',
      title: language === 'en' ? 'Precision Welding' : language === 'es' ? 'Soldadura de Precisión' : 'Soldagem de Precisão',
      description: language === 'en'
        ? 'The robot performs the weld precisely, eliminating human error.'
        : language === 'es'
        ? 'El robot realiza la soldadura con precisión, eliminando errores humanos.'
        : 'O robô realiza a solda com precisão, eliminando erros humanos.',
      icon: <Target className="w-8 h-8" />
    },
    {
      step: '05',
      title: language === 'en' ? 'Quality Assurance' : language === 'es' ? 'Control de Calidad' : 'Controle de Qualidade',
      description: language === 'en'
        ? 'Every weld is recorded with traceable data for quality inspection.'
        : language === 'es'
        ? 'Cada soldadura se registra con datos trazables para inspección de calidad.'
        : 'Cada solda é registrada com dados rastreáveis para inspeção de qualidade.',
      icon: <CheckCircle className="w-8 h-8" />
    }
  ];

  const advantages = [
    {
      icon: <Zap className="w-12 h-12" />,
      title: language === 'en' ? '3x Faster' : language === 'es' ? '3x Más Rápido' : '3x Mais Rápido',
      description: language === 'en'
        ? 'Complete projects in under a third of the time required for manual welding.'
        : language === 'es'
        ? 'Complete proyectos en menos de un tercio del tiempo requerido para soldadura manual.'
        : 'Conclua projetos em menos de um tercio do tempo necessário para soldagem manual.',
      metric: '300%',
      unit: 'Faster'
    },
    {
      icon: <DollarSign className="w-12 h-12" />,
      title: language === 'en' ? 'Cost Efficient' : language === 'es' ? 'Eficiencia de Costos' : 'Eficiência de Custos',
      description: language === 'en'
        ? 'Reduce labor costs and minimize waste with our optimized pricing.'
        : language === 'es'
        ? 'Reduzca costos laborales y minimice el desperdicio con nuestros precios optimizados.'
        : 'Reduza custos de mão de obra e minimize desperdícios com nossos preços otimizados.',
      metric: '40%',
      unit: 'Savings'
    },
    {
      icon: <BarChart3 className="w-12 h-12" />,
      title: language === 'en' ? 'Full Traceability' : language === 'es' ? 'Trazabilidad Completa' : 'Rastreabilidade Completa',
      description: language === 'en'
        ? 'Comprehensive data tracking for every weld with complete transparency.'
        : language === 'es'
        ? 'Seguimiento completo de datos para cada soldadura con transparencia total.'
        : 'Rastreamento abrangente de dados para cada solda com transparência total.',
      metric: '100%',
      unit: 'Tracked'
    }
  ];

  return (
    <div ref={pageRef} className="min-h-screen bg-white pt-20 overflow-hidden">
      {/* Hero Section - Actualizado con imagen de fondo como NewsPage */}
      <section 
        className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative min-h-screen flex items-center"
        style={{
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)), url('./img/about.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="hero-badge inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-8">
            <Sparkles className="w-5 h-5 text-red-400" />
            <span className="text-red-400 text-sm font-semibold tracking-wider uppercase">
              {language === 'en' ? 'Advanced Welding Technology' : language === 'es' ? 'Tecnología de Soldadura Avanzada' : 'Tecnologia de Soldagem Avançada'}
            </span>
          </div>

          <div className="hero-title">
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-none mb-6">
              {language === 'en' ? 'Industrial' : language === 'es' ? 'Industrial' : 'Industrial'}
              <br />
              <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                {language === 'en' ? 'Welding' : language === 'es' ? 'Soldadura' : 'Soldagem'}
              </span>
              <br />
              {language === 'en' ? 'Revolution' : language === 'es' ? 'Revolución' : 'Revolução'}
            </h1>
          </div>

          <div className="hero-description">
            <p className="text-xl sm:text-2xl md:text-3xl text-white/80 leading-relaxed font-light max-w-5xl mx-auto mb-10">
              {language === 'en'
                ? 'Transforming industrial welding with AI-powered precision and automation for the global energy sector.'
                : language === 'es'
                ? 'Transformando la soldadura industrial con precisión impulsada por IA y automatización para el sector energético global.'
                : 'Transformando a soldagem industrial com precisão alimentada por IA e automação para o setor energético global.'}
            </p>
          </div>

          <div className="hero-cta">
            <a
              href="#overview"
              className="group inline-flex items-center justify-center gap-4 px-12 py-5 bg-gradient-to-r from-red-600 to-red-500 text-white text-lg font-semibold rounded-2xl hover:from-red-500 hover:to-red-400 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/25 border border-red-400/20"
            >
              <span>{language === 'en' ? 'Explore Technology' : language === 'es' ? 'Explorar Tecnología' : 'Explorar Tecnologia'}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section id="overview" className="py-32 bg-white">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="section-header text-center mb-20">
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold text-black tracking-tight">
              {language === 'en' ? 'Our Vision' : language === 'es' ? 'Nuestra Visión' : 'Nossa Visão'}
            </h2>
            <div className="w-24 h-1 bg-red-500 mx-auto my-8 rounded-full"></div>
          </div>
          
          <div className="bg-gray-50 rounded-3xl p-12">
            <p className="text-xl sm:text-2xl text-gray-700 leading-relaxed text-center max-w-5xl mx-auto font-light">
              {language === 'en'
                ? 'The burgeoning oil and gas industry demands a relentless supply of high-quality pressure pipe and equipment fabrication. Our AI-automated welding process is meticulously engineered to address this critical need, delivering exceptional quality and surpassing traditional production speeds.'
                : language === 'es'
                ? 'La creciente industria del petróleo y gas demanda un suministro constante de tuberías de presión de alta calidad y fabricación de equipos. Nuestro proceso de soldadura automatizado con IA está meticulosamente diseñado para satisfacer esta necesidad crítica, ofreciendo calidad excepcional y superando las velocidades de producción tradicionales.'
                : 'A crescente indústria de petróleo e gás exige um fornecimento constante de tubulações de pressão de alta qualidade e fabricação de equipamentos. Nosso processo de soldagem automatizado com IA é meticulosamente projetado para atender a essa necessidade crítica, oferecendo qualidade excepcional e superando as velocidades de produção tradicionais.'}
            </p>
          </div>
        </div>
      </section>

      {/* Global Presence Section */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="section-header text-center mb-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-red-500 rounded-3xl text-white mb-8">
              <Globe className="w-10 h-10" />
            </div>
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold text-black tracking-tight">
              {language === 'en' ? 'Global Presence' : language === 'es' ? 'Presencia Global' : 'Presença Global'}
            </h2>
            <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto font-light mt-6">
              {language === 'en' ? 'Strategic locations serving the world\'s energy hubs' : language === 'es' ? 'Ubicaciones estratégicas sirviendo a los centros energéticos del mundo' : 'Localizações estratégicas servindo os centros energéticos do mundo'}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {globalPresence.map((location, index) => (
              <div
                key={index}
                className="location-card group bg-white rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 border border-gray-200"
              >
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={location.flag}
                    alt={`${location.title} flag`}
                    className="w-12 h-9 object-cover rounded-lg shadow-md border border-gray-200"
                  />
                  <MapPin className="w-5 h-5 text-red-500" />
                </div>
                
                <h3 className="text-2xl font-bold text-black mb-3 tracking-tight">
                  {location.title}
                </h3>
                
                <p className="text-red-500 font-semibold mb-4 text-lg">{location.location}</p>
                
                <p className="text-gray-600 leading-relaxed">
                  {location.description}
                </p>
              </div>
            ))}
          </div>

          {/* Technology & Innovation */}
          <div className="bg-white rounded-3xl p-12 shadow-xl">
            <div className="text-center mb-16">
              <h3 className="text-4xl sm:text-5xl font-bold text-black mb-6 tracking-tight">
                {language === 'en' ? 'Technology & Innovation' : language === 'es' ? 'Tecnología e Innovación' : 'Tecnologia e Inovação'}
              </h3>
            </div>
            
            <div className="grid gap-8">
              {expertiseItems.map((item, index) => (
                <div
                  key={index}
                  className="expertise-item flex items-start gap-8 p-8 rounded-2xl hover:bg-gray-50 transition-all duration-500 border border-gray-100"
                >
                  <div className="flex-shrink-0 w-16 h-16 bg-red-500 rounded-2xl text-white flex items-center justify-center shadow-lg">
                    {item.icon}
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="text-2xl font-bold text-black mb-4 tracking-tight">
                      {item.title}
                    </h4>
                    <p className="text-gray-600 leading-relaxed text-lg">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="section-header text-center mb-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-red-500 rounded-3xl text-white mb-8">
              <Target className="w-10 h-10" />
            </div>
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold text-black tracking-tight">
              {language === 'en' ? 'Welding Process' : language === 'es' ? 'Proceso de Soldadura' : 'Processo de Soldagem'}
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {processSteps.map((step, index) => (
              <div
                key={index}
                className="process-step group bg-white rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 border border-gray-200"
              >
                <div className="w-16 h-16 bg-red-500 rounded-2xl text-white flex items-center justify-center mb-6 shadow-lg">
                  {step.icon}
                </div>
                
                <div className="text-2xl font-bold text-gray-300 mb-2">{step.step}</div>
                
                <h3 className="text-xl font-bold text-black mb-4 tracking-tight">
                  {step.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="section-header text-center mb-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-red-500 rounded-3xl text-white mb-8">
              <Zap className="w-10 h-10" />
            </div>
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold text-black tracking-tight">
              {language === 'en' ? 'Key Advantages' : language === 'es' ? 'Ventajas Clave' : 'Vantagens Principais'}
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {advantages.map((advantage, index) => (
              <div
                key={index}
                className="advantage-card group bg-white rounded-3xl p-10 hover:shadow-2xl transition-all duration-500 border border-gray-200 text-center"
              >
                <div className="w-20 h-20 bg-red-500 rounded-2xl text-white flex items-center justify-center mx-auto mb-6 shadow-lg">
                  {advantage.icon}
                </div>
                
                <div className="mb-4">
                  <div className="text-4xl font-bold text-red-600">
                    {advantage.metric}
                  </div>
                  <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                    {advantage.unit}
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-black mb-4 tracking-tight">
                  {advantage.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {advantage.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section with Controls */}
      <section className="py-32 bg-white">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold text-black tracking-tight">
              {language === 'en' ? 'See It in Action' : language === 'es' ? 'Véalo en Acción' : 'Veja em Ação'}
            </h2>
          </div>
          
          <div 
            className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border border-gray-200"
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
          >
            <video
              ref={videoRef}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              className="w-full h-full object-cover"
              onClick={togglePlay}
            >
              <source
                src="./vid/about .mp4"
                type="video/mp4"
              />
            </video>
            
            {/* Video Controls */}
            <div className={`absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-4 bg-black/80 backdrop-blur-sm rounded-full px-6 py-3 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
              <button
                onClick={togglePlay}
                className="text-white hover:text-red-400 transition-colors duration-200"
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
              </button>
              
              <button
                onClick={toggleMute}
                className="text-white hover:text-red-400 transition-colors duration-200"
              >
                {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
              </button>
              
              <div className="text-white text-sm font-medium">
                {language === 'en' ? 'Company Overview' : language === 'es' ? 'Resumen de la Empresa' : 'Visão Geral da Empresa'}
              </div>
            </div>

            {/* Play Button Overlay */}
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={togglePlay}
                  className="w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 border border-white/30 shadow-2xl"
                >
                  <Play className="w-8 h-8 text-black ml-1" />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};