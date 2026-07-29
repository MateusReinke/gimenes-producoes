import { useEffect, useRef, useState } from "react";
import { Music, Award, Users } from "lucide-react";

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
      title: "Repertório Personalizado",
      description: "Criamos um repertório exclusivo para cada tipo de evento, atendendo aos pedidos musicais dos clientes e proporcionando uma experiência única para cada celebração."
    },
    {
      icon: Users,
      title: "Músicos de Excelência",
      description: "Nossa orquestra é composta pelos melhores músicos de São Paulo, com ampla experiência em eventos sociais, corporativos e orquestras sinfônicas."
    },
    {
      icon: Award,
      title: "Compromisso com a Qualidade",
      description: "Dedicação integral a cada apresentação musical, buscando sempre o mais alto nível de qualidade, sensibilidade artística e excelência em cada detalhe."
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20 items-stretch">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`h-full flex flex-col items-center justify-center text-center group transition-all duration-800 ${
                isVisible
                  ? 'animate-fade-in-up'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ animationDelay: `${isVisible ? index * 0.2 + 0.3 : 0}s` }}
            >
              <div className="bg-card shadow-card rounded-full p-6 w-20 h-20 mb-4 flex items-center justify-center group-hover:shadow-elegant transition-elegant shrink-0">
                <feature.icon className="h-8 w-8 text-primary" />
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
                Transmitir a emoção de momentos únicos através da música, proporcionando ao
                público experiências inesquecíveis que permanecem na memória de cada pessoa presente.
              </p>
              <p className="font-inter text-muted-foreground leading-relaxed">
                Acreditamos que cada apresentação deve emocionar, conectar pessoas e transformar
                momentos especiais em lembranças eternas através da música ao vivo.
              </p>
            </div>
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="bg-primary/10 rounded-lg p-3">
                  <Music className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-playfair font-semibold text-lg text-foreground">
                    2000+ Apresentações
                  </h4>
                  <p className="font-inter text-sm text-muted-foreground">
                    Realizadas em casamentos, noivados, formaturas, festas de aniversário e diversos eventos especiais
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-primary/10 rounded-lg p-3">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-playfair font-semibold text-lg text-foreground">
                    Especialistas em Eventos
                  </h4>
                  <p className="font-inter text-sm text-muted-foreground">
                    Atuação em eventos sociais e corporativos, oferecendo apresentações personalizadas para diferentes ocasiões
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-primary/10 rounded-lg p-3">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-playfair font-semibold text-lg text-foreground">
                    Experiência ao Vivo
                  </h4>
                  <p className="font-inter text-sm text-muted-foreground">
                    Anos de experiência em apresentações musicais ao vivo, garantindo profissionalismo, pontualidade e excelência artística
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