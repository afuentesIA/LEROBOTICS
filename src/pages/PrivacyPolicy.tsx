import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Language } from '../hooks/useLanguage';
import { translations } from '../i18n/translations';

gsap.registerPlugin(ScrollTrigger);

interface PrivacyPolicyProps {
  language: Language;
}

export const PrivacyPolicy = ({ language }: PrivacyPolicyProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animaciones para las secciones
      gsap.utils.toArray('.privacy-section').forEach((section, index) => {
        gsap.from(section as Element, {
          scrollTrigger: {
            trigger: section as Element,
            start: 'top 85%',
            end: 'top 60%',
            scrub: 1.5,
          },
          y: 80,
          opacity: 0,
          duration: 1,
        });
      });

      // Animaciones para las tarjetas de contacto
      gsap.utils.toArray('.contact-card').forEach((card, index) => {
        gsap.from(card as Element, {
          scrollTrigger: {
            trigger: card as Element,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 1,
          },
          y: 100,
          opacity: 0,
          scale: 0.9,
          duration: 1,
          delay: index * 0.1,
        });
      });

      // Animación para el título principal
      gsap.from('.privacy-title', {
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 75%',
          scrub: 1,
        },
        y: 50,
        opacity: 0,
        duration: 1,
      });

    }, contentRef);

    return () => ctx.revert();
  }, []);

  const t = translations[language]?.privacy || {};

  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12" ref={contentRef}>
        {/* Título principal - CAMBIADO A NEGRO */}
        <div className="privacy-title mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-black mb-6 tracking-tight">
            {language === 'en' 
              ? 'Privacy Policy' 
              : language === 'es' 
              ? 'Política de Privacidad' 
              : 'Política de Privacidade'}
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-red-600 to-red-500 rounded-full"></div>
        </div>

        {/* Contenido de la política */}
        <div className="space-y-12">
          {/* Sección 1: Colección de información */}
          <section className="privacy-section">
            <h2 className="text-2xl sm:text-3xl font-bold text-black mb-6 tracking-tight">
              {language === 'en' 
                ? 'Collection, Use, and Disclosure of Personal Information' 
                : language === 'es' 
                ? 'Recopilación, Uso y Divulgación de Información Personal' 
                : 'Coleta, Uso e Divulgação de Informações Pessoais'}
            </h2>
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed text-justify"> {/* AGREGADO text-justify */}
              <p>
                {language === 'en' 
                  ? "LERobotics does not automatically gather any personal information from you, such as email addresses. This information is obtained only if you supply it voluntarily by initiating contact with us or by registering with us as could be provided on other portions of this site. Any personal information that LERobotics requests from you is collected in compliance with section 33(c) of Alberta's Freedom of Information and Protection of Privacy Act (FOIP), which states that 'No personal information may be collected by or for a public body unless that information is necessary for an operating program or activity of the public body.'" 
                  : language === 'es' 
                  ? "LERobotics no recopila automáticamente información personal como direcciones de correo electrónico. Esta información se obtiene solo si la proporciona voluntariamente al contactarnos o registrarse con nosotros, como se podría proporcionar en otras partes de este sitio. Toda la información personal que LERobotics solicita se recopila de acuerdo con la sección 33(c) de la Ley de Libertad de Información y Protección de la Privacidad (FOIP) de Alberta, que establece que 'Ninguna información personal puede ser recopilada por o para un organismo público a menos que esa información sea necesaria para un programa operativo o actividad del organismo público.'" 
                  : "A LERobotics não coleta automaticamente informações pessoais, como endereços de e-mail. Essas informações são obtidas apenas se você as fornecer voluntariamente ao entrar em contato conosco ou ao se registrar conosco, conforme pode ser fornecido em outras partes deste site. Qualquer informação pessoal que a LERobotics solicita é coletada em conformidade com a seção 33(c) da Lei de Liberdade de Informação e Proteção da Privacidade (FOIP) de Alberta, que afirma que 'Nenhuma informação pessoal pode ser coletada por ou para um órgão público, a menos que essa informação seja necessária para um programa operacional ou atividade do órgão público.'"}
              </p>
              <p>
                {language === 'en' 
                  ? "At the point of collection, you will be informed that your personal information is being collected, advised of the purpose for which it is being collected, and notified that you have a right of access to your personal information. Personal information will be used only for the purpose for which it was collected or for a use consistent with that purpose. Personal information will not be released to a third party unless the release is permitted or required by law." 
                  : language === 'es' 
                  ? "En el punto de recopilación, se le informará que se está recopilando su información personal, se le informará el propósito para el que se está recopilando y se le notificará que tiene derecho a acceder a su información personal. La información personal se utilizará solo para el propósito para el que fue recopilada o para un uso consistente con ese propósito. La información personal no se divulgará a terceros a menos que la divulgación esté permitida o sea requerida por la ley." 
                  : "No ponto de coleta, você será informado de que suas informações pessoais estão sendo coletadas, informado sobre o propósito para o qual estão sendo coletadas e notificado de que você tem o direito de acessar suas informações pessoais. As informações pessoais serão usadas apenas para a finalidade para a qual foram coletadas ou para um uso consistente com essa finalidade. As informações pessoais não serão divulgadas a terceiros, a menos que a divulgação seja permitida ou exigida por lei."}
              </p>
              <p>
                {language === 'en' 
                  ? "If you choose to provide us with your personal information—for example, in an email message to us—we use that information to respond to you and to help get you the information you have requested." 
                  : language === 'es' 
                  ? "Si decide proporcionarnos su información personal, por ejemplo, en un mensaje de correo electrónico, usamos esa información para responderle y ayudarlo a obtener la información que ha solicitado." 
                  : "Se você optar por nos fornecer suas informações pessoais, por exemplo, em uma mensagem de e-mail, usamos essas informações para responder a você e ajudá-lo a obter as informações que solicitou."}
              </p>
              <p>
                {language === 'en' 
                  ? "We treat emails the same way we treat letters sent to us. We do not collect personal information for any general purposes, and we do not collect personal information for commercial marketing. We only share the personal information you give us with government departments or agencies if your inquiry relates to that department and the sharing is permitted by law. We do not create individual profiles with the information you provide or give the information to private organizations for them to create profiles." 
                  : language === 'es' 
                  ? "Tratamos los correos electrónicos de la misma manera que tratamos las cartas enviadas a nosotros. No recopilamos información personal para ningún propósito general, y no recopilamos información personal para marketing comercial. Solo compartimos la información personal que nos proporciona con departamentos o agencias gubernamentales si su consulta se relaciona con ese departamento y el intercambio está permitido por la ley. No creamos perfiles individuales con la información que proporciona ni damos la información a organizaciones privadas para que creen perfiles." 
                  : "Tratamos e-mails da mesma forma que tratamos cartas enviadas para nós. Não coletamos informações pessoais para quaisquer fins gerais e não coletamos informações pessoais para marketing comercial. Compartilhamos as informações pessoais que você nos fornece apenas com departamentos ou agências governamentais se sua consulta estiver relacionada a esse departamento e o compartilhamento for permitido por lei. Não criamos perfis individuais com as informações que você fornece nem fornecemos as informações para organizações privadas criarem perfis."}
              </p>
            </div>
          </section>

          {/* Sección 2: Comentarios */}
          <section className="privacy-section">
            <h2 className="text-2xl sm:text-3xl font-bold text-black mb-6 tracking-tight">
              {language === 'en' ? 'Comments' : language === 'es' ? 'Comentarios' : 'Comentários'}
            </h2>
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed text-justify"> {/* AGREGADO text-justify */}
              <p>
                {language === 'en' 
                  ? "When you submit a comment or send us a question, you might be asked for your name, email address, or other personal information. This information is only used to process and respond to your question or comment. Unless otherwise indicated, this information is not disclosed by LERobotics except to its authorized personnel that need the information in order to respond to you." 
                  : language === 'es' 
                  ? "Cuando envía un comentario o nos envía una pregunta, es posible que se le solicite su nombre, dirección de correo electrónico u otra información personal. Esta información se usa solo para procesar y responder a su pregunta o comentario. A menos que se indique lo contrario, esta información no es divulgada por LERobotics, excepto a su personal autorizado que necesita la información para responderle." 
                  : "Quando você envia um comentário ou nos envia uma pergunta, pode ser solicitado seu nome, endereço de e-mail ou outras informações pessoais. Essas informações são usadas apenas para processar e responder à sua pergunta ou comentário. Salvo indicação em contrário, essas informações não são divulgadas pela LERobotics, exceto para seu pessoal autorizado que precisa das informações para responder a você."}
              </p>
              <p>
                {language === 'en' 
                  ? "The information you submit via email is secure once it reaches LERobotics server. However, it might not be secure in transit between your computer and our server. If you prefer, you may fax, mail, or phone us at LERobotics contact numbers and addresses provided on this website." 
                  : language === 'es' 
                  ? "La información que envía por correo electrónico es segura una vez que llega al servidor de LERobotics. Sin embargo, podría no ser segura durante el tránsito entre su computadora y nuestro servidor. Si lo prefiere, puede enviarnos un fax, correo postal o llamarnos a los números de contacto y direcciones de LERobotics proporcionados en este sitio web." 
                  : "As informações que você envia por e-mail são seguras assim que chegam ao servidor da LERobotics. No entanto, podem não ser seguras durante o trânsito entre seu computador e nosso servidor. Se preferir, você pode nos enviar um fax, correio ou ligar para os números de contato e endereços da LERobotics fornecidos neste site."}
              </p>
            </div>
          </section>

          {/* Sección 3: Cookies */}
          <section className="privacy-section">
            <h2 className="text-2xl sm:text-3xl font-bold text-black mb-6 tracking-tight">
              {language === 'en' ? 'Cookies' : language === 'es' ? 'Cookies' : 'Cookies'}
            </h2>
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed text-justify"> {/* AGREGADO text-justify */}
              <p>
                {language === 'en' 
                  ? "A cookie is a file that is placed on your device along with your temporary internet files while you are visiting a website. LERobotics uses cookies on this website to track how visitors navigate the site. We do not store personal information in cookies, nor do we collect personal information from you without your knowledge as you browse." 
                  : language === 'es' 
                  ? "Una cookie es un archivo que se coloca en su dispositivo junto con sus archivos de Internet temporales mientras visita un sitio web. LERobotics utiliza cookies en este sitio web para rastrear cómo navegan los visitantes por el sitio. No almacenamos información personal en las cookies, ni recopilamos información personal de usted sin su conocimiento mientras navega." 
                  : "Um cookie é um arquivo que é colocado em seu dispositivo junto com seus arquivos de Internet temporários enquanto você visita um site. A LERobotics usa cookies neste site para rastrear como os visitantes navegam pelo site. Não armazenamos informações pessoais em cookies, nem coletamos informações pessoais de você sem seu conhecimento enquanto você navega."}
              </p>
              <p>
                {language === 'en' 
                  ? "All cookies are 'first-party cookies,' which means they belong to the same domain that you see in your browser's address bar." 
                  : language === 'es' 
                  ? "Todas las cookies son 'cookies de primera parte', lo que significa que pertenecen al mismo dominio que ve en la barra de direcciones de su navegador." 
                  : "Todos os cookies são 'cookies de primeira parte', o que significa que pertencem ao mesmo domínio que você vê na barra de endereços do seu navegador."}
              </p>
            </div>
          </section>

          {/* Sección 4: Información de Internet */}
          <section className="privacy-section">
            <h2 className="text-2xl sm:text-3xl font-bold text-black mb-6 tracking-tight">
              {language === 'en' 
                ? 'Information Collected Via The Internet' 
                : language === 'es' 
                ? 'Información Recopilada a Través de Internet' 
                : 'Informações Coletadas Via Internet'}
            </h2>
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed text-justify"> {/* AGREGADO text-justify */}
              <p>
                {language === 'en' 
                  ? "When you visit LERobotics website, the web server automatically collects a limited amount of information essential for the operation and security of our website and the other sites that reside on the server. Some of this information (i.e., browser type) does not identify who you are, whereas other information, such as your Internet domain name or IP address, might identify you. The extent of personal identification depends, in large part, on the naming standards followed by your Internet service provider. You might wish to check with your provider to inquire about its policies and practices in this regard." 
                  : language === 'es' 
                  ? "Cuando visita el sitio web de LERobotics, el servidor web recopila automáticamente una cantidad limitada de información esencial para el funcionamiento y la seguridad de nuestro sitio web y los otros sitios que residen en el servidor. Parte de esta información (por ejemplo, el tipo de navegador) no identifica quién es usted, mientras que otra información, como su nombre de dominio de Internet o dirección IP, podría identificarlo. La medida de la identificación personal depende, en gran parte, de los estándares de nomenclatura seguidos por su proveedor de servicios de Internet. Es posible que desee consultar con su proveedor para preguntar sobre sus políticas y prácticas en este sentido." 
                  : "Quando você visita o site da LERobotics, o servidor web coleta automaticamente uma quantidade limitada de informações essenciais para a operação e segurança de nosso site e dos outros sites que residem no servidor. Parte dessas informações (por exemplo, tipo de navegador) não identifica quem você é, enquanto outras informações, como seu nome de domínio da Internet ou endereço IP, podem identificá-lo. A extensão da identificação pessoal depende, em grande parte, dos padrões de nomenclatura seguidos pelo seu provedor de serviços de Internet. Você pode verificar com seu provedor para consultar suas políticas e práticas nesse sentido."}
              </p>
            </div>
          </section>

          {/* Sección 5: Contacto */}
          <section className="privacy-section">
            <h2 className="text-2xl sm:text-3xl font-bold text-black mb-6 tracking-tight">
              {language === 'en' 
                ? 'Questions: How to Contact' 
                : language === 'es' 
                ? 'Preguntas: Cómo Contactar' 
                : 'Perguntas: Como Entrar em Contato'}
            </h2>
            <p className="text-lg text-gray-700 mb-12 text-justify"> {/* AGREGADO text-justify */}
              {language === 'en' 
                ? 'For more information about LERobotics privacy policies, please contact us:'
                : language === 'es' 
                ? 'Para obtener más información sobre las políticas de privacidad de LERobotics, contáctenos:'
                : 'Para mais informações sobre as políticas de privacidade da LERobotics, entre em contato conosco:'}
            </p>

            {/* Tarjetas de contacto */}
            <div ref={cardsRef} className="grid md:grid-cols-3 gap-8">
              {/* Llamar */}
              <div className="contact-card bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 border border-gray-100 hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mb-6">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-black mb-4">
                  {language === 'en' ? 'Call Us' : language === 'es' ? 'Llámenos' : 'Ligue para Nós'}
                </h3>
                <p className="text-gray-600 mb-6">
                  {language === 'en' 
                    ? 'Monday - Friday, 9am - 6pm'
                    : language === 'es' 
                    ? 'Lunes - Viernes, 9am - 6pm'
                    : 'Segunda - Sexta, 9h - 18h'}
                </p>
                <div className="space-y-3">
                  <p className="font-medium text-black">CA +1 403-860-5275</p>
                  <p className="font-medium text-black">BR +55 11 99614-1138</p>
                  <p className="font-medium text-black">MX +52 81 1078-6110</p>
                </div>
              </div>

              {/* Email */}
              <div className="contact-card bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 border border-gray-100 hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-600 to-gray-700 rounded-2xl flex items-center justify-center mb-6">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-black mb-4">
                  {language === 'en' ? 'Email Us' : language === 'es' ? 'Envíenos un Email' : 'Envie-nos um Email'}
                </h3>
                <p className="text-gray-600 mb-6">
                  {language === 'en' 
                    ? "We'll respond within 24 hours"
                    : language === 'es' 
                    ? 'Responderemos en 24 horas'
                    : 'Responderemos em 24 horas'}
                </p>
                <p className="font-medium text-black text-lg">info@lerobotics.ai</p>
              </div>

              {/* Visitar */}
              <div className="contact-card bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 border border-gray-100 hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-black mb-4">
                  {language === 'en' ? 'Visit Us' : language === 'es' ? 'Visítenos' : 'Visite-nos'}
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium text-black mb-2">Canada Headquarters</p>
                    <p className="text-gray-600 text-sm">
                      1000, 639 5th Ave SW<br />
                      Calgary, Alberta<br />
                      T2P 0M9 Canada
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-black mb-2">Jundiaí/São Paulo</p>
                    <p className="text-gray-600 text-sm">Brazil Office</p>
                  </div>
                  <div>
                    <p className="font-medium text-black mb-2">Monterrey/Nuevo León</p>
                    <p className="text-gray-600 text-sm">Mexico Office</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Enlace de regreso */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <Link
            to="/"
            className="inline-flex items-center gap-3 text-lg font-semibold text-red-600 hover:text-red-500 transition-colors group"
          >
            <span className="transform rotate-180">→</span>
            <span>
              {language === 'en' 
                ? 'Back to Home'
                : language === 'es' 
                ? 'Volver al Inicio'
                : 'Voltar para Home'}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};