import { pgTable, serial, varchar, text, timestamp, boolean, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import type { z } from "zod";

export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  date: varchar("date", { length: 100 }).notNull(),
  time: varchar("time", { length: 50 }).notNull(),
  venue: varchar("venue", { length: 255 }).notNull(),
  location: varchar("location", { length: 255 }).notNull(),
  price: varchar("price", { length: 100 }).notNull(),
  status: varchar("status", { length: 50 }).notNull(),
  featured: boolean("featured").default(false),
});

export const musicians = pgTable("musicians", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  handle: varchar("handle", { length: 100 }).notNull(),
  instrument: varchar("instrument", { length: 255 }).notNull(),
  bio: text("bio").notNull(),
  followers: varchar("followers", { length: 20 }).notNull(),
  following: varchar("following", { length: 20 }).notNull(),
  postsCount: varchar("posts_count", { length: 20 }).notNull(),
  isVerified: boolean("is_verified").default(false),
  profileImage: text("profile_image").notNull(),
  instagramUrl: text("instagram_url"),
  youtubeUrl: text("youtube_url"),
  email: varchar("email", { length: 255 }),
});

export const videos = pgTable("videos", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  platform: varchar("platform", { length: 50 }).notNull(),
  videoId: varchar("video_id", { length: 255 }).notNull(),
  thumbnail: text("thumbnail").notNull(),
  description: text("description"),
  publishedAt: varchar("published_at", { length: 100 }),
  featured: boolean("featured").default(false),
});

export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  icon: varchar("icon", { length: 50 }).notNull(),
  features: text("features").notNull(),
  color: varchar("color", { length: 50 }).notNull(),
  sortOrder: integer("sort_order").default(0),
});

export const repertoire = pgTable("repertoire", {
  id: serial("id").primaryKey(),
  pieceTitle: varchar("piece_title", { length: 255 }).notNull(),
  composer: varchar("composer", { length: 255 }).notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  duration: varchar("duration", { length: 50 }),
  spotifyUrl: text("spotify_url"),
});

export const contactRequests = pgTable("contact_requests", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  eventType: varchar("event_type", { length: 100 }).notNull(),
  eventDate: varchar("event_date", { length: 100 }),
  guests: integer("guests"),
  message: text("message").notNull(),
  newsletterOptIn: boolean("newsletter_opt_in").default(false),
  status: varchar("status", { length: 50 }).default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const newsletterSubscribers = pgTable("newsletter_subscribers", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  source: varchar("source", { length: 100 }).default("website"),
  subscribedAt: timestamp("subscribed_at").defaultNow(),
});

export const insertEventSchema = createInsertSchema(events).omit({ id: true });
export const insertMusicianSchema = createInsertSchema(musicians).omit({ id: true });
export const insertVideoSchema = createInsertSchema(videos).omit({ id: true });
export const insertServiceSchema = createInsertSchema(services).omit({ id: true });
export const insertRepertoireSchema = createInsertSchema(repertoire).omit({ id: true });
export const insertContactRequestSchema = createInsertSchema(contactRequests).omit({ id: true, createdAt: true });
export const insertNewsletterSubscriberSchema = createInsertSchema(newsletterSubscribers).omit({ id: true, subscribedAt: true });

export type Event = typeof events.$inferSelect;
export type InsertEvent = z.infer<typeof insertEventSchema>;

export type Musician = typeof musicians.$inferSelect;
export type InsertMusician = z.infer<typeof insertMusicianSchema>;

export type Video = typeof videos.$inferSelect;
export type InsertVideo = z.infer<typeof insertVideoSchema>;

export type Service = typeof services.$inferSelect;
export type InsertService = z.infer<typeof insertServiceSchema>;

export type Repertoire = typeof repertoire.$inferSelect;
export type InsertRepertoire = z.infer<typeof insertRepertoireSchema>;

export type ContactRequest = typeof contactRequests.$inferSelect;
export type InsertContactRequest = z.infer<typeof insertContactRequestSchema>;

export type NewsletterSubscriber = typeof newsletterSubscribers.$inferSelect;
export type InsertNewsletterSubscriber = z.infer<typeof insertNewsletterSubscriberSchema>;
