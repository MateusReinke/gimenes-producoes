import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Music, Award, Star, Instagram, Youtube, Mail, ArrowRight } from "lucide-react";

const InteractiveMusicians = () => {
  const [selectedMusician, setSelectedMusician] = useState<number | null>(null);

  const musicians = [
    {
      id: 1,
      name: "Maestro Carlos Silva",
      instrument: "Regente Principal",
      instrumentDescription: "A batuta é uma extensão da alma do maestro, coordenando a harmonia de dezenas de músicos em perfeita sintonia.",
      bio: "Formado pela Juilliard School, com mais de 20 anos de experiência regendo orquestras internacionais. Especialista em sinfonias clássicas e contemporâneas.",
      specialty: "Sinfonias de Beethoven e Mozart",
      experience: "20+ anos",
      image: null,
      achievements: ["Medalha de Honra - Conservatório Nacional", "Regente Principal - Orquestra Sinfônica SP"],
      social: {
        instagram: "@maestro.carlos.silva",
        youtube: "Carlos Silva Conductor",
        email: "carlos.silva@gimenes.com"
      }
    },
    {
      id: 2,
      name: "Ana Beatriz Costa",
      instrument: "Primeira Violinista",
      instrumentDescription: "O violino, conhecido como o rei dos instrumentos, produz sonoridades que vão do mais delicado sussurro ao mais poderoso fortissimo.",
      bio: "Concertino formada pelo Conservatório de Paris, vencedora de múltiplos concursos internacionais. Reconhecida pela técnica impecável e interpretação sensível.",
      specialty: "Concertos de Vivaldi e Bach",
      experience: "15+ anos",
      image: null,
      achievements: ["1º Lugar - Concurso Internacional de Violino", "Solista convidada - Orquestra de Câmara"],
      social: {
        instagram: "@ana.violinista",
        youtube: "Ana Beatriz Violin",
        email: "ana.costa@gimenes.com"
      }
    },
    {
      id: 3,
      name: "Eduardo Mendes",
      instrument: "Cellista Principal",
      instrumentDescription: "O violoncelo possui a capacidade única de expressar a mais profunda gama de emoções humanas, desde a melancolia até a exuberância.",
      bio: "Solista reconhecido internacionalmente, professor do Conservatório Nacional de Música. Especialista em repertório romântico e contemporâneo.",
      specialty: "Suítes de Bach e sonatas de Brahms",
      experience: "18+ anos", 
      image: null,
      achievements: ["Professor Titular - Conservatório Nacional", "Solista Internacional"],
      social: {
        instagram: "@eduardo.cello",
        youtube: "Eduardo Mendes Cello",
        email: "eduardo.mendes@gimenes.com"
      }
    },
    {
      id: 4,
      name: "Maria Fernanda Lima",
      instrument: "Flautista Solo",
      instrumentDescription: "A flauta, com sua sonoridade cristalina e etérea, é capaz de evocar desde paisagens bucólicas até tempestades dramáticas.",
      bio: "Primeira flauta da Orquestra Sinfônica Nacional, especialista em música barroca e clássica. Reconhecida pela pureza do som e virtuosismo técnico.",
      specialty: "Concertos de Mozart e Telemann",
      experience: "12+ anos",
      image: null,
      achievements: ["Primeira Flauta - OSN", "Especialista em Música Barroca"],
      social: {
        instagram: "@maria.flauta",
        youtube: "Maria Fernanda Flute",
        email: "maria.lima@gimenes.com"
      }
    }
  ];

  const handleMusicianClick = (musicianId: number) => {
    setSelectedMusician(selectedMusician === musicianId ? null : musicianId);
  };

  return (
    <section id="musicians" className="py-24 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20 animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-full mb-6">
            <Music className="h-8 w-8 text-primary-foreground" />
          </div>
          <h2 className="font-playfair font-bold text-4xl md:text-6xl text-foreground mb-6">
            Nossos Artistas
          </h2>
          <p className="font-inter text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Conheça os talentosos músicos que compõem nosso ensemble. Clique em cada artista 
            para descobrir mais sobre sua trajetória e paixão pela música.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {musicians.map((musician, index) => (
            <Card 
              key={musician.id}
              className={`group shadow-card transition-elegant hover-modern animate-scale-in bg-card overflow-hidden border-0 cursor-pointer
                ${selectedMusician === musician.id ? 'shadow-elegant scale-[1.02]' : 'hover:shadow-modern'}`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => handleMusicianClick(musician.id)}
            >
              <CardContent className="p-0">
                <div className="relative">
                  {/* Main Content - Always Visible */}
                  <div className={`transition-all duration-500 ${selectedMusician === musician.id ? 'opacity-0 absolute inset-0' : 'opacity-100'}`}>
                    {/* Instrument Photo Area */}
                    <div className="relative h-80 bg-gradient-dark overflow-hidden">
                      <div className="w-full h-full bg-gradient-primary flex flex-col items-center justify-center text-primary-foreground relative">
                        <div className="absolute inset-0 bg-black/20"></div>
                        <div className="relative z-10 text-center">
                          <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mb-6">
                            <Music className="h-16 w-16 text-white" />
                          </div>
                          <h3 className="text-2xl font-playfair font-bold mb-2">
                            {musician.instrument}
                          </h3>
                          <p className="text-sm opacity-90 px-4 leading-relaxed">
                            {musician.instrumentDescription}
                          </p>
                        </div>
                        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                          <span className="text-xs font-inter font-medium text-white flex items-center">
                            <Star className="h-3 w-3 mr-1" />
                            {musician.experience}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Basic Info */}
                    <div className="p-8">
                      <div className="text-center">
                        <h3 className="font-playfair font-bold text-2xl text-card-foreground mb-2">
                          {musician.name}
                        </h3>
                        <div className="flex items-center justify-center text-primary font-semibold mb-4">
                          <Award className="h-4 w-4 mr-2" />
                          <span className="font-inter">{musician.instrument}</span>
                        </div>
                        <div className="flex items-center justify-center text-muted-foreground">
                          <ArrowRight className="h-4 w-4 mr-2" />
                          <span className="text-sm font-inter">Clique para conhecer mais</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Detailed Content - Shown when selected */}
                  <div className={`transition-all duration-500 ${selectedMusician === musician.id ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'}`}>
                    {/* Artist Photo Area */}
                    <div className="relative h-96 bg-gradient-dark overflow-hidden">
                      {musician.image ? (
                        <img 
                          src={musician.image} 
                          alt={musician.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-hero flex flex-col items-center justify-center text-white relative">
                          <div className="absolute inset-0 bg-black/30"></div>
                          <div className="relative z-10 text-center">
                            <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mb-4">
                              <span className="text-4xl font-playfair font-bold">
                                {musician.name.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                            <p className="text-white/80 text-sm">Foto será adicionada em breve</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Detailed Info */}
                    <div className="p-8 space-y-6">
                      <div className="text-center">
                        <h3 className="font-playfair font-bold text-3xl text-card-foreground mb-2">
                          {musician.name}
                        </h3>
                        <div className="flex items-center justify-center text-primary font-semibold mb-4">
                          <Award className="h-5 w-5 mr-2" />
                          <span className="font-inter text-lg">{musician.instrument}</span>
                        </div>
                      </div>
                      
                      <p className="font-inter text-muted-foreground leading-relaxed text-center">
                        {musician.bio}
                      </p>
                      
                      <div className="bg-gradient-modern rounded-lg p-6 space-y-4">
                        <div>
                          <h4 className="font-semibold text-primary mb-2 font-inter">Especialidade</h4>
                          <p className="text-sm text-muted-foreground">{musician.specialty}</p>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-primary mb-2 font-inter">Conquistas</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {musician.achievements.map((achievement, idx) => (
                              <li key={idx} className="flex items-center">
                                <Star className="h-3 w-3 mr-2 text-primary" />
                                {achievement}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Social Media */}
                      <div className="border-t border-border pt-6">
                        <h4 className="font-semibold text-primary mb-4 text-center font-inter">Conecte-se</h4>
                        <div className="flex justify-center space-x-4">
                          <Button variant="outline" size="sm" className="flex items-center hover:bg-pink-500/10 hover:border-pink-500/50">
                            <Instagram className="h-4 w-4 mr-2 text-pink-400" />
                            Instagram
                          </Button>
                          <Button variant="outline" size="sm" className="flex items-center hover:bg-red-500/10 hover:border-red-500/50">
                            <Youtube className="h-4 w-4 mr-2 text-red-400" />
                            YouTube
                          </Button>
                          <Button variant="outline" size="sm" className="flex items-center hover:bg-primary/10 hover:border-primary/50">
                            <Mail className="h-4 w-4 mr-2 text-primary" />
                            Email
                          </Button>
                        </div>
                      </div>
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

export default InteractiveMusicians;