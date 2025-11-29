import { useCallback } from 'react';
import { PageType } from '../../App';
import { Download, FileText, BookOpen, Search } from 'lucide-react';
import { jsPDF } from 'jspdf';

type Publication = {
  title: string;
  category: string;
  year: string;
  pages: number;
  size: string;
  downloads: number;
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

interface PublicationsPageProps {
  onNavigate: (page: PageType) => void;
}

export function PublicationsPage({ onNavigate }: PublicationsPageProps) {
  const publications: Publication[] = [
    {
      title: 'Integrated Hydrological Data Book (Non-Classified River Basins)',
      category: 'Technical Report',
      year: '2024',
      pages: 456,
      size: '15.2 MB',
      downloads: 3420
    },
    {
      title: 'Compendium on Silting of Reservoirs in India',
      category: 'Research',
      year: '2024',
      pages: 234,
      size: '8.5 MB',
      downloads: 1890
    },
    {
      title: 'National Register of Large Dams - 2024',
      category: 'Directory',
      year: '2024',
      pages: 678,
      size: '22.4 MB',
      downloads: 5670
    },
    {
      title: 'Guidelines for Planning and Design of River Valley Projects',
      category: 'Guidelines',
      year: '2023',
      pages: 345,
      size: '12.3 MB',
      downloads: 4230
    },
    {
      title: 'Water and Related Statistics - 2023',
      category: 'Statistics',
      year: '2023',
      pages: 567,
      size: '18.6 MB',
      downloads: 6780
    },
    {
      title: 'Dam Safety Manual - Volume I & II',
      category: 'Guidelines',
      year: '2023',
      pages: 890,
      size: '28.9 MB',
      downloads: 8920
    },
    {
      title: 'Flood Forecasting Manual',
      category: 'Technical Manual',
      year: '2023',
      pages: 234,
      size: '9.4 MB',
      downloads: 3450
    },
    {
      title: 'Basin Planning - Methodology and Guidelines',
      category: 'Guidelines',
      year: '2022',
      pages: 456,
      size: '16.7 MB',
      downloads: 2890
    },
    {
      title: 'Water Quality Assessment: Rivers of India',
      category: 'Research',
      year: '2022',
      pages: 389,
      size: '14.2 MB',
      downloads: 4120
    },
    {
      title: 'Climate Change and Water Resources',
      category: 'Research',
      year: '2022',
      pages: 298,
      size: '11.5 MB',
      downloads: 5230
    },
  ];

  const categories = [
    { name: 'All Publications', count: 245 },
    { name: 'Annual Reports', count: 25 },
    { name: 'Technical Reports', count: 89 },
    { name: 'Guidelines', count: 45 },
    { name: 'Research Papers', count: 56 },
    { name: 'Manuals', count: 30 },
  ];

  const handlePublicationDownload = useCallback((publication: Publication) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(publication.title, 14, 20);

    doc.setFontSize(12);
    const lines = [
      `Category: ${publication.category}`,
      `Published Year: ${publication.year}`,
      `Length: ${publication.pages} pages`,
      `File Size: ${publication.size}`,
      `Total Downloads: ${publication.downloads.toLocaleString()}`,
      `Generated: ${new Date().toLocaleString()}`,
    ];

    lines.forEach((line, index) => doc.text(line, 14, 34 + index * 8));

    doc.text('This PDF contains a publication metadata summary for offline reference.', 14, 34 + lines.length * 8 + 6);

    doc.save(`${slugify(publication.title)}.pdf`);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-white mb-4">Publications & Documents</h1>
          <p className="text-blue-100 max-w-3xl">
            Access technical reports, guidelines, manuals, and research publications
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search publications by title, author, or keyword..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <select className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>All Years</option>
              <option>2024</option>
              <option>2023</option>
              <option>2022</option>
              <option>2021</option>
              <option>2020</option>
            </select>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar - Categories */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <h3 className="text-gray-900 mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category, index) => (
                  <button
                    key={index}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      index === 0
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{category.name}</span>
                      <span className="text-sm">{category.count}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Publications List */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                <h2 className="text-gray-900">All Publications</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {publications.map((pub, index) => (
                  <div key={index} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <BookOpen className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-gray-900 mb-2">{pub.title}</h3>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-3">
                          <span className="inline-flex px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                            {pub.category}
                          </span>
                          <span>Year: {pub.year}</span>
                          <span>•</span>
                          <span>{pub.pages} pages</span>
                          <span>•</span>
                          <span>{pub.size}</span>
                          <span>•</span>
                          <span>{pub.downloads.toLocaleString()} downloads</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <button
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                            onClick={() => handlePublicationDownload(pub)}
                          >
                            <Download className="w-4 h-4" />
                            Download PDF
                          </button>
                          <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">Showing 1-10 of 245 publications</p>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
                      Previous
                    </button>
                    <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">1</button>
                    <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">2</button>
                    <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">3</button>
                    <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-8 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl p-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-white mb-3">Subscribe to Publication Updates</h2>
            <p className="text-blue-100 mb-6">
              Get notified when new technical reports, guidelines, and research publications are released
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
