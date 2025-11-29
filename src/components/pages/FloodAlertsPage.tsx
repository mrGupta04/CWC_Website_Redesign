import { PageType } from '../../App';
import {
  AlertTriangle,
  AlertCircle,
  Info,
  MapPin,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import { useWaterData } from '../../hooks/useWaterData';

interface FloodAlertsPageProps {
  onNavigate: (page: PageType) => void;
}

export function FloodAlertsPage({ onNavigate }: FloodAlertsPageProps) {
  const { alerts, discharges, loading, error } = useWaterData();

  const severitySummary = alerts.reduce(
    (acc, alert) => ({
      ...acc,
      [alert.severity]: (acc[alert.severity] ?? 0) + 1,
    }),
    { watch: 0, alert: 0, warning: 0 } as Record<'watch' | 'alert' | 'warning', number>
  );

  const severityCardMeta = [
    {
      label: 'Warning',
      count: severitySummary.warning,
      icon: AlertTriangle,
      className: 'bg-red-50 border-red-200 text-red-700',
    },
    {
      label: 'Alert',
      count: severitySummary.alert,
      icon: AlertCircle,
      className: 'bg-orange-50 border-orange-200 text-orange-700',
    },
    {
      label: 'Watch',
      count: severitySummary.watch,
      icon: Info,
      className: 'bg-blue-50 border-blue-200 text-blue-700',
    },
    {
      label: 'Stations Reporting',
      count: discharges.length,
      icon: Activity,
      className: 'bg-green-50 border-green-200 text-green-700',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-red-900 to-red-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-white mb-4">Flood Alerts & Warnings</h1>
          <p className="text-red-100 max-w-3xl">
            Unified situational picture of the national flood monitoring network with real-time advisories.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 space-y-8">
        {(loading || error) && (
          <div className="rounded-xl border border-dashed border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {loading ? 'Syncing with CWC flood telemetry…' : error}
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {severityCardMeta.map((card) => (
            <div key={card.label} className={`${card.className} border-2 rounded-xl p-6`}>
              <div className="flex items-center gap-2">
                <card.icon className="w-5 h-5" />
                <span className="font-medium text-sm">{card.label}</span>
              </div>
              <p className="mt-3 text-2xl font-semibold">{card.count}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Alerts</p>
              <h2 className="text-xl font-semibold text-gray-900">Basin-Wise Emergency Bulletins</h2>
            </div>
            <span className="text-sm text-gray-500">{alerts.length} entries</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="px-6 py-3 text-left font-medium">Severity</th>
                  <th className="px-6 py-3 text-left font-medium">Location</th>
                  <th className="px-6 py-3 text-left font-medium">Impact</th>
                  <th className="px-6 py-3 text-left font-medium">Advisory</th>
                  <th className="px-6 py-3 text-left font-medium">Peak Window</th>
                  <th className="px-6 py-3 text-left font-medium">Last Update</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {alerts.map((alert) => (
                  <tr key={alert.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
                          alert.severity === 'warning'
                            ? 'bg-red-100 text-red-700'
                            : alert.severity === 'alert'
                            ? 'bg-orange-100 text-orange-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {alert.severity === 'warning' && <AlertTriangle className="w-3 h-3" />}
                        {alert.severity === 'alert' && <AlertCircle className="w-3 h-3" />}
                        {alert.severity === 'watch' && <Info className="w-3 h-3" />}
                        {alert.severity}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-900">
                      <div className="font-semibold">{alert.location}</div>
                      <div className="text-xs text-gray-500">{alert.basin} basin</div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{alert.impact}</td>
                    <td className="px-6 py-4 text-gray-600">{alert.advisory}</td>
                    <td className="px-6 py-4 text-gray-600">{alert.expectedPeakDate}</td>
                    <td className="px-6 py-4 text-gray-500 text-xs">
                      Updated {new Date(alert.lastUpdatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
            <p className="text-sm text-gray-500">River Forecast</p>
            <h2 className="text-xl font-semibold text-gray-900">Discharge Watchlist</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="px-6 py-3 text-left font-medium">Station</th>
                  <th className="px-6 py-3 text-left font-medium">Basin / River</th>
                  <th className="px-6 py-3 text-left font-medium">Discharge</th>
                  <th className="px-6 py-3 text-left font-medium">Trend</th>
                  <th className="px-6 py-3 text-left font-medium">Deviation</th>
                  <th className="px-6 py-3 text-left font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {discharges.map((station) => (
                  <tr key={station.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-900 font-medium">{station.station}</td>
                    <td className="px-6 py-4 text-gray-600">
                      {station.basin} · {station.river}
                    </td>
                    <td className="px-6 py-4 text-gray-900">
                      {station.dischargeCumecs.toLocaleString()} cumecs
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
                          station.trend === 'up'
                            ? 'bg-red-100 text-red-700'
                            : station.trend === 'down'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {station.trend === 'up' && <ArrowUpRight className="w-3 h-3" />}
                        {station.trend === 'down' && <ArrowDownRight className="w-3 h-3" />}
                        {station.trend}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={station.deviationPercent >= 0 ? 'text-red-600' : 'text-green-600'}>
                        {station.deviationPercent}%
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
                          station.status === 'danger'
                            ? 'bg-red-100 text-red-700'
                            : station.status === 'alert'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-green-100 text-green-700'
                        }`}
                      >
                        {station.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6">
          <h3 className="text-gray-900 mb-3">Emergency Contacts</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-gray-600">National Disaster Response</p>
              <p className="text-gray-900 font-semibold">1078 / 1070</p>
            </div>
            <div>
              <p className="text-gray-600">CWC Flood Cell</p>
              <p className="text-gray-900 font-semibold">+91-11-2610-6598</p>
            </div>
            <div>
              <p className="text-gray-600">Email</p>
              <p className="text-gray-900 font-semibold">flood.cwc@nic.in</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
