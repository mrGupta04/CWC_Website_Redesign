import { useCallback } from 'react';
import { PageType } from '../../App';
import {
  Download,
  Activity,
  Droplet,
  CloudRain,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  MapPin,
} from 'lucide-react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useWaterData } from '../../hooks/useWaterData';
import { utils, writeFile } from 'xlsx';

interface WaterDataPageProps {
  onNavigate: (page: PageType) => void;
}

const severityStyles: Record<
  'watch' | 'alert' | 'warning',
  { badge: string; pill: string }
> = {
  watch: {
    badge:
      'bg-yellow-50 text-yellow-700 border border-yellow-200 dark:bg-yellow-400/20 dark:text-yellow-50 dark:border-yellow-500/40',
    pill: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-500/25 dark:text-yellow-50',
  },
  alert: {
    badge:
      'bg-orange-50 text-orange-700 border border-orange-200 dark:bg-orange-400/20 dark:text-orange-50 dark:border-orange-500/40',
    pill: 'bg-orange-100 text-orange-800 dark:bg-orange-500/25 dark:text-orange-50',
  },
  warning: {
    badge:
      'bg-red-50 text-red-700 border border-red-200 dark:bg-red-500/25 dark:text-red-100 dark:border-red-500/40',
    pill: 'bg-red-100 text-red-800 dark:bg-red-500/20 dark:text-red-100',
  },
};

const dischargeStatusColors: Record<'normal' | 'alert' | 'danger', string> = {
  normal: 'bg-green-100 text-green-700 dark:bg-green-500/25 dark:text-green-50',
  alert: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/25 dark:text-yellow-50',
  danger: 'bg-red-100 text-red-700 dark:bg-red-500/25 dark:text-red-50',
};

const chartTokens = {
  axis: 'var(--color-muted-foreground)',
  grid: 'var(--color-border)',
  primary: 'var(--primary)',
  tooltipBg: 'var(--color-card)',
  tooltipBorder: 'var(--color-border)',
  tooltipText: 'var(--color-card-foreground)',
};

function TrendPill({
  value,
  isPositive,
}: {
  value: string;
  isPositive: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium transition-colors ${
        isPositive
          ? 'bg-green-50 text-green-700 dark:bg-green-500/25 dark:text-green-50'
          : 'bg-red-50 text-red-700 dark:bg-red-500/25 dark:text-red-50'
      }`}
    >
      {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
      {value}
    </span>
  );
}

export function WaterDataPage({ onNavigate }: WaterDataPageProps) {
  const { reservoirs, discharges, rainfall, alerts, projects, dashboard, loading, error, trendline } =
    useWaterData();

  const handleExportReservoirs = useCallback(() => {
    if (!reservoirs.length) return;

    const rows = reservoirs.map((reservoir, index) => ({
      '#': index + 1,
      'Reservoir Name': reservoir.reservoirName,
      Basin: reservoir.basin,
      State: reservoir.state,
      'Live Storage (TMC)': reservoir.liveStorageTMC,
      'Percent Live Storage (%)': reservoir.percentLiveStorage,
      'Inflow (cusecs)': reservoir.inflowCusecs,
      'Outflow (cusecs)': reservoir.outflowCusecs,
    }));

    const worksheet = utils.json_to_sheet(rows);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, 'Reservoirs');

    const timestamp = new Date().toISOString().split('T')[0];
    writeFile(workbook, `reservoir-storage-${timestamp}.xlsx`);
  }, [reservoirs]);

  const rainfallChartData = rainfall.map((summary) => ({
    name: summary.region,
    value: summary.rainfallMm,
    departure: summary.departureFromNormalPercent,
  }));

  const quickStats = [
    {
      label: 'Total Stations',
      value: dashboard.totalStations.toLocaleString(),
      icon: Activity,
      trend: '+2.3% vs last week',
      isPositive: true,
    },
    {
      label: 'Active Alerts',
      value: dashboard.activeAlerts.toString(),
      icon: AlertTriangle,
      trend: `${alerts.length} basins impacted`,
      isPositive: false,
    },
    {
      label: 'Rivers Monitored',
      value: dashboard.riversMonitored.toString(),
      icon: Droplet,
      trend: '+4 new reach points',
      isPositive: true,
    },
    {
      label: 'Last Updated',
      value: dashboard.lastUpdated,
      icon: CloudRain,
      trend: 'Auto refresh enabled',
      isPositive: true,
    },
  ];

  const severitySummary = (['warning', 'alert', 'watch'] as const).map((level) => ({
    level,
    count: alerts.filter((alert) => alert.severity === level).length,
  }));

  const surfaceCard = 'rounded-2xl border border-gray-100 dark:border-white/10 bg-white dark:bg-slate-900/80 text-gray-900 dark:text-gray-100 shadow-sm dark:shadow-none backdrop-blur transition-colors';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-gray-100 transition-colors">
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16 dark:from-slate-900 dark:to-slate-800 dark:text-white">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-sm uppercase tracking-[0.3em] text-blue-200 dark:text-blue-200 mb-2">Central Water Commission</p>
          <h1 className="text-white mb-4 text-3xl font-semibold">Live Hydrology Operations Dashboard</h1>
          <p className="text-blue-100 dark:text-blue-100 max-w-3xl">
            Unified situational picture across reservoirs, river reaches, rainfall, flood alerts, and national water projects.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 space-y-8">
        {(loading || error) && (
          <div className="rounded-xl border border-dashed border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800 dark:border-blue-500/40 dark:bg-blue-500/10 dark:text-blue-100">
            {loading ? 'Refreshing live telemetry…' : error}
          </div>
        )}

        <div className="-mx-4 sm:mx-0">
          <div
            className="grid gap-4 grid-flow-col auto-cols-[minmax(230px,1fr)] overflow-x-auto px-4 pb-4 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&&::-webkit-scrollbar]:hidden sm:grid-flow-row sm:auto-cols-auto sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4"
          >
          {quickStats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white dark:bg-slate-900 rounded-xl border border-gray-100 dark:border-white/10 p-5 shadow-sm dark:shadow-none hover:shadow-md dark:hover:shadow-lg/20 transition-shadow duration-300 flex flex-col justify-between snap-center min-h-[150px]"
            >
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">{stat.label}</p>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stat.value}</p>
                </div>
                <div className="p-3 rounded-full bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-200">
                  <stat.icon className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-4">
                <TrendPill value={stat.trend} isPositive={stat.isPositive} />
              </div>
            </div>
          ))}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className={`${surfaceCard} p-6 lg:col-span-2`}>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Reservoir Storage Utilisation</p>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Live Capacity vs FRL</h2>
              </div>
              <button
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                onClick={handleExportReservoirs}
              >
                <Download className="w-4 h-4" />
                Export Excel
              </button>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendline} margin={{ left: 0, right: 0, top: 10 }}>
                  <defs>
                    <linearGradient id="storageGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={chartTokens.primary} stopOpacity={0.35} />
                      <stop offset="95%" stopColor={chartTokens.primary} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={chartTokens.grid} />
                  <XAxis dataKey="name" tick={{ fill: chartTokens.axis }} tickLine={false} axisLine={false} />
                  <YAxis hide domain={[60, 100]} />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 12,
                      border: `1px solid ${chartTokens.tooltipBorder}`,
                      boxShadow: '0 10px 20px -5px rgba(15,23,42,0.15)',
                      backgroundColor: chartTokens.tooltipBg,
                      color: chartTokens.tooltipText,
                    }}
                    labelStyle={{ color: chartTokens.tooltipText }}
                    itemStyle={{ color: chartTokens.tooltipText }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke={chartTokens.primary}
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#storageGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 mt-6">
              {reservoirs.map((reservoir) => (
                <div
                  key={reservoir.id}
                  className="border border-gray-100 dark:border-white/10 rounded-xl p-4 bg-gradient-to-br from-blue-50 to-transparent dark:from-blue-500/10 dark:bg-slate-900/40"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{reservoir.basin} Basin</p>
                      <h3 className="text-base font-semibold text-gray-900 dark:text-white">{reservoir.reservoirName}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{reservoir.state}</p>
                    </div>
                    <span className="text-lg font-semibold text-blue-600">
                      {reservoir.percentLiveStorage}%
                    </span>
                  </div>
                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                      <span>Live Storage</span>
                      <span>{reservoir.liveStorageTMC.toFixed(1)} TMC</span>
                    </div>
                    <div className="mt-1 h-2 rounded-full bg-gray-100 dark:bg-white/10">
                      <div
                        className="h-full rounded-full bg-blue-600"
                        style={{ width: `${Math.min(100, reservoir.percentLiveStorage)}%` }}
                      />
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-gray-600 dark:text-gray-300">
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">{reservoir.inflowCusecs.toLocaleString()} cusecs</p>
                      <p>Inflow</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">{reservoir.outflowCusecs.toLocaleString()} cusecs</p>
                      <p>Outflow</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={`${surfaceCard} p-6`}>
            <p className="text-sm text-gray-500 dark:text-gray-400">Rainfall Focus</p>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Regional Departure</h2>
            <div className="h-64 mt-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={rainfallChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={chartTokens.grid} vertical={false} />
                  <XAxis dataKey="name" tick={{ fill: chartTokens.axis, fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: chartTokens.axis, fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip
                    formatter={(value) => `${value} mm`}
                    contentStyle={{
                      borderRadius: 12,
                      border: `1px solid ${chartTokens.tooltipBorder}`,
                      boxShadow: '0 10px 20px -5px rgba(15,23,42,0.12)',
                      backgroundColor: chartTokens.tooltipBg,
                      color: chartTokens.tooltipText,
                    }}
                    labelStyle={{ color: chartTokens.tooltipText }}
                    itemStyle={{ color: chartTokens.tooltipText }}
                  />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]} fill={chartTokens.primary} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-6 space-y-3">
              {rainfall.map((summary) => (
                <div key={summary.id} className="flex items-center justify-between text-sm">
                  <div>
                    <p className="text-gray-900 dark:text-white font-medium">{summary.state}</p>
                    <p className="text-gray-500 dark:text-gray-400">{summary.region} region</p>
                  </div>
                  <TrendPill
                    value={`${summary.departureFromNormalPercent}%`}
                    isPositive={summary.departureFromNormalPercent >= 0}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className={`${surfaceCard} overflow-hidden lg:col-span-2`}>
            <div className="px-6 py-4 border-b border-gray-100 dark:border-white/10 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">River Reach Watchlist</p>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Daily Discharge Status</h2>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">{new Date().toLocaleDateString()}</span>
            </div>
            <div className="px-6 py-6 space-y-6">
              <div className="md:hidden divide-y divide-gray-100 dark:divide-white/10 rounded-2xl border border-gray-100 dark:border-white/10 bg-gray-50/50 dark:bg-slate-900/40 p-4 shadow-sm dark:shadow-none">
                {discharges.map((station) => (
                  <div key={station.id} className="py-4 first:pt-0 last:pb-0 space-y-3">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">{station.basin}</p>
                        <p className="text-base font-semibold text-gray-900 dark:text-white">{station.station}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{station.river} · {station.state}</p>
                      </div>
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
                        dischargeStatusColors[station.status]
                      }`}>
                        {station.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-300">
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Discharge</p>
                        <p className="text-gray-900 dark:text-white font-semibold">
                          {station.dischargeCumecs.toLocaleString()} cumecs
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Deviation</p>
                        <TrendPill
                          value={`${station.deviationPercent}%`}
                          isPositive={station.deviationPercent >= 0}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="hidden md:block overflow-x-auto rounded-2xl border border-gray-100 dark:border-white/10 bg-white/90 dark:bg-slate-900/60 shadow-sm dark:shadow-none">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 dark:bg-white/5 text-gray-600 dark:text-gray-300">
                    <tr>
                      <th className="px-6 py-3 font-medium">Station</th>
                      <th className="px-6 py-3 font-medium">Basin / River</th>
                      <th className="px-6 py-3 font-medium">State</th>
                      <th className="px-6 py-3 font-medium">Discharge</th>
                      <th className="px-6 py-3 font-medium">Deviation</th>
                      <th className="px-6 py-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                    {discharges.map((station) => (
                      <tr key={station.id} className="hover:bg-gray-50 dark:hover:bg-white/5">
                        <td className="px-6 py-4 text-gray-900 dark:text-white font-medium">{station.station}</td>
                        <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                          <span className="font-medium text-gray-900 dark:text-white">{station.basin}</span>
                          <span className="text-gray-400 dark:text-gray-400"> · {station.river}</span>
                        </td>
                        <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{station.state}</td>
                        <td className="px-6 py-4 text-gray-900 dark:text-white font-semibold">
                          {station.dischargeCumecs.toLocaleString()} cumecs
                        </td>
                        <td className="px-6 py-4">
                          <TrendPill
                            value={`${station.deviationPercent}%`}
                            isPositive={station.deviationPercent >= 0}
                          />
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                            dischargeStatusColors[station.status]
                          }`}>
                            {station.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className={`${surfaceCard} flex flex-col`}>
            <div className="px-6 py-4 border-b border-gray-100 dark:border-white/10">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Basin alerts</p>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Live Flood Bulletins</h2>
                </div>
                <span className="text-xs font-medium text-gray-500 dark:text-gray-200 bg-gray-100 dark:bg-white/10 rounded-full px-3 py-1">
                  {alerts.length} active
                </span>
              </div>
              <div className="mt-4 flex w-full gap-2 overflow-x-auto pb-1 -mx-6 px-6 sm:mx-0 sm:px-0 text-xs [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {severitySummary.map((summary) => (
                  <span
                    key={summary.level}
                    className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-3 py-1 capitalize ${
                      severityStyles[summary.level].pill
                    }`}
                  >
                    {summary.level}
                    <strong className="text-current">{summary.count}</strong>
                  </span>
                ))}
              </div>
            </div>
            <div className="px-6 py-6">
              <div className="grid gap-4 grid-cols-1">
                {alerts.map((alert) => (
                  <article
                    key={alert.id}
                    className="relative flex h-full flex-col gap-5 rounded-2xl border border-gray-100 dark:border-white/10 bg-white/95 dark:bg-slate-900/80 p-6 sm:p-7 shadow-[0_6px_18px_-10px_rgba(15,23,42,0.4)] dark:shadow-none transition-transform transition-shadow duration-200 ease-out hover:-translate-y-1 hover:border-blue-300/60 dark:hover:border-blue-400/60 hover:shadow-[0_18px_35px_-15px_rgba(37,99,235,0.45)]"
                  >
                    <div className="flex items-center justify-between gap-2 flex-wrap text-xs">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-semibold ${
                          severityStyles[alert.severity].badge
                        }`}
                      >
                        <AlertTriangle className="w-3.5 h-3.5" />
                        {alert.severity}
                      </span>
                      <span className="text-gray-400 dark:text-gray-400">
                        Updated {new Date(alert.lastUpdatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">{alert.basin} Basin</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">{alert.location}</p>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed flex-1">{alert.impact}</p>
                    <div className="rounded-xl border border-white/70 dark:border-white/5 bg-white/70 dark:bg-slate-900/70 p-4 sm:p-5 text-sm text-gray-700 dark:text-gray-100 mt-1">
                      {alert.advisory}
                    </div>
                    <div className="flex items-center justify-between gap-2 text-xs text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-100 dark:border-white/5">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-blue-500" />
                        Peak expected {alert.expectedPeakDate}
                      </div>
                      <button type="button" className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-300 font-medium">
                        View map
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={`${surfaceCard}`}>
          <div className="px-6 py-4 border-b border-gray-100 dark:border-white/10 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">National Programmes</p>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Strategic Water Projects</h2>
            </div>
            <button
              className="text-sm text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-200 font-medium"
              onClick={() => onNavigate('projects')}
            >
              View project gallery ↗
            </button>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 p-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="border border-gray-100 dark:border-white/10 rounded-xl p-4 bg-gradient-to-br from-blue-50/40 to-transparent dark:from-blue-500/10 dark:bg-slate-900/40 hover:border-blue-200 dark:hover:border-blue-400/60 transition-colors"
              >
                <p className="text-xs uppercase tracking-widest text-gray-400 dark:text-gray-400">{project.phase}</p>
                <h3 className="text-base font-semibold text-gray-900 dark:text-white mt-1">{project.projectName}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{project.state} · {project.basin}</p>
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>Completion</span>
                    <span>{project.completionPercent}%</span>
                  </div>
                  <div className="mt-1 h-2 rounded-full bg-gray-100 dark:bg-white/10">
                    <div
                      className="h-full rounded-full bg-blue-600"
                      style={{ width: `${project.completionPercent}%` }}
                    />
                  </div>
                </div>
                <div className="mt-4 text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <p className="flex justify-between">
                    <span>Budget</span>
                    <strong className="text-gray-900 dark:text-white">₹{project.budgetCrore} Cr</strong>
                  </p>
                  <p className="flex justify-between">
                    <span>Beneficiaries</span>
                    <strong className="text-gray-900 dark:text-white">{project.beneficiariesLakh} Lakh</strong>
                  </p>
                </div>
                <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">Next milestone</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{project.nextMilestone}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
