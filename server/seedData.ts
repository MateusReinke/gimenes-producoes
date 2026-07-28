import type { IStorage } from "./storage";

export async function seedData(storage: IStorage) {
  const events = await storage.getEvents();
  
  if (events.length > 0) {
    console.log("Database already has data, skipping seed");
    return;
  }

  console.log("Seeding database with initial data...");

  await storage.createEvent({
    title: "Concerto de Natal Clássico",
    description: "Apresentação especial com obras natalinas de Bach, Handel e Corelli",
    date: "15 de Dezembro, 2024",
    time: "20:00",
    venue: "Teatro Municipal",
    location: "São Paulo, SP",
    price: "R$ 80 - R$ 150",
    status: "Ingressos Disponíveis",
    featured: true,
  });

  await storage.createEvent({
    title: "Noite Romântica: Chopin e Liszt",
    description: "Concerto intimista com obras para piano e orquestra de câmara",
    date: "28 de Janeiro, 2025",
    time: "19:30",
    venue: "Sala São Paulo",
    location: "São Paulo, SP",
    price: "R$ 60 - R$ 120",
    status: "Pré-venda",
    featured: false,
  });

  await storage.createEvent({
    title: "Sinfonia nº 9 de Beethoven",
    description: "Apresentação completa da icônica Nona Sinfonia com coro",
    date: "14 de Fevereiro, 2025",
    time: "20:00",
    venue: "Theatro Municipal do Rio de Janeiro",
    location: "Rio de Janeiro, RJ",
    price: "R$ 90 - R$ 200",
    status: "Em Breve",
    featured: true,
  });

  await storage.createEvent({
    title: "Primavera Barroca",
    description: "Concerto ao ar livre com obras de Vivaldi e Bach",
    date: "21 de Março, 2025",
    time: "18:00",
    venue: "Igreja do Carmo",
    location: "Ouro Preto, MG",
    price: "R$ 40 - R$ 80",
    status: "Ingressos Disponíveis",
    featured: false,
  });

  await storage.createMusician({
    name: "Igor Violinista",
    handle: "@igor_violinista",
    instrument: "Violinista Principal",
    bio: "🎻 Violinista Profissional\n🎼 Gimenes Produções\n📍 São Paulo, Brasil\n✨ Transformando momentos em música",
    followers: "12.5k",
    following: "345",
    postsCount: "289",
    isVerified: true,
    profileImage: "/api/placeholder/150/150",
    instagramUrl: "https://www.instagram.com/igor_violinista",
    youtubeUrl: "https://youtube.com/@igor_violinista",
    email: "igor@gimenes.com",
  });

  await storage.createMusician({
    name: "Ana Beatriz Costa",
    handle: "@ana.violinista",
    instrument: "Primeira Violinista",
    bio: "🎻 Primeira Violinista\n🏆 Concertino Paris\n🎼 Música Clássica e Contemporânea\n📍 São Paulo",
    followers: "8.2k",
    following: "198",
    postsCount: "156",
    isVerified: true,
    profileImage: "/api/placeholder/150/150",
    instagramUrl: "https://www.instagram.com/ana.violinista",
    youtubeUrl: "https://youtube.com/@anaviolin",
    email: "ana@gimenes.com",
  });

  await storage.createVideo({
    title: "Canon in D - Apresentação Casamento",
    platform: "youtube",
    videoId: "dQw4w9WgXcQ",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    description: "Apresentação emocionante do Canon in D de Pachelbel",
    publishedAt: "2024-10-01",
    featured: true,
  });

  await storage.createVideo({
    title: "Ave Maria - Schubert",
    platform: "youtube",
    videoId: "dQw4w9WgXcQ",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    description: "Ave Maria interpretada por nosso coral",
    publishedAt: "2024-09-15",
    featured: false,
  });

  await storage.createService({
    title: "Casamentos",
    description: "Trilha sonora perfeita para o seu grande dia, desde a cerimônia até a festa.",
    icon: "Heart",
    features: JSON.stringify(["Cerimônia religiosa", "Entrada da noiva", "Assinatura do registro", "Coquetel"]),
    color: "text-pink-600",
    sortOrder: 1,
  });

  await storage.createService({
    title: "Eventos Corporativos",
    description: "Música sofisticada para convenções, lançamentos e celebrações empresariais.",
    icon: "Building2",
    features: JSON.stringify(["Networking", "Apresentações", "Jantares executivos", "Premiações"]),
    color: "text-blue-600",
    sortOrder: 2,
  });

  await storage.createRepertoireItem({
    pieceTitle: "Canon in D",
    composer: "Pachelbel",
    category: "Casamentos",
    duration: "5:00",
    spotifyUrl: "https://open.spotify.com/track/example",
  });

  await storage.createRepertoireItem({
    pieceTitle: "Ave Maria",
    composer: "Schubert",
    category: "Casamentos",
    duration: "4:30",
    spotifyUrl: "https://open.spotify.com/track/example",
  });

  console.log("Database seeded successfully!");
}
