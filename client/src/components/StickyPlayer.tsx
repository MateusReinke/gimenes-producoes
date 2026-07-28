import { useState } from "react";
import { Play, Pause, ExternalLink, Music, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const StickyPlayer = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  const defaultPlaylistId = "37i9dQZF1DX7K31D69s4M1"; // Classical playlist
  const spotifyOpenUrl = `https://open.spotify.com/playlist/${defaultPlaylistId}`;

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-t border-border shadow-elegant">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Player Info */}
          <div className="flex items-center space-x-4 min-w-0 flex-1">
            <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
              <Music className="h-6 w-6 text-primary-foreground" />
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="font-inter font-semibold text-sm text-card-foreground truncate">
                Repertório Gimenes Produções
              </h4>
              <p className="font-inter text-xs text-muted-foreground truncate">
                Música clássica selecionada
              </p>
            </div>
          </div>

          {/* Player Controls */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 hover:bg-primary/10"
            >
              {isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.open(spotifyOpenUrl, '_blank')}
              className="p-2 hover:bg-primary/10 hidden sm:flex"
            >
              <ExternalLink className="h-4 w-4" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsVisible(false)}
              className="p-2 hover:bg-primary/10"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyPlayer;