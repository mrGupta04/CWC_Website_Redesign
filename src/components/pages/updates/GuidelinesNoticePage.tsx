import { ArrowLeft, CheckCircle, FileText, ListChecks } from 'lucide-react';
import { PageType } from '../../../App';
import { updatesBaseClasses } from './updateStyles';

interface GuidelinesNoticePageProps {
  onNavigate: (page: PageType) => void;
}

export function GuidelinesNoticePage({ onNavigate }: GuidelinesNoticePageProps) {
  const focusAreas = [
    'Integrated basin planning and real-time coordination between state WRDs',
    'Adoption of unified data standards across monitoring stations and SCADA systems',
    'Mainstreaming climate resilience considerations in new project DPRs',
    'Mandatory community consultation protocols for large interventions'
  ];

  const implementationPhases = [
    {
      label: 'Phase 1: Institutional Readiness',
      timeline: 'Dec 2024 - Mar 2025',
      details:
        'Establish state-level programme units, align procurement pipelines, finalize digital templates.'
    },
    {
      label: 'Phase 2: Infrastructure Modernization',
      timeline: 'Apr 2025 - Mar 2027',
      details:
        'Upgrade telemetry, command centres, and legacy canal automation assets in priority basins.'
    },
    {
      label: 'Phase 3: Adaptive Management',
      timeline: 'Apr 2027 onwards',
      details:
        'Deploy adaptive release protocols, seasonal operating rules, and performance dashboards.'
    }
  ];

  return (
    <div className={updatesBaseClasses.pageWrapper}>
      {/* HEADER */}
      <header className={updatesBaseClasses.heroSection}>
        <div className={updatesBaseClasses.heroRadialOverlay} />
        <div className={updatesBaseClasses.heroGridOverlay} />

        <div className={updatesBaseClasses.heroContent}>
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className={updatesBaseClasses.backButton}
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span className="text-sm sm:text-base">Back to Latest Updates</span>
          </button>

          <div className="space-y-4">
            <p className="uppercase tracking-widest text-blue-200 text-xs sm:text-sm font-medium">
              Notice · 20 Nov 2024
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight max-w-4xl">
              Guidelines for Water Resource Management Projects 2024
            </h1>
            <p className="text-blue-100 text-base sm:text-lg max-w-3xl leading-relaxed">
              The Ministry has released a harmonized framework for planning, financing, and monitoring multi-basin
              investments. The document consolidates lessons from major national initiatives, enabling agencies to align
              submissions for FY 2025–26.
            </p>
          </div>

          {/* Header Stats */}
          
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className={updatesBaseClasses.mainWrapper}>

        {/* Highlights */}
        <section className={updatesBaseClasses.spaciousCard}>
         

          <div className="grid sm:grid-cols-2 gap-8">
            {[
              {
                title: "Policy Alignment",
                desc:
                  "Project appraisals must include climate-screening matrices, socio-economic scorecards, and digital twin readiness checks.",
              },
              {
                title: "Financing Structure",
                desc:
                  "Access to the Modernization Incentive Pool (MIP) now requires 30% state contribution and audited O&M trackers.",
              },
              {
                title: "Data Governance",
                desc:
                  "Telemetry nodes must push datasets hourly to the National Water Informatics Centre via secured APIs.",
              },
              {
                title: "Capacity Building",
                desc:
                  "Mandatory training calendar for engineers covering asset management, IoT diagnostics, and risk analytics.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-7 bg-gradient-to-br from-blue-50 to-white rounded-xl border border-gray-200 hover:border-blue-300 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <h3 className="font-semibold text-lg text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-700 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>


        {/* Priority Areas */}
        <section className={updatesBaseClasses.surfaceCard}>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-green-100 rounded-xl">
              <ListChecks className="w-6 h-6 text-green-700" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Priority Focus Areas</h2>
          </div>

          <div className="space-y-4">
            {focusAreas.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-3 bg-gradient-to-r from-green-50 to-white p-4 rounded-xl border-l-4 border-green-500 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <CheckCircle className="text-green-600 w-6 h-6 flex-shrink-0 mt-1" />
                <p className="text-gray-700">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section className={updatesBaseClasses.surfaceCard}>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">Implementation Timeline</h2>

          <div className="space-y-10 relative before:absolute before:left-7 before:top-4 before:bottom-2 before:w-1 before:bg-blue-300">
            {implementationPhases.map((phase, idx) => (
              <div key={idx} className="relative pl-16">
                {/* Number circle */}
                <div className="absolute left-4 top-1 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold shadow-md">
                  {idx + 1}
                </div>

                {/* Content box */}
                <div className="bg-blue-50 rounded-xl border p-6 hover:border-blue-500 hover:shadow-md transition-all">
                  <p className="text-blue-600 text-sm font-semibold">{phase.timeline}</p>
                  <h3 className="text-lg font-bold text-gray-900 mt-1">{phase.label}</h3>
                  <p className="text-gray-700 mt-1">{phase.details}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Next Steps */}
        <section className={updatesBaseClasses.gradientCallout}>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Next Steps for Implementing Agencies</h2>

          <ul className="space-y-4">
            {[
              'Submit compliance roadmap by 15 Dec 2024 through the WRMP portal.',
              'Nominate state-level nodal officer and update contact directory.',
              'Enroll teams for the January 2025 capacity-building workshops.',
              'Align FY 2025-26 budget proposals with the revised appraisal checklist.'
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-3 text-gray-700">
                <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs mt-1">
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </section>

      </main>
    </div>
  );
}
