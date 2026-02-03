import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Camera, Zap, Eye, ChevronRight, MapPin, Phone, Mail } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Language } from '../hooks/useLanguage';
import { translations } from '../i18n/translations';
import { ChatBot } from '../components/ChatBot';

gsap.registerPlugin(ScrollTrigger);

interface HomeProps {
  language: Language;
  onLanguageChange: (language: Language) => void;
}

export const Home = ({ language, onLanguageChange }: HomeProps) => {
  const t = translations[language];
  const heroRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const visionRef = useRef<HTMLDivElement>(null);
  const noProgrammingRef = useRef<HTMLDivElement>(null);
  const [fpsCount, setFpsCount] = useState(0);
  const [precisionCount, setPrecisionCount] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(videoRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '+=800',
          scrub: 1.5,
        },
        scale: 0.6,
        borderRadius: '48px',
        yPercent: -15,
        ease: 'power2.inOut',
      });

      gsap.to(textRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '+=600',
          scrub: 1,
        },
        opacity: 0,
        yPercent: -50,
        ease: 'power2.inOut',
      });

      const tl = gsap.timeline({ delay: 0.5 });
      tl.from(textRef.current?.querySelectorAll('.hero-text-line') || [], {
        y: 150,
        opacity: 0,
        duration: 1.6,
        stagger: 0.2,
        ease: 'power4.out',
      }).from(
        textRef.current?.querySelector('.hero-cta') || {},
        {
          y: 60,
          opacity: 0,
          duration: 1.2,
          ease: 'power3.out',
        },
        '-=0.6'
      );

      gsap.utils.toArray('.feature-card').forEach((card, index) => {
        gsap.from(card as Element, {
          scrollTrigger: {
            trigger: card as Element,
            start: 'top 85%',
            end: 'top 40%',
            scrub: 1.5,
          },
          y: 120,
          opacity: 0,
          scale: 0.85,
          rotateX: 15,
        });
      });

      gsap.utils.toArray('.product-preview').forEach((item, index) => {
        gsap.from(item as Element, {
          scrollTrigger: {
            trigger: item as Element,
            start: 'top 80%',
            end: 'top 30%',
            scrub: 2,
          },
          y: 150,
          opacity: 0,
          scale: 0.9,
        });
      });

      gsap.from(contactRef.current?.querySelectorAll('.contact-item') || [], {
        scrollTrigger: {
          trigger: contactRef.current,
          start: 'top 80%',
          end: 'top 40%',
          scrub: 1.5,
        },
        y: 80,
        opacity: 0,
        stagger: 0.2,
        duration: 1.2,
      });

      // Animaciones para Vision System section
      if (visionRef.current) {
        gsap.from(visionRef.current.querySelector('.vision-badge'), {
          scrollTrigger: {
            trigger: visionRef.current,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 1,
          },
          scale: 0,
          opacity: 0,
          duration: 0.8,
        });

        gsap.from(visionRef.current.querySelector('.vision-title'), {
          scrollTrigger: {
            trigger: visionRef.current,
            start: 'top 75%',
            end: 'top 45%',
            scrub: 1.5,
          },
          x: -100,
          opacity: 0,
          duration: 1,
        });

        gsap.from(visionRef.current.querySelector('.vision-description'), {
          scrollTrigger: {
            trigger: visionRef.current,
            start: 'top 70%',
            end: 'top 40%',
            scrub: 1.5,
          },
          y: 50,
          opacity: 0,
          duration: 1,
        });

        gsap.utils.toArray(visionRef.current.querySelectorAll('.vision-stat-card')).forEach((card, index) => {
          gsap.from(card as Element, {
            scrollTrigger: {
              trigger: card as Element,
              start: 'top 85%',
              end: 'top 55%',
              scrub: 1,
              onEnter: () => {
                // Animación del contador cuando entra en vista
                if (index === 0) {
                  let count = 0;
                  const interval = setInterval(() => {
                    count += 100;
                    if (count >= 2000) {
                      count = 2000;
                      clearInterval(interval);
                    }
                    setFpsCount(count);
                  }, 20);
                } else if (index === 1) {
                  let count = 0;
                  const interval = setInterval(() => {
                    count += 0.005;
                    if (count >= 0.05) {
                      count = 0.05;
                      clearInterval(interval);
                    }
                    setPrecisionCount(count);
                  }, 50);
                }
              },
            },
            scale: 0.8,
            opacity: 0,
            y: 50,
            duration: 1,
          });
        });

        gsap.from(visionRef.current.querySelector('.vision-image'), {
          scrollTrigger: {
            trigger: visionRef.current,
            start: 'top 70%',
            end: 'top 30%',
            scrub: 2,
          },
          scale: 0.9,
          opacity: 0,
          x: 100,
          duration: 1.5,
        });

        gsap.from(visionRef.current.querySelector('.vision-overlay-card'), {
          scrollTrigger: {
            trigger: visionRef.current,
            start: 'top 60%',
            end: 'top 30%',
            scrub: 1.5,
          },
          y: 100,
          opacity: 0,
          duration: 1,
        });
      }

      // Animaciones para No Programming section
      if (noProgrammingRef.current) {
        gsap.from(noProgrammingRef.current.querySelector('.np-badge'), {
          scrollTrigger: {
            trigger: noProgrammingRef.current,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 1,
          },
          scale: 0,
          opacity: 0,
          duration: 0.8,
        });

        gsap.from(noProgrammingRef.current.querySelector('.np-title'), {
          scrollTrigger: {
            trigger: noProgrammingRef.current,
            start: 'top 75%',
            end: 'top 45%',
            scrub: 1.5,
          },
          x: 100,
          opacity: 0,
          duration: 1,
        });

        gsap.from(noProgrammingRef.current.querySelector('.np-description'), {
          scrollTrigger: {
            trigger: noProgrammingRef.current,
            start: 'top 70%',
            end: 'top 40%',
            scrub: 1.5,
          },
          y: 50,
          opacity: 0,
          duration: 1,
        });

        gsap.utils.toArray(noProgrammingRef.current.querySelectorAll('.np-feature-card')).forEach((card, index) => {
          gsap.from(card as Element, {
            scrollTrigger: {
              trigger: card as Element,
              start: 'top 90%',
              end: 'top 60%',
              scrub: 0.8,
            },
            x: -80,
            opacity: 0,
            duration: 0.6,
            delay: index * 0.05,
          });
        });

        gsap.from(noProgrammingRef.current.querySelector('.np-image'), {
          scrollTrigger: {
            trigger: noProgrammingRef.current,
            start: 'top 70%',
            end: 'top 30%',
            scrub: 2,
          },
          scale: 0.9,
          opacity: 0,
          x: -100,
          duration: 1.5,
        });

        gsap.from(noProgrammingRef.current.querySelector('.np-overlay-card'), {
          scrollTrigger: {
            trigger: noProgrammingRef.current,
            start: 'top 60%',
            end: 'top 30%',
            scrub: 1.5,
          },
          y: 100,
          opacity: 0,
          duration: 1,
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      icon: <Camera className="w-10 h-10" />,
      title: language === 'en' ? 'AI-Powered Welding' : language === 'es' ? 'Soldadura con IA' : 'Soldagem com IA',
      description:
        language === 'en'
          ? 'Machine learning for adaptive pipeline and industrial welding across North and Latin America'
          : language === 'es'
          ? 'Aprendizaje automático para soldadura industrial y de tuberías adaptativa en Norteamérica y Latinoamérica'
          : 'Aprendizado de máquina para soldadura industrial e de tubulações adaptativa na América do Norte e Latina',
    },
    {
      icon: <Zap className="w-10 h-10" />,
      title: language === 'en' ? 'Certified Compliance' : language === 'es' ? 'Cumplimiento Certificado' : 'Conformidade Certificada',
      description:
        language === 'en'
          ? 'Meeting CSA (Canada), NR-12 (Brazil), and NOM (Mexico) safety standards'
          : language === 'es'
          ? 'Cumplimiento de estándares CSA (Canadá), NR-12 (Brasil) y NOM (México)'
          : 'Atendimento aos padrões CSA (Canadá), NR-12 (Brasil) e NOM (México)',
    },
    {
      icon: <Eye className="w-10 h-10" />,
      title: language === 'en' ? '3D Vision Welding' : language === 'es' ? 'Soldadura con Visión 3D' : 'Soldagem com Visão 3D',
      description:
        language === 'en'
          ? 'Precision scanning for complex weld paths in all industrial environments'
          : language === 'es'
          ? 'Escaneo de precisión para trayectorias de soldadura complejas en todos los entornos industriales'
          : 'Varredura de precisão para trajetórias de solda complexas em todos os ambientes industriais',
    },
  ];

  const applications = [
    {
      title: language === 'en' ? 'Automated Welding' : language === 'es' ? 'Soldadura Automatizada' : 'Soldagem Automatizada',
      description:
        language === 'en'
          ? 'Robotic welds for fabrication shops across the Americas'
          : language === 'es'
          ? 'Soldaduras robóticas para talleres de fabricación en las Américas'
          : 'Soldas robóticas para oficinas de fabricação nas Américas',
    },
    {
      title: language === 'en' ? 'Assembly Systems' : language === 'es' ? 'Sistemas de Ensamblaje' : 'Sistemas de Montagem',
      description:
        language === 'en'
          ? 'Modular solutions for oilfield and construction applications'
          : language === 'es'
          ? 'Soluciones modulares para aplicaciones petroleras y de construcción'
          : 'Soluções modulares para aplicações de petróleo e construção',
    },
  ];

  const countries = [
    { value: 'canada', label: 'Canada' },
    { value: 'usa', label: 'United States' },
    { value: 'mexico', label: 'Mexico' },
    { value: 'brazil', label: 'Brazil' },
    { value: 'other', label: 'Other Country' },
  ];

  const interests = [
    { value: 'demo', label: 'Robotic Welding Demo' },
    { value: 'training', label: 'Training Program' },
    { value: 'quote', label: 'Custom Quote' },
    { value: 'support', label: 'Technical Support' },
    { value: 'other', label: 'Other' },
  ];

  return (
    <div ref={heroRef} className="min-h-screen">
      <section className="relative h-screen w-full overflow-hidden bg-black">
        <div className="absolute inset-0 h-screen w-full overflow-hidden">
          <div ref={videoRef} className="absolute inset-0 w-full h-full">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source
                src="./vid/hero2.mp4"
                type="video/mp4"
              />
            </video>
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
          </div>

          <div ref={textRef} className="relative z-10 h-full flex items-center">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
              <div className="max-w-4xl">
                <div className="overflow-hidden mb-6">
                  <h1 className="hero-text-line text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white tracking-tighter leading-[0.9]">
                    {language === 'en' 
                      ? 'AI-Powered Welding Automation' 
                      : language === 'es' 
                      ? 'Automatización de Soldadura con IA' 
                      : 'Automação de Soldagem com IA'}
                  </h1>
                </div>
                <div className="overflow-hidden mb-8">
                  <h2 className="hero-text-line text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white/95 tracking-tight">
                    {language === 'en'
                      ? 'Industrial Welding Robotics for America'
                      : language === 'es'
                      ? 'Robótica de Soldadura Industrial para América'
                      : 'Robótica de Soldagem Industrial para América'}
                  </h2>
                </div>
                <div className="overflow-hidden mb-12">
                  <p className="hero-text-line text-lg sm:text-xl md:text-2xl text-white/90 leading-relaxed font-light max-w-2xl">
                    {language === 'en'
                      ? 'Precision AI welding solutions with local support in Canada, USA, Mexico and Brazil'
                      : language === 'es'
                      ? 'Soluciones de soldadura IA de precisión con soporte local en Canadá, USA, México y Brasil'
                      : 'Soluções de soldagem IA de precisão com suporte local no Canadá, EUA, México e Brasil'}
                  </p>
                </div>
                <div className="hero-cta flex flex-col sm:flex-row gap-5">
                  <Link
                    to="/solutions"
                    className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-red-600 to-red-500 text-white text-lg font-semibold rounded-full hover:from-red-500 hover:to-red-400 transition-all duration-500 hover:scale-105 hover:shadow-[0_20px_60px_rgba(220,38,38,0.4)] group"
                  >
                    <span>{t.hero.cta}</span>
                    <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    to="/about"
                    className="inline-flex items-center justify-center px-10 py-5 border-2 border-white text-white text-lg font-semibold rounded-full hover:bg-white hover:text-black transition-all duration-500 hover:scale-105 backdrop-blur-sm"
                  >
                    {t.hero.learnMore}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section ref={featuresRef} className="py-40 bg-white relative">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-20">
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold text-black mb-8 tracking-tight">
              {language === 'en' ? 'AI Welding Technology' : language === 'es' ? 'Tecnología de Soldadura IA' : 'Tecnologia de Soldagem IA'}
            </h2>
            <p className="text-xl sm:text-2xl text-gray-600 max-w-4xl mx-auto font-light leading-relaxed">
              {language === 'en'
                ? 'Serving Canada, USA, Mexico and Brazil with certified welding automation solutions'
                : language === 'es'
                ? 'Sirviendo a Canadá, USA, México y Brasil con soluciones certificadas de automatización de soldadura'
                : 'Atendendo Canadá, EUA, México e Brasil com soluções certificadas de automação de soldagem'}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {features.map((feature, index) => (
              <div
                key={index}
                className="feature-card group bg-gradient-to-br from-gray-50 to-white rounded-[2.5rem] p-10 hover:shadow-[0_30px_80px_rgba(0,0,0,0.12)] transition-all duration-700 hover:scale-[1.02] border border-gray-100"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl text-white mb-8 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-lg">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-black mb-5 tracking-tight">{feature.title}</h3>
                <p className="text-base text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={visionRef} className="py-32 bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(220,38,38,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(220,38,38,0.1),transparent_50%)]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <div className="inline-block vision-badge">
                <span className="text-red-400 text-sm font-bold tracking-wider uppercase px-4 py-2 bg-red-500/10 rounded-full border border-red-500/20">
                  {language === 'en' ? 'Core Technology' : language === 'es' ? 'Tecnología Principal' : 'Tecnologia Principal'}
                </span>
              </div>
              <div className="vision-title">
                <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight leading-[1.25]">
                  {language === 'en' ? 'Vision System' : language === 'es' ? 'Sistema de Visión' : 'Sistema de Visão'}
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600 mt-8 pb-3">
                    {language === 'en' ? '& AI Technology' : language === 'es' ? 'y Tecnología IA' : 'e Tecnologia IA'}
                  </span>
                </h2>
              </div>
              <p className="vision-description text-xl sm:text-2xl text-white/80 leading-relaxed font-light">
                {language === 'en'
                  ? 'Advanced 3D vision scanning at 2000 FPS combined with real-time AI processing for unmatched welding precision and adaptability'
                  : language === 'es'
                  ? 'Escaneo de visión 3D avanzado a 2000 FPS combinado con procesamiento IA en tiempo real para precisión y adaptabilidad incomparables'
                  : 'Varredura de visão 3D avançada a 2000 FPS combinada com processamento IA em tempo real para precisão e adaptabilidade incomparáveis'}
              </p>
              <div className="grid sm:grid-cols-2 gap-6 pt-4">
                <div className="vision-stat-card bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 hover:scale-105 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(220,38,38,0.3)]">
                  <div className="text-4xl font-bold text-red-400 mb-2">{fpsCount} FPS</div>
                  <div className="text-white/70 text-sm">
                    {language === 'en' ? 'Scanning Speed' : language === 'es' ? 'Velocidad de Escaneo' : 'Velocidade de Varredura'}
                  </div>
                </div>
                <div className="vision-stat-card bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 hover:scale-105 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(220,38,38,0.3)]">
                  <div className="text-4xl font-bold text-red-400 mb-2">±{precisionCount.toFixed(2)}mm</div>
                  <div className="text-white/70 text-sm">
                    {language === 'en' ? 'Precision' : language === 'es' ? 'Precisión' : 'Precisão'}
                  </div>
                </div>
              </div>
            </div>

            <div className="relative vision-image">
              <div className="relative aspect-square rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                <img
                  src="./img/vision.png"
                  alt="Vision System"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 vision-overlay-card">
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center flex-shrink-0 animate-pulse">
                        <Camera className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-lg mb-1">
                          {language === 'en' ? 'Real-Time AI Processing' : language === 'es' ? 'Procesamiento IA en Tiempo Real' : 'Processamento IA em Tempo Real'}
                        </h4>
                        <p className="text-white/70 text-sm">
                          {language === 'en'
                            ? 'Adaptive welding paths with instant adjustments'
                            : language === 'es'
                            ? 'Trayectorias adaptativas con ajustes instantáneos'
                            : 'Trajetórias adaptativas com ajustes instantâneos'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -z-10 inset-0 bg-gradient-to-br from-red-500/20 to-red-600/20 blur-3xl transform scale-110 animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      <section ref={noProgrammingRef} className="py-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50" />

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="lg:order-2 space-y-8">
              <div className="inline-block np-badge">
                <span className="text-red-600 text-sm font-bold tracking-wider uppercase px-4 py-2 bg-red-50 rounded-full border border-red-200">
                  {language === 'en' ? 'Simplicity First' : language === 'es' ? 'Simplicidad Primero' : 'Simplicidade Primeiro'}
                </span>
              </div>
              <div className="np-title">
                <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold text-black tracking-tight leading-[1.25]">
                  {language === 'en' ? 'No Programming' : language === 'es' ? 'Sin Programación' : 'Sem Programação'}
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-500 mt-8 pb-3">
                    {language === 'en' ? 'Required' : language === 'es' ? 'Requerida' : 'Necessária'}
                  </span>
                </h2>
              </div>
              <p className="np-description text-xl sm:text-2xl text-gray-600 leading-relaxed font-light">
                {language === 'en'
                  ? 'Pre-installed welding programs and intuitive controls let you start welding immediately. No complex programming or specialized training needed'
                  : language === 'es'
                  ? 'Programas de soldadura preinstalados y controles intuitivos te permiten comenzar a soldar inmediatamente. Sin programación compleja ni entrenamiento especializado'
                  : 'Programas de soldagem pré-instalados e controles intuitivos permitem que você comece a soldar imediatamente. Sem programação complexa ou treinamento especializado'}
              </p>
              <div className="space-y-4 pt-4">
                <div className="np-feature-card flex items-start gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-white hover:shadow-lg hover:scale-105 transition-all duration-300">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Eye className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-black mb-1">
                      {language === 'en' ? 'Point & Weld Interface' : language === 'es' ? 'Interfaz Apuntar y Soldar' : 'Interface Apontar e Soldar'}
                    </h4>
                    <p className="text-gray-600">
                      {language === 'en'
                        ? 'Simple touch screen operation for immediate productivity'
                        : language === 'es'
                        ? 'Operación simple de pantalla táctil para productividad inmediata'
                        : 'Operação simples de tela sensível ao toque para produtividade imediata'}
                    </p>
                  </div>
                </div>
                <div className="np-feature-card flex items-start gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-white hover:shadow-lg hover:scale-105 transition-all duration-300">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-black mb-1">
                      {language === 'en' ? 'Pre-Loaded Programs' : language === 'es' ? 'Programas Precargados' : 'Programas Pré-carregados'}
                    </h4>
                    <p className="text-gray-600">
                      {language === 'en'
                        ? 'Ready-to-use welding sequences for common applications'
                        : language === 'es'
                        ? 'Secuencias de soldadura listas para usar en aplicaciones comunes'
                        : 'Sequências de soldagem prontas para uso em aplicações comuns'}
                    </p>
                  </div>
                </div>
                <div className="np-feature-card flex items-start gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-white hover:shadow-lg hover:scale-105 transition-all duration-300">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Camera className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-black mb-1">
                      {language === 'en' ? 'Visual Guidance' : language === 'es' ? 'Guía Visual' : 'Orientação Visual'}
                    </h4>
                    <p className="text-gray-600">
                      {language === 'en'
                        ? 'Step-by-step on-screen instructions in your language'
                        : language === 'es'
                        ? 'Instrucciones paso a paso en pantalla en tu idioma'
                        : 'Instruções passo a passo na tela em seu idioma'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:order-1 relative np-image">
              <div className="relative aspect-square rounded-3xl overflow-hidden border border-gray-200 shadow-2xl">
                <img
                  src="./img/np.png"
                  alt="Easy to Use"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 np-overlay-card">
                  <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-sm font-semibold text-gray-900">
                        {language === 'en' ? 'Ready to Operate' : language === 'es' ? 'Listo para Operar' : 'Pronto para Operar'}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">
                      {language === 'en'
                        ? 'Start welding in minutes, not weeks'
                        : language === 'es'
                        ? 'Comienza a soldar en minutos, no semanas'
                        : 'Comece a soldar em minutos, não semanas'}
                    </p>
                  </div>
                </div>
              </div>
              <div className="absolute -z-10 inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 blur-3xl transform scale-110 animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-40 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative">
          <div className="text-center mb-32">
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-8 tracking-tight">
              {language === 'en' ? 'Industrial Applications' : language === 'es' ? 'Aplicaciones Industriales' : 'Aplicações Industriais'}
            </h2>
            <p className="text-xl sm:text-2xl text-white/80 max-w-4xl mx-auto font-light">
              {language === 'en'
                ? 'Our welding robotics for oil & gas, manufacturing, and industrial applications'
                : language === 'es'
                ? 'Nuestra robótica de soldadura para petróleo y gas, manufactura y aplicaciones industriales'
                : 'Nossa robótica de soldagem para petróleo e gás, manufatura e aplicações industriais'}
            </p>
          </div>

          <div className="space-y-32">
            <div className="product-preview grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="inline-block">
                  <span className="text-red-500 text-lg font-semibold tracking-wide uppercase">
                    {language === 'en' ? 'Oil & Gas' : language === 'es' ? 'Petróleo y Gas' : 'Petróleo e Gás'}
                  </span>
                </div>
                <h3 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight leading-none">
                  {language === 'en' ? 'Pipeline Welding' : language === 'es' ? 'Soldadura de Tuberías' : 'Soldagem de Tubulações'}
                </h3>
                <p className="text-xl sm:text-2xl text-white/90 leading-relaxed font-light">
                  {language === 'en'
                    ? 'AI-powered welding solutions for Canadian oilfields, Brazilian pipelines, and Mexican industrial applications'
                    : language === 'es'
                    ? 'Soluciones de soldadura con IA para campos petroleros canadienses, tuberías brasileñas y aplicaciones industriales mexicanas'
                    : 'Soluções de soldagem com IA para campos de petróleo canadenses, tubulações brasileiras e aplicações industriais mexicanas'}
                </p>
                <div className="space-y-4 pt-4">
                  {applications.map((app, index) => (
                    <div key={index} className="border-l-4 border-red-500 pl-6 py-2">
                      <h4 className="text-xl font-semibold text-white mb-2">{app.title}</h4>
                      <p className="text-lg text-white/80">{app.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative aspect-video rounded-[2rem] overflow-hidden shadow-2xl group">
                <img
                  src="https://images.pexels.com/photos/356036/pexels-photo-356036.jpeg?auto=compress&cs=tinysrgb&w=1400"
                  alt="Industrial Welding"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-red-600/30 via-transparent to-transparent opacity-60" />
              </div>
            </div>

            <div className="product-preview grid lg:grid-cols-2 gap-16 items-center">
              <div className="lg:order-2 space-y-8">
                <div className="inline-block">
                  <span className="text-red-500 text-lg font-semibold tracking-wide uppercase">
                    {language === 'en' ? 'Manufacturing' : language === 'es' ? 'Manufactura' : 'Manufatura'}
                  </span>
                </div>
                <h3 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight leading-none">
                  {language === 'en' ? 'Industrial Fabrication' : language === 'es' ? 'Fabricación Industrial' : 'Fabrição Industrial'}
                </h3>
                <p className="text-xl sm:text-2xl text-white/90 leading-relaxed font-light">
                  {language === 'en'
                    ? 'Precision robotic welding for automotive, aerospace, and heavy equipment manufacturing across the Americas'
                    : language === 'es'
                    ? 'Soldadura robótica de precisión para manufactura automotriz, aeroespacial y equipos pesados en las Américas'
                    : 'Soldagem robótica de precisão para manufatura automotiva, aeroespacial e equipamentos pesados nas Américas'}
                </p>
                <Link
                  to="/applications"
                  className="inline-flex items-center gap-3 text-xl font-semibold text-white hover:text-red-400 transition-colors group mt-8"
                >
                  <span>{language === 'en' ? 'View Applications' : language === 'es' ? 'Ver Aplicaciones' : 'Ver Aplicações'}</span>
                  <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
              <div className="lg:order-1 relative aspect-video rounded-[2rem] overflow-hidden shadow-2xl group">
                <img
                  src="https://images.pexels.com/photos/7562024/pexels-photo-7562024.jpeg?auto=compress&cs=tinysrgb&w=1400"
                  alt="Manufacturing"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-red-600/30 via-transparent to-transparent opacity-60" />
              </div>
            </div>
          </div>

          <div className="mt-32 text-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-3 px-12 py-6 bg-gradient-to-r from-red-600 to-red-500 text-white text-xl font-semibold rounded-full hover:from-red-500 hover:to-red-400 transition-all duration-500 hover:scale-105 hover:shadow-[0_30px_80px_rgba(220,38,38,0.4)] group"
            >
              <span>{language === 'en' ? 'Get Local Support' : language === 'es' ? 'Obtener Soporte Local' : 'Obter Suporte Local'}</span>
              <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Sección de contacto */}
      <section ref={contactRef} className="py-40 bg-gray-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-20">
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold text-black mb-8 tracking-tight">
              {language === 'en' ? 'Need Welding Automation?' : language === 'es' ? '¿Necesita Automatización?' : 'Precisa de Automação?'}
            </h2>
            <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
              {language === 'en'
                ? 'We serve Canada, Brazil, and Mexico with local support and certified solutions'
                : language === 'es'
                ? 'Servimos a Canadá, Brasil y México con soporte local y soluciones certificadas'
                : 'Atendemos Canadá, Brasil e México com suporte local e soluções certificadas'}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-20 items-start">
            {/* Contact Information */}
            <div className="space-y-12">
              <div className="contact-item">
                <h3 className="text-3xl font-bold text-black mb-8 tracking-tight">Global Offices</h3>
                
                <div className="space-y-8">
                  {/* Canada Headquarters */}
                  <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-semibold text-black mb-3">Canada Headquarters</h4>
                        <p className="text-gray-600 leading-relaxed mb-3">
                          1000, 639 5th Ave SW<br />
                          Calgary, AB T2P 0M9
                        </p>
                        <div className="flex items-center gap-2 text-red-600 font-medium">
                          <Phone className="w-4 h-4" />
                          <span>+1 403-860-5275</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* International Email */}
                  <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-gray-600 to-gray-700 rounded-2xl flex items-center justify-center">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-semibold text-black mb-3">International Email</h4>
                        <p className="text-gray-600 leading-relaxed mb-3">
                          Available in English, Spanish, and Portuguese
                        </p>
                        <div className="text-red-600 font-medium">
                          info@lerobotics.ai
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Global Offices */}
                  <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-semibold text-black mb-4">Global Offices</h4>
                        <div className="space-y-4">
                          <div>
                            <h5 className="font-semibold text-black mb-1">Mexico</h5>
                            <p className="text-gray-600 text-sm">Ave. Constitucion 2050, Mty. NL.</p>
                          </div>
                          <div>
                            <h5 className="font-semibold text-black mb-1">Houston</h5>
                            <p className="text-gray-600 text-sm">34370 Sunset Ln, Brookshire, TX 77423</p>
                          </div>
                          <div>
                            <h5 className="font-semibold text-black mb-1">Brazil</h5>
                            <p className="text-gray-600 text-sm">São Paulo Office (Coming Soon)</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-item">
              <div className="bg-white rounded-[2.5rem] p-12 shadow-sm border border-gray-100">
                <form className="space-y-8">
                  {/* Country Select */}
                  <div>
                    <label className="block text-lg font-medium text-black mb-4">
                      Your Country
                    </label>
                    <select className="w-full px-6 py-5 bg-gray-50 border-0 rounded-2xl text-lg text-black placeholder-gray-500 focus:ring-2 focus:ring-red-500 focus:bg-white transition-all duration-200 appearance-none">
                      <option value="">Select Country</option>
                      {countries.map((country) => (
                        <option key={country.value} value={country.value}>
                          {country.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Name and Email */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-lg font-medium text-black mb-4">
                        Name
                      </label>
                      <input
                        type="text"
                        placeholder="Your name"
                        className="w-full px-6 py-5 bg-gray-50 border-0 rounded-2xl text-lg text-black placeholder-gray-500 focus:ring-2 focus:ring-red-500 focus:bg-white transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-lg font-medium text-black mb-4">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="your@email.com"
                        className="w-full px-6 py-5 bg-gray-50 border-0 rounded-2xl text-lg text-black placeholder-gray-500 focus:ring-2 focus:ring-red-500 focus:bg-white transition-all duration-200"
                      />
                    </div>
                  </div>

                  {/* Interests */}
                  <div>
                    <label className="block text-lg font-medium text-black mb-4">
                      I'm interested in:
                    </label>
                    <select className="w-full px-6 py-5 bg-gray-50 border-0 rounded-2xl text-lg text-black placeholder-gray-500 focus:ring-2 focus:ring-red-500 focus:bg-white transition-all duration-200 appearance-none">
                      <option value="">Robotic welding demo, training, etc.</option>
                      {interests.map((interest) => (
                        <option key={interest.value} value={interest.value}>
                          {interest.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-lg font-medium text-black mb-4">
                      Message
                    </label>
                    <textarea
                      placeholder="Tell us about your welding automation needs..."
                      rows={5}
                      className="w-full px-6 py-5 bg-gray-50 border-0 rounded-2xl text-lg text-black placeholder-gray-500 focus:ring-2 focus:ring-red-500 focus:bg-white transition-all duration-200 resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-6 bg-gradient-to-r from-red-600 to-red-500 text-white text-xl font-semibold rounded-2xl hover:from-red-500 hover:to-red-400 transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_20px_60px_rgba(220,38,38,0.3)] active:scale-95"
                  >
                    Get Welding Robot Quote
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ChatBot Component */}
      <ChatBot language={language} onLanguageChange={onLanguageChange} />
    </div>
  );
};