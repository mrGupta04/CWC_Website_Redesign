import { ChangeEvent, useMemo, useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import { Download, Calendar, Database, Droplets, MapPin, Layers, TrendingUp } from 'lucide-react';
import { PageType } from '../../App';
import rainfallDataset from '../../data/rainfallData.json';

type RainfallRecord = {
  state: string;
  district: string;
  year: number;
  month: string;
  rainfallMm: number;
  deviationPct: number;
  dataSource: string;
};

const monthOrder = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

const rainfallData = rainfallDataset as RainfallRecord[];

const rainfallRegions = Object.entries(
  rainfallData.reduce<Record<string, Set<string>>>((acc, record) => {
    if (!acc[record.state]) {
      acc[record.state] = new Set();
    }
    acc[record.state].add(record.district);
    return acc;
  }, {})
)
  .map(([state, districts]) => ({
    state,
    districts: Array.from(districts).sort()
  }))
  .sort((a, b) => a.state.localeCompare(b.state));

const rainfallYears = Array.from(new Set(rainfallData.map((record) => record.year))).sort((a, b) => b - a);

const rainfallMonths = monthOrder.filter((month) => rainfallData.some((record) => record.month === month));

const rainfallDistrictCount = rainfallRegions.reduce((total, region) => total + region.districts.length, 0);

type HighlightMetric = {
  label: string;
  value: string;
  trend: string;
  icon: LucideIcon;
  accent: string;
};

const heroHighlights: HighlightMetric[] = [
  {
    label: 'Observation Stations',
    value: '7,698',
    trend: '+182 new this year',
    icon: MapPin,
    accent: 'from-sky-500/40 via-sky-500/10 to-transparent'
  },
  {
    label: 'Historical Span',
    value: '1901 → 2024',
    trend: '123+ years curated',
    icon: Layers,
    accent: 'from-blue-500/40 via-blue-500/10 to-transparent'
  },
  {
    label: 'Validated Records',
    value: '50M+',
    trend: 'Continuously audited',
    icon: TrendingUp,
    accent: 'from-cyan-400/40 via-cyan-400/10 to-transparent'
  },
  {
    label: 'Daily Updates',
    value: '2.3 TB',
    trend: 'Processed every 24h',
    icon: Droplets,
    accent: 'from-indigo-400/40 via-indigo-400/10 to-transparent'
  }
];

const insightHighlights = [
  {
    title: 'Pan-India Coverage',
    metric: '7,698 stations',
    badge: 'Telemetry + manual',
    description: 'Validated rain gauges and stream monitoring nodes across every river basin cluster.',
    accent: 'from-sky-50 to-white'
  },
  {
    title: 'Climate Normal Series',
    metric: '30-year windows',
    badge: 'LPA ready',
    description: 'Instantly compare district rainfall against IMD long period averages and anomaly bands.',
    accent: 'from-emerald-50 to-white'
  },
  {
    title: 'Download Flexibility',
    metric: 'CSV / NetCDF / API',
    badge: 'Research grade',
    description: 'Bulk exports, API hooks, and ready-to-use GIS layers tailored to your hydrology workflow.',
    accent: 'from-amber-50 to-white'
  }
];

interface HistoricalDataPageProps {
  onNavigate: (page: PageType) => void;
}

export function HistoricalDataPage({ onNavigate }: HistoricalDataPageProps) {
  const datasetCategories = [
    {
      category: 'River Flow Data',
      period: '1950-2024',
      stations: '1,248',
      size: '2.5 GB',
      format: 'CSV, Excel'
    },
    {
      category: 'Rainfall Data',
      period: '1901-2024',
      stations: '5,000+',
      size: '5.8 GB',
      format: 'CSV, NetCDF'
    },
    {
      category: 'Reservoir Storage',
      period: '1960-2024',
      stations: '150',
      size: '850 MB',
      format: 'CSV, Excel'
    },
    {
      category: 'Groundwater Levels',
      period: '1980-2024',
      stations: '2,500+',
      size: '1.2 GB',
      format: 'CSV, Excel'
    },
    {
      category: 'Water Quality',
      period: '1985-2024',
      stations: '800',
      size: '650 MB',
      format: 'CSV, Excel'
    },
    {
      category: 'Sediment Data',
      period: '1970-2024',
      stations: '450',
      size: '420 MB',
      format: 'CSV, Excel'
    },
  ];

  const annualStatistics = [
    { year: '2023', avgRainfall: '1,162 mm', surfaceWater: '1,869 BCM', groundwater: '433 BCM' },
    { year: '2022', avgRainfall: '1,094 mm', surfaceWater: '1,825 BCM', groundwater: '428 BCM' },
    { year: '2021', avgRainfall: '1,243 mm', surfaceWater: '1,952 BCM', groundwater: '441 BCM' },
    { year: '2020', avgRainfall: '1,158 mm', surfaceWater: '1,887 BCM', groundwater: '436 BCM' },
    { year: '2019', avgRainfall: '1,021 mm', surfaceWater: '1,763 BCM', groundwater: '412 BCM' },
    { year: '2018', avgRainfall: '1,189 mm', surfaceWater: '1,921 BCM', groundwater: '438 BCM' },
    { year: '2017', avgRainfall: '1,125 mm', surfaceWater: '1,856 BCM', groundwater: '431 BCM' },
    { year: '2016', avgRainfall: '987 mm', surfaceWater: '1,698 BCM', groundwater: '398 BCM' },
  ];

  const [selectedState, setSelectedState] = useState(rainfallRegions[0]?.state ?? '');
  const [selectedDistrict, setSelectedDistrict] = useState(rainfallRegions[0]?.districts[0] ?? '');
  const [selectedYear, setSelectedYear] = useState(rainfallYears[0] ?? new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(rainfallMonths[0] ?? 'January');

  const rainfallCoverageLabel = `${rainfallRegions.length} states · ${rainfallDistrictCount} districts · ${rainfallMonths.length} monsoon months`;

  const availableDistricts = useMemo(
    () => rainfallRegions.find((region) => region.state === selectedState)?.districts ?? [],
    [selectedState]
  );

  const filteredRainfall = useMemo(
    () =>
      rainfallData.filter(
        (record) =>
          record.state === selectedState &&
          record.district === selectedDistrict &&
          record.year === selectedYear &&
          record.month === selectedMonth
      ),
    [selectedState, selectedDistrict, selectedYear, selectedMonth]
  );

  const annualProfile = useMemo(
    () =>
      rainfallData
        .filter(
          (record) =>
            record.state === selectedState &&
            record.district === selectedDistrict &&
            record.year === selectedYear
        )
        .sort(
          (a, b) => monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month)
        ),
    [selectedState, selectedDistrict, selectedYear]
  );

  const highlightedRecord = filteredRainfall[0];

  const handleStateChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const nextState = event.target.value;
    setSelectedState(nextState);
    const fallbackDistrict = rainfallRegions.find((region) => region.state === nextState)?.districts[0] ?? '';
    setSelectedDistrict(fallbackDistrict);
  };

  const handleDistrictChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedDistrict(event.target.value);
  };

  const handleYearChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(Number(event.target.value));
  };

  const handleMonthChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(event.target.value);
  };

  const handleDownloadCsv = () => {
    if (annualProfile.length === 0) {
      return;
    }

    const escapeCsvValue = (value: string | number) => {
      const stringValue = String(value ?? '');
      return `"${stringValue.replace(/"/g, '""')}"`;
    };

    const header = ['State', 'District', 'Year', 'Month', 'Rainfall (mm)', 'Deviation (%)', 'Data Source'];
    const rows = annualProfile.map((record) => [
      record.state,
      record.district,
      record.year,
      record.month,
      record.rainfallMm,
      record.deviationPct,
      record.dataSource
    ]);

    const csvContent = [header, ...rows]
      .map((row) => row.map(escapeCsvValue).join(','))
      .join('\n');

    const fileName = `rainfall_${selectedState}_${selectedDistrict}_${selectedYear}.csv`
      .replace(/\s+/g, '_')
      .toLowerCase();

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-white mb-4">Historical Water Resource Data</h1>
          <p className="text-blue-100 max-w-3xl">
            Access decades of archived hydrological and meteorological data from across India
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="text-gray-600 mb-1 text-sm">Data Since</div>
            <div className="text-gray-900">1901</div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="text-gray-600 mb-1 text-sm">Total Records</div>
            <div className="text-gray-900">50M+</div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="text-gray-600 mb-1 text-sm">Data Categories</div>
            <div className="text-gray-900">12</div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="text-gray-600 mb-1 text-sm">Archive Size</div>
            <div className="text-gray-900">12.5 TB</div>
          </div>
        </div>

        {/* Rainfall Query */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-gray-900 mb-2 mt-1 px-1">Rainfall Archive Explorer</h2>
              <p className="text-gray-600 text-sm">
                Drill down to district-level rainfall totals recorded by certified hydromet stations in India.
              </p>
            </div>
            <div className="text-sm text-gray-500">{rainfallCoverageLabel}</div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label className="block text-gray-700 mb-2 text-sm">State</label>
              <select
                value={selectedState}
                onChange={handleStateChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {rainfallRegions.map((region) => (
                  <option key={region.state} value={region.state}>
                    {region.state}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-2 text-sm">District</label>
              <select
                value={selectedDistrict}
                onChange={handleDistrictChange}
                disabled={availableDistricts.length === 0}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {availableDistricts.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-2 text-sm">Year</label>
              <select
                value={selectedYear}
                onChange={handleYearChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {rainfallYears.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-2 text-sm">Month</label>
              <select
                value={selectedMonth}
                onChange={handleMonthChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {rainfallMonths.map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </div>
          </div>

         
          <div className="grid md:grid-cols-3 gap-y-12 gap-x-10 mt-14 pt-4 mb-4">
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
              <div className="text-xs font-semibold uppercase tracking-wide text-blue-700 mb-1">
                Rainfall total
              </div>
              <div className="text-3xl text-blue-900">
                {highlightedRecord ? `${highlightedRecord.rainfallMm} mm` : '—'}
              </div>
              <p className="text-xs text-blue-700 mt-1">Measured volume for selected month</p>
            </div>

            <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4">
              <div className="text-xs font-semibold uppercase tracking-wide text-emerald-700 mb-1">
                Deviation
              </div>
              <div className="text-3xl text-emerald-900">
                {highlightedRecord
                  ? `${highlightedRecord.deviationPct >= 0 ? '+' : ''}${highlightedRecord.deviationPct}%`
                  : '—'}
              </div>
              <p className="text-xs text-emerald-700 mt-1">Vs. long-period average</p>
            </div>

            <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">
              <div className="text-xs font-semibold uppercase tracking-wide text-gray-600 mb-1">
                Data source
              </div>
              <div className="text-base text-gray-900">
                {highlightedRecord ? highlightedRecord.dataSource : 'Not available'}
              </div>
              <p className="text-xs text-gray-500 mt-1">Field instrumentation for this record</p>
            </div>
          </div>



          <div className="mt-6 border border-gray-100 rounded-xl overflow-hidden">
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-100 text-sm text-gray-600 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <span>
                Monthly breakdown for {selectedDistrict}, {selectedState} ({selectedYear})
              </span>
              <button
                type="button"
                onClick={handleDownloadCsv}
                disabled={annualProfile.length === 0}
                className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 disabled:text-gray-400 disabled:hover:text-gray-400 disabled:cursor-not-allowed"
              >
                <Download className="w-4 h-4" />
                Download CSV
              </button>
            </div>

            {annualProfile.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-white">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Month</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Rainfall (mm)</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Deviation</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Source</th>
                    </tr>
                  </thead>
                  <tbody>
                    {annualProfile.map((record) => {
                      const isSelected = record.month === selectedMonth;
                      return (
                        <tr
                          key={`${record.month}-${record.year}-${record.district}`}
                          className={`border-b last:border-0 transition-colors ${isSelected ? 'bg-blue-50' : 'hover:bg-gray-50'
                            }`}
                        >
                          <td className="px-6 py-3 text-gray-900">{record.month}</td>
                          <td className="px-6 py-3 text-gray-700">{record.rainfallMm} mm</td>
                          <td
                            className={`px-6 py-3 font-medium ${record.deviationPct >= 0 ? 'text-emerald-600' : 'text-rose-600'
                              }`}
                          >
                            {record.deviationPct >= 0 ? `+${record.deviationPct}%` : `${record.deviationPct}%`}
                          </td>
                          <td className="px-6 py-3 text-gray-500 text-sm">{record.dataSource}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="px-6 py-4 text-sm text-gray-500">
                No rainfall records are available for this selection. Try another year or state.
              </div>
            )}
          </div>
        </div>

        {/* Available Datasets */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <h2 className="text-gray-900">Available Historical Datasets</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-gray-700">Data Category</th>
                  <th className="px-6 py-3 text-left text-gray-700">Time Period</th>
                  <th className="px-6 py-3 text-left text-gray-700">Stations/Points</th>
                  <th className="px-6 py-3 text-left text-gray-700">Dataset Size</th>
                  <th className="px-6 py-3 text-left text-gray-700">Format</th>
                  <th className="px-6 py-3 text-left text-gray-700">Download</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {datasetCategories.map((dataset, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-gray-900">{dataset.category}</td>
                    <td className="px-6 py-4 text-gray-600">{dataset.period}</td>
                    <td className="px-6 py-4 text-gray-600">{dataset.stations}</td>
                    <td className="px-6 py-4 text-gray-600">{dataset.size}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        {dataset.format}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700">
                        <Download className="w-4 h-4" />
                        <span className="text-sm">Get</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Annual Statistics */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <h2 className="text-gray-900">Annual Water Resource Statistics</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-gray-700">Year</th>
                  <th className="px-6 py-3 text-left text-gray-700">Average Rainfall</th>
                  <th className="px-6 py-3 text-left text-gray-700">Surface Water Resources</th>
                  <th className="px-6 py-3 text-left text-gray-700">Groundwater Resources</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {annualStatistics.map((stat, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-gray-900">{stat.year}</td>
                    <td className="px-6 py-4 text-gray-600">{stat.avgRainfall}</td>
                    <td className="px-6 py-4 text-gray-600">{stat.surfaceWater}</td>
                    <td className="px-6 py-4 text-gray-600">{stat.groundwater}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Data Access Information */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <div className="flex items-start gap-3 mb-4">
              <Calendar className="w-6 h-6 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="text-gray-900 mb-2">Data Access Policy</h3>
                <p className="text-gray-700 text-sm">
                  Most historical datasets are freely available for research and educational purposes. Commercial use requires prior approval and proper citation of the data source.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-xl p-6">
            <div className="flex items-start gap-3 mb-4">
              <Database className="w-6 h-6 text-green-600 flex-shrink-0" />
              <div>
                <h3 className="text-gray-900 mb-2">Bulk Data Requests</h3>
                <p className="text-gray-700 text-sm mb-3">
                  For large-scale data requirements or custom datasets spanning multiple parameters, please submit a formal data request form.
                </p>
                <button className="text-green-600 hover:text-green-700 text-sm">
                  Submit Request →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
