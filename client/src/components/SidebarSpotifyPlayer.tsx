import { useState } from "react";
import { Minimize2 } from "lucide-react";

const artistIds = [
  "4u6CXYhXWPcFgS61TH73r0",
  "1vCWHaC5f2uS3yhpwWbIA6",
  "66CXWjxzNUsdJxJ2JdwvnR",
];

const artistNames = [
  "Gimenes Produções",
  "Avicii",
  "Ariana Grande",
];

const spotifyGreen = "#1DB954";

const SidebarSpotifyPlayer = () => {
  const [isMinimized, setIsMinimized] = useState(true);
  const [artistIndex, setArtistIndex] = useState(0);

  const spotifyEmbedUrl = `https://open.spotify.com/embed/artist/${artistIds[artistIndex]}?utm_source=generator&theme=0`;

  const nextArtist = () => {
    setArtistIndex((prev) => (prev === artistIds.length - 1 ? 0 : prev + 1));
  };

  const prevArtist = () => {
    setArtistIndex((prev) => (prev === 0 ? artistIds.length - 1 : prev - 1));
  };

  return (
    <div className="fixed right-6 bottom-8 z-50 select-none">
      <button
        className={`w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg border-2 border-green-600 transition hover:scale-105 focus:outline-none ${
          isMinimized ? "block" : "hidden"
        }`}
        onClick={() => setIsMinimized(false)}
        aria-label="Expandir Player Spotify"
      >
        <svg width="28" height="28" fill="white" viewBox="0 0 24 24">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.299z" />
        </svg>
      </button>

      <div
        className={`w-80 bg-card/95 rounded-xl shadow-elegant border border-border flex flex-col max-h-[800px] ${
          isMinimized ? "hidden" : "flex"
        }`}
      >
        <div className="flex items-center justify-between p-3 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
              <svg width="22" height="22" fill="white" viewBox="0 0 24 24">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.299z" />
              </svg>
            </div>
            <div>
              <h4 className="font-inter font-semibold text-sm">{artistNames[artistIndex]}</h4>
              <p className="font-inter text-xs text-muted-foreground">Spotify Player</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              style={{
                border: `2px solid ${spotifyGreen}`,
                color: spotifyGreen,
              }}
              className="rounded-full w-8 h-8 flex items-center justify-center hover:bg-[#1db954]/20 transition"
              onClick={prevArtist}
              aria-label="Artista anterior"
            >
              <span style={{ fontSize: 17, fontWeight: 700, marginTop: -2 }}>&#x2039;</span>
            </button>
            <button
              style={{
                border: `2px solid ${spotifyGreen}`,
                color: spotifyGreen,
              }}
              className="rounded-full w-8 h-8 flex items-center justify-center hover:bg-[#1db954]/20 transition"
              onClick={nextArtist}
              aria-label="Próximo artista"
            >
              <span style={{ fontSize: 17, fontWeight: 700, marginTop: -2 }}>&#x203A;</span>
            </button>
            <button
              style={{
                border: `2px solid ${spotifyGreen}`,
                color: spotifyGreen,
              }}
              className="rounded-full w-8 h-8 flex items-center justify-center hover:bg-[#1db954]/20 transition"
              onClick={() => setIsMinimized(true)}
              aria-label="Minimizar"
            >
              <Minimize2 className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="p-3 overflow-y-auto" style={{ maxHeight: "720px" }}>
          <iframe
            key={artistIds[artistIndex]}
            src={spotifyEmbedUrl}
            width="100%"
            height="720"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="rounded-lg mb-3"
            title="Spotify Player"
          />
        </div>
      </div>
    </div>
  );
};

export default SidebarSpotifyPlayer;
