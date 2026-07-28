import { useQuery } from "@tanstack/react-query";
import type { Event } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Clock, Ticket } from "lucide-react";
import NewsletterForm from "./NewsletterForm";

const Events = () => {
  const { data: events, isLoading } = useQuery<Event[]>({
    queryKey: ["/api/events"],
  });

  if (isLoading) {
    return (
      <section id="events" className="py-32 bg-background">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg text-muted-foreground">Carregando eventos...</p>
        </div>
      </section>
    );
  }

  const upcomingEvents = events || [];

  return (
    <section id="events" className="py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20 scroll-fade-in">
          <h2 className="font-playfair font-bold text-4xl md:text-5xl text-foreground mb-6">
            Eventos e Concertos
          </h2>
          <p className="font-inter text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Acompanhe nossa agenda de apresentações e não perca a oportunidade de vivenciar 
            momentos únicos com a melhor música clássica.
          </p>
        </div>

        <div className="mb-20">
          <h3 className="font-playfair font-bold text-3xl text-foreground mb-12 text-center scroll-fade-in">
            Próximos Concertos
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {upcomingEvents.map((event, index) => (
              <Card 
                key={event.id}
                className={`shadow-modern hover:shadow-elegant transition-elegant hover-modern bg-card scroll-slide-${
                  index % 2 === 0 ? 'left' : 'right'
                } ${
                  event.featured ? 'ring-2 ring-primary/20' : ''
                }`}
                data-testid={`card-event-${event.id}`}
              >
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start mb-2">
                    <Badge 
                      variant={
                        event.status === "Ingressos Disponíveis" 
                          ? "default" 
                          : event.status === "Pré-venda" 
                            ? "secondary" 
                            : "outline"
                      }
                      className="mb-2"
                    >
                      {event.status}
                    </Badge>
                    {event.featured && (
                      <Badge variant="outline" className="border-primary text-primary">
                        Destaque
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="font-playfair text-2xl md:text-3xl leading-tight text-foreground">
                    {event.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="font-inter text-muted-foreground leading-relaxed">
                    {event.description}
                  </p>
                  
                  <div className="grid grid-cols-1 gap-3 pt-2">
                    <div className="flex items-center text-foreground/80">
                      <Calendar className="h-4 w-4 mr-3 text-primary" />
                      <span className="font-inter text-sm">{event.date}</span>
                    </div>
                    <div className="flex items-center text-foreground/80">
                      <Clock className="h-4 w-4 mr-3 text-primary" />
                      <span className="font-inter text-sm">{event.time}</span>
                    </div>
                    <div className="flex items-center text-foreground/80">
                      <MapPin className="h-4 w-4 mr-3 text-primary" />
                      <span className="font-inter text-sm">{event.venue}, {event.location}</span>
                    </div>
                    <div className="flex items-center text-foreground/80">
                      <Ticket className="h-4 w-4 mr-3 text-primary" />
                      <span className="font-inter text-sm font-semibold">{event.price}</span>
                    </div>
                  </div>

                  <Button 
                    className="w-full mt-4 font-inter font-medium"
                    variant={event.featured ? "default" : "outline"}
                    data-testid={`button-event-${event.id}`}
                  >
                    <Ticket className="h-4 w-4 mr-2" />
                    Reservar Ingressos
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="max-w-4xl mx-auto text-center scroll-fade-in">
          <Card className="bg-gradient-subtle border-0 shadow-elegant">
            <CardContent className="p-10">
              <Calendar className="h-16 w-16 mx-auto mb-6 text-primary" />
              <h3 className="font-playfair font-bold text-3xl text-foreground mb-4">
                Fique por Dentro
              </h3>
              <p className="font-inter text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Inscreva-se em nossa newsletter e receba em primeira mão informações sobre 
                novos concertos, lançamentos e ofertas especiais.
              </p>
              <NewsletterForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Events;
