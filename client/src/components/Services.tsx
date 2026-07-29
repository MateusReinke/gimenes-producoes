import { useLayoutEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { Heart, Building2, Crown, Church, Users, Sparkles } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Services = () => {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [equalHeight, setEqualHeight] = useState<number>();

  useLayoutEffect(() => {
    const equalize = () => {
      // Force a real React commit that removes minHeight before measuring -
      // otherwise, if the new max happens to equal the current state, React
      // bails out of re-rendering and any manual DOM reset would stick.
      flushSync(() => setEqualHeight(undefined));

      const cards = cardRefs.current.filter((el): el is HTMLDivElement => el !== null);
      if (cards.length === 0) return;
      setEqualHeight(Math.max(...cards.map((el) => el.offsetHeight)));
    };

    // flushSync can't run synchronously inside a layout effect's own commit,
    // so defer the first pass to the next frame.
    const raf = requestAnimationFrame(equalize);
    // Web fonts can still be swapping in when the first pass runs, which
    // would leave the equalized height based on fallback-font metrics.
    document.fonts?.ready.then(equalize).catch(() => {});

    let resizeTimeout: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(equalize, 150);
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const services = [
    {
      icon: Heart,
      title: "Casamentos",
      description: "Trilha sonora perfeita para o seu grande dia, desde a cerimônia até a festa.",
      featuresLabel: "Música ao Vivo para",
      features: [
        "Entrada do Noivo",
        "Entrada dos Pais",
        "Entrada dos Padrinhos",
        "Entrada da Florista",
        "Entrada das Plaquinhas",
        "Entrada da Noiva",
        "Entrada das Alianças",
        "Momento dos Votos",
        "Assinaturas",
        "Cumprimentos",
        "Saída do Casal"
      ],
      color: "text-pink-600"
    },
    {
      icon: Building2,
      title: "Eventos Corporativos",
      description: "Música sofisticada para convenções, lançamentos e celebrações empresariais.",
      features: ["Networking", "Apresentações", "Jantares executivos", "Premiações", "Receptivo", "Coquetel"],
      color: "text-blue-600"
    },
    {
      icon: Crown,
      title: "Bodas & Aniversários",
      description: "Celebrações especiais com a elegância que esses momentos merecem.",
      features: ["Bodas de prata/ouro", "Aniversários especiais", "Reuniões familiares", "Homenagens"],
      color: "text-yellow-600"
    },
    {
      icon: Church,
      title: "Cerimônias Religiosas",
      description: "Repertório sacro para missas, batizados, crismas e outras celebrações.",
      features: ["Missas especiais", "Batizados", "Primeira comunhão", "Crismas", "Missa de 7º Dia"],
      color: "text-purple-600"
    },
    {
      icon: Users,
      title: "Formaturas",
      description: "Música solene e festiva para marcar essa conquista tão importante.",
      features: ["Entrada dos formandos", "Hino nacional", "Entrega de diplomas", "Confraternização"],
      color: "text-green-600"
    },
    {
      icon: Sparkles,
      title: "Debutantes",
      description: "A trilha sonora perfeita para celebrar os 15 anos de forma inesquecível.",
      features: ["Valsa de abertura", "Cerimônia das rosas", "Troca dos sapatos", "Festa"],
      color: "text-pink-500"
    }
  ];

  return (
    <section id="services" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 scroll-fade-in">
          <h2 className="font-playfair font-bold text-4xl md:text-5xl lg:text-6xl mb-6 text-foreground">
            Nossos Serviços
          </h2>
          <p className="font-inter text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Oferecemos música ao vivo para diversos tipos de eventos, sempre com o máximo 
            de profissionalismo e qualidade artística.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {services.map((service, index) => {
            const isMultiColumn = service.features.length > 4;
            return (
              <Card
                key={index}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className="h-full flex flex-col hover-lift scroll-fade-in bg-card border-border/50 group"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  minHeight: equalHeight ? `${equalHeight}px` : undefined,
                }}
              >
                <CardHeader className="text-center pb-4">
                  <div className={`mx-auto mb-4 w-16 h-16 rounded-full bg-gradient-subtle flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className={`h-8 w-8 ${service.color}`} />
                  </div>
                  <CardTitle className="font-playfair font-semibold text-2xl text-card-foreground">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col text-center">
                  <CardDescription className="font-inter text-muted-foreground mb-6 leading-relaxed">
                    {service.description}
                  </CardDescription>

                  <div className="mb-6 flex-1">
                    <h4 className="font-inter font-semibold text-sm text-card-foreground mb-3 uppercase tracking-wide">
                      {service.featuresLabel ?? "Incluímos"}:
                    </h4>
                    <ul
                      className={
                        isMultiColumn
                          ? "grid grid-cols-2 gap-x-4 gap-y-2 text-left"
                          : "space-y-2"
                      }
                    >
                      {service.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className={`font-inter text-sm text-muted-foreground flex items-center ${
                            isMultiColumn ? "" : "justify-center"
                          }`}
                        >
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2 shrink-0"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full mt-auto font-inter font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    Solicitar Orçamento
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12 scroll-fade-in">
          <p className="font-inter text-muted-foreground mb-6">
            Não encontrou o tipo de evento que procura?
          </p>
          <Button size="lg" className="gradient-primary shadow-elegant hover-modern font-inter font-medium">
            Fale Conosco para Eventos Personalizados
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;