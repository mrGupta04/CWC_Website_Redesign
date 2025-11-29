import "dotenv/config";
import { MongoClient } from "mongodb";

const SOURCE_TAG = "seed-water-v1";
const DEFAULT_DB_NAME = "cwc";
const DAYS_OF_HISTORY = 10;

const today = new Date();

const toISODate = (date: Date) => date.toISOString().split("T")[0];

const buildDateWindow = (days: number) => {
  const dates: string[] = [];
  for (let i = days - 1; i >= 0; i -= 1) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    dates.push(toISODate(d));
  }
  return dates;
};

const seededFloat = (key: string) => {
  let hash = 0;
  for (let i = 0; i < key.length; i += 1) {
    hash = (hash << 5) - hash + key.charCodeAt(i);
    hash |= 0;
  }
  const value = Math.abs(Math.sin(hash));
  return value - Math.floor(value);
};

const seededNumber = (min: number, max: number, key: string, digits = 2) => {
  const raw = min + seededFloat(key) * (max - min);
  return Number(raw.toFixed(digits));
};

const reservoirTemplates = [
  {
    reservoirName: "Tehri",
    basin: "Ganga",
    river: "Bhagirathi",
    state: "Uttarakhand",
    liveCapacityTMC: 71.0,
    fullReservoirLevelM: 830.0,
  },
  {
    reservoirName: "Bhakra",
    basin: "Satluj",
    river: "Satluj",
    state: "Himachal Pradesh",
    liveCapacityTMC: 72.4,
    fullReservoirLevelM: 518.0,
  },
  {
    reservoirName: "Hirakud",
    basin: "Mahanadi",
    river: "Mahanadi",
    state: "Odisha",
    liveCapacityTMC: 68.8,
    fullReservoirLevelM: 195.0,
  },
  {
    reservoirName: "Sardar Sarovar",
    basin: "Narmada",
    river: "Narmada",
    state: "Gujarat",
    liveCapacityTMC: 155.0,
    fullReservoirLevelM: 138.7,
  },
  {
    reservoirName: "Nagarjuna Sagar",
    basin: "Krishna",
    river: "Krishna",
    state: "Telangana",
    liveCapacityTMC: 312.0,
    fullReservoirLevelM: 179.8,
  },
];

const basinStations = [
  {
    basin: "Ganga",
    station: "Hardinge Bridge",
    river: "Ganga",
    state: "Uttar Pradesh",
    alertLevelCumecs: 4000,
    dangerLevelCumecs: 5500,
  },
  {
    basin: "Brahmaputra",
    station: "Dibrugarh",
    river: "Brahmaputra",
    state: "Assam",
    alertLevelCumecs: 5500,
    dangerLevelCumecs: 7000,
  },
  {
    basin: "Godavari",
    station: "Polavaram",
    river: "Godavari",
    state: "Andhra Pradesh",
    alertLevelCumecs: 4500,
    dangerLevelCumecs: 6000,
  },
  {
    basin: "Narmada",
    station: "Garudeshwar",
    river: "Narmada",
    state: "Gujarat",
    alertLevelCumecs: 3500,
    dangerLevelCumecs: 5200,
  },
];

const rainfallStations = [
  { region: "Northwest", state: "Uttarakhand", district: "Dehradun" },
  { region: "East & Northeast", state: "Assam", district: "Dibrugarh" },
  { region: "Central", state: "Madhya Pradesh", district: "Bhopal" },
  { region: "South Peninsula", state: "Tamil Nadu", district: "Chennai" },
  { region: "West", state: "Maharashtra", district: "Pune" },
];

const floodAlertSeeds = [
  {
    basin: "Brahmaputra",
    location: "Kaziranga, Assam",
    severity: "warning",
    impact: "Low-lying forest stretches likely to remain inundated; wildlife movement advisories active.",
  },
  {
    basin: "Ganga",
    location: "Patna, Bihar",
    severity: "watch",
    impact: "River flowing 0.4 m below danger level; embankment patrol teams on standby.",
  },
  {
    basin: "Godavari",
    location: "Bhadrachalam, Telangana",
    severity: "alert",
    impact: "Second warning level triggered; ferry services halted across the river.",
  },
];

const projectSeeds = [
  {
    projectName: "Upper Yamuna Barrage Automation",
    basin: "Ganga",
    state: "Uttar Pradesh",
    phase: "Execution",
    budgetCrore: 425,
    completionPercent: 62,
    beneficiariesLakh: 18,
  },
  {
    projectName: "Brahmaputra Riverfront Floodwalls",
    basin: "Brahmaputra",
    state: "Assam",
    phase: "Planning",
    budgetCrore: 690,
    completionPercent: 18,
    beneficiariesLakh: 12,
  },
  {
    projectName: "Godavari Delta Modernisation",
    basin: "Godavari",
    state: "Andhra Pradesh",
    phase: "Execution",
    budgetCrore: 1035,
    completionPercent: 47,
    beneficiariesLakh: 26,
  },
  {
    projectName: "National Hydrology Observation Grid",
    basin: "All India",
    state: "Pan-India",
    phase: "Pilot",
    budgetCrore: 310,
    completionPercent: 35,
    beneficiariesLakh: 40,
  },
];

const buildReservoirDocs = (dates: string[]) =>
  dates.flatMap((date) =>
    reservoirTemplates.map((template) => {
      const storage = seededNumber(
        template.liveCapacityTMC * 0.45,
        template.liveCapacityTMC * 0.95,
        `${template.reservoirName}-${date}-storage`
      );
      const waterLevel = seededNumber(
        template.fullReservoirLevelM * 0.6,
        template.fullReservoirLevelM * 0.99,
        `${template.reservoirName}-${date}-level`
      );
      const inflow = Math.round(
        seededNumber(500, 6000, `${template.reservoirName}-${date}-inflow`, 3)
      );
      const outflow = Math.round(
        seededNumber(400, 4500, `${template.reservoirName}-${date}-outflow`, 3)
      );

      return {
        ...template,
        date,
        liveStorageTMC: storage,
        percentLiveStorage: Number(
          ((storage / template.liveCapacityTMC) * 100).toFixed(2)
        ),
        waterLevelMeters: waterLevel,
        inflowCusecs: inflow,
        outflowCusecs: outflow,
        netInflowCusecs: inflow - outflow,
        sourceTag: SOURCE_TAG,
      };
    })
  );

const buildDischargeDocs = (dates: string[]) =>
  dates.flatMap((date) =>
    basinStations.map((station) => {
      const discharge = Math.round(
        seededNumber(800, 7500, `${station.station}-${date}-discharge`, 3)
      );
      const status =
        discharge >= station.dangerLevelCumecs
          ? "danger"
          : discharge >= station.alertLevelCumecs
          ? "alert"
          : "normal";

      return {
        ...station,
        date,
        dischargeCumecs: discharge,
        status,
        deviationPercent: Number(
          seededNumber(-25, 45, `${station.station}-${date}-deviation`).toFixed(1)
        ),
        sourceTag: SOURCE_TAG,
      };
    })
  );

const buildRainfallDocs = (dates: string[]) =>
  dates.flatMap((date) =>
    rainfallStations.map((station) => {
      const rainfall = seededNumber(0, 120, `${station.district}-${date}-rain`);
      const departure = seededNumber(
        -80,
        120,
        `${station.district}-${date}-departure`
      );
      const category =
        rainfall === 0
          ? "dry"
          : rainfall < 15
          ? "light"
          : rainfall < 65
          ? "moderate"
          : "heavy";

      return {
        ...station,
        date,
        rainfallMm: rainfall,
        departureFromNormalPercent: departure,
        category,
        sourceTag: SOURCE_TAG,
      };
    })
  );

const buildFloodAlerts = () =>
  floodAlertSeeds.map((seed, idx) => ({
    ...seed,
    lastUpdatedAt: toISODate(today),
    expectedPeakDate: toISODate(new Date(today.getTime() + (idx + 1) * 24 * 60 * 60 * 1000)),
    advisory: idx === 0
      ? "Restrict tourist movement near river islands; deploy mobile veterinary support."
      : idx === 1
      ? "Keep evacuation boats ready and secure temporary shelters in low-lying wards."
      : "Maintain two extra gates open at upstream barrage; continue hourly level reporting.",
    sourceTag: SOURCE_TAG,
  }));

const buildProjectStats = () =>
  projectSeeds.map((seed, idx) => ({
    ...seed,
    commissionYear: 2026 + idx,
    nextMilestone: idx % 2 === 0 ? "SCADA hardware delivery" : "Contract award",
    issues: idx % 2 === 0 ? ["Land acquisition pending", "Need revised DPR"] : ["Environmental clearance under appraisal"],
    sourceTag: SOURCE_TAG,
  }));

const buildDatasets = (dates: string[]) => [
  {
    label: "Reservoir levels",
    collection: "reservoir_levels",
    documents: buildReservoirDocs(dates),
  },
  {
    label: "Basin discharge",
    collection: "basin_discharges",
    documents: buildDischargeDocs(dates),
  },
  {
    label: "Rainfall summary",
    collection: "rainfall_daily",
    documents: buildRainfallDocs(dates),
  },
  {
    label: "Flood alerts",
    collection: "flood_alerts",
    documents: buildFloodAlerts(),
  },
  {
    label: "Project stats",
    collection: "water_projects",
    documents: buildProjectStats(),
  },
];

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is not defined. Add it to your .env file before seeding.");
  }

  const dbName = process.env.MONGODB_DB || DEFAULT_DB_NAME;
  const client = new MongoClient(uri);
  const dates = buildDateWindow(DAYS_OF_HISTORY);
  const datasets = buildDatasets(dates);

  console.log(
    `Seeding synthetic water datasets into '${dbName}' (${DAYS_OF_HISTORY} day window)...`
  );

  try {
    await client.connect();
    const db = client.db(dbName);

    for (const dataset of datasets) {
      const collection = db.collection(dataset.collection);
      const removed = await collection.deleteMany({ sourceTag: SOURCE_TAG });
      if (removed.deletedCount) {
        console.log(
          `Cleared ${removed.deletedCount} prior '${SOURCE_TAG}' docs from ${dataset.collection}`
        );
      }
      if (dataset.documents.length === 0) {
        continue;
      }
      const insertResult = await collection.insertMany(dataset.documents);
      console.log(
        `Inserted ${insertResult.insertedCount} docs into ${dataset.collection} (${dataset.label}).`
      );
    }

    console.log("✅ MongoDB Atlas now contains synthetic baseline data.");
  } finally {
    await client.close();
  }
}

main().catch((error) => {
  console.error("❌ Failed to seed MongoDB", error);
  process.exitCode = 1;
});
