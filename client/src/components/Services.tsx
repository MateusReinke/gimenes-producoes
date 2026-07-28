import { Heart, Building2, Crown, Church, Users, Sparkles } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Services = () => {
  const services = [
    {
      icon: Heart,
      title: "Casamentos",
      description: "Trilha sonora perfeita para o seu grande dia, desde a cerimônia até a festa.",
      features: ["Cerimônia religiosa", "Entrada da noiva", "Assinatura do registro", "Coquetel"],
      color: "text-pink-600"
    },
    {
      icon: Building2,
      title: "Eventos Corporativos",
      description: "Música sofisticada para convenções, lançamentos e celebrações empresariais.",
      features: ["Networking", "Apresentações", "Jantares executivos", "Premiações"],
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
      features: ["Missas especiais", "Batizados", "Primeira comunhão", "Crismas"],
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index}
              className="hover-lift scroll-fade-in bg-card border-border/50 group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="text-center pb-4">
                <div className={`mx-auto mb-4 w-16 h-16 rounded-full bg-gradient-subtle flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className={`h-8 w-8 ${service.color}`} />
                </div>
                <CardTitle className="font-playfair font-semibold text-2xl text-card-foreground">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="font-inter text-muted-foreground mb-6 leading-relaxed">
                  {service.description}
                </CardDescription>
                
                <div className="mb-6">
                  <h4 className="font-inter font-semibold text-sm text-card-foreground mb-3 uppercase tracking-wide">
                    Incluímos:
                  </h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="font-inter text-sm text-muted-foreground flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button 
                  variant="outline" 
                  className="w-full font-inter font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  Solicitar Orçamento
                </Button>
              </CardContent>
            </Card>
          ))}
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