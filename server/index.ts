import express from "express";
import { createServer } from "http";
import { setupVite } from "./vite";
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
  await setupVite(app, server);
} else {
  const sirv = (await import("sirv")).default;
  app.use(sirv("dist/public", { extensions: [] }));
}

const PORT = 5000;
server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
