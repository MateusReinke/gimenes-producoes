import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Youtube } from "lucide-react";

interface YoutubeVideoDto {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  thumbnail: string;
}

interface YoutubeVideosResponse {
  videos: YoutubeVideoDto[];
  configured: boolean;
}

const Videos = () => {
  const { data, isLoading } = useQuery<YoutubeVideosResponse>({
    queryKey: ["/api/youtube/videos"],
  });

  const videos = data?.videos ?? [];

  // Nothing to show yet (still loading, no API key configured, or the
  // channel has no videos) - hide the section instead of showing an empty
  // or broken-looking block. It appears automatically once there's content.
  if (isLoading || videos.length === 0) {
    return null;
  }

  return (
    <section id="videos" className="py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20 scroll-fade-in">
          <h2 className="font-playfair font-bold text-4xl md:text-5xl text-foreground mb-6">
            Últimos Vídeos
          </h2>
          <p className="font-inter text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Reviva nossas apresentações mais recentes direto do nosso canal no YouTube.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {videos.map((video, index) => (
            <a
              key={video.id}
              href={`https://www.youtube.com/watch?v=${video.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block scroll-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
              data-testid={`link-video-${video.id}`}
            >
              <Card className="h-full overflow-hidden bg-card border-border/50 hover-lift group">
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="h-14 w-14 rounded-full bg-primary/90 flex items-center justify-center">
                      <Play className="h-6 w-6 text-primary-foreground fill-current ml-0.5" />
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-inter font-semibold text-card-foreground line-clamp-2 leading-snug">
                    {video.title}
                  </h3>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>

        <div className="text-center mt-12 scroll-fade-in">
          <a
            href="https://youtube.com/@gimenesproducoesmusicais?si=YcNWjg7rwGQomVBz"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-inter font-medium text-primary hover:text-primary-glow transition-elegant"
          >
            <Youtube className="h-5 w-5" />
            Ver todos os vídeos no YouTube
          </a>
        </div>
      </div>
    </section>
  );
};

export default Videos;
