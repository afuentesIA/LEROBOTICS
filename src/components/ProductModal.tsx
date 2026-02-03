import { useEffect, useRef } from 'react';
import { X, Download, Share2 } from 'lucide-react';
import gsap from 'gsap';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    name: string;
    tagline: string;
    description: string;
    images: string[];
    specs: Array<{
      label: string;
      value: string;
      icon: React.ReactNode;
    }>;
    extendedSpecs?: {
      [category: string]: Array<{
        label: string;
        value: string;
      }>;
    };
  };
  language: 'en' | 'es' | 'pt';
}

export const ProductModal = ({ isOpen, onClose, product, language }: ProductModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';

      gsap.fromTo(
        modalRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'power2.out' }
      );

      gsap.fromTo(
        contentRef.current,
        { y: 100, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'power3.out', delay: 0.1 }
      );
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleClose = () => {
    gsap.to(contentRef.current, {
      y: 50,
      opacity: 0,
      scale: 0.95,
      duration: 0.3,
      ease: 'power2.in',
    });
    gsap.to(modalRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: onClose,
    });
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isOpen) return null;

  const extendedSpecs = product.extendedSpecs || {};

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
      onClick={handleBackdropClick}
    >
      <div
        ref={contentRef}
        className="relative w-full max-w-6xl max-h-[90vh] bg-white rounded-[2.5rem] overflow-hidden shadow-2xl"
      >
        <div className="sticky top-0 z-10 bg-gradient-to-b from-white to-white/95 backdrop-blur-xl border-b border-gray-100">
          <div className="flex items-center justify-between p-8">
            <div className="flex-1">
              <h2 className="text-4xl sm:text-5xl font-bold text-black tracking-tight mb-2">
                {product.name}
              </h2>
              <p className="text-xl text-gray-600">{product.tagline}</p>
            </div>
            <div className="flex items-center gap-3 ml-6">
              <button
                onClick={() => alert(language === 'en' ? 'Share feature coming soon' : language === 'es' ? 'Función compartir próximamente' : 'Recurso compartilhar em breve')}
                className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all hover:scale-110"
              >
                <Share2 className="w-5 h-5 text-gray-700" />
              </button>
              <button
                onClick={() => alert(language === 'en' ? 'Download brochure coming soon' : language === 'es' ? 'Descargar folleto próximamente' : 'Baixar folheto em breve')}
                className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all hover:scale-110"
              >
                <Download className="w-5 h-5 text-gray-700" />
              </button>
              <button
                onClick={handleClose}
                className="w-12 h-12 rounded-full bg-red-100 hover:bg-red-200 flex items-center justify-center transition-all hover:scale-110"
              >
                <X className="w-6 h-6 text-red-600" />
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-120px)] p-8 sm:p-12">
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-xl group">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-black mb-4">
                  {language === 'en' ? 'Overview' : language === 'es' ? 'Descripción' : 'Descrição'}
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4">
                {product.specs.slice(0, 4).map((spec, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100"
                  >
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-red-600 text-white mb-3">
                      {spec.icon}
                    </div>
                    <div className="text-sm text-gray-500 mb-1">{spec.label}</div>
                    <div className="text-xl font-bold text-black">{spec.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-12 mb-12">
            <h3 className="text-3xl font-bold text-black mb-8 tracking-tight">
              {language === 'en' ? 'Complete Technical Specifications' : language === 'es' ? 'Especificaciones Técnicas Completas' : 'Especificações Técnicas Completas'}
            </h3>

            {Object.entries(extendedSpecs).map(([category, specs], catIndex) => (
              <div key={catIndex} className="mb-10">
                <h4 className="text-xl font-bold text-black mb-6 tracking-tight">{category}</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {specs.map((spec, specIndex) => (
                    <div
                      key={specIndex}
                      className="flex items-center justify-between p-5 rounded-2xl bg-gradient-to-r from-gray-50 to-white border border-gray-100 hover:border-gray-200 transition-all"
                    >
                      <span className="text-gray-700 font-medium">{spec.label}</span>
                      <span className="text-black font-bold">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 pt-12">
            <div className="bg-gradient-to-br from-red-50 to-white rounded-3xl p-10 text-center border border-red-100">
              <h3 className="text-3xl font-bold text-black mb-4 tracking-tight">
                {language === 'en' ? 'Ready to Transform Your Operations?' : language === 'es' ? '¿Listo para Transformar tus Operaciones?' : 'Pronto para Transformar suas Operações?'}
              </h3>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                {language === 'en'
                  ? 'Contact our sales team to learn more about this product and how it can revolutionize your business'
                  : language === 'es'
                  ? 'Contacta a nuestro equipo de ventas para aprender más sobre este producto y cómo puede revolucionar tu negocio'
                  : 'Entre em contato com nossa equipe de vendas para saber mais sobre este produto e como ele pode revolucionar seu negócio'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center px-10 py-5 bg-gradient-to-r from-red-600 to-red-500 text-white text-lg font-semibold rounded-full hover:from-red-500 hover:to-red-400 transition-all duration-500 hover:scale-105 hover:shadow-[0_20px_60px_rgba(220,38,38,0.4)]"
                >
                  {language === 'en' ? 'Contact Sales' : language === 'es' ? 'Contactar Ventas' : 'Contatar Vendas'}
                </a>
                <button
                  onClick={() => alert(language === 'en' ? 'Request quote coming soon' : language === 'es' ? 'Solicitar cotización próximamente' : 'Solicitar cotação em breve')}
                  className="inline-flex items-center justify-center px-10 py-5 border-2 border-black text-black text-lg font-semibold rounded-full hover:bg-black hover:text-white transition-all duration-500 hover:scale-105"
                >
                  {language === 'en' ? 'Request Quote' : language === 'es' ? 'Solicitar Cotización' : 'Solicitar Cotação'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
