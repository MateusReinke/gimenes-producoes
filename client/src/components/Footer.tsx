import { Music, Mail, Phone, MapPin, Instagram, Youtube, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import NewsletterForm from "./NewsletterForm";

const socialLinks = [
  { name: "WhatsApp", icon: MessageSquare, href: "https://wa.me/5511917630902" },
  { name: "YouTube", icon: Youtube, href: "https://youtube.com/@gimenesproducoesmusicais?si=YcNWjg7rwGQomVBz" },
  { name: "Instagram", icon: Instagram, href: "https://instagram.com/gimenesproducoes" },
];

const Footer = () => {
  return (
    <footer className="bg-card text-card-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Logo e Descrição */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Music className="h-8 w-8 text-primary-glow" />
              <span className="font-playfair font-bold text-2xl">
                Gimenes Produções
              </span>
            </div>
            <p className="font-inter text-card-foreground/80 leading-relaxed mb-6 max-w-md">
              Dedicados à apresentação da música clássica de excelência, promovendo a arte erudita
              através de concertos memoráveis e educação musical.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Button
                  key={social.name}
                  variant="ghost"
                  size="sm"
                  className="p-2 hover:bg-card-foreground/10"
                  asChild
                >
                  <a href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.name}>
                    <social.icon className="h-5 w-5" />
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="font-playfair font-semibold text-lg mb-4">
              Links Rápidos
            </h3>
            <nav className="space-y-3">
              <a href="#about" className="block font-inter text-sm text-card-foreground/80 hover:text-primary-glow transition-smooth">
                Sobre Nós
              </a>
              <a href="#musicians" className="block font-inter text-sm text-card-foreground/80 hover:text-primary-glow transition-smooth">
                Nossos Músicos
              </a>
              <a href="#repertoire" className="block font-inter text-sm text-card-foreground/80 hover:text-primary-glow transition-smooth">
                Repertório
              </a>
              <a href="#events" className="block font-inter text-sm text-card-foreground/80 hover:text-primary-glow transition-smooth">
                Eventos
              </a>
            </nav>
          </div>

          {/* Contato */}
          <div>
            <h3 className="font-playfair font-semibold text-lg mb-4">
              Contato
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-primary-glow flex-shrink-0" />
                <span className="font-inter text-sm text-card-foreground/80">
                  gimenesproducoesmusicais@gmail.com
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-primary-glow flex-shrink-0" />
                <span className="font-inter text-sm text-card-foreground/80">
                  (11) 91763-0902
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-primary-glow flex-shrink-0" />
                <span className="font-inter text-sm text-card-foreground/80">
                  São Paulo, SP - Brasil
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Seção de Newsletter */}
        <div className="border-t border-card-foreground/20 pt-8 mb-8">
          <div className="text-center">
            <h3 className="font-playfair font-semibold text-xl mb-3">
              Receba Nossas Novidades
            </h3>
            <p className="font-inter text-sm text-card-foreground/80 mb-6 max-w-md mx-auto">
              Cadastre-se para receber informações sobre novos concertos e eventos especiais.
            </p>
            <div className="max-w-md mx-auto">
              <NewsletterForm />
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-card-foreground/20 pt-8 text-center">
          <p className="font-inter text-sm text-card-foreground/60">
            © {new Date().getFullYear()} Gimenes Produções. Todos os direitos reservados.
          </p>
          <p className="font-inter text-xs text-card-foreground/50 mt-2">
            Desenvolvido com paixão pela música clássica
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
