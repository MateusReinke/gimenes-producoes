import { Music, Heart, Star, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import SpotifyPlayer from "./SpotifyPlayer";

const Repertoire = () => {
  const repertoireHighlights = [
    {
      category: "Casamentos",
      icon: Heart,
      description: "Trilha sonora romântica para cada momento especial",
      pieces: ["Ave Maria - Schubert", "Canon in D - Pachelbel", "Wedding March - Mendelssohn"],
      color: "text-pink-600"
    },
    {
      category: "Música Sacra", 
      icon: Star,
      description: "Repertório solene para cerimônias religiosas",
      pieces: ["Aleluia - Händel", "Te Deum - Berlioz", "Magnificat - Bach"],
      color: "text-purple-600"
    },
    {
      category: "Clássicos Populares",
      icon: Music,
      description: "Grandes sucessos da música erudita que todos conhecem",
      pieces: ["Primavera - Vivaldi", "Für Elise - Beethoven", "Clair de Lune - Debussy"],
      color: "text-blue-600"
    }
  ];

  return (
    <section id="repertoire" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 scroll-fade-in">
          <h2 className="font-playfair font-bold text-4xl md:text-5xl lg:text-6xl mb-6 text-foreground">
            Nosso Repertório
          </h2>
          <p className="font-inter text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Ouça nossa seleção musical especial no Spotify. Um acervo diversificado que abrange desde os clássicos atemporais até 
            as mais belas composições contemporâneas, cuidadosamente selecionado para cada ocasião especial.
          </p>
        </div>

        {/* Spotify Player Integration */}
        <div className="mb-16 scroll-fade-in">
          <SpotifyPlayer />
        </div>

        {/* Repertoire Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {repertoireHighlights.map((category, index) => (
            <Card 
              key={index}
              className="hover-lift scroll-fade-in bg-card border-border/50 group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-gradient-subtle flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <category.icon className={`h-8 w-8 ${category.color}`} />
                </div>
                <CardTitle className="font-playfair font-semibold text-2xl text-card-foreground">
                  {category.category}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="font-inter text-muted-foreground mb-6 leading-relaxed">
                  {category.description}
                </CardDescription>
                
                <div className="space-y-2">
                  <h4 className="font-inter font-semibold text-sm text-card-foreground mb-3 uppercase tracking-wide">
                    Destaques:
                  </h4>
                  {category.pieces.map((piece, idx) => (
                    <div key={idx} className="font-inter text-sm text-muted-foreground flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                      {piece}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center scroll-fade-in">
          <div className="bg-card shadow-card rounded-3xl p-12 max-w-3xl mx-auto">
            <Music className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="font-playfair font-bold text-2xl text-card-foreground mb-4">
              Repertório Personalizado
            </h3>
            <p className="font-inter text-muted-foreground leading-relaxed mb-6">
              Além do nosso repertório padrão, criamos programas musicais personalizados para eventos especiais, 
              casamentos, cerimônias corporativas e celebrações únicas.
            </p>
            <p className="font-inter text-sm text-muted-foreground">
              Possui uma música especial em mente? Entre em contato para discutir suas necessidades musicais específicas.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Repertoire;