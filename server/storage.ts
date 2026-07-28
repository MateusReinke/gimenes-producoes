import type {
  Event, InsertEvent,
  Musician, InsertMusician,
  Video, InsertVideo,
  Service, InsertService,
  Repertoire, InsertRepertoire,
  ContactRequest, InsertContactRequest,
  NewsletterSubscriber, InsertNewsletterSubscriber
} from "@shared/schema";

export interface IStorage {
  getEvents(): Promise<Event[]>;
  getEvent(id: number): Promise<Event | undefined>;
  createEvent(data: InsertEvent): Promise<Event>;
  updateEvent(id: number, data: Partial<InsertEvent>): Promise<Event | undefined>;
  deleteEvent(id: number): Promise<boolean>;

  getMusicians(): Promise<Musician[]>;
  getMusician(id: number): Promise<Musician | undefined>;
  createMusician(data: InsertMusician): Promise<Musician>;
  updateMusician(id: number, data: Partial<InsertMusician>): Promise<Musician | undefined>;
  deleteMusician(id: number): Promise<boolean>;

  getVideos(): Promise<Video[]>;
  getVideo(id: number): Promise<Video | undefined>;
  createVideo(data: InsertVideo): Promise<Video>;
  updateVideo(id: number, data: Partial<InsertVideo>): Promise<Video | undefined>;
  deleteVideo(id: number): Promise<boolean>;

  getServices(): Promise<Service[]>;
  getService(id: number): Promise<Service | undefined>;
  createService(data: InsertService): Promise<Service>;
  updateService(id: number, data: Partial<InsertService>): Promise<Service | undefined>;
  deleteService(id: number): Promise<boolean>;

  getRepertoire(): Promise<Repertoire[]>;
  getRepertoireItem(id: number): Promise<Repertoire | undefined>;
  createRepertoireItem(data: InsertRepertoire): Promise<Repertoire>;
  updateRepertoireItem(id: number, data: Partial<InsertRepertoire>): Promise<Repertoire | undefined>;
  deleteRepertoireItem(id: number): Promise<boolean>;

  getContactRequests(): Promise<ContactRequest[]>;
  getContactRequest(id: number): Promise<ContactRequest | undefined>;
  createContactRequest(data: InsertContactRequest): Promise<ContactRequest>;
  updateContactRequest(id: number, data: Partial<InsertContactRequest>): Promise<ContactRequest | undefined>;
  deleteContactRequest(id: number): Promise<boolean>;

  getNewsletterSubscribers(): Promise<NewsletterSubscriber[]>;
  getNewsletterSubscriber(id: number): Promise<NewsletterSubscriber | undefined>;
  createNewsletterSubscriber(data: InsertNewsletterSubscriber): Promise<NewsletterSubscriber>;
  deleteNewsletterSubscriber(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private events: Event[] = [];
  private musicians: Musician[] = [];
  private videos: Video[] = [];
  private services: Service[] = [];
  private repertoire: Repertoire[] = [];
  private contactRequests: ContactRequest[] = [];
  private newsletterSubscribers: NewsletterSubscriber[] = [];
  private nextId = { events: 1, musicians: 1, videos: 1, services: 1, repertoire: 1, contacts: 1, newsletter: 1 };

  async getEvents(): Promise<Event[]> {
    return this.events;
  }

  async getEvent(id: number): Promise<Event | undefined> {
    return this.events.find((e) => e.id === id);
  }

  async createEvent(data: InsertEvent): Promise<Event> {
    const event: Event = { id: this.nextId.events++, ...data };
    this.events.push(event);
    return event;
  }

  async updateEvent(id: number, data: Partial<InsertEvent>): Promise<Event | undefined> {
    const index = this.events.findIndex((e) => e.id === id);
    if (index === -1) return undefined;
    this.events[index] = { ...this.events[index], ...data };
    return this.events[index];
  }

  async deleteEvent(id: number): Promise<boolean> {
    const index = this.events.findIndex((e) => e.id === id);
    if (index === -1) return false;
    this.events.splice(index, 1);
    return true;
  }

  async getMusicians(): Promise<Musician[]> {
    return this.musicians;
  }

  async getMusician(id: number): Promise<Musician | undefined> {
    return this.musicians.find((m) => m.id === id);
  }

  async createMusician(data: InsertMusician): Promise<Musician> {
    const musician: Musician = { id: this.nextId.musicians++, ...data };
    this.musicians.push(musician);
    return musician;
  }

  async updateMusician(id: number, data: Partial<InsertMusician>): Promise<Musician | undefined> {
    const index = this.musicians.findIndex((m) => m.id === id);
    if (index === -1) return undefined;
    this.musicians[index] = { ...this.musicians[index], ...data };
    return this.musicians[index];
  }

  async deleteMusician(id: number): Promise<boolean> {
    const index = this.musicians.findIndex((m) => m.id === id);
    if (index === -1) return false;
    this.musicians.splice(index, 1);
    return true;
  }

  async getVideos(): Promise<Video[]> {
    return this.videos;
  }

  async getVideo(id: number): Promise<Video | undefined> {
    return this.videos.find((v) => v.id === id);
  }

  async createVideo(data: InsertVideo): Promise<Video> {
    const video: Video = { id: this.nextId.videos++, ...data };
    this.videos.push(video);
    return video;
  }

  async updateVideo(id: number, data: Partial<InsertVideo>): Promise<Video | undefined> {
    const index = this.videos.findIndex((v) => v.id === id);
    if (index === -1) return undefined;
    this.videos[index] = { ...this.videos[index], ...data };
    return this.videos[index];
  }

  async deleteVideo(id: number): Promise<boolean> {
    const index = this.videos.findIndex((v) => v.id === id);
    if (index === -1) return false;
    this.videos.splice(index, 1);
    return true;
  }

  async getServices(): Promise<Service[]> {
    return this.services.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
  }

  async getService(id: number): Promise<Service | undefined> {
    return this.services.find((s) => s.id === id);
  }

  async createService(data: InsertService): Promise<Service> {
    const service: Service = { id: this.nextId.services++, ...data };
    this.services.push(service);
    return service;
  }

  async updateService(id: number, data: Partial<InsertService>): Promise<Service | undefined> {
    const index = this.services.findIndex((s) => s.id === id);
    if (index === -1) return undefined;
    this.services[index] = { ...this.services[index], ...data };
    return this.services[index];
  }

  async deleteService(id: number): Promise<boolean> {
    const index = this.services.findIndex((s) => s.id === id);
    if (index === -1) return false;
    this.services.splice(index, 1);
    return true;
  }

  async getRepertoire(): Promise<Repertoire[]> {
    return this.repertoire;
  }

  async getRepertoireItem(id: number): Promise<Repertoire | undefined> {
    return this.repertoire.find((r) => r.id === id);
  }

  async createRepertoireItem(data: InsertRepertoire): Promise<Repertoire> {
    const item: Repertoire = { id: this.nextId.repertoire++, ...data };
    this.repertoire.push(item);
    return item;
  }

  async updateRepertoireItem(id: number, data: Partial<InsertRepertoire>): Promise<Repertoire | undefined> {
    const index = this.repertoire.findIndex((r) => r.id === id);
    if (index === -1) return undefined;
    this.repertoire[index] = { ...this.repertoire[index], ...data };
    return this.repertoire[index];
  }

  async deleteRepertoireItem(id: number): Promise<boolean> {
    const index = this.repertoire.findIndex((r) => r.id === id);
    if (index === -1) return false;
    this.repertoire.splice(index, 1);
    return true;
  }

  async getContactRequests(): Promise<ContactRequest[]> {
    return this.contactRequests;
  }

  async getContactRequest(id: number): Promise<ContactRequest | undefined> {
    return this.contactRequests.find((c) => c.id === id);
  }

  async createContactRequest(data: InsertContactRequest): Promise<ContactRequest> {
    const request: ContactRequest = {
      id: this.nextId.contacts++,
      ...data,
      createdAt: new Date(),
    };
    this.contactRequests.push(request);
    return request;
  }

  async updateContactRequest(id: number, data: Partial<InsertContactRequest>): Promise<ContactRequest | undefined> {
    const index = this.contactRequests.findIndex((c) => c.id === id);
    if (index === -1) return undefined;
    this.contactRequests[index] = { ...this.contactRequests[index], ...data };
    return this.contactRequests[index];
  }

  async deleteContactRequest(id: number): Promise<boolean> {
    const index = this.contactRequests.findIndex((c) => c.id === id);
    if (index === -1) return false;
    this.contactRequests.splice(index, 1);
    return true;
  }

  async getNewsletterSubscribers(): Promise<NewsletterSubscriber[]> {
    return this.newsletterSubscribers;
  }

  async getNewsletterSubscriber(id: number): Promise<NewsletterSubscriber | undefined> {
    return this.newsletterSubscribers.find((n) => n.id === id);
  }

  async createNewsletterSubscriber(data: InsertNewsletterSubscriber): Promise<NewsletterSubscriber> {
    const subscriber: NewsletterSubscriber = {
      id: this.nextId.newsletter++,
      ...data,
      subscribedAt: new Date(),
    };
    this.newsletterSubscribers.push(subscriber);
    return subscriber;
  }

  async deleteNewsletterSubscriber(id: number): Promise<boolean> {
    const index = this.newsletterSubscribers.findIndex((n) => n.id === id);
    if (index === -1) return false;
    this.newsletterSubscribers.splice(index, 1);
    return true;
  }
}
