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

      // ANIMACIONES OPTIMIZADAS PARA LAS FEATURE CARDS (MÁS RÁPIDAS)
      gsap.utils.toArray('.feature-card').forEach((card, index) => {
        gsap.from(card as Element, {
          scrollTrigger: {
            trigger: card as Element,
            start: 'top 85%',
            end: 'top 40%',
            scrub: 0.3,
          },
          y: 80,
          opacity: 0,
          scale: 0.9,
          rotateX: 8,
          duration: 0.6,
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
      icon: <Zap className="w-10 h-10" />,
      title: language === 'en' ? 'AI-Driven Robotic Welding' : language === 'es' ? 'Soldadura Robótica Impulsada por IA' : 'Soldagem Robótica Impulsada por IA',
      description:
        language === 'en'
          ? 'Adaptive welding that learns and adjusts to real production conditions for maximum consistency'
          : language === 'es'
          ? 'Soldadura adaptativa que aprende y se ajusta a las condiciones reales de producción'
          : 'Soldagem adaptativa que aprende e se ajusta às condições reais de produção',
    },
    {
      icon: <Eye className="w-10 h-10" />,
      title: language === 'en' ? 'Industrial-Grade Integration' : language === 'es' ? 'Integración de Grado Industrial' : 'Integração de Nível Industrial',
      description:
        language === 'en'
          ? 'Seamless deployment with existing systems. CSA, NR-12, and NOM certified'
          : language === 'es'
          ? 'Despliegue sin interrupciones. Certificado en CSA, NR-12 y NOM'
          : 'Implantação perfeita. Certificado em CSA, NR-12 e NOM',
    },
    {
      icon: <Camera className="w-10 h-10" />,
      title: language === 'en' ? '3D Vision & Real-Time Precision' : language === 'es' ? 'Visión 3D y Precisión en Tiempo Real' : 'Visão 3D e Precisão em Tempo Real',
      description:
        language === 'en'
          ? 'Advanced scanning at 2000 FPS with ±0.05mm precision for complex weld paths in any environment'
          : language === 'es'
          ? 'Escaneo avanzado a 2000 FPS con precisión ±0.05mm para trayectorias complejas'
          : 'Varredura avançada a 2000 FPS com precisão ±0.05mm para trajetórias complexas',
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
    { value: 'canada', label: language === 'en' ? 'Canada' : language === 'es' ? 'Canadá' : 'Canadá' },
    { value: 'usa', label: language === 'en' ? 'United States' : language === 'es' ? 'Estados Unidos' : 'Estados Unidos' },
    { value: 'mexico', label: language === 'en' ? 'Mexico' : language === 'es' ? 'México' : 'México' },
    { value: 'brazil', label: language === 'en' ? 'Brazil' : language === 'es' ? 'Brasil' : 'Brasil' },
    { value: 'other', label: language === 'en' ? 'Other Country' : language === 'es' ? 'Otro País' : 'Outro País' },
  ];

  const interests = [
    { value: 'demo', label: language === 'en' ? 'Robotic Welding Demo' : language === 'es' ? 'Demo de Soldadura Robótica' : 'Demonstração de Soldagem Robótica' },
    { value: 'training', label: language === 'en' ? 'Training Program' : language === 'es' ? 'Programa de Entrenamiento' : 'Programa de Treinamento' },
    { value: 'quote', label: language === 'en' ? 'Custom Quote' : language === 'es' ? 'Cotización Personalizada' : 'Cotação Personalizada' },
    { value: 'support', label: language === 'en' ? 'Technical Support' : language === 'es' ? 'Soporte Técnico' : 'Suporte Técnico' },
    { value: 'other', label: language === 'en' ? 'Other' : language === 'es' ? 'Otro' : 'Outro' },
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
                      ? 'Intelligent Robotic Welding'
                      : language === 'es'
                      ? 'Soldadura Robótica Inteligente'
                      : 'Soldagem Robótica Inteligente'}
                  </h1>
                </div>
                <div className="overflow-hidden mb-8">
                  <h2 className="hero-text-line text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white/95 tracking-tight">
                    {language === 'en'
                      ? 'Precision, consistency, reliability for industrial production'
                      : language === 'es'
                      ? 'Precisión, consistencia, confiabilidad para producción industrial'
                      : 'Precisão, consistência, confiabilidade para produção industrial'}
                  </h2>
                </div>
                <div className="overflow-hidden mb-12">
                  <p className="hero-text-line text-lg sm:text-xl md:text-2xl text-white/90 leading-relaxed font-light max-w-2xl">
                    {language === 'en'
                      ? 'AI-powered welding solutions trusted across Canada, USA, Mexico, and Brazil'
                      : language === 'es'
                      ? 'Soluciones de soldadura con IA probadas en Canadá, USA, México y Brasil'
                      : 'Soluções de soldagem com IA comprovadas no Canadá, EUA, México e Brasil'}
                  </p>
                </div>
                <div className="hero-cta flex flex-col sm:flex-row gap-5 pt-4">
                  <Link
                    to="/products"
                    className="inline-flex items-center justify-center gap-3 px-12 py-6 bg-gradient-to-r from-red-600 to-red-500 text-white text-lg font-semibold rounded-full hover:from-red-500 hover:to-red-400 transition-all duration-500 hover:scale-105 hover:shadow-[0_20px_60px_rgba(220,38,38,0.4)] group"
                  >
                    <span>
                      {language === 'en'
                        ? 'Explore AI Camera'
                        : language === 'es'
                        ? 'Explorar Cámara IA'
                        : 'Explorar Câmera IA'}
                    </span>
                    <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    to="/about"
                    className="inline-flex items-center justify-center gap-3 px-12 py-6 bg-transparent border-2 border-white/30 text-white text-lg font-semibold rounded-full hover:border-red-500 hover:bg-red-500/10 transition-all duration-500 group"
                  >
                    <span>
                      {language === 'en'
                        ? 'Learn More'
                        : language === 'es'
                        ? 'Saber Más'
                        : 'Saiba Mais'}
                    </span>
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
              {language === 'en'
                ? 'Why LE Robotics'
                : language === 'es'
                ? 'Por qué LE Robotics'
                : 'Por que LE Robotics'}
            </h2>
            <p className="text-xl sm:text-2xl text-gray-600 max-w-4xl mx-auto font-light leading-relaxed">
              {language === 'en'
                ? 'We design and integrate intelligent robotic systems built for real industrial production'
                : language === 'es'
                ? 'Diseñamos e integramos sistemas robóticos inteligentes construidos para producción industrial real'
                : 'Projetamos e integramos sistemas robóticos inteligentes construídos para produção industrial real'}
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
                  {language === 'en' ? 'Start Production' : language === 'es' ? 'Comienza la Producción' : 'Inicie a Produção'}
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-500 mt-8 pb-3">
                    {language === 'en' ? 'From Day One' : language === 'es' ? 'Desde el Primer Día' : 'Desde o Primeiro Dia'}
                  </span>
                </h2>
              </div>
              <p className="np-description text-xl sm:text-2xl text-gray-600 leading-relaxed font-light">
                {language === 'en'
                  ? 'Pre-loaded welding sequences and intuitive interface. Start production immediately with zero ramp-up time'
                  : language === 'es'
                  ? 'Secuencias de soldadura precargadas e interfaz intuitiva. Comienza la producción inmediatamente sin tiempo de adaptación'
                  : 'Sequências de soldagem pré-carregadas e interface intuitiva. Inicie a produção imediatamente sem tempo de ramp-up'}
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
              {language === 'en'
                ? 'Real-World Proven Solutions'
                : language === 'es'
                ? 'Soluciones Probadas en el Mundo Real'
                : 'Soluções Comprovadas no Mundo Real'}
            </h2>
            <p className="text-xl sm:text-2xl text-white/80 max-w-4xl mx-auto font-light">
              {language === 'en'
                ? 'Deployed across oil & gas, manufacturing, and heavy industry'
                : language === 'es'
                ? 'Implementado en petróleo y gas, manufactura e industria pesada'
                : 'Implementado em petróleo e gás, manufatura e indústria pesada'}
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
                  {language === 'en' ? 'Pipeline & Pressure Vessels' : language === 'es' ? 'Tuberías y Recipientes a Presión' : 'Tubulações e Recipientes Pressurizados'}
                </h3>
                <p className="text-xl sm:text-2xl text-white/90 leading-relaxed font-light">
                  {language === 'en'
                    ? 'Precision pipeline welding with certified quality. Designed for harsh field conditions and maximum uptime'
                    : language === 'es'
                    ? 'Soldadura de tuberías de precisión con calidad certificada. Diseñada para condiciones difíciles y máxima disponibilidad'
                    : 'Soldagem de tubulação de precisão com qualidade certificada. Projetada para condições severas e máximo tempo de operação'}
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
                  src="./img/9.png"
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
                    {language === 'en' ? 'Heavy Manufacturing' : language === 'es' ? 'Manufactura Pesada' : 'Manufatura Pesada'}
                  </span>
                </div>
                <h3 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight leading-none">
                  {language === 'en' ? 'Automotive & Fabrication' : language === 'es' ? 'Automotriz y Fabricación' : 'Automotivo e Fabricação'}
                </h3>
                <p className="text-xl sm:text-2xl text-white/90 leading-relaxed font-light">
                  {language === 'en'
                    ? 'High-volume production welding with repeatability and consistency. Built for automotive, aerospace, and metal fabrication'
                    : language === 'es'
                    ? 'Soldadura de producción en alto volumen con repetibilidad y consistencia. Construida para automotriz, aeroespacial y fabricación'
                    : 'Soldagem de produção em alto volume com repetibilidade e consistência. Construída para automotivo, aeroespacial e fabricação'}
                </p>
                <Link
                  to="/products"
                  className="inline-flex items-center gap-3 text-xl font-semibold text-white hover:text-red-400 transition-colors group mt-8"
                >
                  <span>{language === 'en' ? 'View Applications' : language === 'es' ? 'Ver Aplicaciones' : 'Ver Aplicações'}</span>
                  <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
              <div className="lg:order-1 relative aspect-video rounded-[2rem] overflow-hidden shadow-2xl group">
                <img
                  src="./img/7.png"
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
              <span>
                {language === 'en'
                  ? 'Request a Demo'
                  : language === 'es'
                  ? 'Solicitar una Demo'
                  : 'Solicitar uma Demo'}
              </span>
              <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} className="py-40 bg-gray-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-20">
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold text-black mb-8 tracking-tight">
              {language === 'en'
                ? 'Let\'s Build Your Solution'
                : language === 'es'
                ? 'Construyamos tu Solución'
                : 'Vamos Construir sua Solução'}
            </h2>
            <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
              {language === 'en'
                ? 'Talk to an engineer. Tell us about your production challenges'
                : language === 'es'
                ? 'Habla con un ingeniero. Cuéntanos sobre tus desafíos de producción'
                : 'Fale com um engenheiro. Conte-nos sobre seus desafios de produção'}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-20 items-start">
            {/* Contact Information */}
            <div className="space-y-12">
              <div className="contact-item">
                <h3 className="text-3xl font-bold text-black mb-8 tracking-tight">
                  {language === 'en' ? 'Global Offices' : language === 'es' ? 'Oficinas Globales' : 'Escritórios Globais'}
                </h3>
                
                <div className="space-y-8">
                  {/* Canada Headquarters */}
                  <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-semibold text-black mb-3">
                          {language === 'en' ? 'Canada Headquarters' : language === 'es' ? 'Oficina Central Canadá' : 'Escritório Central Canadá'}
                        </h4>
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
                        <h4 className="text-xl font-semibold text-black mb-3">
                          {language === 'en' ? 'International Email' : language === 'es' ? 'Correo Internacional' : 'E-mail Internacional'}
                        </h4>
                        <p className="text-gray-600 leading-relaxed mb-3">
                          {language === 'en' 
                            ? 'Available in English and Spanish' 
                            : language === 'es' 
                            ? 'Disponible en inglés y español ' 
                            : 'Disponível em inglês, espanhol e português'}
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
                        <h4 className="text-xl font-semibold text-black mb-4">
                          {language === 'en' ? 'Global Offices' : language === 'es' ? 'Oficinas Globales' : 'Escritórios Globais'}
                        </h4>
                        <div className="space-y-4">
                          <div>
                            <h5 className="font-semibold text-black mb-1">
                              {language === 'en' ? 'Mexico' : language === 'es' ? 'México' : 'México'}
                            </h5>
                            <p className="text-gray-600 text-sm">Ave. Constitucion 2050, Mty. NL.</p>
                          </div>
                          <div>
                            <h5 className="font-semibold text-black mb-1">
                              {language === 'en' ? 'Houston' : 'Houston'}
                            </h5>
                            <p className="text-gray-600 text-sm">34370 Sunset Ln, Brookshire, TX 77423</p>
                          </div>
                          <div>
                            <h5 className="font-semibold text-black mb-1">
                              {language === 'en' ? 'Brazil' : language === 'es' ? 'Brasil' : 'Brasil'}
                            </h5>
                            <p className="text-gray-600 text-sm">
                              {language === 'en' 
                                ? 'São Paulo Office (Coming Soon)' 
                                : language === 'es' 
                                ? 'Oficina São Paulo (Próximamente)' 
                                : 'Escritório São Paulo (Em Breve)'}
                            </p>
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
                      {language === 'en' ? 'Your Country' : language === 'es' ? 'Tu País' : 'Seu País'}
                    </label>
                    <select className="w-full px-6 py-5 bg-gray-50 border-0 rounded-2xl text-lg text-black placeholder-gray-500 focus:ring-2 focus:ring-red-500 focus:bg-white transition-all duration-200 appearance-none">
                      <option value="">
                        {language === 'en' ? 'Select Country' : language === 'es' ? 'Seleccionar País' : 'Selecionar País'}
                      </option>
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
                        {language === 'en' ? 'Name' : language === 'es' ? 'Nombre' : 'Nome'}
                      </label>
                      <input
                        type="text"
                        placeholder={language === 'en' ? 'Your name' : language === 'es' ? 'Tu nombre' : 'Seu nome'}
                        className="w-full px-6 py-5 bg-gray-50 border-0 rounded-2xl text-lg text-black placeholder-gray-500 focus:ring-2 focus:ring-red-500 focus:bg-white transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-lg font-medium text-black mb-4">
                        {language === 'en' ? 'Email Address' : language === 'es' ? 'Correo Electrónico' : 'E-mail'}
                      </label>
                      <input
                        type="email"
                        placeholder={language === 'en' ? 'your@email.com' : language === 'es' ? 'tu@email.com' : 'seu@email.com'}
                        className="w-full px-6 py-5 bg-gray-50 border-0 rounded-2xl text-lg text-black placeholder-gray-500 focus:ring-2 focus:ring-red-500 focus:bg-white transition-all duration-200"
                      />
                    </div>
                  </div>

                  {/* Interests */}
                  <div>
                    <label className="block text-lg font-medium text-black mb-4">
                      {language === 'en' 
                        ? "I'm interested in:" 
                        : language === 'es' 
                        ? 'Estoy interesado en:' 
                        : 'Estou interessado em:'}
                    </label>
                    <select className="w-full px-6 py-5 bg-gray-50 border-0 rounded-2xl text-lg text-black placeholder-gray-500 focus:ring-2 focus:ring-red-500 focus:bg-white transition-all duration-200 appearance-none">
                      <option value="">
                        {language === 'en' 
                          ? 'Robotic welding demo, training, etc.' 
                          : language === 'es' 
                          ? 'Demo de soldadura robótica, entrenamiento, etc.' 
                          : 'Demonstração de soldagem robótica, treinamento, etc.'}
                      </option>
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
                      {language === 'en' ? 'Message' : language === 'es' ? 'Mensaje' : 'Mensagem'}
                    </label>
                    <textarea
                      placeholder={language === 'en' 
                        ? 'Tell us about your welding automation needs...' 
                        : language === 'es' 
                        ? 'Cuéntanos sobre tus necesidades de automatización de soldadura...' 
                        : 'Conte-nos sobre suas necessidades de automação de soldagem...'}
                      rows={5}
                      className="w-full px-6 py-5 bg-gray-50 border-0 rounded-2xl text-lg text-black placeholder-gray-500 focus:ring-2 focus:ring-red-500 focus:bg-white transition-all duration-200 resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-6 bg-gradient-to-r from-red-600 to-red-500 text-white text-xl font-semibold rounded-2xl hover:from-red-500 hover:to-red-400 transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_20px_60px_rgba(220,38,38,0.3)] active:scale-95"
                  >
                    {language === 'en'
                      ? 'Talk to an Engineer'
                      : language === 'es'
                      ? 'Hablar con un Ingeniero'
                      : 'Falar com um Engenheiro'}
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
