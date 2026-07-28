import { useState, useEffect } from "react";

const YOUTUBE_API_KEY = "AIzaSyCdTJZ0PrhILvibbKOXnIKGWio_k-V_8E0"; // Coloque chave válida
const CHANNEL_ID = "UCL24vuJfRN6_opDgrxwriNQ"; // canal desejado

interface Video {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  thumbnail: string;
}

const Videos = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchVideos() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&key=${YOUTUBE_API_KEY}&order=date&type=video&maxResults=8`
        );
        const data = await res.json();
        if (data.error) throw new Error(data.error.message);
        if (!data.items || data.items.length === 0) {
          setError("Nenhum vídeo encontrado.");
          setLoading(false);
          return;
        }
        const vids = data.items.map((item: any) => ({
          id: item.id.videoId,
          title: item.snippet.title,
          description: item.snippet.description,
          publishedAt: item.snippet.publishedAt,
          thumbnail: item.snippet.thumbnails.high.url,
        }));
        setVideos(vids);
      } catch (err: any) {
        setError("Erro ao buscar vídeos: " + err.message);
      }
      setLoading(false);
    }
    fetchVideos();
  }, []);

  if (loading) {
    return <p>Carregando vídeos...</p>;
  }
  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }
  return (
    <div>
      {videos.map((v) => (
        <div key={v.id}>
          <img src={v.thumbnail} alt={v.title} width={320} />
          <h3>{v.title}</h3>
          <p>{v.publishedAt}</p>
        </div>
      ))}
    </div>
  );
};

export default Videos;
