import { useEffect, useMemo, useState } from "react";
import {
  reservoirLevels as fallbackReservoirs,
  basinDischarges as fallbackDischarges,
  rainfallSummaries as fallbackRainfall,
  floodAlerts as fallbackAlerts,
  waterProjects as fallbackProjects,
  dashboardHighlights as fallbackHighlights,
} from "../data/waterData";
import {
  waterApi,
  type ReservoirLevel,
  type BasinDischarge,
  type RainfallSummary,
  type FloodAlert,
  type WaterProject,
  type DashboardHighlights,
} from "../services/waterApi";

interface WaterDataState {
  reservoirs: ReservoirLevel[];
  discharges: BasinDischarge[];
  rainfall: RainfallSummary[];
  alerts: FloodAlert[];
  projects: WaterProject[];
  dashboard: DashboardHighlights;
  loading: boolean;
  error: string | null;
}

const initialState: WaterDataState = {
  reservoirs: fallbackReservoirs,
  discharges: fallbackDischarges,
  rainfall: fallbackRainfall,
  alerts: fallbackAlerts,
  projects: fallbackProjects,
  dashboard: fallbackHighlights,
  loading: true,
  error: null,
};

export function useWaterData() {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    const controller = new AbortController();
    let isMounted = true;

    async function fetchData() {
      try {
        const [reservoirs, discharges, rainfall, alerts, projects, dashboard] = await Promise.all([
          waterApi.reservoirs({ limit: 6, signal: controller.signal }),
          waterApi.discharges({ limit: 12, signal: controller.signal }),
          waterApi.rainfall({ limit: 8, signal: controller.signal }),
          waterApi.floodAlerts({ signal: controller.signal }),
          waterApi.projects({ limit: 6, signal: controller.signal }),
          waterApi.dashboard({ signal: controller.signal }),
        ]);

        if (!isMounted) return;

        setState({
          reservoirs: reservoirs.length ? reservoirs : fallbackReservoirs,
          discharges: discharges.length ? discharges : fallbackDischarges,
          rainfall: rainfall.length ? rainfall : fallbackRainfall,
          alerts: alerts.length ? alerts : fallbackAlerts,
          projects: projects.length ? projects : fallbackProjects,
          dashboard: dashboard ?? fallbackHighlights,
          loading: false,
          error: null,
        });
      } catch (error) {
        if (!isMounted) return;
        console.error("Failed to load water datasets", error);
        setState((prev) => ({
          ...prev,
          loading: false,
          error: "Live water datasets unavailable; showing cached sample data.",
        }));
      }
    }

    fetchData();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const trendline = useMemo(
    () =>
      state.reservoirs.map((record) => ({
        name: record.reservoirName,
        value: record.percentLiveStorage,
      })),
    [state.reservoirs]
  );

  return { ...state, trendline };
}
