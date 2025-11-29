import { AlertTriangle, ArrowLeft, Radio } from 'lucide-react';
import { PageType } from '../../../App';
import { updatesBaseClasses } from './updateStyles';

interface FloodForecastCircularPageProps {
  onNavigate: (page: PageType) => void;
}

export function FloodForecastCircularPage({ onNavigate }: FloodForecastCircularPageProps) {
  const directives = [
    'Establish 24x7 forecast duty rosters with multi-agency escalation list.',
    'Adopt Ensemble Prediction System (EPS) inputs from IMD for rivers with catchment > 5,000 sq km.',
    'Issue bilingual alerts covering impact levels, vulnerable habitations, and recommended evacuation triggers.',
    'Sync reservoir regulation schedules through the Flood Forecast Coordination Portal (FFCP).'
  ];

  const techUpgrades = [
    {
      title: 'Telemetry Modernization',
      detail: 'Upgrade 432 level and rainfall stations to LTE/LoRaWAN with redundant power packs.'
    },
    {
      title: 'Model Calibration',
      detail: 'Quarterly validation of hydrodynamic models using updated bathymetry and satellite rainfall.'
    },
    {
      title: 'Public Alert Stack',
      detail: 'Integrate FFCP with NDMA’s CADMS for SMS, IVR, and social media dissemination.'
    }
  ];

  return (
    <div className={updatesBaseClasses.pageWrapper}>
      <div className={updatesBaseClasses.heroSection}>
        <div className={updatesBaseClasses.heroRadialOverlay} />
        <div className={updatesBaseClasses.heroGridOverlay} />
        
        <div className={`${updatesBaseClasses.heroContent} box-border`}>
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className={`${updatesBaseClasses.backButton} hover:gap-3`}
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span className="text-sm sm:text-base">Back to Latest Updates</span>
          </button>

          <div className="space-y-4">
            <p className="uppercase tracking-[0.15em] text-indigo-200 text-xs sm:text-sm font-medium">Circular · 12 Nov 2024</p>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight max-w-4xl">Updated Guidelines for Flood Forecasting Systems</h1>
            <p className="text-indigo-100 text-base sm:text-lg max-w-3xl leading-relaxed">
              The circular prescribes a unified operating procedure for issuing impact-based flood warnings,
              strengthening telemetry, and ensuring seamless data exchange between state and central agencies ahead of the 2025 monsoon.
            </p>
          </div>

          <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <div className="group bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="text-indigo-200 text-xs sm:text-sm font-medium mb-2">Circular No.</div>
              <div className="text-white text-base sm:text-lg font-semibold">FFS/2024/04</div>
            </div>
            <div className="group bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="text-indigo-200 text-xs sm:text-sm font-medium mb-2">Issued By</div>
              <div className="text-white text-base sm:text-lg font-semibold">Flood Forecast Monitoring Directorate</div>
            </div>
            <div className="group bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl sm:col-span-2 lg:col-span-1">
              <div className="text-indigo-200 text-xs sm:text-sm font-medium mb-2">Compliance Due</div>
              <div className="text-white text-base sm:text-lg font-semibold">31 Jan 2025</div>
            </div>
          </div>
        </div>
      </div>

      <div className={`${updatesBaseClasses.mainWrapper} box-border`}>
        <section className={`${updatesBaseClasses.surfaceCard} group overflow-hidden`}>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-indigo-100 rounded-lg group-hover:bg-indigo-600 transition-colors duration-300">
              <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600 group-hover:text-white transition-colors duration-300" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Operational Directives</h2>
          </div>
          <ul className="space-y-3 sm:space-y-4">
            {directives.map((item, index) => (
              <li key={index} className="flex items-start gap-3 text-gray-700 text-sm sm:text-base leading-relaxed">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-semibold mt-0.5">{index + 1}</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className={`${updatesBaseClasses.surfaceCard} group overflow-hidden`}>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-indigo-100 rounded-lg group-hover:bg-indigo-600 transition-colors duration-300">
              <Radio className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600 group-hover:text-white transition-colors duration-300" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Technology Upgrades</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {techUpgrades.map((upgrade, index) => (
              <div key={index} className="group/card border-2 border-gray-100 hover:border-indigo-300 rounded-xl p-5 hover:shadow-lg hover:shadow-indigo-100/50 transition-all duration-300 hover:-translate-y-1">
                <p className="text-sm font-semibold text-indigo-600 mb-2">{upgrade.title}</p>
                <p className="text-gray-700 text-sm leading-relaxed">{upgrade.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={updatesBaseClasses.gradientCallout}>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Reporting Format</h2>
          <p className="text-gray-700 text-sm sm:text-base mb-6 leading-relaxed">
            States must upload compliance status via the FFCP dashboard every fortnight. Include telemetry uptime, data latency metrics,
            mock-drill reports, and copies of alerts issued. Non-compliance will be escalated to the National Flood Forecasting Committee.
          </p>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-indigo-200">
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-indigo-700">For clarifications:</span> email ffs-support@cwc.gov.in referencing the circular number.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
