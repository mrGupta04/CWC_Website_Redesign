import { ArrowLeft, Calendar, Download, Wrench } from 'lucide-react';
import { PageType } from '../../../App';
import { updatesBaseClasses } from './updateStyles';

interface DamSafetyTenderPageProps {
  onNavigate: (page: PageType) => void;
}

export function DamSafetyTenderPage({ onNavigate }: DamSafetyTenderPageProps) {
  const scopeItems = [
    'Installation of 126 vibration, seepage, and deformation sensors across 18 dams',
    'Integration with central Dam Health Monitoring System (DHMS) control room',
    'Development of predictive maintenance dashboards and alert workflows',
    'Training and hand-holding support for state dam safety organizations'
  ];

  const milestones = [
    { milestone: 'Bid Submission Deadline', date: '18 Dec 2024', note: '14:00 hrs on CPP Portal' },
    { milestone: 'Technical Bid Opening', date: '20 Dec 2024', note: 'Virtual conference link will be shared via CPPP' },
    { milestone: 'Financial Bid Opening', date: '08 Jan 2025', note: 'Subject to technical qualification' },
    { milestone: 'Project Go-Live', date: '30 Jun 2026', note: 'Post acceptance testing of all monitoring nodes' }
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
            <p className="uppercase tracking-[0.15em] text-blue-200 text-xs sm:text-sm font-medium">Tender · 18 Nov 2024</p>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight max-w-4xl">Construction of Dam Safety Monitoring System – Phase II</h1>
            <p className="text-blue-100 text-base sm:text-lg max-w-3xl leading-relaxed">
              Central Water Commission invites EPC bids for expanding the DHMS stack across high-risk reservoirs.
              The package covers instrumentation, control room up-gradation, analytics platform, and five-year O&M support.
            </p>
          </div>

          <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="group bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="text-blue-200 text-xs sm:text-sm font-medium mb-2">Tender ID</div>
              <div className="text-white text-base sm:text-lg font-semibold">CWC/DSM/2024/PH2</div>
            </div>
            <div className="group bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="text-blue-200 text-xs sm:text-sm font-medium mb-2">Est. Value</div>
              <div className="text-white text-base sm:text-lg font-semibold">₹82.4 Cr</div>
            </div>
            <div className="group bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="text-blue-200 text-xs sm:text-sm font-medium mb-2">EMD</div>
              <div className="text-white text-base sm:text-lg font-semibold">₹82 Lakh</div>
            </div>
            <div className="group bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="text-blue-200 text-xs sm:text-sm font-medium mb-2">Completion</div>
              <div className="text-white text-base sm:text-lg font-semibold">24 Months + 5 Years O&M</div>
            </div>
          </div>
        </div>
      </div>

      <div className={`${updatesBaseClasses.mainWrapper} box-border`}>
        <section className={`${updatesBaseClasses.surfaceCard} group overflow-hidden`}>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-blue-100 rounded-lg group-hover:bg-blue-600 transition-colors duration-300">
              <Wrench className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 group-hover:text-white transition-colors duration-300" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Scope of Work</h2>
          </div>
          <ul className="space-y-3 sm:space-y-4">
            {scopeItems.map((item, index) => (
              <li key={index} className="flex items-start gap-3 text-gray-700 text-sm sm:text-base leading-relaxed">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-semibold mt-0.5">{index + 1}</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className={`${updatesBaseClasses.surfaceCard} group overflow-hidden`}>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-blue-100 rounded-lg group-hover:bg-blue-600 transition-colors duration-300">
              <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 group-hover:text-white transition-colors duration-300" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Milestones</h2>
          </div>
          <div className="space-y-4 sm:space-y-5">
            {milestones.map((item, index) => (
              <div key={index} className="group/item flex flex-col sm:flex-row sm:items-center sm:justify-between border-l-4 border-blue-200 hover:border-blue-600 bg-gray-50 hover:bg-blue-50 rounded-r-xl p-4 sm:p-5 transition-all duration-300 last:mb-0">
                <div className="flex-1">
                  <p className="text-gray-900 font-semibold text-base sm:text-lg mb-1">{item.milestone}</p>
                  <p className="text-xs sm:text-sm text-gray-600">{item.note}</p>
                </div>
                <div className="flex items-center gap-2 mt-3 sm:mt-0 sm:ml-4">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <p className="text-blue-700 font-bold text-sm sm:text-base whitespace-nowrap">{item.date}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={updatesBaseClasses.gradientCallout}>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Bid Submission Checklist</h2>
          <ul className="space-y-3 sm:space-y-4 mb-8">
            <li className="flex items-start gap-3 text-gray-700 text-sm sm:text-base">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs mt-0.5">✓</span>
              <span>Signed EPC agreement, JV agreements (if any), and power of attorney.</span>
            </li>
            <li className="flex items-start gap-3 text-gray-700 text-sm sm:text-base">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs mt-0.5">✓</span>
              <span>OEM authorizations for primary instrumentation and control software.</span>
            </li>
            <li className="flex items-start gap-3 text-gray-700 text-sm sm:text-base">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs mt-0.5">✓</span>
              <span>Proof of three similar completed assignments valued above ₹40 Cr.</span>
            </li>
            <li className="flex items-start gap-3 text-gray-700 text-sm sm:text-base">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs mt-0.5">✓</span>
              <span>Cyber-security certification for remote monitoring solution stack.</span>
            </li>
          </ul>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button className="group inline-flex items-center justify-center  gap-2 px-5 sm:px-6 py-3 sm:py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm sm:text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105" type="button">
              <Download className="w-4 h-4 sm:w-5 sm:h-5 group-hover:animate-bounce" />
              Download Bid Document
            </button>
            <button className="group inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 bg-white hover:bg-blue-50 border-2 border-blue-300 text-blue-700 hover:text-blue-800 rounded-xl text-sm sm:text-base font-semibold transition-all duration-300 hover:scale-105" type="button">
              <Download className="w-4 h-4 sm:w-5 sm:h-5 group-hover:animate-bounce" />
              BoQ Template
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
