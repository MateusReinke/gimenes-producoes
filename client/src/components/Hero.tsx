import { useEffect, useState } from "react";
import heroImage from "@/assets/hero-ensemble.png";
import heroLogo from "@/assets/Logo-Gimenes-Produções.png";
import { Button } from "@/components/ui/button";
import { Calendar, Play, Award, Users, Star } from "lucide-react";

const stats = [
  { icon: Award, value: "2000+", label: "Eventos Realizados" },
  { icon: Users, value: "20+", label: "Músicas no Repertório" },
  { icon: Star, value: "10+", label: "Anos de Experiência" },
];

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-between w-full overflow-hidden bg-black text-white"
      style={{ padding: 0 }}
    >
      {/* Fundo */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Músicos da Gimenes Produções"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-accent/90 via-secondary/80 to-primary/70 mix-blend-soft-light" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
        <div className="absolute inset-0 opacity-5 mix-blend-overlay animate-grain" />
      </div>

      {/* Conteúdo */}
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center justify-center flex-grow pt-8 pb-2 px-2">
        {/* Logo centralizada */}
        <img
          src={heroLogo}
          alt="Gimenes Produções"
          className="h-40 md:h-52 mx-auto opacity-95 drop-shadow-lg"
          style={{ marginBottom: "1.8rem" }}
        />

        {/* Título e descrição */}
        <div className="max-w-3xl text-center mb-2">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold leading-tight mb-2">
            A trilha sonora que transforma seu momento especial
          </h1>
          <p className="text-base md:text-lg text-gray-300 font-light leading-relaxed">
            Gimenes Produções leva emoção e sofisticação para seu evento com coral, orquestra e músicos especializados criando experiências inesquecíveis.
          </p>
        </div>

        {/* Cards centralizados */}
        <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-3 gap-5 mt-5 mb-1">
          {stats.map(({ icon: Icon, value, label }) => (
            <div
              key={label}
              className="bg-black bg-opacity-60 border border-gray-700 rounded-xl p-5 flex flex-col items-center text-center text-white shadow-md backdrop-blur-sm hover:bg-opacity-70 hover:scale-105 transition-transform"
            >
              <Icon className="text-yellow-400 mb-2 h-8 w-8" />
              <div className="text-2xl font-extrabold font-playfair mb-1">{value}</div>
              <div className="uppercase tracking-widest text-xs text-gray-400">{label}</div>
            </div>
          ))}
        </div>

        {/* Botões CTA abaixo dos cards */}
        <div className="flex gap-5 justify-center mt-4">
          <Button size="lg" className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black shadow-lg hover:from-yellow-500 hover:to-yellow-700 py-3 px-6">
            <Calendar className="mr-2" /> Pedir Orçamento
          </Button>
          <Button size="lg" variant="outline" className="border-white text-white border hover:bg-white hover:text-black transition-colors py-3 px-6">
            <Play className="mr-2" /> Ouvir Repertório
          </Button>
        </div>
      </div>

      {/* Indicador de scroll */}
      <div className="relative z-10 w-full flex flex-col items-center mb-6">
        <span className="text-xs uppercase tracking-widest text-white/70 mb-1">Descubra</span>
        <div className="animate-bounce">
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-white/70">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;
