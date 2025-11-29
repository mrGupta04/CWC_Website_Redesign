export type LatestUpdatePageSlug =
  | 'notice-guidelines-2024'
  | 'tender-dam-safety-phase-2'
  | 'report-water-statistics-2024'
  | 'circular-flood-forecasting-2024'
  | 'event-national-water-conference-2024';

export type LatestUpdateItem = {
  type: string;
  title: string;
  date: string;
  isNew: boolean;
  page: LatestUpdatePageSlug;
};

export const latestUpdates: LatestUpdateItem[] = [
  {
    type: 'Notice',
    title: 'Guidelines for Water Resource Management Projects 2024',
    date: '20 Nov 2024',
    isNew: true,
    page: 'notice-guidelines-2024'
  },
  {
    type: 'Tender',
    title: 'Construction of Dam Safety Monitoring System - Phase II',
    date: '18 Nov 2024',
    isNew: true,
    page: 'tender-dam-safety-phase-2'
  },
  {
    type: 'Report',
    title: 'Annual Report on Water Statistics 2023-24',
    date: '15 Nov 2024',
    isNew: false,
    page: 'report-water-statistics-2024'
  },
  {
    type: 'Circular',
    title: 'Updated Guidelines for Flood Forecasting Systems',
    date: '12 Nov 2024',
    isNew: false,
    page: 'circular-flood-forecasting-2024'
  },
  {
    type: 'Event',
    title: 'National Water Conference 2024 - Registration Open',
    date: '10 Nov 2024',
    isNew: false,
    page: 'event-national-water-conference-2024'
  }
];
