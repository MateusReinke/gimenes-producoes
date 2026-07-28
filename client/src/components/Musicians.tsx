import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Music, Award, Star } from "lucide-react";

const Musicians = () => {
  const musicians = [
    {
      name: "Maestro Carlos Silva",
      instrument: "Regente Principal",
      bio: "Formado pela Juilliard School, com mais de 20 anos de experiência regendo orquestras internacionais.",
      specialty: "Sinfonias de Beethoven e Mozart",
      image: null, // Placeholder para futura imagem
      experience: "20+ anos"
    },
    {
      name: "Ana Beatriz Costa",
      instrument: "Primeira Violinista",
      bio: "Concertino formada pelo Conservatório de Paris, vencedora de múltiplos concursos internacionais.",
      specialty: "Concertos de Vivaldi e Bach",
      image: null,
      experience: "15+ anos"
    },
    {
      name: "Eduardo Mendes",
      instrument: "Cellista Principal",
      bio: "Solista reconhecido internacionalmente, professor do Conservatório Nacional de Música.",
      specialty: "Suítes de Bach e sonatas de Brahms",
      image: null,
      experience: "18+ anos"
    },
    {
      name: "Maria Fernanda Lima",
      instrument: "Flautista Solo",
      bio: "Primeira flauta da Orquestra Sinfônica Nacional, especialista em música barroca e clássica.",
      specialty: "Concertos de Mozart e Telemann",
      image: null,
      experience: "12+ anos"
    },
    {
      name: "Roberto Oliveira",
      instrument: "Pianista Acompanhador",
      bio: "Pianista de câmara com formação no Royal College of Music de Londres.",
      specialty: "Música de câmara e acompanhamentos",
      image: null,
      experience: "14+ anos"
    },
    {
      name: "Juliana Santos",
      instrument: "Violinista",
      bio: "Segunda violinista com especialização em música contemporânea e repertório clássico.",
      specialty: "Quartetos de cordas",
      image: null,
      experience: "10+ anos"
    }
  ];

  return (
    <section id="musicians" className="py-24 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20 animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-full mb-6">
            <Music className="h-8 w-8 text-white" />
          </div>
          <h2 className="font-playfair font-bold text-4xl md:text-6xl text-foreground mb-6">
            Nossos Artistas
          </h2>
          <p className="font-inter text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Conheça os talentosos músicos que compõem nosso ensemble, cada um trazendo 
            sua expertise e paixão pela música clássica em apresentações únicas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-12">
          {musicians.map((musician, index) => (
            <Card 
              key={musician.name}
              className="group shadow-card hover:shadow-elegant transition-elegant hover-modern animate-scale-in bg-card overflow-hidden border-0"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-0">
                {/* Área da Imagem */}
                <div className="relative h-80 bg-gradient-primary overflow-hidden">
                  {musician.image ? (
                    <img 
                      src={musician.image} 
                      alt={musician.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-elegant"
                    />
                  ) : (
                    // Placeholder elegante para futuras imagens
                    <div className="w-full h-full bg-gradient-primary flex flex-col items-center justify-center text-white relative">
                      <div className="absolute inset-0 bg-black/20"></div>
                      <div className="relative z-10 text-center">
                        <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-4">
                          <Music className="h-12 w-12 text-white" />
                        </div>
                        <span className="text-3xl font-playfair font-bold">
                          {musician.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      {/* Badge de experiência */}
                      <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                        <span className="text-xs font-inter font-medium text-white flex items-center">
                          <Star className="h-3 w-3 mr-1" />
                          {musician.experience}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Conteúdo */}
                <div className="p-8">
                  <div className="text-center mb-6">
                    <h3 className="font-playfair font-bold text-2xl text-foreground mb-2">
                      {musician.name}
                    </h3>
                    <div className="flex items-center justify-center text-primary font-semibold mb-4">
                      <Award className="h-4 w-4 mr-2" />
                      <span className="font-inter">{musician.instrument}</span>
                    </div>
                  </div>
                  
                  <p className="font-inter text-muted-foreground leading-relaxed mb-6 text-center">
                    {musician.bio}
                  </p>
                  
                  <div className="border-t border-border pt-6">
                    <div className="bg-gradient-modern rounded-lg p-4">
                      <p className="font-inter text-sm text-muted-foreground text-center">
                        <span className="font-semibold text-primary block mb-1">Especialidade</span> 
                        {musician.specialty}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16 animate-fade-in-up">
          <Button 
            variant="outline" 
            size="lg"
            className="font-inter font-medium hover:bg-primary hover:text-primary-foreground border-primary/50 px-8 py-3 text-lg"
          >
            <Music className="h-5 w-5 mr-2" />
            Conheça Todos os Artistas
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Musicians;