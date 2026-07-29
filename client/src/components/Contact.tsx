import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin, MessageSquare, Youtube, Instagram, Clock, Music } from "lucide-react";
import ContactForm from "./ContactForm";

const Contact = () => {
  const socialLinks = [
    {
      name: "WhatsApp",
      icon: MessageSquare,
      href: "https://wa.me/5511917630902",
      color: "hover:text-green-400",
      description: "Fale conosco diretamente"
    },
    {
      name: "YouTube",
      icon: Youtube,
      href: "https://youtube.com/@gimenesproducoesmusicais?si=YcNWjg7rwGQomVBz",
      color: "hover:text-red-400",
      description: "Veja nossas apresentações"
    },
    {
      name: "Instagram",
      icon: Instagram,
      href: "https://instagram.com/gimenesproducoes",
      color: "hover:text-pink-400",
      description: "Acompanhe nossos bastidores"
    },
    {
      name: "Spotify",
      icon: Music,
      href: "https://open.spotify.com/artist/gimenes-producoes",
      color: "hover:text-green-400",
      description: "Ouça nosso repertório"
    }
  ];

  const contactInfo = [
    {
      icon: Phone,
      title: "Telefone",
      info: "(11) 91763-0902",
      description: "Ligações e WhatsApp"
    },
    {
      icon: Mail,
      title: "E-mail",
      info: "gimenesproducoesmusicais@gmail.com",
      description: "Resposta em até 24h"
    },
    {
      icon: MapPin,
      title: "Localização",
      info: "São Paulo - SP",
      description: "Atendemos toda região metropolitana"
    },
    {
      icon: Clock,
      title: "Horário",
      info: "Seg - Sex: 9h às 18h",
      description: "Sáb: 9h às 14h"
    }
  ];

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20 animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-full mb-6">
            <MessageSquare className="h-8 w-8 text-white" />
          </div>
          <h2 className="font-playfair font-bold text-4xl md:text-6xl text-foreground mb-6">
            Entre em Contato
          </h2>
          <p className="font-inter text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Pronto para criar uma experiência musical inesquecível? Entre em contato conosco 
            e vamos planejar juntos sua apresentação dos sonhos.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <div className="animate-fade-in-left">
            <h3 className="font-playfair font-bold text-3xl text-foreground mb-8">
              Informações de Contato
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
              {contactInfo.map((item, index) => (
                <Card 
                  key={item.title}
                  className="shadow-card hover:shadow-elegant transition-elegant hover-lift bg-card border-0"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  data-testid={`card-contact-${item.title.toLowerCase()}`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                        <item.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-playfair font-bold text-lg text-foreground mb-1">
                          {item.title}
                        </h4>
                        <p className="font-inter font-semibold text-primary mb-1">
                          {item.info}
                        </p>
                        <p className="font-inter text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div>
              <h4 className="font-playfair font-bold text-2xl text-foreground mb-8">
                Nossas Redes Sociais
              </h4>
              <div className="grid grid-cols-1 gap-4">
                {socialLinks.map((social, index) => (
                  <Card 
                    key={social.name}
                    className="group shadow-card hover:shadow-elegant transition-elegant hover-lift bg-card border-0 cursor-pointer"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    data-testid={`card-social-${social.name.toLowerCase()}`}
                  >
                    <CardContent className="p-6">
                      <a 
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-4 w-full"
                        data-testid={`link-social-${social.name.toLowerCase()}`}
                      >
                        <div className={`w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-elegant`}>
                          <social.icon className="h-7 w-7 text-white" />
                        </div>
                        <div>
                          <h5 className={`font-playfair font-bold text-xl text-foreground mb-1 group-hover:${social.color} transition-colors`}>
                            {social.name}
                          </h5>
                          <p className="font-inter text-muted-foreground">
                            {social.description}
                          </p>
                        </div>
                      </a>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          <div className="animate-fade-in-right">
            <Card className="shadow-modern bg-gradient-modern border-0">
              <CardContent className="p-8 lg:p-10">
                <h3 className="font-playfair font-bold text-3xl text-foreground mb-2">
                  Solicite um Orçamento
                </h3>
                <p className="font-inter text-muted-foreground mb-8">
                  Conte-nos sobre seu evento e receba uma proposta personalizada.
                </p>
                <ContactForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
