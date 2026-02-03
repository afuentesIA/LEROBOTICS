import { useEffect, useRef, useState } from 'react';
import { Send, MapPin, Mail, Phone, MessageSquare, Building2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Language } from '../hooks/useLanguage';
import { translations } from '../i18n/translations';

gsap.registerPlugin(ScrollTrigger);

interface ContactPageProps {
  language: Language;
}

export const ContactPage = ({ language }: ContactPageProps) => {
  const t = translations[language];
  const pageRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-content', {
        y: 100,
        opacity: 0,
        duration: 1.4,
        ease: 'power4.out',
        delay: 0.3
      });

      gsap.from('.contact-form', {
        x: -80,
        opacity: 0,
        duration: 1.2,
        delay: 0.5,
        ease: 'power3.out',
      });

      gsap.utils.toArray('.office-card').forEach((card, index) => {
        gsap.from(card as Element, {
          scrollTrigger: {
            trigger: card as Element,
            start: 'top 85%',
            end: 'top 50%',
            scrub: 1,
          },
          y: 80,
          opacity: 0,
          scale: 0.9,
        });
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // En lugar de enviar a Supabase, puedes:
      // 1. Enviar a un servicio de forms como Formspree
      // 2. Usar EmailJS
      // 3. O simplemente mostrar éxito (para demo)
      
      console.log('Form data:', formData); // Para debugging
      
      // Simular envío exitoso
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', company: '', message: '' });

      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const offices = [
    {
      country: language === 'en' ? 'Canada' : language === 'es' ? 'Canadá' : 'Canadá',
      city: 'Calgary',
      address: '1000, 639 5th Ave SW',
      zip: 'Alberta T2P 0M9',
      phone: '+1 (403) 860-5275',
      email: 'info@lerobotics.ai',
      image: 'https://images.pexels.com/photos/1519088/pexels-photo-1519088.jpeg?auto=compress&cs=tinysrgb&w=800',
      flag: '🇨🇦'
    },
    {
      country: language === 'en' ? 'Brazil' : language === 'es' ? 'Brasil' : 'Brasil',
      city: 'São Paulo',
      address: 'Jundiaí/São Paulo',
      zip: '',
      phone: '+55 (11) 99614-1138',
      email: 'info@lerobotics.ai',
      image: 'https://images.pexels.com/photos/2868242/pexels-photo-2868242.jpeg?auto=compress&cs=tinysrgb&w=800',
      flag: '🇧🇷'
    },
    {
      country: language === 'en' ? 'Mexico' : language === 'es' ? 'México' : 'México',
      city: 'Monterrey',
      address: 'Ave. Constitucion 2050 Mty. NL.',
      zip: '',
      phone: '+52 (81) 1078-6110',
      email: 'info@lerobotics.ai',
      image: 'https://images.pexels.com/photos/3935702/pexels-photo-3935702.jpeg?auto=compress&cs=tinysrgb&w=800',
      flag: '🇲🇽'
    },
    {
      country: language === 'en' ? 'United States' : language === 'es' ? 'Estados Unidos' : 'Estados Unidos',
      city: 'Houston',
      address: '34370 Sunset Ln',
      zip: 'Brookshire, TX 77423',
      phone: '+1 (281) 934-8015',
      email: 'info@lerobotics.ai',
      image: 'https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=800',
      flag: '🇺🇸'
    },
  ];

  return (
    <div ref={pageRef} className="min-h-screen bg-white pt-20">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden bg-gradient-to-br from-red-50 via-white to-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="hero-content text-center mb-20">
            <div className="inline-block mb-6">
              <span className="text-red-600 text-lg font-semibold tracking-wide uppercase">
                {language === 'en' ? 'Contact' : language === 'es' ? 'Contacto' : 'Contato'}
              </span>
            </div>
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-black mb-8 tracking-tight leading-none">
              {language === 'en' ? 'Get in Touch' : language === 'es' ? 'Contáctanos' : 'Entre em Contato'}
            </h1>
            <p className="text-2xl sm:text-3xl text-gray-600 max-w-4xl mx-auto font-light leading-relaxed">
              {language === 'en'
                ? "We're here to help you transform your robotics operations across "
                : language === 'es'
                ? 'Estamos aquí para ayudarte a transformar tus operaciones robóticas en '
                : 'Estamos aqui para ajudá-lo a transformar suas operações robóticas em '}
              <span className="font-semibold text-red-600">Canada, United States, Mexico and Brazil</span>
            </p>
          </div>

          {/* Contact Methods - 3 Cards in a row */}
          <div className="max-w-6xl mx-auto mb-20">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Phone Card */}
              <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center text-white">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-black">
                      {language === 'en' ? 'Call Us Now' : language === 'es' ? 'Llámanos Ahora' : 'Ligue para Nós'}
                    </h3>
                    <p className="text-gray-600">
                      {language === 'en' ? 'Monday - Friday, 9:00 AM - 6:00 PM (MST)' : 
                       language === 'es' ? 'Lunes - Viernes, 9:00 AM - 6:00 PM (MST)' : 
                       'Segunda - Sexta, 9:00 AM - 6:00 PM (MST)'}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                    <span className="text-2xl">🇨🇦</span>
                    <div>
                      <a href="tel:+14038605275" className="text-lg font-semibold text-black hover:text-red-600 transition-colors">
                        +1 (403) 860-5275
                      </a>
                      <p className="text-gray-600">Calgary, Alberta</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                    <span className="text-2xl">🇧🇷</span>
                    <div>
                      <a href="tel:+5511996141138" className="text-lg font-semibold text-black hover:text-red-600 transition-colors">
                        +55 (11) 99614-1138
                      </a>
                      <p className="text-gray-600">São Paulo, Brazil</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                    <span className="text-2xl">🇲🇽</span>
                    <div>
                      <a href="tel:+528110786110" className="text-lg font-semibold text-black hover:text-red-600 transition-colors">
                        +52 (81) 1078-6110
                      </a>
                      <p className="text-gray-600">Monterrey, Mexico</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                    <span className="text-2xl">🇺🇸</span>
                    <div>
                      <a href="tel:+12819348015" className="text-lg font-semibold text-black hover:text-red-600 transition-colors">
                        +1 (281) 934-8015
                      </a>
                      <p className="text-gray-600">Houston, Texas</p>
                    </div>
                  </div>
                </div>

                <div>
                  <a href="tel:+14038605275" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-full hover:from-red-500 hover:to-red-400 transition-all duration-300">
                    <Phone className="w-4 h-4" />
                    {language === 'en' ? 'Call Now' : language === 'es' ? 'Llamar Ahora' : 'Ligar Agora'}
                  </a>
                </div>
              </div>

              {/* Email Card */}
              <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center text-white">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-black">
                      {language === 'en' ? 'Send us an Email' : language === 'es' ? 'Envíanos un Email' : 'Envie-nos um Email'}
                    </h3>
                    <p className="text-gray-600">
                      {language === 'en' ? 'Guaranteed response in less than 24 hours' : 
                       language === 'es' ? 'Respuesta garantizada en menos de 24 horas' : 
                       'Resposta garantida em menos de 24 horas'}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                    <Mail className="w-5 h-5 text-red-600"/>
                    <div>
                      <a href="mailto:info@lerobotics.ai" className="text-lg font-semibold text-black hover:text-red-600 transition-colors">
                        info@lerobotics.ai
                      </a>
                      <p className="text-gray-600">
                        {language === 'en' ? 'Specialized technical support' : 
                         language === 'es' ? 'Soporte técnico especializado' : 
                         'Suporte técnico especializado'}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <a href="mailto:info@lerobotics.ai" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-full hover:from-red-500 hover:to-red-400 transition-all duration-300">
                    <Mail className="w-4 h-4" />
                    {language === 'en' ? 'Send Email' : language === 'es' ? 'Enviar Email' : 'Enviar Email'}
                  </a>
                </div>
              </div>

              {/* Social Media Card */}
              <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center text-white">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-black">
                      {language === 'en' ? 'Follow Us' : language === 'es' ? 'Síguenos' : 'Siga-nos'}
                    </h3>
                    <p className="text-gray-600">
                      {language === 'en' ? 'Stay updated with our innovations' : 
                       language === 'es' ? 'Mantente actualizado con nuestras innovaciones' : 
                       'Mantenha-se atualizado com nossas inovações'}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {/* Facebook */}
                  <a
                    href="https://www.facebook.com/share/15RH74RRUs/?mibextid=LQQJ4d"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                      <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-black group-hover:text-blue-600 transition-colors">
                        Facebook
                      </p>
                      <p className="text-gray-600 text-sm">
                        {language === 'en' ? 'Follow us on Facebook' : 
                         language === 'es' ? 'Síguenos en Facebook' : 
                         'Siga-nos no Facebook'}
                      </p>
                    </div>
                  </a>

                  {/* LinkedIn */}
                  <a
                    href="https://www.linkedin.com/company/lerobotics/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                      <svg className="w-5 h-5 text-blue-700" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-black group-hover:text-blue-700 transition-colors">
                        LinkedIn
                      </p>
                      <p className="text-gray-600 text-sm">
                        {language === 'en' ? 'Professional network' : 
                         language === 'es' ? 'Red profesional' : 
                         'Rede profesional'}
                      </p>
                    </div>
                  </a>

                  {/* YouTube */}
                  <a
                    href="https://youtube.com/@lerobotics?si=2Tc5xb6xw4rYusRk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-red-50 transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center group-hover:bg-red-200 transition-colors">
                      <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-black group-hover:text-red-600 transition-colors">
                        YouTube
                      </p>
                      <p className="text-gray-600 text-sm">
                        {language === 'en' ? 'Videos and tutorials' : 
                         language === 'es' ? 'Videos y tutoriales' : 
                         'Vídeos e tutoriais'}
                      </p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form - Below the cards */}
          <div className="contact-form max-w-4xl mx-auto bg-white rounded-[3rem] p-8 sm:p-16 shadow-2xl border border-gray-100">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                <MessageSquare className="w-8 h-8" />
              </div>
              <h2 className="text-4xl font-bold text-black">
                {language === 'en' ? 'Send us a message' : language === 'es' ? 'Envíanos un mensaje' : 'Envie-nos uma mensagem'}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-base font-semibold text-black mb-3">
                    {t.contact.name}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 text-lg rounded-2xl border-2 border-gray-200 focus:border-red-500 focus:ring-0 outline-none transition-all bg-gray-50"
                    placeholder={language === 'en' ? 'John Doe' : language === 'es' ? 'Juan Pérez' : 'João Silva'}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-base font-semibold text-black mb-3">
                    {t.contact.email}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 text-lg rounded-2xl border-2 border-gray-200 focus:border-red-500 focus:ring-0 outline-none transition-all bg-gray-50"
                    placeholder="john@company.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="company" className="block text-base font-semibold text-black mb-3">
                  {t.contact.company}
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-5 py-4 text-lg rounded-2xl border-2 border-gray-200 focus:border-red-500 focus:ring-0 outline-none transition-all bg-gray-50"
                  placeholder={language === 'en' ? 'Your Company' : language === 'es' ? 'Tu Empresa' : 'Sua Empresa'}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-base font-semibold text-black mb-3">
                  {t.contact.message}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-5 py-4 text-lg rounded-2xl border-2 border-gray-200 focus:border-red-500 focus:ring-0 outline-none transition-all resize-none bg-gray-50"
                  placeholder={
                    language === 'en'
                      ? 'Tell us about your project...'
                      : language === 'es'
                      ? 'Cuéntanos sobre tu proyecto...'
                      : 'Conte-nos sobre seu projeto...'
                  }
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-6 bg-gradient-to-r from-red-600 to-red-500 text-white text-xl font-bold rounded-full hover:from-red-500 hover:to-red-400 transition-all duration-500 hover:scale-105 hover:shadow-[0_20px_60px_rgba(220,38,38,0.4)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {isSubmitting ? (
                  <span>
                    {language === 'en' ? 'Sending...' : language === 'es' ? 'Enviando...' : 'Enviando...'}
                  </span>
                ) : (
                  <>
                    <span>{t.contact.send}</span>
                    <Send className="w-6 h-6" />
                  </>
                )}
              </button>

              {submitStatus === 'success' && (
                <div className="p-6 bg-green-50 border-2 border-green-200 rounded-2xl text-green-800 text-center font-semibold text-lg">
                  {t.contact.success}
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="p-6 bg-red-50 border-2 border-red-200 rounded-2xl text-red-800 text-center font-semibold text-lg">
                  {t.contact.error}
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Offices Section */}
      <section className="py-40 bg-black">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-24">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-3xl text-white mb-10">
              <Building2 className="w-10 h-10" />
            </div>
            <h2 className="text-6xl sm:text-7xl md:text-8xl font-bold text-white mb-8 tracking-tight">
              {language === 'en' ? 'Our Global Offices' : language === 'es' ? 'Nuestras Oficinas Globales' : 'Nossos Escritórios Globais'}
            </h2>
            <p className="text-2xl sm:text-3xl text-white/80 max-w-4xl mx-auto font-light leading-relaxed">
              {language === 'en'
                ? 'Visit us at one of our locations across the Americas'
                : language === 'es'
                ? 'Visítanos en una de nuestras ubicaciones en las Américas'
                : 'Visite-nos em um de nossos locais nas Américas'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {offices.map((office, index) => (
              <div
                key={index}
                className="office-card group bg-white/5 backdrop-blur-sm rounded-[2.5rem] overflow-hidden hover:bg-white/10 transition-all duration-700 hover:scale-[1.02] border border-white/10"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={office.image}
                    alt={office.city}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  <div className="absolute top-6 right-6 text-5xl">{office.flag}</div>
                </div>
                <div className="p-10">
                  <h3 className="text-3xl font-bold text-white mb-2 tracking-tight">{office.city}</h3>
                  <p className="text-xl text-white/60 mb-6">{office.country}</p>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-red-400 flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-white/90">{office.address}</p>
                        <p className="text-white/70">{office.zip}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-red-400 flex-shrink-0" />
                      <a href={`tel:${office.phone}`} className="text-white/90 hover:text-white transition-colors">
                        {office.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-red-400 flex-shrink-0" />
                      <a href={`mailto:${office.email}`} className="text-white/90 hover:text-white transition-colors">
                        {office.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-40 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <h2 className="text-6xl sm:text-7xl md:text-8xl font-bold text-black mb-10 tracking-tight">
            {language === 'en' ? 'Ready to Get Started?' : language === 'es' ? '¿Listo para Comenzar?' : 'Pronto para Começar?'}
          </h2>
          <p className="text-2xl sm:text-3xl text-gray-600 max-w-4xl mx-auto mb-16 font-light leading-relaxed">
            {language === 'en'
              ? 'Schedule a demo and see how our AI robotics solutions can transform your business'
              : language === 'es'
              ? 'Programa una demostración y ve cómo nuestras soluciones robóticas IA pueden transformar tu negocio'
              : 'Agende uma demonstração e veja como nossas soluções robóticas IA podem transformar seu negócio'}
          </p>
          <a
            href="/products"
            className="inline-flex items-center justify-center gap-3 px-12 py-6 bg-gradient-to-r from-red-600 to-red-500 text-white text-xl font-semibold rounded-full hover:from-red-500 hover:to-red-400 transition-all duration-500 hover:scale-105 hover:shadow-[0_30px_80px_rgba(220,38,38,0.4)]"
          >
            {language === 'en' ? 'View Products' : language === 'es' ? 'Ver Productos' : 'Ver Produtos'}
          </a>
        </div>
      </section>
    </div>
  );
};