import { useState } from 'react';
import { ArrowLeft, ArrowRight, Clock, Megaphone } from 'lucide-react';
import { PageType } from '../../App';
import { latestUpdates, LatestUpdatePageSlug } from '../../data/latestUpdates';
import { GuidelinesNoticePage } from './updates/GuidelinesNoticePage';
import { DamSafetyTenderPage } from './updates/DamSafetyTenderPage';
import { WaterStatisticsReportPage } from './updates/WaterStatisticsReportPage';
import { FloodForecastCircularPage } from './updates/FloodForecastCircularPage';
import { NationalWaterConferencePage } from './updates/NationalWaterConferencePage';

interface LatestUpdatesPageProps {
  onNavigate: (page: PageType) => void;
}

const updateSummaries: Record<LatestUpdatePageSlug, string> = {
  'notice-guidelines-2024': 'Harmonized planning and financing framework for FY 2025-26 submissions.',
  'tender-dam-safety-phase-2': 'EPC procurement for scaling the Dam Health Monitoring System across critical reservoirs.',
  'report-water-statistics-2024': 'Comprehensive hydrology datasets, SDG indicators, and infrastructure performance analytics.',
  'circular-flood-forecasting-2024': 'Unified SOP for telemetry operations and impact-based flood warnings before monsoon 2025.',
  'event-national-water-conference-2024': 'Flagship conference on resilient infrastructure, digital water, and community partnerships.'
};

export function LatestUpdatesPage({ onNavigate }: LatestUpdatesPageProps) {
  const [selectedUpdate, setSelectedUpdate] = useState<LatestUpdatePageSlug | null>(null);

  const openUpdateInline = (page: LatestUpdatePageSlug) => {
    setSelectedUpdate(page);
    setTimeout(() => {
      document.getElementById('latest-update-detail')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  const openUpdatePage = (page: LatestUpdatePageSlug) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderSelectedUpdate = () => {
    if (!selectedUpdate) {
      return null;
    }
    switch (selectedUpdate) {
      case 'notice-guidelines-2024':
        return <GuidelinesNoticePage onNavigate={onNavigate} />;
      case 'tender-dam-safety-phase-2':
        return <DamSafetyTenderPage onNavigate={onNavigate} />;
      case 'report-water-statistics-2024':
        return <WaterStatisticsReportPage onNavigate={onNavigate} />;
      case 'circular-flood-forecasting-2024':
        return <FloodForecastCircularPage onNavigate={onNavigate} />;
      case 'event-national-water-conference-2024':
        return <NationalWaterConferencePage onNavigate={onNavigate} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 text-blue-100 mb-6 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
          <p className="uppercase tracking-wide text-blue-200 text-sm mb-2">Updates · November 2024</p>
          <h1 className="text-white mb-4">Latest Announcements & Publications</h1>
          <p className="text-blue-100 max-w-3xl">
            Browse all notices, tenders, reports, circulars, and events in one place. Select any card to open the
            detailed update page with supporting documents, timelines, and next steps.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid gap-6">
          {latestUpdates.map((update, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-sm mb-2">
                    <span className="inline-flex items-center gap-2 px-2 py-1 bg-blue-50 text-blue-700 rounded">
                      <Megaphone className="w-4 h-4" />
                      {update.type}
                    </span>
                    {update.isNew && (
                      <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs">New</span>
                    )}
                  </div>
                  <h2 className="text-gray-900 mb-2">{update.title}</h2>
                  <p className="text-gray-600 text-sm">{updateSummaries[update.page]}</p>
                </div>
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <Clock className="w-4 h-4" />
                  <span>{update.date}</span>
                </div>
              </div>
              <div className="mt-6">
                <button
                  type="button"
                  onClick={() => openUpdateInline(update.page)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
                >
                  View Inline
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => openUpdatePage(update.page)}
                  className="inline-flex items-center gap-2 px-4 py-2 ml-3 bg-white border border-blue-200 text-blue-700 rounded-lg text-sm hover:bg-blue-50 transition-colors"
                >
                  Open Page
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {selectedUpdate && (
          <div id="latest-update-detail" className="mt-12">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-500">Now viewing</p>
                <h2 className="text-gray-900">
                  {latestUpdates.find((item) => item.page === selectedUpdate)?.title ?? 'Update Details'}
                </h2>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedUpdate(null)}
                  className="px-4 py-2 rounded-lg border border-gray-200 text-gray-700 text-sm hover:bg-gray-50"
                >
                  Close Preview
                </button>
                <button
                  type="button"
                  onClick={() => openUpdatePage(selectedUpdate)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
                >
                  Open Full Page
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {renderSelectedUpdate()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
