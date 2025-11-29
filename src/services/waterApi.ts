import type {
  ReservoirLevel,
  BasinDischarge,
  RainfallSummary,
  FloodAlert,
  WaterProject,
  DashboardHighlights,
} from "../data/waterData";

const API_BASE = import.meta.env.VITE_WATER_API ?? "/api/water";

async function requestJson<T>(path: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, { signal });
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Request failed: ${response.status}`);
  }
  return (await response.json()) as T;
}

function buildQuery(params?: Record<string, string | number | undefined>) {
  if (!params) return "";
  const query = Object.entries(params)
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
    .join("&");
  return query ? `?${query}` : "";
}

export const waterApi = {
  reservoirs: (options?: { limit?: number; signal?: AbortSignal }) =>
    requestJson<ReservoirLevel[]>(`/reservoir-levels${buildQuery({ limit: options?.limit })}`, options?.signal),

  discharges: (options?: { limit?: number; signal?: AbortSignal }) =>
    requestJson<BasinDischarge[]>(`/basin-discharges${buildQuery({ limit: options?.limit })}`, options?.signal),

  rainfall: (options?: { limit?: number; signal?: AbortSignal }) =>
    requestJson<RainfallSummary[]>(`/rainfall${buildQuery({ limit: options?.limit })}`, options?.signal),

  floodAlerts: (options?: { signal?: AbortSignal }) =>
    requestJson<FloodAlert[]>(`/flood-alerts`, options?.signal),

  projects: (options?: { limit?: number; signal?: AbortSignal }) =>
    requestJson<WaterProject[]>(`/projects${buildQuery({ limit: options?.limit })}`, options?.signal),

  dashboard: (options?: { signal?: AbortSignal }) =>
    requestJson<DashboardHighlights>(`/dashboard`, options?.signal),
};

export type { ReservoirLevel, BasinDischarge, RainfallSummary, FloodAlert, WaterProject, DashboardHighlights };
