import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Play, Pause, Volume2, X } from "lucide-react";

interface MusicPlayerProps {
  isOpen: boolean;
  onClose: () => void;
  song: {
    title: string;
    composer: string;
    duration: string;
    audioUrl?: string;
  } | null;
}

const MusicPlayer = ({ isOpen, onClose, song }: MusicPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  if (!song) return null;

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    // Aqui você pode implementar a lógica de play/pause quando adicionar as músicas
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between text-card-foreground">
            <span>Reproduzindo</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-6 w-6 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Artwork placeholder */}
          <div className="w-full h-48 gradient-dark rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Volume2 className="h-16 w-16 text-primary mx-auto mb-4" />
              <p className="text-muted-foreground text-sm">Áudio será adicionado em breve</p>
            </div>
          </div>
          
          {/* Song info */}
          <div className="text-center space-y-2">
            <h3 className="font-playfair font-bold text-xl text-card-foreground">
              {song.title}
            </h3>
            <p className="text-muted-foreground font-inter">
              {song.composer}
            </p>
            <p className="text-sm text-muted-foreground">
              Duração: {song.duration}
            </p>
          </div>
          
          {/* Controls */}
          <div className="flex items-center justify-center space-x-4">
            <Button
              onClick={handlePlayPause}
              size="lg"
              className="w-16 h-16 rounded-full bg-primary hover:bg-primary/90"
            >
              {isPlaying ? (
                <Pause className="h-8 w-8" />
              ) : (
                <Play className="h-8 w-8 ml-1" />
              )}
            </Button>
          </div>
          
          {/* Progress bar placeholder */}
          <div className="space-y-2">
            <div className="w-full h-2 bg-muted rounded-full">
              <div className="h-2 bg-primary rounded-full w-0 transition-all duration-300"></div>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0:00</span>
              <span>{song.duration}</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MusicPlayer;