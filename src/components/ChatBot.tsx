import { useState, useRef, useEffect } from 'react';
import { X, MessageCircle, ChevronRight, Bot, User, Globe, Sparkles } from 'lucide-react';
import { Language } from '../hooks/useLanguage';

interface ChatBotProps {
  language: Language; // Idioma principal de la aplicación
  onLanguageChange: (language: Language) => void; // Para cambiar el idioma de toda la app
}

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  isTyping?: boolean;
}

interface ChatOption {
  id: string;
  text: {
    en: string;
    es: string;
    pt: string;
  };
  responses: {
    en: string;
    es: string;
    pt: string;
  };
  nextOptions?: string[];
}

export const ChatBot = ({ language: appLanguage, onLanguageChange: changeAppLanguage }: ChatBotProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentOptions, setCurrentOptions] = useState<string[]>([]);
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [chatLanguage, setChatLanguage] = useState<Language>(appLanguage); // Estado separado para el chatbot
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sincronizar el idioma del chat con el de la app cuando cambia
  useEffect(() => {
    setChatLanguage(appLanguage);
  }, [appLanguage]);

  // Textos que rotan automáticamente entre los tres idiomas
  const rotatingTexts = [
    "Need help?",
    "¿Necesitas ayuda?", 
    "Precisa de ajuda?"
  ];

  // Efecto para rotar los textos cada 3 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % rotatingTexts.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  const chatOptions: Record<string, ChatOption> = {
    'welcome': {
      id: 'welcome',
      text: {
        en: 'Hello! I\'m your welding automation assistant. How can I help you today? 🤖✨',
        es: '¡Hola! Soy tu asistente de automatización de soldadura. ¿Cómo puedo ayudarte hoy? 🤖✨',
        pt: 'Olá! Sou seu assistente de automação de soldagem. Como posso ajudá-lo hoje? 🤖✨'
      },
      responses: {
        en: 'Welcome to LE Robotics',
        es: 'Bienvenido a LE Robotics',
        pt: 'Bem-vindo à LE Robotics'
      },
      nextOptions: ['products', 'support', 'quote', 'training', 'language']
    },
    'products': {
      id: 'products',
      text: {
        en: 'Our AI-powered welding solutions include:',
        es: 'Nuestras soluciones de soldadura con IA incluyen:',
        pt: 'Nossas soluções de soldagem com IA incluem:'
      },
      responses: {
        en: 'Products and Solutions',
        es: 'Productos y Soluciones',
        pt: 'Produtos e Soluções'
      },
      nextOptions: ['pipeline_welding', 'industrial_fabrication', 'vision_systems', 'back']
    },
    'support': {
      id: 'support',
      text: {
        en: 'We provide local support in Canada, USA, Mexico, and Brazil. What do you need help with? 🛠️',
        es: 'Brindamos soporte local en Canadá, USA, México y Brasil. ¿Con qué necesitas ayuda? 🛠️',
        pt: 'Fornecemos suporte local no Canadá, EUA, México e Brasil. Com o que você precisa de ajuda? 🛠️'
      },
      responses: {
        en: 'Technical Support',
        es: 'Soporte Técnico',
        pt: 'Suporte Técnico'
      },
      nextOptions: ['contact_support', 'maintenance', 'training_info', 'back']
    },
    'quote': {
      id: 'quote',
      text: {
        en: 'Great! To provide you with an accurate quote, I\'ll need some information about your project. 📊',
        es: '¡Excelente! Para proporcionarte un presupuesto preciso, necesitaré información sobre tu proyecto. 📊',
        pt: 'Ótimo! Para fornecer um orçamento preciso, precisarei de informações sobre seu projeto. 📊'
      },
      responses: {
        en: 'Get a Quote',
        es: 'Obtener Cotización',
        pt: 'Obter Orçamento'
      },
      nextOptions: ['quote_industrial', 'quote_pipeline', 'contact_sales', 'back']
    },
    'training': {
      id: 'training',
      text: {
        en: 'We offer comprehensive training programs for your team: 🎓',
        es: 'Ofrecemos programas de capacitación completos para tu equipo: 🎓',
        pt: 'Oferecemos programas de treinamento abrangentes para sua equipe: 🎓'
      },
      responses: {
        en: 'Training Programs',
        es: 'Programas de Capacitación',
        pt: 'Programas de Treinamento'
      },
      nextOptions: ['basic_training', 'advanced_training', 'certification', 'back']
    },
    'language': {
      id: 'language',
      text: {
        en: 'I can help you in multiple languages! Which language would you prefer? 🌐',
        es: '¡Puedo ayudarte en múltiples idiomas! ¿Qué idioma prefieres? 🌐',
        pt: 'Posso ajudá-lo em vários idiomas! Qual idioma você prefere? 🌐'
      },
      responses: {
        en: 'Change Language',
        es: 'Cambiar Idioma',
        pt: 'Mudar Idioma'
      },
      nextOptions: ['lang_en', 'lang_es', 'lang_pt', 'back']
    },
    'lang_en': {
      id: 'lang_en',
      text: {
        en: 'Perfect! I\'ll speak English with you. How can I assist you today? 🇺🇸',
        es: 'Perfect! I\'ll speak English with you. How can I assist you today? 🇺🇸',
        pt: 'Perfect! I\'ll speak English with you. How can I assist you today? 🇺🇸'
      },
      responses: {
        en: 'English',
        es: 'Inglés',
        pt: 'Inglês'
      },
      nextOptions: ['welcome']
    },
    'lang_es': {
      id: 'lang_es',
      text: {
        en: '¡Perfecto! Hablaré español contigo. ¿Cómo puedo ayudarte hoy? 🇪🇸',
        es: '¡Perfecto! Hablaré español contigo. ¿Cómo puedo ayudarte hoy? 🇪🇸',
        pt: '¡Perfecto! Hablaré español contigo. ¿Cómo puedo ayudarte hoy? 🇪🇸'
      },
      responses: {
        en: 'Spanish',
        es: 'Español',
        pt: 'Espanhol'
      },
      nextOptions: ['welcome']
    },
    'lang_pt': {
      id: 'lang_pt',
      text: {
        en: 'Perfeito! Vou falar português com você. Como posso ajudá-lo hoje? 🇧🇷',
        es: 'Perfeito! Vou falar português com você. Como posso ajudá-lo hoje? 🇧🇷',
        pt: 'Perfeito! Vou falar português com você. Como posso ajudá-lo hoje? 🇧🇷'
      },
      responses: {
        en: 'Portuguese',
        es: 'Portugués',
        pt: 'Português'
      },
      nextOptions: ['welcome']
    },
    'pipeline_welding': {
      id: 'pipeline_welding',
      text: {
        en: 'Our pipeline welding systems feature AI-powered adaptive welding for oil & gas applications. Certified for CSA (Canada), NR-12 (Brazil), and NOM (Mexico) standards. 🔧',
        es: 'Nuestros sistemas de soldadura de tuberías cuentan con soldadura adaptativa con IA para aplicaciones de petróleo y gas. Certificados para estándares CSA (Canadá), NR-12 (Brasil) y NOM (México). 🔧',
        pt: 'Nossos sistemas de soldagem de tubulações possuem soldagem adaptativa com IA para aplicações de petróleo e gás. Certificados para padrões CSA (Canadá), NR-12 (Brasil) e NOM (México). 🔧'
      },
      responses: {
        en: 'Pipeline Welding Systems',
        es: 'Sistemas de Soldadura de Tuberías',
        pt: 'Sistemas de Soldagem de Tubulações'
      },
      nextOptions: ['specifications', 'demo', 'quote_pipeline', 'back_products']
    },
    'industrial_fabrication': {
      id: 'industrial_fabrication',
      text: {
        en: 'Industrial fabrication solutions with 3D vision welding for automotive, aerospace, and heavy equipment manufacturing. 🏭',
        es: 'Soluciones de fabricación industrial con soldadura de visión 3D para manufactura automotriz, aeroespacial y equipos pesados. 🏭',
        pt: 'Soluções de fabricação industrial com soldagem de visão 3D para manufatura automotiva, aeroespacial e equipamentos pesados. 🏭'
      },
      responses: {
        en: 'Industrial Fabrication',
        es: 'Fabricación Industrial',
        pt: 'Fabrição Industrial'
      },
      nextOptions: ['applications', 'demo', 'quote_industrial', 'back_products']
    },
    'vision_systems': {
      id: 'vision_systems',
      text: {
        en: 'Our 3D vision welding systems use advanced computer vision for precision welding in complex industrial environments.',
        es: 'Nuestros sistemas de soldadura con visión 3D utilizan visión por computadora avanzada para soldadura de precisión en entornos industriales complejos.',
        pt: 'Nossos sistemas de soldagem com visão 3D usam visão computacional avançada para soldagem de precisão em ambientes industriais complexos.'
      },
      responses: {
        en: '3D Vision Systems',
        es: 'Sistemas de Visión 3D',
        pt: 'Sistemas de Visão 3D'
      },
      nextOptions: ['tech_specs', 'demo', 'back_products']
    },
    'contact_support': {
      id: 'contact_support',
      text: {
        en: 'Contact our support team:\n\n📞 Canada: +1 403-860-5275\n📧 Email: support@lerobotics.ai\n\nWe\'re available in English, Spanish, and Portuguese! 🎯',
        es: 'Contacta a nuestro equipo de soporte:\n\n📞 Canadá: +1 403-860-5275\n📧 Email: support@lerobotics.ai\n\n¡Disponibles en español, inglés y portugués! 🎯',
        pt: 'Contate nossa equipe de suporte:\n\n📞 Canadá: +1 403-860-5275\n📧 Email: support@lerobotics.ai\n\nDisponível em português, espanhol e inglês! 🎯'
      },
      responses: {
        en: 'Contact Support',
        es: 'Contactar Soporte',
        pt: 'Contatar Suporte'
      },
      nextOptions: ['back_support']
    },
    'demo': {
      id: 'demo',
      text: {
        en: 'Perfect! We can schedule a live demo of our welding robotics. Our team will contact you to arrange a convenient time. 🎥',
        es: '¡Perfecto! Podemos programar una demo en vivo de nuestra robótica de soldadura. Nuestro equipo te contactará para coordinar un horario conveniente. 🎥',
        pt: 'Perfeito! Podemos agendar uma demonstração ao vivo de nossa robótica de soldagem. Nossa equipe entrará em contato para agendar um horário conveniente. 🎥'
      },
      responses: {
        en: 'Schedule Demo',
        es: 'Programar Demo',
        pt: 'Agendar Demonstração'
      },
      nextOptions: ['contact_sales', 'back_products']
    },
    'quote_pipeline': {
      id: 'quote_pipeline',
      text: {
        en: 'For pipeline welding quotes, please provide:\n• Pipe diameter and material\n• Production volume\n• Location\nOur sales team will prepare a customized quote.',
        es: 'Para cotizaciones de soldadura de tuberías, por favor proporciona:\n• Diámetro y material del tubo\n• Volumen de producción\n• Ubicación\nNuestro equipo de ventas preparará una cotización personalizada.',
        pt: 'Para orçamentos de soldagem de tubulações, por favor forneça:\n• Diâmetro e material do tubo\n• Volume de produção\n• Localização\nNossa equipe de vendas preparará um orçamento personalizado.'
      },
      responses: {
        en: 'Pipeline Quote',
        es: 'Cotización Tuberías',
        pt: 'Orçamento Tubulações'
      },
      nextOptions: ['contact_sales', 'back_products']
    },
    'quote_industrial': {
      id: 'quote_industrial',
      text: {
        en: 'For industrial fabrication quotes, please tell us about:\n• Application (automotive, aerospace, etc.)\n• Production requirements\n• Material types\nWe\'ll provide a tailored solution.',
        es: 'Para cotizaciones de fabricación industrial, por favor cuéntanos sobre:\n• Aplicación (automotriz, aeroespacial, etc.)\n• Requisitos de producción\n• Tipos de material\nProporcionaremos una solución personalizada.',
        pt: 'Para orçamentos de fabricação industrial, por favor informe:\n• Aplicação (automotiva, aeroespacial, etc.)\n• Requisitos de produção\n• Tipos de material\nForneceremos uma solução personalizada.'
      },
      responses: {
        en: 'Industrial Quote',
        es: 'Cotización Industrial',
        pt: 'Orçamento Industrial'
      },
      nextOptions: ['contact_sales', 'back_products']
    },
    'contact_sales': {
      id: 'contact_sales',
      text: {
        en: 'Our sales team will contact you shortly. You can also reach us directly:\n📞 +1 403-860-5275\n📧 sales@lerobotics.ai',
        es: 'Nuestro equipo de ventas te contactará pronto. También puedes contactarnos directamente:\n📞 +1 403-860-5275\n📧 sales@lerobotics.ai',
        pt: 'Nossa equipe de vendas entrará em contato em breve. Você también pode nos contatar diretamente:\n📞 +1 403-860-5275\n📧 sales@lerobotics.ai'
      },
      responses: {
        en: 'Contact Sales',
        es: 'Contactar Ventas',
        pt: 'Contatar Vendas'
      },
      nextOptions: ['back']
    },
    'back': {
      id: 'back',
      text: {
        en: 'Returning to main menu... 🔄',
        es: 'Volviendo al menú principal... 🔄',
        pt: 'Retornando ao menu principal... 🔄'
      },
      responses: {
        en: 'Back to Main',
        es: 'Volver al Principal',
        pt: 'Voltar ao Principal'
      },
      nextOptions: ['welcome']
    },
    'back_products': {
      id: 'back_products',
      text: {
        en: 'Returning to products... 🔄',
        es: 'Volviendo a productos... 🔄',
        pt: 'Retornando aos produtos... 🔄'
      },
      responses: {
        en: 'Back to Products',
        es: 'Volver a Productos',
        pt: 'Voltar aos Produtos'
      },
      nextOptions: ['products']
    },
    'back_support': {
      id: 'back_support',
      text: {
        en: 'Returning to support... 🔄',
        es: 'Volviendo a soporte... 🔄',
        pt: 'Retornando ao suporte... 🔄'
      },
      responses: {
        en: 'Back to Support',
        es: 'Volver a Soporte',
        pt: 'Voltar ao Suporte'
      },
      nextOptions: ['support']
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeOption = chatOptions['welcome'];
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        text: welcomeOption.text[chatLanguage],
        isUser: false,
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
      setCurrentOptions(welcomeOption.nextOptions || []);
    }
  }, [isOpen, chatLanguage]);

  const simulateTyping = (text: string, callback: () => void) => {
    const typingMessage: Message = {
      id: 'typing-' + Date.now(),
      text: '',
      isUser: false,
      isTyping: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, typingMessage]);

    const typingDelay = Math.min(1000, Math.max(500, text.length * 20));
    
    setTimeout(() => {
      setMessages(prev => prev.filter(msg => msg.id !== typingMessage.id));
      callback();
    }, typingDelay);
  };

  const handleOptionClick = (optionId: string) => {
    const option = chatOptions[optionId];
    
    if (!option) return;

    if (optionId.startsWith('lang_')) {
      const newLang = optionId.split('_')[1] as Language;
      // Solo cambiar el idioma del chatbot, no de toda la aplicación
      setChatLanguage(newLang);
    
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      text: option.responses[chatLanguage],
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentOptions([]);

    simulateTyping(option.text[chatLanguage], () => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: option.text[chatLanguage],
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setCurrentOptions(option.nextOptions || []);
    });
  };

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      setMessages([]);
      setCurrentOptions(['welcome']);
      // Restaurar el idioma del chat al de la aplicación al cerrar
      setChatLanguage(appLanguage);
    }, 300);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const getLanguageFlag = (lang: Language) => {
    switch (lang) {
      case 'en': return '🇺🇸';
      case 'es': return '🇪🇸';
      case 'pt': return '🇧🇷';
      default: return '🌐';
    }
  };

  const getLanguageName = (lang: Language) => {
    switch (lang) {
      case 'en': return 'English';
      case 'es': return 'Español';
      case 'pt': return 'Português';
      default: return 'English';
    }
  };

  // Función para cambiar el idioma desde el botón del globo
  const handleChatLanguageChange = (newLang: Language) => {
    setChatLanguage(newLang);
    setShowLanguageSelector(false);
  };

  // Función para cambiar el idioma de toda la app desde el chatbot
  const handleGlobalLanguageChange = (newLang: Language) => {
    changeAppLanguage(newLang);
    setChatLanguage(newLang);
    setShowLanguageSelector(false);
  };

  return (
    <>
      {/* Chat Button - Con mejor ocultamiento del contenido */}
      {!isOpen && (
        <div className="fixed bottom-8 right-8 z-50 flex items-center gap-3">
          {/* Texto que rota automáticamente - MEJOR OCULTAMIENTO */}
          <div className="bg-black/80 text-white px-4 py-2 rounded-2xl shadow-lg backdrop-blur-sm">
            <div className="relative h-6 w-32 overflow-hidden">
              <div 
                className="absolute inset-0 flex flex-col transition-all duration-500 ease-in-out"
                style={{ transform: `translateY(-${currentTextIndex * 100}%)` }}
              >
                {rotatingTexts.map((text, index) => (
                  <div 
                    key={index} 
                    className="h-6 flex items-center justify-center flex-shrink-0"
                  >
                    <span className="text-sm font-semibold whitespace-nowrap">
                      {text}
                    </span>
                  </div>
                ))}
              </div>
              
              {/* Capa de ocultamiento para evitar que se vean otros textos */}
              <div className="absolute -top-1 -bottom-1 left-0 w-2 bg-black/80" />
              <div className="absolute -top-1 -bottom-1 right-0 w-2 bg-black/80" />
            </div>
          </div>

          {/* Botón completamente redondo */}
          <button
            onClick={() => setIsOpen(true)}
            className="w-16 h-16 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-full shadow-2xl flex items-center justify-center hover:from-red-500 hover:to-red-400 transition-all duration-300 hover:scale-110 group relative"
          >
            {/* Icono del chat */}
            <MessageCircle className="w-7 h-7 transition-transform duration-300 group-hover:scale-110" />
            
            {/* Indicador verde */}
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white shadow-sm" />
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white animate-pulse" />
            
            {/* Efecto de brillo al hover */}
            <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>
      )}

      {/* Chat Window Completo */}
      {isOpen && (
        <div className={`fixed bottom-8 right-8 z-50 w-96 ${isMinimized ? 'h-20' : 'h-[600px]'} bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col transition-all duration-500 ease-in-out`}>
          {/* Header */}
          <div className="bg-gradient-to-r from-red-600 to-red-500 px-6 py-4 rounded-t-2xl text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center relative">
                <Bot className="w-5 h-5" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h3 className="font-semibold">LE Robotics Assistant</h3>
                <p className="text-sm text-white/80 opacity-90 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  {chatLanguage === 'en' ? 'Online' : chatLanguage === 'es' ? 'En línea' : 'Online'}
                  <span className="text-xs ml-2 px-2 py-0.5 bg-white/20 rounded-full">
                    {getLanguageFlag(chatLanguage)} {getLanguageName(chatLanguage)}
                  </span>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowLanguageSelector(!showLanguageSelector)}
                className="w-8 h-8 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors relative"
                title="Change Chat Language"
              >
                <Globe className="w-4 h-4" />
              </button>
              <button
                onClick={toggleMinimize}
                className="w-8 h-8 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
              >
                <span className="text-lg font-bold">{isMinimized ? '+' : '-'}</span>
              </button>
              <button
                onClick={handleClose}
                className="w-8 h-8 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Language Selector Dropdown - Solo para el chatbot */}
          {showLanguageSelector && (
            <div className="absolute top-16 right-12 z-10 bg-white rounded-xl shadow-2xl border border-gray-200 p-3 animate-in fade-in slide-in-from-top-2">
              <div className="space-y-2">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Chat Language</div>
                {(['en', 'es', 'pt'] as Language[]).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => handleChatLanguageChange(lang)}
                    className={`w-full px-4 py-2 rounded-lg text-left transition-all duration-200 flex items-center gap-3 ${
                      chatLanguage === lang 
                        ? 'bg-red-50 text-red-600 border border-red-200' 
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <span className="text-lg">{getLanguageFlag(lang)}</span>
                    <span className="font-medium">{getLanguageName(lang)}</span>
                    {chatLanguage === lang && (
                      <Sparkles className="w-4 h-4 text-red-500 ml-auto" />
                    )}
                  </button>
                ))}
                <div className="pt-3 mt-3 border-t border-gray-200">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Entire Website</div>
                  <button
                    onClick={() => handleGlobalLanguageChange(chatLanguage)}
                    className="w-full px-4 py-2 rounded-lg text-left transition-all duration-200 flex items-center gap-3 hover:bg-gray-50 text-gray-700"
                  >
                    <span className="text-lg">🌐</span>
                    <span className="font-medium">Apply to entire website</span>
                    <ChevronRight className="w-4 h-4 text-gray-400 ml-auto" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Messages */}
          {!isMinimized && (
            <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-gray-50 to-white">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} animate-in fade-in duration-300`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 transition-all duration-300 ${
                        message.isUser
                          ? 'bg-gradient-to-r from-red-600 to-red-500 text-white rounded-br-none shadow-lg hover:shadow-xl transform hover:scale-105'
                          : message.isTyping
                          ? 'bg-white text-gray-800 border border-gray-200 rounded-bl-none shadow-sm'
                          : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none shadow-sm hover:shadow-md transform hover:scale-105'
                      }`}
                    >
                      {message.isTyping ? (
                        <div className="flex items-center gap-2">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                          <span className="text-sm text-gray-500">
                            {chatLanguage === 'en' ? 'AI is typing...' : chatLanguage === 'es' ? 'IA escribiendo...' : 'IA digitando...'}
                          </span>
                        </div>
                      ) : (
                        <>
                          <p className="text-sm whitespace-pre-line">{message.text}</p>
                          <p className={`text-xs mt-2 ${message.isUser ? 'text-white/70' : 'text-gray-500'} flex items-center gap-1`}>
                            {message.isUser ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                ))}
                
                {/* Options */}
                {currentOptions.length > 0 && (
                  <div className="space-y-3 pt-4 animate-in fade-in duration-500">
                    <p className="text-sm text-gray-500 mb-3 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-red-500" />
                      {chatLanguage === 'en' 
                        ? 'Choose an option:' 
                        : chatLanguage === 'es' 
                        ? 'Elige una opción:' 
                        : 'Escolha uma opção:'}
                    </p>
                    {currentOptions.map((optionId) => {
                      const option = chatOptions[optionId];
                      if (!option) return null;
                      
                      return (
                        <button
                          key={optionId}
                          onClick={() => handleOptionClick(optionId)}
                          className="w-full text-left p-4 bg-white border border-gray-200 rounded-xl hover:border-red-300 hover:bg-red-50 transition-all duration-300 group flex items-center justify-between transform hover:scale-[1.02] hover:shadow-md"
                        >
                          <span className="text-sm font-medium text-gray-800 group-hover:text-red-600 transition-colors">
                            {option.responses[chatLanguage]}
                          </span>
                          <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-red-500 group-hover:translate-x-1 transition-transform" />
                        </button>
                      );
                    })}
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            </div>
          )}

          {/* Footer */}
          {!isMinimized && (
            <div className="p-4 bg-white border-t border-gray-200 rounded-b-2xl">
              <p className="text-xs text-gray-500 text-center flex items-center justify-center gap-2">
                <Sparkles className="w-3 h-3 text-red-500" />
                {chatLanguage === 'en' 
                  ? 'Powered by LE Robotics AI' 
                  : chatLanguage === 'es' 
                  ? 'Impulsado por IA de LE Robotics' 
                  : 'Desenvolvido por LE Robotics IA'}
                <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full">
                  {getLanguageFlag(chatLanguage)}
                </span>
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
};