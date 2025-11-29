import { PageType } from '../../App';
import { Map, Download, Info } from 'lucide-react';

interface BasinMapsPageProps {
  onNavigate: (page: PageType) => void;
}

export function BasinMapsPage({ onNavigate }: BasinMapsPageProps) {
  const riverBasins = [
    {
      name: 'Ganga Basin',
      area: '8,61,452 km²',
      states: 11,
      tributaries: 'Yamuna, Gomti, Gandak, Kosi, Son',
      avgRainfall: '1,100 mm',
      population: '45 Cr'
    },
    {
      name: 'Brahmaputra Basin',
      area: '1,94,413 km²',
      states: 4,
      tributaries: 'Subansiri, Manas, Teesta, Dibang',
      avgRainfall: '2,300 mm',
      population: '6.5 Cr'
    },
    {
      name: 'Godavari Basin',
      area: '3,12,812 km²',
      states: 6,
      tributaries: 'Pranhita, Indravati, Manjira, Penganga',
      avgRainfall: '1,100 mm',
      population: '7.5 Cr'
    },
    {
      name: 'Krishna Basin',
      area: '2,58,948 km²',
      states: 4,
      tributaries: 'Bhima, Tungabhadra, Koyna, Musi',
      avgRainfall: '784 mm',
      population: '7 Cr'
    },
    {
      name: 'Narmada Basin',
      area: '98,796 km²',
      states: 3,
      tributaries: 'Hiran, Tawa, Shakkar, Dudhi',
      avgRainfall: '1,178 mm',
      population: '2.5 Cr'
    },
    {
      name: 'Mahanadi Basin',
      area: '1,41,589 km²',
      states: 5,
      tributaries: 'Seonath, Hasdeo, Mand, Ib, Ong',
      avgRainfall: '1,450 mm',
      population: '4 Cr'
    },
    {
      name: 'Cauvery Basin',
      area: '87,900 km²',
      states: 4,
      tributaries: 'Hemavati, Kabini, Bhavani, Arkavathy',
      avgRainfall: '1,200 mm',
      population: '4.5 Cr'
    },
    {
      name: 'Indus Basin (India)',
      area: '3,21,289 km²',
      states: 5,
      tributaries: 'Sutlej, Beas, Ravi, Chenab, Jhelum',
      avgRainfall: '550 mm',
      population: '4 Cr'
    },
  ];

  const mapCategories = [
    { name: 'Basin Boundary Maps', count: 20, format: 'PDF, SHP' },
    { name: 'Drainage Network', count: 20, format: 'GIS, KML' },
    { name: 'Sub-basin Maps', count: 89, format: 'PDF, GIS' },
    { name: 'Catchment Areas', count: 150, format: 'SHP, GeoJSON' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-white mb-4">River Basin Maps & Information</h1>
          <p className="text-blue-100 max-w-3xl">
            Comprehensive information and downloadable maps of major river basins in India
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="text-gray-600 mb-1 text-sm">Major Basins</div>
            <div className="text-gray-900">20</div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="text-gray-600 mb-1 text-sm">Total Area</div>
            <div className="text-gray-900">32.8 L km²</div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="text-gray-600 mb-1 text-sm">Sub-basins</div>
            <div className="text-gray-900">89</div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="text-gray-600 mb-1 text-sm">Maps Available</div>
            <div className="text-gray-900">279</div>
          </div>
        </div>

        {/* Map Categories */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {mapCategories.map((category, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Map className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-gray-900 mb-2">{category.name}</h3>
              <p className="text-gray-600 text-sm mb-2">{category.count} maps</p>
              <p className="text-blue-600 text-xs">{category.format}</p>
            </div>
          ))}
        </div>

        {/* Basin Information Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <h2 className="text-gray-900">Major River Basins of India</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-gray-700">Basin Name</th>
                  <th className="px-6 py-3 text-left text-gray-700">Catchment Area</th>
                  <th className="px-6 py-3 text-left text-gray-700">States Covered</th>
                  <th className="px-6 py-3 text-left text-gray-700">Major Tributaries</th>
                  <th className="px-6 py-3 text-left text-gray-700">Avg Rainfall</th>
                  <th className="px-6 py-3 text-left text-gray-700">Population</th>
                  <th className="px-6 py-3 text-left text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {riverBasins.map((basin, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-gray-900">{basin.name}</td>
                    <td className="px-6 py-4 text-gray-600">{basin.area}</td>
                    <td className="px-6 py-4 text-gray-600">{basin.states}</td>
                    <td className="px-6 py-4 text-gray-600 text-sm max-w-xs">{basin.tributaries}</td>
                    <td className="px-6 py-4 text-gray-600">{basin.avgRainfall}</td>
                    <td className="px-6 py-4 text-gray-600">{basin.population}</td>
                    <td className="px-6 py-4">
                      <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm">
                        <Download className="w-4 h-4" />
                        Map
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Download Section */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-gray-900 mb-4">Download Complete Atlas</h3>
            <p className="text-gray-600 text-sm mb-4">
              River Basin Atlas of India (2024 Edition) - Comprehensive compilation of all major and medium river basins with detailed maps and statistics.
            </p>
            <button className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Download className="w-5 h-5" />
              Download Atlas (125 MB)
            </button>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-gray-900 mb-2">GIS Data Access</h3>
                <p className="text-gray-700 text-sm mb-3">
                  High-resolution GIS shapefiles, contour data, and digital elevation models are available for research and planning purposes.
                </p>
                <button className="text-blue-600 hover:text-blue-700 text-sm">
                  Request GIS Data →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
