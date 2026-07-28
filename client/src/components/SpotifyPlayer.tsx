import { useState } from "react";
import { Play, Pause, ExternalLink, Music } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SpotifyPlayerProps {
  playlistId?: string;
  className?: string;
}

const SpotifyPlayer = ({ 
  playlistId = "0hv0yTjSYSJ9Bvf81vqlDw", // Default classical playlist
  className = "" 
}: SpotifyPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showFullPlayer, setShowFullPlayer] = useState(false);

  const spotifyEmbedUrl = `https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`;
  const spotifyOpenUrl = `https://open.spotify.com/playlist/${playlistId}`;

  return (
    <div className={`spotify-player ${className}`}>
      {/* Main Player Section */}
      <div className="bg-card rounded-lg shadow-card p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
              <Music className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-playfair font-semibold text-xl text-card-foreground">
                Nosso Repertório
              </h3>
              <p className="font-inter text-sm text-muted-foreground">
                Ouça nossa seleção musical especial
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open(spotifyOpenUrl, '_blank')}
            className="font-inter"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Abrir no Spotify
          </Button>
        </div>

        {/* Spotify Embed */}
        <div className="w-full">
          <iframe
            src={spotifyEmbedUrl}
            width="100%"
            height="352"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="rounded-lg"
            title="Spotify Player - Repertório Gimenes Produções"
          />
        </div>
      </div>

      {/* Additional Playlists */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <PlaylistCard
          title="Clássicos Eternos"
          description="As mais belas peças da música clássica"
          playlistId="37i9dQZF1DWWEJlAGA9gs0"
        />
        <PlaylistCard
          title="Música Sacra"
          description="Repertório para cerimônias religiosas"
          playlistId="37i9dQZF1DX3Ogo9pFvBkk"
        />
        <PlaylistCard
          title="Casamentos"
          description="Trilha sonora perfeita para o seu grande dia"
          playlistId="37i9dQZF1DX0XUsuxWHRQd"
        />
      </div>
    </div>
  );
};

interface PlaylistCardProps {
  title: string;
  description: string;
  playlistId: string;
}

const PlaylistCard = ({ title, description, playlistId }: PlaylistCardProps) => {
  const [showPlayer, setShowPlayer] = useState(false);
  const spotifyOpenUrl = `https://open.spotify.com/playlist/${playlistId}`;

  return (
    <div className="bg-card rounded-lg shadow-soft p-4 hover-lift">
      <div className="flex items-center justify-between mb-3">
        <div className="w-10 h-10 bg-gradient-subtle rounded-full flex items-center justify-center">
          <Music className="h-5 w-5 text-primary" />
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowPlayer(!showPlayer)}
          className="p-2"
        >
          {showPlayer ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
      </div>

      <h4 className="font-playfair font-semibold text-lg text-card-foreground mb-2">
        {title}
      </h4>
      <p className="font-inter text-sm text-muted-foreground mb-4">
        {description}
      </p>

      {showPlayer && (
        <div className="mt-4">
          <iframe
            src={`https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`}
            width="100%"
            height="152"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="rounded-md"
            title={`Spotify Player - ${title}`}
          />
        </div>
      )}

      <Button
        variant="outline"
        size="sm"
        onClick={() => window.open(spotifyOpenUrl, '_blank')}
        className="w-full font-inter mt-3"
      >
        <ExternalLink className="h-4 w-4 mr-2" />
        Abrir no Spotify
      </Button>
    </div>
  );
};

export default SpotifyPlayer;