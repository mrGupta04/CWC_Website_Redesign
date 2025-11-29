export type Trend = "up" | "down" | "stable";

export type ReservoirLevelRecord = {
  id: string;
  reservoirName: string;
  basin: string;
  state: string;
  date: string;
  liveStorageTMC: number;
  percentLiveStorage: number;
  waterLevelMeters: number;
  inflowCusecs: number;
  outflowCusecs: number;
};

export type BasinDischargeRecord = {
  id: string;
  basin: string;
  station: string;
  river: string;
  state: string;
  date: string;
  dischargeCumecs: number;
  status: "normal" | "alert" | "danger";
  trend: Trend;
  deviationPercent: number;
};

export type RainfallSummaryRecord = {
  id: string;
  region: string;
  state: string;
  district: string;
  date: string;
  rainfallMm: number;
  departureFromNormalPercent: number;
  category: "dry" | "light" | "moderate" | "heavy";
};

export type FloodAlertRecord = {
  id: string;
  basin: string;
  location: string;
  severity: "watch" | "alert" | "warning";
  lastUpdatedAt: string;
  expectedPeakDate: string;
  impact: string;
  advisory: string;
};

export type WaterProjectRecord = {
  id: string;
  projectName: string;
  basin: string;
  state: string;
  phase: "Pilot" | "Planning" | "Execution" | "Commissioning";
  completionPercent: number;
  budgetCrore: number;
  beneficiariesLakh: number;
  commissionYear: number;
  nextMilestone: string;
};

export const reservoirLevels: ReservoirLevelRecord[] = [
  {
    id: "tehri-2025-11-20",
    reservoirName: "Tehri",
    basin: "Ganga",
    state: "Uttarakhand",
    date: "2025-11-20",
    liveStorageTMC: 64.2,
    percentLiveStorage: 90.4,
    waterLevelMeters: 824.3,
    inflowCusecs: 4120,
    outflowCusecs: 3865,
  },
  {
    id: "bhakra-2025-11-20",
    reservoirName: "Bhakra",
    basin: "Satluj",
    state: "Himachal Pradesh",
    date: "2025-11-20",
    liveStorageTMC: 61.7,
    percentLiveStorage: 85.2,
    waterLevelMeters: 506.1,
    inflowCusecs: 3525,
    outflowCusecs: 3140,
  },
  {
    id: "hirakud-2025-11-20",
    reservoirName: "Hirakud",
    basin: "Mahanadi",
    state: "Odisha",
    date: "2025-11-20",
    liveStorageTMC: 52.8,
    percentLiveStorage: 76.8,
    waterLevelMeters: 188.7,
    inflowCusecs: 4980,
    outflowCusecs: 4210,
  },
  {
    id: "sardar-sarovar-2025-11-20",
    reservoirName: "Sardar Sarovar",
    basin: "Narmada",
    state: "Gujarat",
    date: "2025-11-20",
    liveStorageTMC: 139.1,
    percentLiveStorage: 89.7,
    waterLevelMeters: 134.5,
    inflowCusecs: 6020,
    outflowCusecs: 5780,
  },
  {
    id: "nagarjuna-2025-11-20",
    reservoirName: "Nagarjuna Sagar",
    basin: "Krishna",
    state: "Telangana",
    date: "2025-11-20",
    liveStorageTMC: 271.5,
    percentLiveStorage: 86.9,
    waterLevelMeters: 172.8,
    inflowCusecs: 7150,
    outflowCusecs: 6890,
  },
];

export const basinDischarges: BasinDischargeRecord[] = [
  {
    id: "ganga-hardinge",
    basin: "Ganga",
    station: "Hardinge Bridge",
    river: "Ganga",
    state: "Uttar Pradesh",
    date: "2025-11-20",
    dischargeCumecs: 5380,
    status: "alert",
    trend: "up",
    deviationPercent: 18.4,
  },
  {
    id: "brahmaputra-dibrugarh",
    basin: "Brahmaputra",
    station: "Dibrugarh",
    river: "Brahmaputra",
    state: "Assam",
    date: "2025-11-20",
    dischargeCumecs: 6725,
    status: "danger",
    trend: "up",
    deviationPercent: 27.1,
  },
  {
    id: "godavari-polavaram",
    basin: "Godavari",
    station: "Polavaram",
    river: "Godavari",
    state: "Andhra Pradesh",
    date: "2025-11-20",
    dischargeCumecs: 4260,
    status: "alert",
    trend: "down",
    deviationPercent: 12.9,
  },
  {
    id: "narmada-garudeshwar",
    basin: "Narmada",
    station: "Garudeshwar",
    river: "Narmada",
    state: "Gujarat",
    date: "2025-11-20",
    dischargeCumecs: 2985,
    status: "normal",
    trend: "stable",
    deviationPercent: -3.8,
  },
  {
    id: "krishna-vijayawada",
    basin: "Krishna",
    station: "Vijayawada Barrage",
    river: "Krishna",
    state: "Andhra Pradesh",
    date: "2025-11-20",
    dischargeCumecs: 5140,
    status: "alert",
    trend: "up",
    deviationPercent: 15.2,
  },
  {
    id: "mahanadi-cuttack",
    basin: "Mahanadi",
    station: "Naraj Cuttack",
    river: "Mahanadi",
    state: "Odisha",
    date: "2025-11-20",
    dischargeCumecs: 3625,
    status: "alert",
    trend: "stable",
    deviationPercent: 9.4,
  },
  {
    id: "tapi-burhanpur",
    basin: "Tapi",
    station: "Burhanpur",
    river: "Tapi",
    state: "Madhya Pradesh",
    date: "2025-11-20",
    dischargeCumecs: 2110,
    status: "normal",
    trend: "down",
    deviationPercent: -6.3,
  },
  {
    id: "cauvery-mettur",
    basin: "Cauvery",
    station: "Mettur",
    river: "Cauvery",
    state: "Tamil Nadu",
    date: "2025-11-20",
    dischargeCumecs: 2880,
    status: "danger",
    trend: "up",
    deviationPercent: 24.7,
  },
  {
    id: "yamuna-okhla",
    basin: "Yamuna",
    station: "Okhla Barrage",
    river: "Yamuna",
    state: "Delhi",
    date: "2025-11-20",
    dischargeCumecs: 2540,
    status: "alert",
    trend: "up",
    deviationPercent: 11.5,
  },
  {
    id: "sabarmati-dharoi",
    basin: "Sabarmati",
    station: "Dharoi",
    river: "Sabarmati",
    state: "Gujarat",
    date: "2025-11-20",
    dischargeCumecs: 1780,
    status: "normal",
    trend: "stable",
    deviationPercent: 2.1,
  },
  {
    id: "periyar-idukki",
    basin: "Periyar",
    station: "Idukki",
    river: "Periyar",
    state: "Kerala",
    date: "2025-11-20",
    dischargeCumecs: 3320,
    status: "alert",
    trend: "up",
    deviationPercent: 14.8,
  },
  {
    id: "brahmani-rengali",
    basin: "Brahmani",
    station: "Rengali",
    river: "Brahmani",
    state: "Odisha",
    date: "2025-11-20",
    dischargeCumecs: 3015,
    status: "normal",
    trend: "down",
    deviationPercent: -4.6,
  },
  {
    id: "sutlej-bhakra",
    basin: "Sutlej",
    station: "Bhakra",
    river: "Sutlej",
    state: "Himachal Pradesh",
    date: "2025-11-20",
    dischargeCumecs: 3475,
    status: "danger",
    trend: "up",
    deviationPercent: 21.3,
  },
];

export const rainfallSummaries: RainfallSummaryRecord[] = [
  {
    id: "northwest-dehradun",
    region: "Northwest",
    state: "Uttarakhand",
    district: "Dehradun",
    date: "2025-11-20",
    rainfallMm: 38,
    departureFromNormalPercent: 6,
    category: "moderate",
  },
  {
    id: "northeast-dibrugarh",
    region: "East & Northeast",
    state: "Assam",
    district: "Dibrugarh",
    date: "2025-11-20",
    rainfallMm: 72,
    departureFromNormalPercent: 18,
    category: "heavy",
  },
  {
    id: "central-bhopal",
    region: "Central",
    state: "Madhya Pradesh",
    district: "Bhopal",
    date: "2025-11-20",
    rainfallMm: 22,
    departureFromNormalPercent: -9,
    category: "light",
  },
  {
    id: "south-chennai",
    region: "South Peninsula",
    state: "Tamil Nadu",
    district: "Chennai",
    date: "2025-11-20",
    rainfallMm: 64,
    departureFromNormalPercent: 11,
    category: "moderate",
  },
  {
    id: "west-pune",
    region: "West",
    state: "Maharashtra",
    district: "Pune",
    date: "2025-11-20",
    rainfallMm: 12,
    departureFromNormalPercent: -22,
    category: "light",
  },
];

export const floodAlerts: FloodAlertRecord[] = [
  {
    id: "brahmaputra-kaziranga",
    basin: "Brahmaputra",
    location: "Kaziranga, Assam",
    severity: "warning",
    lastUpdatedAt: "2025-11-20T05:00:00Z",
    expectedPeakDate: "2025-11-22",
    impact:
      "Low-lying forest stretches likely to stay inundated; wildlife corridors being patrolled.",
    advisory:
      "Restrict tourist traffic, keep veterinary rapid-response teams on standby, and broadcast hourly updates.",
  },
  {
    id: "ganga-patna",
    basin: "Ganga",
    location: "Patna, Bihar",
    severity: "alert",
    lastUpdatedAt: "2025-11-20T04:30:00Z",
    expectedPeakDate: "2025-11-21",
    impact: "River flowing 0.35 m below danger level; embankment inspection teams deployed.",
    advisory:
      "Secure temporary shelters in riverine wards, test flood sirens, and keep evacuation boats ready.",
  },
  {
    id: "godavari-bhadrachalam",
    basin: "Godavari",
    location: "Bhadrachalam, Telangana",
    severity: "watch",
    lastUpdatedAt: "2025-11-20T03:45:00Z",
    expectedPeakDate: "2025-11-23",
    impact: "Second warning level triggered; ferry services halted along upstream villages.",
    advisory:
      "Maintain two gates open at upstream barrage, continue hourly level reporting, and brief fishing communities.",
  },
];

export const waterProjects: WaterProjectRecord[] = [
  {
    id: "upper-yamuna-automation",
    projectName: "Upper Yamuna Barrage Automation",
    basin: "Ganga",
    state: "Uttar Pradesh",
    phase: "Execution",
    completionPercent: 62,
    budgetCrore: 425,
    beneficiariesLakh: 18,
    commissionYear: 2026,
    nextMilestone: "SCADA hardware delivery",
  },
  {
    id: "brahmaputra-floodwalls",
    projectName: "Brahmaputra Riverfront Floodwalls",
    basin: "Brahmaputra",
    state: "Assam",
    phase: "Planning",
    completionPercent: 18,
    budgetCrore: 690,
    beneficiariesLakh: 12,
    commissionYear: 2027,
    nextMilestone: "Environmental clearance",
  },
  {
    id: "godavari-delta-modernisation",
    projectName: "Godavari Delta Modernisation",
    basin: "Godavari",
    state: "Andhra Pradesh",
    phase: "Execution",
    completionPercent: 47,
    budgetCrore: 1035,
    beneficiariesLakh: 26,
    commissionYear: 2028,
    nextMilestone: "Canal automation award",
  },
  {
    id: "hydrology-grid",
    projectName: "National Hydrology Observation Grid",
    basin: "All India",
    state: "Pan-India",
    phase: "Pilot",
    completionPercent: 35,
    budgetCrore: 310,
    beneficiariesLakh: 40,
    commissionYear: 2026,
    nextMilestone: "Phase-2 sensor deployment",
  },
];

export const dashboardHighlights = {
  totalStations: 1248,
  activeAlerts: floodAlerts.length,
  riversMonitored: 89,
  lastUpdated: "5 min ago",
  avgReservoirStorage: Math.round(
    reservoirLevels.reduce((acc, curr) => acc + curr.percentLiveStorage, 0) /
      reservoirLevels.length
  ),
  avgRainfallDeparture: Math.round(
    rainfallSummaries.reduce((acc, curr) => acc + curr.departureFromNormalPercent, 0) /
      rainfallSummaries.length
  ),
};

export const trendline = reservoirLevels.map((record) => ({
  name: record.reservoirName,
  value: record.percentLiveStorage,
}));

export type ReservoirLevel = typeof reservoirLevels[number];
export type BasinDischarge = typeof basinDischarges[number];
export type RainfallSummary = typeof rainfallSummaries[number];
export type FloodAlert = typeof floodAlerts[number];
export type WaterProject = typeof waterProjects[number];
export type DashboardHighlights = typeof dashboardHighlights;