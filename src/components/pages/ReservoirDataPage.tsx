import { useCallback } from 'react';
import { PageType } from '../../App';
import { Download, TrendingUp, TrendingDown } from 'lucide-react';
import { utils, writeFile } from 'xlsx';

interface ReservoirDataPageProps {
  onNavigate: (page: PageType) => void;
}

export function ReservoirDataPage({ onNavigate }: ReservoirDataPageProps) {
  const reservoirData = [
    {
      name: 'Bhakra Dam',
      river: 'Sutlej',
      state: 'Himachal Pradesh',
      capacity: '9,340 MCM',
      current: '7,452 MCM',
      percentage: '79.8%',
      trend: 'down',
      lastYear: '82.5%'
    },
    {
      name: 'Sardar Sarovar',
      river: 'Narmada',
      state: 'Gujarat',
      capacity: '9,500 MCM',
      current: '8,265 MCM',
      percentage: '87.0%',
      trend: 'up',
      lastYear: '75.2%'
    },
    {
      name: 'Hirakud',
      river: 'Mahanadi',
      state: 'Odisha',
      capacity: '8,136 MCM',
      current: '6,509 MCM',
      percentage: '80.0%',
      trend: 'down',
      lastYear: '78.8%'
    },
    {
      name: 'Nagarjuna Sagar',
      river: 'Krishna',
      state: 'Telangana',
      capacity: '11,472 MCM',
      current: '9,178 MCM',
      percentage: '80.0%',
      trend: 'up',
      lastYear: '68.5%'
    },
    {
      name: 'Indira Sagar',
      river: 'Narmada',
      state: 'Madhya Pradesh',
      capacity: '12,220 MCM',
      current: '10,354 MCM',
      percentage: '84.7%',
      trend: 'up',
      lastYear: '79.3%'
    },
    {
      name: 'Srisailam',
      river: 'Krishna',
      state: 'Andhra Pradesh',
      capacity: '8,722 MCM',
      current: '6,978 MCM',
      percentage: '80.0%',
      trend: 'down',
      lastYear: '82.1%'
    },
    {
      name: 'Tehri Dam',
      river: 'Bhagirathi',
      state: 'Uttarakhand',
      capacity: '3,540 MCM',
      current: '2,655 MCM',
      percentage: '75.0%',
      trend: 'down',
      lastYear: '77.8%'
    },
    {
      name: 'Rihand Dam',
      river: 'Rihand',
      state: 'Uttar Pradesh',
      capacity: '10,608 MCM',
      current: '8,486 MCM',
      percentage: '80.0%',
      trend: 'up',
      lastYear: '71.4%'
    },
  ];

  const regionalSummary = [
    { region: 'Northern', total: '32,450 MCM', current: '26,782 MCM', percentage: '82.5%' },
    { region: 'Eastern', total: '28,890 MCM', current: '22,312 MCM', percentage: '77.2%' },
    { region: 'Western', total: '45,670 MCM', current: '37,391 MCM', percentage: '81.9%' },
    { region: 'Southern', total: '52,340 MCM', current: '41,872 MCM', percentage: '80.0%' },
    { region: 'Central', total: '38,920 MCM', current: '31,936 MCM', percentage: '82.1%' },
  ];

  const handleExportTable = useCallback(() => {
    if (!reservoirData.length) return;

    const rows = reservoirData.map((reservoir, index) => ({
      '#': index + 1,
      'Reservoir Name': reservoir.name,
      River: reservoir.river,
      State: reservoir.state,
      'Capacity (MCM)': reservoir.capacity,
      'Current Storage (MCM)': reservoir.current,
      '% Filled': reservoir.percentage,
      'Trend Direction': reservoir.trend,
      'Last Year %': reservoir.lastYear,
    }));

    const worksheet = utils.json_to_sheet(rows);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, 'Major Reservoirs');

    const timestamp = new Date().toISOString().split('T')[0];
    writeFile(workbook, `major-reservoirs-${timestamp}.xlsx`);
  }, [reservoirData]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-white mb-4">Reservoir Storage Data</h1>
          <p className="text-blue-100 max-w-3xl">
            Real-time monitoring of major reservoirs across India with current storage levels and trends
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="text-gray-600 mb-1 text-sm">Total Reservoirs</div>
            <div className="text-gray-900">150</div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="text-gray-600 mb-1 text-sm">Total Capacity</div>
            <div className="text-gray-900">253.4 BCM</div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="text-gray-600 mb-1 text-sm">Current Storage</div>
            <div className="text-gray-900">203.5 BCM</div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="text-gray-600 mb-1 text-sm">% of Capacity</div>
            <div className="text-green-600">80.3%</div>
          </div>
        </div>

        {/* Regional Summary */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <h2 className="text-gray-900">Regional Summary</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-gray-700">Region</th>
                  <th className="px-6 py-3 text-left text-gray-700">Total Capacity</th>
                  <th className="px-6 py-3 text-left text-gray-700">Current Storage</th>
                  <th className="px-6 py-3 text-left text-gray-700">% Filled</th>
                  <th className="px-6 py-3 text-left text-gray-700">Visual</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {regionalSummary.map((region, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-gray-900">{region.region}</td>
                    <td className="px-6 py-4 text-gray-600">{region.total}</td>
                    <td className="px-6 py-4 text-gray-600">{region.current}</td>
                    <td className="px-6 py-4 text-gray-900">{region.percentage}</td>
                    <td className="px-6 py-4">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: region.percentage }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Major Reservoirs Data */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-gray-900">Major Reservoirs (Live Data)</h2>
            <button
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
              onClick={handleExportTable}
            >
              <Download className="w-4 h-4" />
              Export Data
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-gray-700">Reservoir Name</th>
                  <th className="px-6 py-3 text-left text-gray-700">River</th>
                  <th className="px-6 py-3 text-left text-gray-700">State</th>
                  <th className="px-6 py-3 text-left text-gray-700">Capacity (MCM)</th>
                  <th className="px-6 py-3 text-left text-gray-700">Current (MCM)</th>
                  <th className="px-6 py-3 text-left text-gray-700">% Filled</th>
                  <th className="px-6 py-3 text-left text-gray-700">Trend</th>
                  <th className="px-6 py-3 text-left text-gray-700">Last Year</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {reservoirData.map((reservoir, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-gray-900">{reservoir.name}</td>
                    <td className="px-6 py-4 text-gray-600">{reservoir.river}</td>
                    <td className="px-6 py-4 text-gray-600">{reservoir.state}</td>
                    <td className="px-6 py-4 text-gray-600">{reservoir.capacity}</td>
                    <td className="px-6 py-4 text-gray-900">{reservoir.current}</td>
                    <td className="px-6 py-4">
                      <span className={`${
                        parseFloat(reservoir.percentage) >= 80 ? 'text-green-600' :
                        parseFloat(reservoir.percentage) >= 60 ? 'text-blue-600' :
                        parseFloat(reservoir.percentage) >= 40 ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>
                        {reservoir.percentage}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {reservoir.trend === 'up' ? (
                        <TrendingUp className="w-5 h-5 text-green-500" />
                      ) : (
                        <TrendingDown className="w-5 h-5 text-red-500" />
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-600">{reservoir.lastYear}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Note */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-gray-900 mb-2">Data Update Information</h3>
          <p className="text-gray-700 text-sm">
            Data is updated daily at 8:00 AM IST. MCM = Million Cubic Meters. The percentage values indicate the current storage as a percentage of the total live storage capacity. Historical data for the past 10 years is available for download.
          </p>
        </div>
      </div>
    </div>
  );
}