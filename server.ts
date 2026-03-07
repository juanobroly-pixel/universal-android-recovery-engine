import express from "express";
import { createServer as createViteServer } from "vite";
import { BigQuery } from "@google-cloud/bigquery";
import admin from "firebase-admin";

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Firebase Auth Middleware
  const authenticate = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const idToken = authHeader.split('Bearer ')[1];
    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      (req as any).user = decodedToken;
      next();
    } catch (error) {
      res.status(401).json({ error: 'Invalid token' });
    }
  };

  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Example BigQuery route with Auth
  app.get("/api/data", authenticate, async (req, res) => {
    // In a real scenario, use the user's identity to authorize or impersonate
    // const user = (req as any).user;
    const bq = new BigQuery();
    // ... perform query ...
    res.json({ data: "Authorized data" });
  });

  // System Commander (Simulation)
  app.post("/api/system/command", authenticate, (req, res) => {
    const { command } = req.body;
    console.log(`Executing system command: ${command}`);
    res.json({ result: `Simulated execution of: ${command}` });
  });

  // Monetization & Resources Endpoints
  app.get("/api/offers", authenticate, (req, res) => {
    res.json({
      offers: [
        { id: 1, title: "Advanced Visualizer", description: "Unlock 3D data charts.", price: "$4.99" },
        { id: 2, title: "System Pro", description: "Advanced recovery scripts.", price: "$9.99" }
      ]
    });
  });

  app.get("/api/resources", authenticate, (req, res) => {
    res.json({
      resources: [
        { name: "BigQuery Usage Guide", url: "/docs/bq-guide" },
        { name: "Recovery Best Practices", url: "/docs/recovery-tips" }
      ]
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
