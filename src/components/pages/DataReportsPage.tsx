import { useCallback } from 'react';
import { PageType } from '../../App';
import { Download, FileText, TrendingUp } from 'lucide-react';
import { jsPDF } from 'jspdf';

type AnnualReport = {
  year: string;
  title: string;
  size: string;
  downloads: number;
};

type TechnicalReport = {
  title: string;
  category: string;
  date: string;
  size: string;
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

interface DataReportsPageProps {
  onNavigate: (page: PageType) => void;
}

export function DataReportsPage({ onNavigate }: DataReportsPageProps) {
  const annualReports: AnnualReport[] = [
    { year: '2023-24', title: 'Annual Report 2023-24', size: '15.2 MB', downloads: 2456 },
    { year: '2022-23', title: 'Annual Report 2022-23', size: '14.8 MB', downloads: 3892 },
    { year: '2021-22', title: 'Annual Report 2021-22', size: '13.5 MB', downloads: 4123 },
    { year: '2020-21', title: 'Annual Report 2020-21', size: '12.9 MB', downloads: 3567 },
  ];

  const technicalReports: TechnicalReport[] = [
    {
      title: 'Water Resources Assessment of India - 2024',
      category: 'Assessment',
      date: 'Nov 2024',
      size: '8.5 MB'
    },
    {
      title: 'Dam Safety Guidelines & Standards',
      category: 'Guidelines',
      date: 'Oct 2024',
      size: '5.2 MB'
    },
    {
      title: 'Flood Management Practices in India',
      category: 'Technical',
      date: 'Sep 2024',
      size: '6.8 MB'
    },
    {
      title: 'River Basin Development Plans - Volume I',
      category: 'Planning',
      date: 'Aug 2024',
      size: '12.4 MB'
    },
    {
      title: 'Climate Change Impact on Water Resources',
      category: 'Research',
      date: 'Jul 2024',
      size: '9.7 MB'
    },
    {
      title: 'Irrigation Potential & Development Status',
      category: 'Statistics',
      date: 'Jun 2024',
      size: '4.3 MB'
    },
  ];

  const dataCategories = [
    {
      name: 'Reservoir Data',
      description: 'Daily reservoir levels and storage',
      count: '150+ Reservoirs',
      onClick: () => onNavigate('reservoir-data'),
    },
    {
      name: 'River Flow Data',
      description: 'Discharge and water level data',
      count: '1,200+ Stations',
      onClick: () => onNavigate('water-data'),
    },
    {
      name: 'Rainfall Data',
      description: 'Historical and real-time rainfall',
      count: '5,000+ Stations',
      onClick: () => onNavigate('historical-data'),
    },
    {
      name: 'Basin Maps',
      description: 'River basin boundaries and maps',
      count: '20 Major Basins',
      onClick: () => onNavigate('basin-maps'),
    },
  ];

  const handleAnnualDownload = useCallback((report: AnnualReport) => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text(report.title, 14, 20);

    doc.setFontSize(12);
    const lines = [
      `Reporting Year: ${report.year}`,
      `Document Size: ${report.size}`,
      `Total Downloads: ${report.downloads.toLocaleString()}`,
      `Generated: ${new Date().toLocaleString()}`,
    ];

    lines.forEach((line, index) => {
      doc.text(line, 14, 34 + index * 8);
    });

    doc.text('This is a generated copy of the report metadata for offline reference.', 14, 34 + lines.length * 8 + 6);

    doc.save(`${slugify(report.title)}.pdf`);
  }, []);

  const handleTechnicalDownload = useCallback((report: TechnicalReport) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(report.title, 14, 20);

    doc.setFontSize(12);
    const lines = [
      `Category: ${report.category}`,
      `Published: ${report.date}`,
      `File Size: ${report.size}`,
      `Generated: ${new Date().toLocaleString()}`,
    ];

    lines.forEach((line, index) => doc.text(line, 14, 34 + index * 8));

    doc.text('For the full technical document, please refer to the official release.', 14, 34 + lines.length * 8 + 6);

    doc.save(`${slugify(report.title)}.pdf`);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-white mb-4">Data & Reports</h1>
          <p className="text-blue-100 max-w-3xl">
            Access comprehensive water resource data, annual reports, and technical publications
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Quick Access Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {dataCategories.map((category, index) => (
            <button
              key={index}
              onClick={category.onClick}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all text-left group"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                <TrendingUp className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-gray-900 mb-2">{category.name}</h3>
              <p className="text-gray-600 text-sm mb-3">{category.description}</p>
              <span className="text-blue-600 text-sm">{category.count} →</span>
            </button>
          ))}
        </div>

        {/* Annual Reports */}
        <div className="mb-12">
          <h2 className="text-gray-900 mb-6">Annual Reports</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {annualReports.map((report, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-gray-900 mb-2">{report.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                      <span>Year: {report.year}</span>
                      <span>•</span>
                      <span>{report.size}</span>
                      <span>•</span>
                      <span>{report.downloads} downloads</span>
                    </div>
                    <button
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                      onClick={() => handleAnnualDownload(report)}
                    >
                      <Download className="w-4 h-4" />
                      Download PDF
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Reports */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-gray-900">Technical Reports & Publications</h2>
            <button className="text-blue-600 hover:text-blue-700 text-sm">View All →</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-gray-700">Report Title</th>
                  <th className="px-6 py-3 text-left text-gray-700">Category</th>
                  <th className="px-6 py-3 text-left text-gray-700">Published</th>
                  <th className="px-6 py-3 text-left text-gray-700">Size</th>
                  <th className="px-6 py-3 text-left text-gray-700">Download</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {technicalReports.map((report, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-gray-900">{report.title}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                        {report.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{report.date}</td>
                    <td className="px-6 py-4 text-gray-600">{report.size}</td>
                    <td className="px-6 py-4">
                      <button
                        className="flex items-center gap-1 text-blue-600 hover:text-blue-700"
                        onClick={() => handleTechnicalDownload(report)}
                      >
                        <Download className="w-4 h-4" />
                        <span className="text-sm">PDF</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Data Access Note */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-gray-900 mb-3">Open Data Initiative</h3>
          <p className="text-gray-700 text-sm mb-3">
            CWC is committed to making water resource data openly available. Most datasets are available for download in CSV, Excel, and JSON formats. For bulk data requests or API access, please contact our Data Services division.
          </p>
          <div className="flex flex-wrap gap-3">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
              Request Bulk Data
            </button>
            <button className="px-4 py-2 bg-white border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-sm">
              API Documentation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
