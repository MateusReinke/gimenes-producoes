import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Music, Instagram, Youtube, Mail, Heart, MessageCircle, Send, Bookmark, VerifiedIcon, MapPin, User, Camera } from "lucide-react";

interface Post {
  id: number;
  image: string;
  likes: number;
  comments: number;
  caption: string;
  location: string | null;
}

interface SocialLinks {
  instagram: string;
  youtube: string;
  email: string;
}

interface Musician {
  id: number;
  name: string;
  handle: string;
  instrument: string;
  bio: string;
  followers: string;
  following: string;
  postsCount: string;
  isVerified: boolean;
  profileImage: string;
  posts: Post[];
  social: SocialLinks;
}

const InstagramStyleMusicians = () => {
  const [selectedMusician, setSelectedMusician] = useState<number | null>(null);
  const [selectedPost, setSelectedPost] = useState<number | null>(null);

  const musicians: Musician[] = [
    {
      id: 1,
      name: "Igor Violinista",
      handle: "@igor_violinista",
      instrument: "Violinista Principal",
      bio: "🎻 Violinista Profissional\n🎼 Gimenes Produções\n📍 São Paulo, Brasil\n✨ Transformando momentos em música",
      followers: "12.5k",
      following: "345",
      postsCount: "289",
      isVerified: true,
      profileImage: "/api/placeholder/150/150",
      posts: [
        {
          id: 1,
          image: "/api/placeholder/300/300",
          likes: 245,
          comments: 18,
          caption: "Ensaio para casamento deste sábado 🎻✨ #violin #wedding #music",
          location: "São Paulo",
        },
        {
          id: 2,
          image: "/api/placeholder/300/300",
          likes: 189,
          comments: 24,
          caption: "Bach sempre emociona... Suíte nº 1 em G maior 🎼",
          location: "Studio Gimenes",
        },
        // ... demais posts
      ],
      social: {
        instagram: "https://www.instagram.com/igor_violinista",
        youtube: "Igor Violinista",
        email: "igor@gimenes.com",
      },
    },
    {
      id: 2,
      name: "Ana Beatriz Costa",
      handle: "@ana.violinista",
      instrument: "Primeira Violinista",
      bio: "🎻 Primeira Violinista\n🏆 Concertino Paris\n🎼 Música Clássica e Contemporânea\n📍 São Paulo",
      followers: "8.2k",
      following: "198",
      postsCount: "156",
      isVerified: true,
      profileImage: "/api/placeholder/150/150",
      posts: [
        {
          id: 7,
          image: "/api/placeholder/300/300",
          likes: 167,
          comments: 15,
          caption: "Vivaldi - As Quatro Estações. Sempre um prazer interpretar 🍃",
          location: "Conservatório",
        },
        // ... demais posts
      ],
      social: {
        instagram: "https://www.instagram.com/ana.violinista",
        youtube: "Ana Beatriz Violin",
        email: "ana.costa@gimenes.com",
      },
    },
  ];

  const handleMusicianClick = (musicianId: number) => {
    setSelectedMusician(selectedMusician === musicianId ? null : musicianId);
    setSelectedPost(null);
  };

  const handlePostClick = (postId: number) => {
    setSelectedPost(selectedPost === postId ? null : postId);
  };

  return (
    <section id="musicians" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20 animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-full mb-6">
            <Instagram className="h-8 w-8 text-primary-foreground" />
          </div>
          <h2 className="font-playfair font-bold text-4xl md:text-6xl text-foreground mb-6">
            Nossos Artistas
          </h2>
          <p className="font-inter text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Siga nossos músicos e acompanhe seus trabalhos no Instagram. Cada artista compartilha sua paixão pela música através de seus posts.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {musicians.map((musician, index) => (
            <div key={musician.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.2}s` }}>
              {/* Instagram Profile Header */}
              <div className="bg-card rounded-lg shadow-card p-6 mb-6">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-gradient-primary p-0.5">
                      <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
                        <User className="h-8 w-8 text-muted-foreground" />
                      </div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-inter font-semibold text-lg text-card-foreground">{musician.handle}</h3>
                      {musician.isVerified && <VerifiedIcon className="h-4 w-4 text-blue-500" />}
                    </div>
                    <p className="font-inter text-sm text-muted-foreground mb-2">{musician.name}</p>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span><strong className="text-card-foreground">{musician.postsCount}</strong> posts</span>
                      <span><strong className="text-card-foreground">{musician.followers}</strong> seguidores</span>
                      <span><strong className="text-card-foreground">{musician.following}</strong> seguindo</span>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="font-inter text-sm text-card-foreground whitespace-pre-line leading-relaxed">{musician.bio}</p>
                </div>

                <div className="flex space-x-2">
                  <Button 
                    variant="default" 
                    size="sm" 
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white border-0"
                    onClick={() => window.open(musician.social.instagram, '_blank')}
                  >
                    Seguir
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Mensagem
                  </Button>
                  <Button variant="outline" size="sm" className="px-3">
                    <User className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Instagram Posts Grid */}
              <div className="bg-card rounded-lg shadow-card overflow-hidden">
                <div className="border-b border-border p-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
                      <Camera className="h-4 w-4 text-white" />
                    </div>
                    <span className="font-inter font-medium text-card-foreground">Posts</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-1 p-4">
                  {musician.posts.map((post) => (
                    <div 
                      key={post.id}
                      className="aspect-square bg-gradient-subtle rounded-lg overflow-hidden cursor-pointer group hover:opacity-75 transition-opacity"
                      onClick={() => handlePostClick(post.id)}
                    >
                      <div className="w-full h-full bg-gradient-primary/20 flex items-center justify-center relative">
                        <Music className="h-8 w-8 text-primary/60" />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <div className="flex items-center space-x-3 text-white text-sm">
                            <div className="flex items-center space-x-1">
                              <Heart className="h-4 w-4" />
                              <span>{post.likes}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MessageCircle className="h-4 w-4" />
                              <span>{post.comments}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {selectedPost !== null && (
                  <div className="border-t border-border p-4 animate-fade-in">
                    {musician.posts.filter((post) => post.id === selectedPost).map((post) => (
                      <div key={post.id} className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
                              <User className="h-4 w-4 text-white" />
                            </div>
                            <div>
                              <p className="font-inter font-semibold text-sm text-card-foreground">{musician.handle}</p>
                              {post.location && (
                                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                                  <MapPin className="h-3 w-3" />
                                  <span>{post.location}</span>
                                </div>
                              )}
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Bookmark className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="aspect-square bg-gradient-subtle rounded-lg flex items-center justify-center">
                          <Music className="h-16 w-16 text-primary/40" />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <Button variant="ghost" size="sm" className="p-0 h-auto">
                              <Heart className="h-6 w-6" />
                            </Button>
                            <Button variant="ghost" size="sm" className="p-0 h-auto">
                              <MessageCircle className="h-6 w-6" />
                            </Button>
                            <Button variant="ghost" size="sm" className="p-0 h-auto">
                              <Send className="h-6 w-6" />
                            </Button>
                          </div>
                        </div>

                        <div>
                          <p className="font-inter font-semibold text-sm text-card-foreground mb-1">
                            {post.likes} curtidas
                          </p>
                          <p className="font-inter text-sm text-card-foreground"><span className="font-semibold">{musician.handle}</span> {post.caption}</p>
                          <p className="font-inter text-sm text-muted-foreground mt-1">
                            Ver todos os {post.comments} comentários
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16 animate-fade-in-up">
          <Button 
            variant="outline" 
            size="lg"
            className="font-inter font-medium hover:bg-primary hover:text-primary-foreground border-primary/50 px-8 py-3 text-lg"
          >
            <Instagram className="h-5 w-5 mr-2" />
            Siga Todos os Artistas
          </Button>
        </div>
      </div>
    </section>
  );
};

export default InstagramStyleMusicians;
