import { useState, useEffect } from "react";
import { Menu, X, Music, Calendar, Users, FileText, Headphones } from "lucide-react";
import heroLogo from "@/assets/Logo-Gimenes-Produções.png";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrollY(Math.min(window.scrollY, 100));
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const allNav = [
    { name: "Início", href: "#home", icon: Music },
    { name: "Sobre", href: "#about", icon: Users },
    { name: "Artistas", href: "#musicians", icon: Users },
    { name: "Repertório", href: "#repertoire", icon: FileText },
    { name: "Eventos", href: "#events", icon: Calendar }
  ];
  const leftNav = allNav.slice(0, 3);
  const rightNav = allNav.slice(3);

  // Gap dinâmico para estado "logo invisível" (maior gap entre todos)
  const maxGap = 120;
  const minGap = 40;
  const gapPx = maxGap - ((maxGap - minGap) * (scrollY / 100));

  // Margin para afastar menus quando há logo
  const marginSide = (scrollY / 100) * 128;
  const bgOpacity = scrollY / 100;
  const logoOpacity = bgOpacity;
  const logoScale = 0.7 + 0.3 * bgOpacity;
  const logoTranslateY = (1 - logoOpacity) * 20;

  return (
    <nav
      className="fixed top-0 w-full z-50 overflow-visible"
      style={{
        background: `rgba(0,0,0,${bgOpacity * 0.8})`,
        backdropFilter: `blur(${bgOpacity * 10}px)`,
        borderBottom: `${bgOpacity}px solid rgba(255,255,255,${0.5 * bgOpacity})`,
        transition: "background 0.4s, backdrop-filter 0.4s, border-bottom 0.4s"
      }}
    >
      <div className="container mx-auto px-4">
        <div className="relative flex items-center justify-center" style={{ minHeight: "112px", height: "7rem" }}>
          <div className="hidden lg:flex items-center w-full justify-center relative">
            {/* TOPO: Todos os itens bem espaçados numa linha só */}
            {scrollY < 3 && (
              <div
                className="flex w-full justify-center"
                style={{ gap: `${maxGap}px`, transition: "gap 0.4s" }}
              >
                {allNav.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="font-inter text-lg font-medium transition-elegant hover:scale-105 text-white"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            )}

            {/* SCROLL: Menus separados e logo central animada */}
            {scrollY >= 3 && (
              <>
                <div
                  className="flex transition-none"
                  style={{
                    gap: `${gapPx}px`,
                    marginRight: `${marginSide}px`
                  }}
                >
                  {leftNav.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="font-inter text-lg font-medium transition-elegant hover:scale-105 text-white"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div
                  className="absolute left-1/2 top-1/2 z-10 pointer-events-none"
                  style={{
                    opacity: logoOpacity,
                    transform: `translate(-50%, -50%) scale(${logoScale}) translateY(${logoTranslateY}px)`,
                    transition: "opacity 0.5s, transform 0.5s"
                  }}
                >
                  <img
                    src={heroLogo}
                    alt="Gimenes Produções"
                    className="h-28 md:h-36 w-auto"
                    style={{ minHeight: "80px" }}
                  />
                </div>
                <div
                  className="flex transition-none"
                  style={{
                    gap: `${gapPx}px`,
                    marginLeft: `${marginSide}px`
                  }}
                >
                  {rightNav.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="font-inter text-lg font-medium transition-elegant hover:scale-105 text-white"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Navegação Mobile */}
        {isOpen && (
          <div className="lg:hidden absolute top-20 left-0 right-0 bg-gradient-to-b from-black/90 to-black/50 backdrop-blur border-b border-border/50 shadow-modern">
            <div className="px-4 py-8 space-y-6">
              {allNav.map((item, index) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-4 font-inter text-lg font-medium text-white hover:text-primary transition-elegant animate-fade-in-left hover:scale-105"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Botão mobile */}
        <button
          className="lg:hidden absolute right-4 top-6 z-20"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <X className="h-7 w-7 text-white" />
          ) : (
            <Menu className="h-7 w-7 text-white" />
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
