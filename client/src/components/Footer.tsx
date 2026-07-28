import { Music, Mail, Phone, MapPin, Facebook, Instagram, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-accent text-accent-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Logo e Descrição */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Music className="h-8 w-8 text-primary-glow" />
              <span className="font-playfair font-bold text-2xl">
                Ensemble Clássico
              </span>
            </div>
            <p className="font-inter text-accent-foreground/80 leading-relaxed mb-6 max-w-md">
              Dedicados à apresentação da música clássica de excelência, promovendo a arte erudita 
              através de concertos memoráveis e educação musical.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="p-2 hover:bg-accent-foreground/10">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2 hover:bg-accent-foreground/10">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2 hover:bg-accent-foreground/10">
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="font-playfair font-semibold text-lg mb-4">
              Links Rápidos
            </h3>
            <nav className="space-y-3">
              <a href="#about" className="block font-inter text-sm text-accent-foreground/80 hover:text-primary-glow transition-smooth">
                Sobre Nós
              </a>
              <a href="#musicians" className="block font-inter text-sm text-accent-foreground/80 hover:text-primary-glow transition-smooth">
                Nossos Músicos
              </a>
              <a href="#repertoire" className="block font-inter text-sm text-accent-foreground/80 hover:text-primary-glow transition-smooth">
                Repertório
              </a>
              <a href="#events" className="block font-inter text-sm text-accent-foreground/80 hover:text-primary-glow transition-smooth">
                Eventos
              </a>
              <a href="#" className="block font-inter text-sm text-accent-foreground/80 hover:text-primary-glow transition-smooth">
                Galeria
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
                <span className="font-inter text-sm text-accent-foreground/80">
                  info@ensembleclassico.com.br
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-primary-glow flex-shrink-0" />
                <span className="font-inter text-sm text-accent-foreground/80">
                  (11) 3456-7890
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-primary-glow flex-shrink-0" />
                <span className="font-inter text-sm text-accent-foreground/80">
                  São Paulo, SP - Brasil
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Seção de Newsletter */}
        <div className="border-t border-accent-foreground/20 pt-8 mb-8">
          <div className="text-center">
            <h3 className="font-playfair font-semibold text-xl mb-3">
              Receba Nossas Novidades
            </h3>
            <p className="font-inter text-sm text-accent-foreground/80 mb-6 max-w-md mx-auto">
              Cadastre-se para receber informações sobre novos concertos e eventos especiais.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Seu e-mail"
                className="flex-1 px-4 py-2 rounded-md bg-background text-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button className="gradient-primary shadow-soft font-inter font-medium">
                Cadastrar
              </Button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-accent-foreground/20 pt-8 text-center">
          <p className="font-inter text-sm text-accent-foreground/60">
            © 2024 Ensemble Clássico. Todos os direitos reservados.
          </p>
          <p className="font-inter text-xs text-accent-foreground/50 mt-2">
            Desenvolvido com paixão pela música clássica
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;