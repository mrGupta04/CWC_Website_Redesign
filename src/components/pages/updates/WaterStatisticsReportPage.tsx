import { ArrowLeft, BarChart2, FilePieChart, TrendingUp } from 'lucide-react';
import { PageType } from '../../../App';
import { updatesBaseClasses } from './updateStyles';

interface WaterStatisticsReportPageProps {
  onNavigate: (page: PageType) => void;
}

export function WaterStatisticsReportPage({ onNavigate }: WaterStatisticsReportPageProps) {
  const keyInsights = [
    {
      title: 'Surface Storage Status',
      value: '86% of live capacity',
      detail: 'Above decadal average by 9 percentage points owing to robust monsoon inflows.'
    },
    {
      title: 'Groundwater Draft',
      value: '245 BCM',
      detail: 'Moderate decline of 3% with notable stress pockets in north-western states.'
    },
    {
      title: 'Drinking Water Coverage',
      value: '96% rural households',
      detail: '6.3 million new Functional Household Tap Connections during FY24.'
    }
  ];

  const thematicChapters = [
    'Climate diagnostics and variability analysis at basin scale',
    'Demand projections for irrigation, industry, and urban utilities through 2035',
    'Performance benchmarking of major and medium irrigation projects',
    'Digital twins and remote sensing use cases for asset management',
    'Gender and inclusion indicators linked to water service delivery'
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
            <p className="uppercase tracking-[0.15em] text-emerald-200 text-xs sm:text-sm font-medium">Report · 15 Nov 2024</p>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight max-w-4xl">Annual Report on Water Statistics 2023-24</h1>
            <p className="text-emerald-100 text-base sm:text-lg max-w-3xl leading-relaxed">
              An evidence-based assessment covering hydrology, supply-demand trends, infrastructure performance,
              and SDG 6 progress. The report spans 260 pages, 14 thematic chapters, and 120+ visual analytics.
            </p>
          </div>

          <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <div className="group bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="text-emerald-200 text-xs sm:text-sm font-medium mb-2">Pages</div>
              <div className="text-white text-base sm:text-lg font-semibold">264</div>
            </div>
            <div className="group bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="text-emerald-200 text-xs sm:text-sm font-medium mb-2">Release</div>
              <div className="text-white text-base sm:text-lg font-semibold">15 Nov 2024 · Digital & Print</div>
            </div>
            <div className="group bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl sm:col-span-2 lg:col-span-1">
              <div className="text-emerald-200 text-xs sm:text-sm font-medium mb-2">Data Cut-off</div>
              <div className="text-white text-base sm:text-lg font-semibold">30 Sep 2024</div>
            </div>
          </div>
        </div>
      </div>

      <div className={`${updatesBaseClasses.mainWrapper} box-border`}>
        <section className={`${updatesBaseClasses.surfaceCard} group overflow-hidden`}>
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 bg-emerald-100 rounded-lg group-hover:bg-emerald-600 transition-colors duration-300">
              <FilePieChart className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600 group-hover:text-white transition-colors duration-300" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Key Insights</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {keyInsights.map((insight, index) => (
              <div key={index} className="group/card border-2 border-emerald-100 hover:border-emerald-400 rounded-xl p-5 sm:p-6 bg-gradient-to-br from-emerald-50 to-transparent hover:shadow-xl hover:shadow-emerald-100/50 transition-all duration-300 hover:-translate-y-1">
                <p className="text-xs sm:text-sm text-emerald-600 font-semibold mb-3">{insight.title}</p>
                <p className="text-gray-900 text-2xl sm:text-3xl font-bold mb-3 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">{insight.value}</p>
                <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">{insight.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={`${updatesBaseClasses.surfaceCard} group overflow-hidden`}>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-emerald-100 rounded-lg group-hover:bg-emerald-600 transition-colors duration-300">
              <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600 group-hover:text-white transition-colors duration-300" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Thematic Coverage</h2>
          </div>
          <ul className="space-y-3 sm:space-y-4">
            {thematicChapters.map((chapter, index) => (
              <li key={index} className="flex items-start gap-3 text-gray-700 text-sm sm:text-base leading-relaxed">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs font-semibold mt-0.5">{index + 1}</span>
                <span>{chapter}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className={updatesBaseClasses.gradientCallout}>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Download Options</h2>
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mb-6">
            <button className="group inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl text-sm sm:text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105" type="button">
              <BarChart2 className="w-4 h-4 sm:w-5 sm:h-5 group-hover:animate-bounce" />
              Full Report (PDF)
            </button>
            <button className="group inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 bg-white hover:bg-emerald-50 border-2 border-emerald-300 text-emerald-700 hover:text-emerald-800 rounded-xl text-sm sm:text-base font-semibold transition-all duration-300 hover:scale-105" type="button">
              <BarChart2 className="w-4 h-4 sm:w-5 sm:h-5 group-hover:animate-bounce" />
              Data Tables (XLSX)
            </button>
            <button className="group inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 bg-white hover:bg-emerald-50 border-2 border-emerald-300 text-emerald-700 hover:text-emerald-800 rounded-xl text-sm sm:text-base font-semibold transition-all duration-300 hover:scale-105" type="button">
              <BarChart2 className="w-4 h-4 sm:w-5 sm:h-5 group-hover:animate-bounce" />
              Highlights (10-page)
            </button>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-emerald-200">
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-emerald-700">For customized state-level extracts:</span> email nwic-data@gov.in with subject line "WSR 2023-24 custom request".
            </p>
          </div>
        </section>

        <section className={`${updatesBaseClasses.surfaceCard} group xl:p-12 my-6 sm:my-8 lg:my-10 mx-2 sm:mx-4 lg:mx-6 overflow-hidden`}>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8">Key Highlights</h2>
          <div className="space-y-6 sm:space-y-8 lg:space-y-10">
            <div className="bg-gradient-to-br from-emerald-50 to-transparent border-l-4 border-emerald-500 rounded-r-xl p-5 sm:p-6 lg:p-8 my-4 sm:my-5 lg:my-6 mx-2 sm:mx-3 lg:mx-4 hover:shadow-lg transition-all duration-300">
              <h3 className="text-base sm:text-lg font-bold text-emerald-900 mb-3 sm:mb-4">Policy Alignment</h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed px-2 sm:px-3 lg:px-4">
                Project appraisals must include climate-screening matrices, socio-economic scorecards, and digital twin readiness checks.
              </p>
            </div>

            <div className="bg-gradient-to-br from-teal-50 to-transparent border-l-4 border-teal-500 rounded-r-xl p-5 sm:p-6 lg:p-8 my-4 sm:my-5 lg:my-6 mx-2 sm:mx-3 lg:mx-4 hover:shadow-lg transition-all duration-300">
              <h3 className="text-base sm:text-lg font-bold text-teal-900 mb-3 sm:mb-4">Financing Structure</h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed px-2 sm:px-3 lg:px-4">
                Access to the Modernization Incentive Pool (MIP) now requires 30% state contribution and audited O&M trackers.
              </p>
            </div>

            <div className="bg-gradient-to-br from-cyan-50 to-transparent border-l-4 border-cyan-500 rounded-r-xl p-5 sm:p-6 lg:p-8 my-4 sm:my-5 lg:my-6 mx-2 sm:mx-3 lg:mx-4 hover:shadow-lg transition-all duration-300">
              <h3 className="text-base sm:text-lg font-bold text-cyan-900 mb-3 sm:mb-4">Data Governance</h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed px-2 sm:px-3 lg:px-4">
                All telemetry nodes must push hourly datasets to the National Water Informatics Centre through secured APIs.
              </p>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-transparent border-l-4 border-emerald-600 rounded-r-xl p-5 sm:p-6 lg:p-8 my-4 sm:my-5 lg:my-6 mx-2 sm:mx-3 lg:mx-4 hover:shadow-lg transition-all duration-300">
              <h3 className="text-base sm:text-lg font-bold text-emerald-900 mb-3 sm:mb-4">Capacity Building</h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed px-2 sm:px-3 lg:px-4">
                Mandatory training calendar for state engineers on asset management, IoT diagnostics, and risk analytics.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
