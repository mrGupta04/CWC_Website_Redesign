import { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { QuickLinks } from './components/QuickLinks';
import { LatestUpdates } from './components/LatestUpdates';
import { KeyServices } from './components/KeyServices';
import { DataSection } from './components/DataSection';
import { Footer } from './components/Footer';
import { AboutPage } from './components/pages/AboutPage';
import { ProjectsPage } from './components/pages/ProjectsPage';
import { DataReportsPage } from './components/pages/DataReportsPage';
import { TendersPage } from './components/pages/TendersPage';
import { ContactPage } from './components/pages/ContactPage';
import { WaterDataPage } from './components/pages/WaterDataPage';
import { FloodAlertsPage } from './components/pages/FloodAlertsPage';
import { CareersPage } from './components/pages/CareersPage';
import { EventsPage } from './components/pages/EventsPage';
import { ReservoirDataPage } from './components/pages/ReservoirDataPage';
import { BasinMapsPage } from './components/pages/BasinMapsPage';
import { HistoricalDataPage } from './components/pages/HistoricalDataPage';
import { PublicationsPage } from './components/pages/PublicationsPage';
import { LatestUpdatesPage } from './components/pages/LatestUpdatesPage';
import { GuidelinesNoticePage } from './components/pages/updates/GuidelinesNoticePage';
import { DamSafetyTenderPage } from './components/pages/updates/DamSafetyTenderPage';
import { WaterStatisticsReportPage } from './components/pages/updates/WaterStatisticsReportPage';
import { FloodForecastCircularPage } from './components/pages/updates/FloodForecastCircularPage';
import { NationalWaterConferencePage } from './components/pages/updates/NationalWaterConferencePage';

export type PageType = | 'home' | 'about' | 'projects' | 'data-reports' | 'tenders' | 'contact' | 
  'water-data' | 'flood-alerts' | 'careers' | 'events' | 'reservoir-data' | 'basin-maps' | 
  'historical-data' | 'publications' | 'latest-updates' | 'notice-guidelines-2024' | 'tender-dam-safety-phase-2' |
  'report-water-statistics-2024' | 'circular-flood-forecasting-2024' |
  'event-national-water-conference-2024';

type ThemeMode = 'light' | 'dark';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [theme, setTheme] = useState<ThemeMode>(() => {
    if (typeof window === 'undefined') {
      return 'light';
    }

    const storedTheme = window.localStorage.getItem('cwc-theme');
    if (storedTheme === 'light' || storedTheme === 'dark') {
      return storedTheme;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    }

    window.localStorage.setItem('cwc-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'about':
        return <AboutPage onNavigate={setCurrentPage} />;
      case 'projects':
        return <ProjectsPage onNavigate={setCurrentPage} />;
      case 'data-reports':
        return <DataReportsPage onNavigate={setCurrentPage} />;
      case 'tenders':
        return <TendersPage onNavigate={setCurrentPage} />;
      case 'contact':
        return <ContactPage onNavigate={setCurrentPage} />;
      case 'water-data':
        return <WaterDataPage onNavigate={setCurrentPage} />;
      case 'flood-alerts':
        return <FloodAlertsPage onNavigate={setCurrentPage} />;
      case 'careers':
        return <CareersPage onNavigate={setCurrentPage} />;
      case 'events':
        return <EventsPage onNavigate={setCurrentPage} />;
      case 'reservoir-data':
        return <ReservoirDataPage onNavigate={setCurrentPage} />;
      case 'basin-maps':
        return <BasinMapsPage onNavigate={setCurrentPage} />;
      case 'historical-data':
        return <HistoricalDataPage onNavigate={setCurrentPage} />;
      case 'publications':
        return <PublicationsPage onNavigate={setCurrentPage} />;
      case 'latest-updates':
        return <LatestUpdatesPage onNavigate={setCurrentPage} />;
      case 'notice-guidelines-2024':
        return <GuidelinesNoticePage onNavigate={setCurrentPage} />;
      case 'tender-dam-safety-phase-2':
        return <DamSafetyTenderPage onNavigate={setCurrentPage} />;
      case 'report-water-statistics-2024':
        return <WaterStatisticsReportPage onNavigate={setCurrentPage} />;
      case 'circular-flood-forecasting-2024':
        return <FloodForecastCircularPage onNavigate={setCurrentPage} />;
      case 'event-national-water-conference-2024':
        return <NationalWaterConferencePage onNavigate={setCurrentPage} />;
      default:
        return (
          <>
            <Hero onNavigate={setCurrentPage} />
            <QuickLinks onNavigate={setCurrentPage} />
            <LatestUpdates onNavigate={setCurrentPage} />
            <KeyServices />
            <DataSection onNavigate={setCurrentPage} />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
      {renderPage()}
      <Footer onNavigate={setCurrentPage} />
    </div>
  );
}
