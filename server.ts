import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_FILE = path.join(__dirname, "site-data.json");

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Support large JSON payloads for base64 images
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  let inMemoryData: any = null;

  // API endpoint to GET site data
  app.get("/api/site-data", (req, res) => {
    try {
      if (inMemoryData) {
        return res.json({ success: true, data: inMemoryData });
      }
      if (fs.existsSync(DATA_FILE)) {
        const fileContent = fs.readFileSync(DATA_FILE, "utf-8");
        inMemoryData = JSON.parse(fileContent);
        return res.json({ success: true, data: inMemoryData });
      }
    } catch (err) {
      console.error("Error reading site-data.json:", err);
    }
    return res.json({ success: true, data: null });
  });

  // API endpoint to SAVE site data
  app.post("/api/site-data", (req, res) => {
    try {
      const data = req.body;
      if (data && typeof data === "object") {
        inMemoryData = data;
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
        return res.json({ success: true, message: "Site data saved successfully on server" });
      } else {
        return res.status(400).json({ success: false, error: "Invalid data payload" });
      }
    } catch (err: any) {
      console.error("Error writing site-data.json:", err);
      return res.status(500).json({ success: false, error: err.message || "Failed to save data" });
    }
  });

  // Vite middleware for development or static serving for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
