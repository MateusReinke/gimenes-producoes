import express from "express";
import { createServer } from "http";
import { registerRoutes } from "./routes";
import { MemStorage } from "./storage";
import { seedData } from "./seedData";

const app = express();
const server = createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const storage = new MemStorage();
await seedData(storage);

app.use(registerRoutes(storage));

if (process.env.NODE_ENV !== "production") {
  const { setupVite } = await import("./vite");
  await setupVite(app, server);
} else {
  const sirv = (await import("sirv")).default;
  app.use(sirv("dist/public", { single: true }));
}

const PORT = Number(process.env.PORT) || 5000;
server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
