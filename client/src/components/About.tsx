import { useEffect, useRef, useState } from "react";
import { Music, Award, Users, Heart } from "lucide-react";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);
  const features = [
    {
      icon: Music,
      title: "Repertório Refinado",
      description: "Seleção cuidadosa de obras clássicas dos grandes mestres da música erudita"
    },
    {
      icon: Users,
      title: "Músicos Experientes",
      description: "Profissionais formados nos melhores conservatórios com décadas de experiência"
    },
    {
      icon: Award,
      title: "Excelência Reconhecida",
      description: "Premiados em concursos nacionais e internacionais de música clássica"
    },
    {
      icon: Heart,
      title: "Paixão pela Arte",
      description: "Dedicação integral à preservação e difusão da música clássica de qualidade"
    }
  ];

  return (
    <section ref={sectionRef} id="about" className="py-32 bg-gradient-subtle relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className={`text-center mb-20 transition-all duration-1000 ${
          isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="font-playfair font-bold text-4xl md:text-5xl text-foreground mb-6">
            Sobre Nosso Ensemble
          </h2>
          <p className="font-inter text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Formado por músicos apaixonados pela arte clássica, nosso ensemble dedica-se à 
            apresentação de obras atemporais com a técnica e sensibilidade que a música erudita merece.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className={`text-center group transition-all duration-800 ${
                isVisible 
                  ? 'animate-fade-in-up' 
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ animationDelay: `${isVisible ? index * 0.2 + 0.3 : 0}s` }}
            >
              <div className="bg-card shadow-card rounded-full p-6 w-20 h-20 mx-auto mb-4 group-hover:shadow-elegant transition-elegant">
                <feature.icon className="h-8 w-8 text-primary mx-auto" />
              </div>
              <h3 className="font-playfair font-semibold text-xl text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="font-inter text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className={`bg-card shadow-modern rounded-3xl p-12 md:p-16 transition-all duration-1000 ${
          isVisible ? 'animate-scale-in' : 'opacity-0 scale-95'
        }`} style={{ animationDelay: '0.8s' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="font-playfair font-bold text-3xl text-foreground mb-6">
                Nossa Missão
              </h3>
              <p className="font-inter text-muted-foreground leading-relaxed mb-6">
                Promover a música clássica através de apresentações de alto nível artístico, 
                proporcionando ao público experiências musicais transformadoras e educativas.
              </p>
              <p className="font-inter text-muted-foreground leading-relaxed">
                Acreditamos que a música clássica tem o poder de enriquecer vidas e criar 
                conexões profundas entre pessoas de todas as idades e origens.
              </p>
            </div>
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="bg-primary/10 rounded-lg p-3">
                  <Music className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-playfair font-semibold text-lg text-foreground">
                    200+ Apresentações
                  </h4>
                  <p className="font-inter text-sm text-muted-foreground">
                    Concertos realizados em teatros e salas de concerto
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-primary/10 rounded-lg p-3">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-playfair font-semibold text-lg text-foreground">
                    15 Músicos Profissionais
                  </h4>
                  <p className="font-inter text-sm text-muted-foreground">
                    Especialistas em instrumentos de cordas e sopros
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-primary/10 rounded-lg p-3">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-playfair font-semibold text-lg text-foreground">
                    10 Anos de Experiência
                  </h4>
                  <p className="font-inter text-sm text-muted-foreground">
                    Tradição em apresentações de música clássica
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;