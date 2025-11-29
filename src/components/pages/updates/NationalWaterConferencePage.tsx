import { ArrowLeft, CalendarDays, MapPin, Users } from 'lucide-react';
import { PageType } from '../../../App';
import { updatesBaseClasses } from './updateStyles';

interface NationalWaterConferencePageProps {
  onNavigate: (page: PageType) => void;
}

export function NationalWaterConferencePage({ onNavigate }: NationalWaterConferencePageProps) {
  const agenda = [
    {
      time: '09:30 - 11:00',
      title: 'Inaugural Plenary: Resilient Water Infrastructure',
      speakers: 'Union Minister, World Bank, CWC Chair'
    },
    {
      time: '11:30 - 13:00',
      title: 'Panel: Digital Water & AI-enabled Operations',
      speakers: 'State WRDs, Startups, NIWRM'
    },
    {
      time: '14:00 - 15:30',
      title: 'Parallel Labs: Urban Floods / Irrigation Efficiency / River Rejuvenation',
      speakers: 'Technical working groups'
    },
    {
      time: '16:00 - 17:30',
      title: 'Stakeholder Forum & Awards',
      speakers: 'Community champions, CSR partners'
    }
  ];

  const registrationSteps = [
    'Fill out the online form on the conference microsite before 20 Dec 2024.',
    'Upload authorization letter for official delegates or nomination note for speakers.',
    'Receive confirmation email with QR badge and session preferences within 3 working days.',
    'Book travel and accommodation through the empaneled agency or self-arranged options.'
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
            <p className="uppercase tracking-[0.15em] text-purple-200 text-xs sm:text-sm font-medium">Event · 10 Nov 2024</p>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight max-w-4xl">National Water Conference 2024 – Registration Open</h1>
            <p className="text-purple-100 text-base sm:text-lg max-w-3xl leading-relaxed">
              The flagship annual gathering of policy makers, engineers, researchers, civic innovators, and startups to share
              best practices on water security. This edition focuses on resilient infrastructure, digital twins, and community partnerships.
            </p>
          </div>

          <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <div className="group bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="text-purple-200 text-xs sm:text-sm font-medium mb-2">Dates</div>
              <div className="text-white text-base sm:text-lg font-semibold">23 – 25 Jan 2025</div>
            </div>
            <div className="group bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="text-purple-200 text-xs sm:text-sm font-medium mb-2">Venue</div>
              <div className="text-white text-base sm:text-lg font-semibold">India Habitat Centre, New Delhi</div>
            </div>
            <div className="group bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl sm:col-span-2 lg:col-span-1">
              <div className="text-purple-200 text-xs sm:text-sm font-medium mb-2">Seats</div>
              <div className="text-white text-base sm:text-lg font-semibold">600 Delegates</div>
            </div>
          </div>
        </div>
      </div>

      <div className={`${updatesBaseClasses.mainWrapper} box-border`}>
        <section className={`${updatesBaseClasses.surfaceCard} group overflow-hidden`}>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-purple-100 rounded-lg group-hover:bg-purple-600 transition-colors duration-300">
              <CalendarDays className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 group-hover:text-white transition-colors duration-300" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Day 1 Agenda Snapshot</h2>
          </div>
          <div className="space-y-4 sm:space-y-5">
            {agenda.map((slot, index) => (
              <div key={index} className="group/item flex flex-col lg:flex-row lg:items-start lg:justify-between border-l-4 border-purple-200 hover:border-purple-600 bg-gray-50 hover:bg-purple-50 rounded-r-xl p-4 sm:p-5 transition-all duration-300">
                <div className="flex-1">
                  <p className="text-purple-700 font-bold text-sm sm:text-base mb-2 flex items-center gap-2">
                    <CalendarDays className="w-4 h-4" />
                    {slot.time}
                  </p>
                  <p className="text-gray-900 font-semibold text-base sm:text-lg mb-1">{slot.title}</p>
                  <p className="text-xs sm:text-sm text-gray-600">{slot.speakers}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={`${updatesBaseClasses.surfaceCard} group overflow-hidden`}>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-purple-100 rounded-lg group-hover:bg-purple-600 transition-colors duration-300">
              <Users className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 group-hover:text-white transition-colors duration-300" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Registration Process</h2>
          </div>
          <ol className="space-y-4">
            {registrationSteps.map((step, index) => (
              <li key={index} className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 text-white flex items-center justify-center text-sm font-bold shadow-lg">{index + 1}</span>
                <span className="text-gray-700 text-sm sm:text-base leading-relaxed pt-1">{step}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className={updatesBaseClasses.gradientCallout}>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex-1">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Need Help?</h2>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                Write to <span className="font-semibold text-purple-700">nwc2024@cwc.gov.in</span> or call <span className="font-semibold text-purple-700">+91-11-2461-XXXX</span> for delegate services, exhibition booths, and sponsorship queries.
              </p>
            </div>
            <button className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl text-sm sm:text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 whitespace-nowrap" type="button">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 group-hover:animate-bounce" />
              Visit Event Microsite
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
