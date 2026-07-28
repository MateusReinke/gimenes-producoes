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

export function registerRoutes(storage: IStorage) {
  const router = Router();

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
