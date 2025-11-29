import { useState } from 'react';
import { Clock, ArrowRight, Megaphone } from 'lucide-react';
import { PageType } from '../App';
import { latestUpdates, LatestUpdatePageSlug } from '../data/latestUpdates';
import { GuidelinesNoticePage } from './pages/updates/GuidelinesNoticePage';
import { DamSafetyTenderPage } from './pages/updates/DamSafetyTenderPage';
import { WaterStatisticsReportPage } from './pages/updates/WaterStatisticsReportPage';
import { FloodForecastCircularPage } from './pages/updates/FloodForecastCircularPage';
import { NationalWaterConferencePage } from './pages/updates/NationalWaterConferencePage';

interface LatestUpdatesProps {
  onNavigate?: (page: PageType) => void;
}

export function LatestUpdates({ onNavigate }: LatestUpdatesProps) {
  const [selectedUpdate, setSelectedUpdate] = useState<LatestUpdatePageSlug | null>(null);
  const safeNavigate: (page: PageType) => void = onNavigate ?? (() => {});

  const handleUpdateClick = (updatePage: LatestUpdatePageSlug) => {
    setSelectedUpdate(updatePage);
    setTimeout(() => {
      document.getElementById('home-latest-update-detail')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  const openFullPage = (page: PageType) => {
    if (!onNavigate) {
      return;
    }
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderSelectedUpdate = () => {
    if (!selectedUpdate) {
      return null;
    }
    switch (selectedUpdate) {
      case 'notice-guidelines-2024':
        return <GuidelinesNoticePage onNavigate={safeNavigate} />;
      case 'tender-dam-safety-phase-2':
        return <DamSafetyTenderPage onNavigate={safeNavigate} />;
     
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-gray-900 dark:text-white mb-2">Latest Updates</h2>
          <p className="text-gray-600 dark:text-gray-300">Stay informed with our latest announcements and publications</p>
        </div>
        <button
          className="hidden md:flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          type="button"
          onClick={() => {
            if (!onNavigate) {
              return;
            }
            onNavigate('latest-updates');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          View All
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {latestUpdates.map((update, index) => (
          <button
            type="button"
            key={index}
            onClick={() => handleUpdateClick(update.page)}
            className="w-full text-left p-4 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors border-b border-gray-200 dark:border-slate-700 last:border-b-0 group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:focus-visible:ring-blue-400"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                  <Megaphone className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="inline-block px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs rounded">
                    {update.type}
                  </span>
                  {update.isNew && (
                    <span className="inline-block px-2 py-1 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 text-xs rounded">
                      New
                    </span>
                  )}
                </div>
                <h3 className="text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-1">
                  {update.title}
                </h3>
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
                  <Clock className="w-4 h-4" />
                  <span>{update.date}</span>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 dark:text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all flex-shrink-0" />
            </div>
          </button>
        ))}
      </div>

      {selectedUpdate && (
        <div id="home-latest-update-detail" className="mt-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Now viewing</p>
              <h3 className="text-gray-900 dark:text-white">
                {latestUpdates.find((item) => item.page === selectedUpdate)?.title ?? 'Update Details'}
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setSelectedUpdate(null)}
                className="px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-200 text-sm hover:bg-gray-50 dark:hover:bg-slate-700"
              >
                Close Preview
              </button>
              {onNavigate && (
                <button
                  type="button"
                  onClick={() => openFullPage(selectedUpdate)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-lg text-sm hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
                >
                  Open Full Page
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 overflow-hidden">
            {renderSelectedUpdate()}
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => {
          if (!onNavigate) {
            return;
          }
          openFullPage('latest-updates');
        }}
        className="md:hidden mt-4 w-full flex items-center justify-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors py-3"
      >
        View All Updates
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
