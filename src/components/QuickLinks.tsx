import { Droplets, FileText, AlertCircle, Users, TrendingUp, Calendar } from 'lucide-react';
import { PageType } from '../App';

interface QuickLinksProps {
  onNavigate: (page: PageType) => void;
}

export function QuickLinks({ onNavigate }: QuickLinksProps) {
  const links = [
    { icon: Droplets, title: 'Water Data', description: 'Real-time data & statistics', color: 'bg-blue-500', page: 'water-data' as PageType },
    { icon: FileText, title: 'Tenders', description: 'Active tenders & contracts', color: 'bg-green-500', page: 'tenders' as PageType },
    { icon: AlertCircle, title: 'Flood Alerts', description: 'Current flood warnings', color: 'bg-red-500', page: 'flood-alerts' as PageType },
    { icon: Users, title: 'Careers', description: 'Job opportunities', color: 'bg-purple-500', page: 'careers' as PageType },
    { icon: TrendingUp, title: 'Projects', description: 'Ongoing initiatives', color: 'bg-orange-500', page: 'projects' as PageType },
    { icon: Calendar, title: 'Events', description: 'Upcoming events', color: 'bg-teal-500', page: 'events' as PageType },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 -mt-10 relative z-10">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {links.map((link, index) => (
          <button
            key={index}
            onClick={() => {
              onNavigate(link.page);
              window.scrollTo(0, 0);
            }}
            className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all hover:-translate-y-1 text-center group"
          >
            <div className={`${link.color} w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
              <link.icon className="w-6 h-6 text-white" />
            </div>
            <div className="text-gray-900 dark:text-white">{link.title}</div>
            <div className="text-gray-500 dark:text-gray-400 text-xs mt-1">{link.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
}