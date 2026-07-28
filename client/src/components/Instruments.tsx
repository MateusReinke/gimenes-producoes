import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

const Instruments = () => {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  const instruments = [
    {
      name: "Violino",
      description: "Instrumento de cordas dedilhadas com som brilhante e expressivo, fundamental na música clássica",
      details: "4 cordas afinadas em quintas perfeitas",
      range: "G3 - E7",
      family: "Cordas",
      icon: "🎻"
    },
    {
      name: "Violoncelo",
      description: "Instrumento de cordas com registro grave e médio, conhecido por sua sonoridade calorosa",
      details: "Tocado sentado, apoiado no chão",
      range: "C2 - C6",
      family: "Cordas",
      icon: "🎻"
    },
    {
      name: "Flauta",
      description: "Instrumento de sopro que produz sons cristalinos e etéreos nas regiões aguda e sobreaguda",
      details: "Instrumento transversal de madeira ou metal",
      range: "C4 - D7",
      family: "Sopros",
      icon: "🎵"
    },
    {
      name: "Piano",
      description: "Instrumento de cordas percutidas com o maior registro entre todos os instrumentos",
      details: "88 teclas, 7 oitavas completas",
      range: "A0 - C8",
      family: "Teclas",
      icon: "🎹"
    },
    {
      name: "Viola",
      description: "Instrumento de cordas ligeiramente maior que o violino, com timbre mais escuro",
      details: "Afinação uma quinta abaixo do violino",
      range: "C3 - E6",
      family: "Cordas",
      icon: "🎻"
    },
    {
      name: "Clarinete",
      description: "Instrumento de sopro com palheta simples, versátil em dinâmica e expressão",
      details: "Registro amplo com diferentes timbres",
      range: "D3 - C7",
      family: "Sopros",
      icon: "🎷"
    },
    {
      name: "Oboé",
      description: "Instrumento de sopro com palheta dupla, conhecido por seu timbre nasal característico",
      details: "Tradicionalmente dá o 'Lá' para afinação",
      range: "Bb3 - G6",
      family: "Sopros",
      icon: "🎵"
    },
    {
      name: "Contrabaixo",
      description: "O maior instrumento de cordas, fornece a base harmônica e rítmica do ensemble",
      details: "Tocado em pé ou com banqueta alta",
      range: "E1 - G4",
      family: "Cordas",
      icon: "🎻"
    }
  ];

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.getAttribute('data-index') || '0');
          if (entry.isIntersecting) {
            setVisibleItems(prev => new Set([...prev, index]));
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll('.instrument-card');
    elements.forEach((element) => {
      if (observerRef.current) {
        observerRef.current.observe(element);
      }
    });

    return () => {
      elements.forEach((element) => {
        if (observerRef.current) {
          observerRef.current.unobserve(element);
        }
      });
    };
  }, []);

  return (
    <section id="instruments" className="py-32 bg-gradient-modern relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 left-10 opacity-5">
        <div className="text-9xl">🎼</div>
      </div>
      <div className="absolute bottom-20 right-10 opacity-5">
        <div className="text-9xl">🎶</div>
      </div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-20 scroll-fade-in">
          <h2 className="font-playfair font-bold text-5xl md:text-6xl text-foreground mb-8">
            Nossos Instrumentos
          </h2>
          <p className="font-inter text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Cada instrumento traz sua personalidade única ao nosso ensemble, 
            criando uma sinfonia de sons que transcende o tempo
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {instruments.map((instrument, index) => (
            <Card 
              key={instrument.name}
              data-index={index}
              className={`instrument-card shadow-modern hover:shadow-elegant transition-all duration-700 hover-modern bg-card border-0 overflow-hidden ${
                visibleItems.has(index) 
                  ? index % 2 === 0 
                    ? 'animate-fade-in-left' 
                    : 'animate-fade-in-right'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ 
                animationDelay: `${(index % 4) * 0.2}s`,
                transitionDelay: `${(index % 4) * 0.1}s`
              }}
            >
              <CardContent className="p-8">
                <div className="flex items-start space-x-6">
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center text-3xl shadow-soft">
                      {instrument.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="mb-4">
                      <h3 className="font-playfair font-bold text-2xl text-foreground mb-2">
                        {instrument.name}
                      </h3>
                      <span className="inline-block px-3 py-1 bg-primary/10 text-primary font-inter text-sm rounded-full">
                        {instrument.family}
                      </span>
                    </div>
                    
                    <p className="font-inter text-muted-foreground leading-relaxed mb-4">
                      {instrument.description}
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-inter font-semibold text-foreground block mb-1">
                          Características:
                        </span>
                        <span className="font-inter text-muted-foreground">
                          {instrument.details}
                        </span>
                      </div>
                      <div>
                        <span className="font-inter font-semibold text-foreground block mb-1">
                          Registro:
                        </span>
                        <span className="font-inter text-muted-foreground font-mono">
                          {instrument.range}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20 scroll-fade-in">
          <div className="bg-card shadow-elegant rounded-3xl p-12 max-w-3xl mx-auto">
            <div className="text-6xl mb-6">🎼</div>
            <h3 className="font-playfair font-bold text-3xl text-foreground mb-6">
              A Harmonia Perfeita
            </h3>
            <p className="font-inter text-lg text-muted-foreground leading-relaxed mb-8">
              Quando estes instrumentos se unem, criam uma experiência sonora única 
              que toca a alma e desperta emoções profundas. 
              Cada apresentação é uma jornada musical inesquecível.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {['Harmonia', 'Técnica', 'Emoção', 'Tradição', 'Inovação'].map((tag) => (
                <span 
                  key={tag}
                  className="px-4 py-2 bg-primary/5 text-primary font-inter text-sm rounded-full border border-primary/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Instruments;