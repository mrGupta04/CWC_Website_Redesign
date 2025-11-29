import { Download, BarChart3, MapPin, Calendar } from 'lucide-react';
import { PageType } from '../App';

interface DataSectionProps {
  onNavigate: (page: PageType) => void;
}

export function DataSection({ onNavigate }: DataSectionProps) {
  const stats = [
    { label: 'Major Dams', value: '5,334', change: '+12 this year' },
    { label: 'River Basins', value: '20', change: 'Monitored' },
    { label: 'Observation Stations', value: '1,000+', change: 'Nationwide' },
    { label: 'Daily Reports', value: '365', change: 'Real-time data' },
  ];

  const dataCategories = [
    {
      icon: BarChart3,
      title: 'Reservoir Data',
      description: 'Current reservoir levels and storage capacity',
      link: 'View Data',
      page: 'reservoir-data' as PageType,
    },
    {
      icon: MapPin,
      title: 'Basin Maps',
      description: 'Interactive maps of river basins and catchments',
      link: 'Explore Maps',
      page: 'basin-maps' as PageType,
    },
    {
      icon: Calendar,
      title: 'Historical Data',
      description: 'Access archived water resource data',
      link: 'Browse Archive',
      page: 'historical-data' as PageType,
    },
    {
      icon: Download,
      title: 'Publications',
      description: 'Download reports and technical documents',
      link: 'Download',
      page: 'publications' as PageType,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-gray-900 dark:text-white mb-4">Data & Resources</h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Access comprehensive water resource data, reports, and analytics
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 text-white rounded-xl p-6 shadow-lg"
          >
            <div className="text-white mb-2">{stat.value}</div>
            <div className="text-blue-100 mb-1">{stat.label}</div>
            <div className="text-blue-200 text-xs">{stat.change}</div>
          </div>
        ))}
      </div>

      {/* Data Categories */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {dataCategories.map((category, index) => (
          <button
            key={index}
            onClick={() => {
              onNavigate(category.page);
              window.scrollTo(0, 0);
            }}
            className="bg-white dark:bg-slate-800 rounded-xl p-6 border-2 border-gray-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-lg transition-all cursor-pointer group text-left"
          >
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 dark:group-hover:bg-blue-600 transition-colors">
              <category.icon className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-gray-900 dark:text-white mb-2">{category.title}</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{category.description}</p>
            <span className="text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
              {category.link} →
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}