import { Router } from "express";
import type { IStorage } from "./storage";
import {
  insertEventSchema,
  insertMusicianSchema,
  insertVideoSchema,
  insertServiceSchema,
  insertRepertoireSchema,
  insertContactRequestSchema,
  insertNewsletterSubscriberSchema,
} from "@shared/schema";

interface YoutubeVideo {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  thumbnail: string;
}

interface YoutubeSearchItem {
  id: { videoId: string };
  snippet: {
    title: string;
    description: string;
    publishedAt: string;
    thumbnails: { high?: { url: string }; default?: { url: string } };
  };
}

// The channel is now identified by its @handle (from the public channel URL)
// rather than an opaque channel ID, since that's what's actually on hand day
// to day. YOUTUBE_CHANNEL_ID can still be set directly to skip resolution.
const DEFAULT_YOUTUBE_HANDLE = "gimenesproducoesmusicais";
const YOUTUBE_CACHE_TTL_MS = 60 * 60 * 1000;
let youtubeCache: { videos: YoutubeVideo[]; fetchedAt: number } | null = null;

// There's no official, key-based API for reading someone else's public
// Instagram follower count / avatar without them connecting their account
// via OAuth (Graph API). This reads the public profile page instead and
// pulls what's in its own <meta> tags - unofficial, can break if Instagram
// changes the page, so every call is defensive and caches aggressively to
// avoid hammering them.
interface InstagramProfileData {
  followers: string | null;
  imageUrl: string | null;
}

const INSTAGRAM_CACHE_TTL_MS = 6 * 60 * 60 * 1000;
const instagramCache = new Map<string, { data: InstagramProfileData; fetchedAt: number }>();
const INSTAGRAM_USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

function normalizeInstagramUsername(raw: unknown): string {
  return String(raw ?? "").trim().replace(/^@/, "");
}

function extractMetaContent(html: string, property: string): string | null {
  // Matches the whole <meta> tag first instead of assuming attribute order
  // (property="x" content="y" vs. content="y" property="x") since that's
  // not guaranteed and this can't be verified against Instagram's real,
  // frequently-changing markup from here.
  const tagMatch = html.match(new RegExp(`<meta[^>]+property=["']${property}["'][^>]*>`, "i"));
  if (!tagMatch) return null;
  const contentMatch = tagMatch[0].match(/content=["']([^"']+)["']/i);
  return contentMatch ? contentMatch[1].replace(/&amp;/g, "&").replace(/&quot;/g, '"') : null;
}

function extractFollowerCount(description: string | null): string | null {
  if (!description) return null;
  // Comma is a thousands separator in "1,234 Followers" but a decimal one in
  // "8,2 mil seguidores" - rather than guess, just pass through whatever
  // Instagram itself already formatted instead of reformatting the number.
  const match = description.match(/([\d][\d.,]*\s?(?:mil|K|M)?)\s*(?:Followers|seguidores)/i);
  return match ? match[1].trim() : null;
}

async function fetchInstagramProfile(username: string): Promise<InstagramProfileData> {
  const cached = instagramCache.get(username);
  if (cached && Date.now() - cached.fetchedAt < INSTAGRAM_CACHE_TTL_MS) {
    return cached.data;
  }

  try {
    const res = await fetch(`https://www.instagram.com/${encodeURIComponent(username)}/`, {
      headers: { "User-Agent": INSTAGRAM_USER_AGENT, "Accept-Language": "pt-BR,pt;q=0.9,en;q=0.8" },
    });
    if (!res.ok) throw new Error(`Instagram respondeu ${res.status}`);
    const html = await res.text();

    const data: InstagramProfileData = {
      followers: extractFollowerCount(extractMetaContent(html, "og:description")),
      imageUrl: extractMetaContent(html, "og:image"),
    };

    if (!data.followers && !data.imageUrl) {
      throw new Error("Não foi possível extrair dados do perfil (página pode ter mudado ou pedido login)");
    }

    instagramCache.set(username, { data, fetchedAt: Date.now() });
    return data;
  } catch (error) {
    console.error(`Failed to scrape Instagram profile @${username}:`, error);
    // Serve a stale cache entry rather than nothing, if we have one.
    return cached?.data ?? { followers: null, imageUrl: null };
  }
}

async function resolveYoutubeChannelId(apiKey: string): Promise<string> {
  if (process.env.YOUTUBE_CHANNEL_ID) {
    return process.env.YOUTUBE_CHANNEL_ID;
  }
  const handle = process.env.YOUTUBE_CHANNEL_HANDLE || DEFAULT_YOUTUBE_HANDLE;
  const url = `https://www.googleapis.com/youtube/v3/channels?part=id&forHandle=${encodeURIComponent(handle)}&key=${apiKey}`;
  const res = await fetch(url);
  const data = await res.json();
  const channelId = data.items?.[0]?.id;
  if (!channelId) {
    throw new Error(`Could not resolve YouTube channel for handle "@${handle}"`);
  }
  return channelId;
}

export function registerRoutes(storage: IStorage) {
  const router = Router();

  router.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Proxies the YouTube Data API server-side so the API key never ships to
  // the browser. Returns an empty list (not an error) when unconfigured, so
  // the client can just render nothing until a real key is set.
  router.get("/api/youtube/videos", async (req, res) => {
    const apiKey = process.env.YOUTUBE_API_KEY;

    if (!apiKey) {
      return res.json({ videos: [], configured: false });
    }

    if (youtubeCache && Date.now() - youtubeCache.fetchedAt < YOUTUBE_CACHE_TTL_MS) {
      return res.json({ videos: youtubeCache.videos, configured: true });
    }

    try {
      const channelId = await resolveYoutubeChannelId(apiKey);
      const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${encodeURIComponent(channelId)}&key=${apiKey}&order=date&type=video&maxResults=8`;
      const ytRes = await fetch(url);
      const data = await ytRes.json();

      if (data.error) {
        console.error("YouTube API error:", data.error.message);
        return res.json({ videos: youtubeCache?.videos ?? [], configured: true });
      }

      const videos: YoutubeVideo[] = (data.items || []).map((item: YoutubeSearchItem) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        publishedAt: item.snippet.publishedAt,
        thumbnail: item.snippet.thumbnails.high?.url ?? item.snippet.thumbnails.default?.url ?? "",
      }));

      youtubeCache = { videos, fetchedAt: Date.now() };
      res.json({ videos, configured: true });
    } catch (error) {
      console.error("Failed to fetch YouTube videos:", error);
      res.json({ videos: youtubeCache?.videos ?? [], configured: true });
    }
  });

  // Best-effort follower count + avatar for a public Instagram profile.
  // "available: false" means scraping failed - the client should fall back
  // to its own static copy rather than show nothing.
  router.get("/api/instagram/profile", async (req, res) => {
    const username = normalizeInstagramUsername(req.query.username);
    if (!username) {
      return res.status(400).json({ error: "username é obrigatório" });
    }

    const data = await fetchInstagramProfile(username);
    res.json({
      followers: data.followers,
      profileImage: data.imageUrl ? `/api/instagram/avatar/${encodeURIComponent(username)}` : null,
      available: Boolean(data.followers || data.imageUrl),
    });
  });

  // Streams the profile photo through our own origin - Instagram's CDN
  // blocks hotlinked <img> requests from other sites, so the browser can't
  // load its image URL directly.
  router.get("/api/instagram/avatar/:username", async (req, res) => {
    const username = normalizeInstagramUsername(req.params.username);
    const data = await fetchInstagramProfile(username);
    if (!data.imageUrl) {
      return res.status(404).end();
    }

    try {
      const imgRes = await fetch(data.imageUrl);
      if (!imgRes.ok) throw new Error(`Instagram CDN respondeu ${imgRes.status}`);
      res.setHeader("Content-Type", imgRes.headers.get("content-type") || "image/jpeg");
      res.setHeader("Cache-Control", "public, max-age=21600");
      res.send(Buffer.from(await imgRes.arrayBuffer()));
    } catch (error) {
      console.error(`Failed to proxy Instagram avatar for @${username}:`, error);
      res.status(502).end();
    }
  });

  router.get("/api/events", async (req, res) => {
    const events = await storage.getEvents();
    res.json(events);
  });

  router.get("/api/events/:id", async (req, res) => {
    const event = await storage.getEvent(parseInt(req.params.id));
    if (!event) return res.status(404).json({ error: "Event not found" });
    res.json(event);
  });

  router.post("/api/events", async (req, res) => {
    try {
      const data = insertEventSchema.parse(req.body);
      const event = await storage.createEvent(data);
      res.status(201).json(event);
    } catch (error) {
      res.status(400).json({ error: "Invalid data" });
    }
  });

  router.patch("/api/events/:id", async (req, res) => {
    try {
      const data = insertEventSchema.partial().parse(req.body);
      const event = await storage.updateEvent(parseInt(req.params.id), data);
      if (!event) return res.status(404).json({ error: "Event not found" });
      res.json(event);
    } catch (error) {
      res.status(400).json({ error: "Invalid data" });
    }
  });

  router.delete("/api/events/:id", async (req, res) => {
    const success = await storage.deleteEvent(parseInt(req.params.id));
    if (!success) return res.status(404).json({ error: "Event not found" });
    res.status(204).send();
  });

  router.get("/api/musicians", async (req, res) => {
    const musicians = await storage.getMusicians();
    res.json(musicians);
  });

  router.get("/api/musicians/:id", async (req, res) => {
    const musician = await storage.getMusician(parseInt(req.params.id));
    if (!musician) return res.status(404).json({ error: "Musician not found" });
    res.json(musician);
  });

  router.post("/api/musicians", async (req, res) => {
    try {
      const data = insertMusicianSchema.parse(req.body);
      const musician = await storage.createMusician(data);
      res.status(201).json(musician);
    } catch (error) {
      res.status(400).json({ error: "Invalid data" });
    }
  });

  router.patch("/api/musicians/:id", async (req, res) => {
    try {
      const data = insertMusicianSchema.partial().parse(req.body);
      const musician = await storage.updateMusician(parseInt(req.params.id), data);
      if (!musician) return res.status(404).json({ error: "Musician not found" });
      res.json(musician);
    } catch (error) {
      res.status(400).json({ error: "Invalid data" });
    }
  });

  router.delete("/api/musicians/:id", async (req, res) => {
    const success = await storage.deleteMusician(parseInt(req.params.id));
    if (!success) return res.status(404).json({ error: "Musician not found" });
    res.status(204).send();
  });

  router.get("/api/videos", async (req, res) => {
    const videos = await storage.getVideos();
    res.json(videos);
  });

  router.get("/api/videos/:id", async (req, res) => {
    const video = await storage.getVideo(parseInt(req.params.id));
    if (!video) return res.status(404).json({ error: "Video not found" });
    res.json(video);
  });

  router.post("/api/videos", async (req, res) => {
    try {
      const data = insertVideoSchema.parse(req.body);
      const video = await storage.createVideo(data);
      res.status(201).json(video);
    } catch (error) {
      res.status(400).json({ error: "Invalid data" });
    }
  });

  router.patch("/api/videos/:id", async (req, res) => {
    try {
      const data = insertVideoSchema.partial().parse(req.body);
      const video = await storage.updateVideo(parseInt(req.params.id), data);
      if (!video) return res.status(404).json({ error: "Video not found" });
      res.json(video);
    } catch (error) {
      res.status(400).json({ error: "Invalid data" });
    }
  });

  router.delete("/api/videos/:id", async (req, res) => {
    const success = await storage.deleteVideo(parseInt(req.params.id));
    if (!success) return res.status(404).json({ error: "Video not found" });
    res.status(204).send();
  });

  router.get("/api/services", async (req, res) => {
    const services = await storage.getServices();
    res.json(services);
  });

  router.get("/api/services/:id", async (req, res) => {
    const service = await storage.getService(parseInt(req.params.id));
    if (!service) return res.status(404).json({ error: "Service not found" });
    res.json(service);
  });

  router.post("/api/services", async (req, res) => {
    try {
      const data = insertServiceSchema.parse(req.body);
      const service = await storage.createService(data);
      res.status(201).json(service);
    } catch (error) {
      res.status(400).json({ error: "Invalid data" });
    }
  });

  router.patch("/api/services/:id", async (req, res) => {
    try {
      const data = insertServiceSchema.partial().parse(req.body);
      const service = await storage.updateService(parseInt(req.params.id), data);
      if (!service) return res.status(404).json({ error: "Service not found" });
      res.json(service);
    } catch (error) {
      res.status(400).json({ error: "Invalid data" });
    }
  });

  router.delete("/api/services/:id", async (req, res) => {
    const success = await storage.deleteService(parseInt(req.params.id));
    if (!success) return res.status(404).json({ error: "Service not found" });
    res.status(204).send();
  });

  router.get("/api/repertoire", async (req, res) => {
    const repertoire = await storage.getRepertoire();
    res.json(repertoire);
  });

  router.get("/api/repertoire/:id", async (req, res) => {
    const item = await storage.getRepertoireItem(parseInt(req.params.id));
    if (!item) return res.status(404).json({ error: "Repertoire item not found" });
    res.json(item);
  });

  router.post("/api/repertoire", async (req, res) => {
    try {
      const data = insertRepertoireSchema.parse(req.body);
      const item = await storage.createRepertoireItem(data);
      res.status(201).json(item);
    } catch (error) {
      res.status(400).json({ error: "Invalid data" });
    }
  });

  router.patch("/api/repertoire/:id", async (req, res) => {
    try {
      const data = insertRepertoireSchema.partial().parse(req.body);
      const item = await storage.updateRepertoireItem(parseInt(req.params.id), data);
      if (!item) return res.status(404).json({ error: "Repertoire item not found" });
      res.json(item);
    } catch (error) {
      res.status(400).json({ error: "Invalid data" });
    }
  });

  router.delete("/api/repertoire/:id", async (req, res) => {
    const success = await storage.deleteRepertoireItem(parseInt(req.params.id));
    if (!success) return res.status(404).json({ error: "Repertoire item not found" });
    res.status(204).send();
  });

  router.get("/api/contact-requests", async (req, res) => {
    const requests = await storage.getContactRequests();
    res.json(requests);
  });

  router.get("/api/contact-requests/:id", async (req, res) => {
    const request = await storage.getContactRequest(parseInt(req.params.id));
    if (!request) return res.status(404).json({ error: "Contact request not found" });
    res.json(request);
  });

  router.post("/api/contact-requests", async (req, res) => {
    try {
      const data = insertContactRequestSchema.parse(req.body);
      const request = await storage.createContactRequest(data);
      res.status(201).json(request);
    } catch (error) {
      res.status(400).json({ error: "Invalid data" });
    }
  });

  router.patch("/api/contact-requests/:id", async (req, res) => {
    try {
      const data = insertContactRequestSchema.partial().parse(req.body);
      const request = await storage.updateContactRequest(parseInt(req.params.id), data);
      if (!request) return res.status(404).json({ error: "Contact request not found" });
      res.json(request);
    } catch (error) {
      res.status(400).json({ error: "Invalid data" });
    }
  });

  router.delete("/api/contact-requests/:id", async (req, res) => {
    const success = await storage.deleteContactRequest(parseInt(req.params.id));
    if (!success) return res.status(404).json({ error: "Contact request not found" });
    res.status(204).send();
  });

  router.get("/api/newsletter-subscribers", async (req, res) => {
    const subscribers = await storage.getNewsletterSubscribers();
    res.json(subscribers);
  });

  router.post("/api/newsletter-subscribers", async (req, res) => {
    try {
      const data = insertNewsletterSubscriberSchema.parse(req.body);
      const subscriber = await storage.createNewsletterSubscriber(data);
      res.status(201).json(subscriber);
    } catch (error) {
      res.status(400).json({ error: "Invalid data" });
    }
  });

  router.delete("/api/newsletter-subscribers/:id", async (req, res) => {
    const success = await storage.deleteNewsletterSubscriber(parseInt(req.params.id));
    if (!success) return res.status(404).json({ error: "Subscriber not found" });
    res.status(204).send();
  });

  return router;
}
