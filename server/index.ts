import express from "express";
import cors from "cors";
import { MongoClient, WithId } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const PORT = Number(process.env.API_PORT) || 4000;
const DB_NAME = process.env.MONGODB_DB || "cwc";
const SOURCE_TAG = process.env.SEED_SOURCE_TAG || "seed-water-v1";
const COLLECTIONS = {
  reservoirs: "reservoir_levels",
  discharges: "basin_discharges",
  rainfall: "rainfall_daily",
  alerts: "flood_alerts",
  projects: "water_projects",
};

let mongoClient: MongoClient | null = null;

async function getMongoClient(): Promise<MongoClient> {
  if (!process.env.MONGODB_URI) {
    throw new Error("Missing MONGODB_URI in environment");
  }
  if (!mongoClient) {
    mongoClient = new MongoClient(process.env.MONGODB_URI);
    await mongoClient.connect();
    console.log("✅ Connected to MongoDB Atlas");
  }
  return mongoClient;
}

async function getCollection(name: string) {
  const client = await getMongoClient();
  return client.db(DB_NAME).collection(name);
}

function parseLimit(value: unknown, fallback: number) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function sanitizeDocs<T extends Record<string, unknown>>(docs: Array<WithId<T>>) {
  return docs.map((doc) => {
    const { _id, ...rest } = doc;
    return {
      id: _id?.toString() ?? Math.random().toString(36).slice(2),
      ...rest,
    } as T & { id: string };
  });
}

function asyncHandler(handler: express.RequestHandler) {
  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    Promise.resolve(handler(req, res, next)).catch(next);
  };
}

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

app.get(
  "/api/water/reservoir-levels",
  asyncHandler(async (req, res) => {
    const limit = parseLimit(req.query.limit, 6);
    const collection = await getCollection(COLLECTIONS.reservoirs);
    const docs = await collection
      .find({ sourceTag: SOURCE_TAG })
      .sort({ date: -1, reservoirName: 1 })
      .limit(limit)
      .toArray();
    res.json(sanitizeDocs(docs));
  })
);

app.get(
  "/api/water/basin-discharges",
  asyncHandler(async (req, res) => {
    const limit = parseLimit(req.query.limit, 6);
    const collection = await getCollection(COLLECTIONS.discharges);
    const docs = await collection
      .find({ sourceTag: SOURCE_TAG })
      .sort({ date: -1, station: 1 })
      .limit(limit)
      .toArray();
    res.json(sanitizeDocs(docs));
  })
);

app.get(
  "/api/water/rainfall",
  asyncHandler(async (req, res) => {
    const limit = parseLimit(req.query.limit, 8);
    const collection = await getCollection(COLLECTIONS.rainfall);
    const docs = await collection
      .find({ sourceTag: SOURCE_TAG })
      .sort({ date: -1, region: 1 })
      .limit(limit)
      .toArray();
    res.json(sanitizeDocs(docs));
  })
);

app.get(
  "/api/water/flood-alerts",
  asyncHandler(async (_req, res) => {
    const collection = await getCollection(COLLECTIONS.alerts);
    const docs = await collection
      .find({ sourceTag: SOURCE_TAG })
      .sort({ severity: -1 })
      .toArray();
    res.json(sanitizeDocs(docs));
  })
);

app.get(
  "/api/water/projects",
  asyncHandler(async (req, res) => {
    const limit = parseLimit(req.query.limit, 6);
    const collection = await getCollection(COLLECTIONS.projects);
    const docs = await collection
      .find({ sourceTag: SOURCE_TAG })
      .sort({ completionPercent: -1 })
      .limit(limit)
      .toArray();
    res.json(sanitizeDocs(docs));
  })
);

app.get(
  "/api/water/dashboard",
  asyncHandler(async (_req, res) => {
    const [reservoirDocs, dischargeDocs, rainfallDocs, alertDocs] = await Promise.all([
      (await getCollection(COLLECTIONS.reservoirs))
        .find({ sourceTag: SOURCE_TAG })
        .limit(20)
        .toArray(),
      (await getCollection(COLLECTIONS.discharges))
        .find({ sourceTag: SOURCE_TAG })
        .limit(20)
        .toArray(),
      (await getCollection(COLLECTIONS.rainfall))
        .find({ sourceTag: SOURCE_TAG })
        .limit(20)
        .toArray(),
      (await getCollection(COLLECTIONS.alerts))
        .find({ sourceTag: SOURCE_TAG })
        .toArray(),
    ]);

    const avgReservoirStorage = Math.round(
      reservoirDocs.reduce((acc, doc) => acc + (doc.percentLiveStorage ?? 0), 0) /
        Math.max(reservoirDocs.length, 1)
    );

    const avgRainfallDeparture = Math.round(
      rainfallDocs.reduce((acc, doc) => acc + (doc.departureFromNormalPercent ?? 0), 0) /
        Math.max(rainfallDocs.length, 1)
    );

    const riversMonitored = new Set(dischargeDocs.map((doc) => doc.river)).size;

    res.json({
      totalStations: 1248,
      activeAlerts: alertDocs.length,
      riversMonitored,
      lastUpdated: new Date().toISOString(),
      avgReservoirStorage,
      avgRainfallDeparture,
    });
  })
);

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error("❌ API error", err);
  res.status(500).json({ message: err.message || "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`🚀 Water data API listening on http://localhost:${PORT}`);
});

process.on("SIGINT", async () => {
  if (mongoClient) {
    await mongoClient.close();
  }
  process.exit(0);
});
