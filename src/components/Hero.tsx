import { ImageWithFallback } from './figma/ImageWithFallback';

import { PageType } from '../App';

interface HeroProps {
  onNavigate: (page: PageType) => void;
}

export function Hero({ onNavigate }: HeroProps) {
  return (
    <div className="relative bg-gradient-to-r from-blue-900 to-blue-700 dark:from-blue-950 dark:to-blue-900 text-white">
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <ImageWithFallback 
          src="https://images.unsplash.com/photo-1736781855659-19f11610ad00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYW0lMjB3YXRlciUyMGluZnJhc3RydWN0dXJlfGVufDF8fHx8MTc2Mzg5MDcwM3ww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Dam infrastructure"
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 py-20">
        <div className="max-w-3xl">
          <h2 className="text-white mb-4">
            Serving the Nation Through Water Resource Management
          </h2>
          <p className="text-blue-100 dark:text-blue-200 mb-8 max-w-2xl">
            The Central Water Commission is a premier technical organization in the field of Water Resources, 
            responsible for initiating, coordinating and furthering in consultation with the State Governments, 
            schemes for control, conservation and utilization of water resources.
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => onNavigate('projects')}
              className="bg-white dark:bg-slate-800 text-blue-900 dark:text-blue-100 px-6 py-3 rounded-lg hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors"
            >
              Explore Projects
            </button>
            <button 
              onClick={() => onNavigate('data-reports')}
              className="bg-transparent border-2 border-white dark:border-blue-200 text-white dark:text-blue-100 px-6 py-3 rounded-lg hover:bg-white hover:text-blue-900 dark:hover:bg-slate-800 dark:hover:text-blue-100 transition-colors"
            >
              View Reports
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}