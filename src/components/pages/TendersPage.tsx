import { PageType } from '../../App';
import { Download, Calendar, FileText } from 'lucide-react';

interface TendersPageProps {
  onNavigate: (page: PageType) => void;
}

export function TendersPage({ onNavigate }: TendersPageProps) {
  const tenders = [
    {
      id: 'CWC/2024/T/156',
      title: 'Construction of Dam Safety Monitoring System - Phase II',
      category: 'Civil Works',
      publishDate: '15-Nov-2024',
      closeDate: '15-Dec-2024',
      estValue: '₹45.5 Cr',
      status: 'Active'
    },
    {
      id: 'CWC/2024/T/157',
      title: 'Supply & Installation of Hydrological Equipment',
      category: 'Equipment',
      publishDate: '12-Nov-2024',
      closeDate: '20-Dec-2024',
      estValue: '₹12.3 Cr',
      status: 'Active'
    },
    {
      id: 'CWC/2024/T/158',
      title: 'Development of Flood Forecasting Software Module',
      category: 'IT Services',
      publishDate: '10-Nov-2024',
      closeDate: '10-Dec-2024',
      estValue: '₹3.8 Cr',
      status: 'Active'
    },
    {
      id: 'CWC/2024/T/153',
      title: 'River Basin Modernization Project - Consultancy',
      category: 'Consultancy',
      publishDate: '05-Nov-2024',
      closeDate: '05-Dec-2024',
      estValue: '₹8.6 Cr',
      status: 'Closed'
    },
    {
      id: 'CWC/2024/T/154',
      title: 'Rehabilitation of Existing Observation Stations',
      category: 'Civil Works',
      publishDate: '01-Nov-2024',
      closeDate: '30-Nov-2024',
      estValue: '₹15.2 Cr',
      status: 'Active'
    },
    {
      id: 'CWC/2024/T/155',
      title: 'Water Quality Testing Laboratory Equipment',
      category: 'Equipment',
      publishDate: '28-Oct-2024',
      closeDate: '28-Nov-2024',
      estValue: '₹6.7 Cr',
      status: 'Active'
    },
    {
      id: 'CWC/2024/T/151',
      title: 'Annual Maintenance Contract for IT Infrastructure',
      category: 'IT Services',
      publishDate: '25-Oct-2024',
      closeDate: '25-Nov-2024',
      estValue: '₹2.1 Cr',
      status: 'Active'
    },
    {
      id: 'CWC/2024/T/148',
      title: 'Environmental Impact Assessment Study',
      category: 'Consultancy',
      publishDate: '20-Oct-2024',
      closeDate: '20-Nov-2024',
      estValue: '₹4.5 Cr',
      status: 'Closed'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-white mb-4">Tenders & Procurement</h1>
          <p className="text-blue-100 max-w-3xl">
            Current and upcoming tenders for water resource projects, equipment, and services
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="text-gray-600 mb-1">Active Tenders</div>
            <div className="text-gray-900">34</div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="text-gray-600 mb-1">Closing Soon</div>
            <div className="text-orange-600">8</div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="text-gray-600 mb-1">Total Value</div>
            <div className="text-gray-900">₹458 Cr</div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="text-gray-600 mb-1">This Month</div>
            <div className="text-gray-900">12</div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">All Tenders</button>
          <button className="px-4 py-2 bg-white text-gray-700 rounded-lg text-sm hover:bg-gray-50 transition-colors">Civil Works</button>
          <button className="px-4 py-2 bg-white text-gray-700 rounded-lg text-sm hover:bg-gray-50 transition-colors">Equipment</button>
          <button className="px-4 py-2 bg-white text-gray-700 rounded-lg text-sm hover:bg-gray-50 transition-colors">IT Services</button>
          <button className="px-4 py-2 bg-white text-gray-700 rounded-lg text-sm hover:bg-gray-50 transition-colors">Consultancy</button>
        </div>

        {/* Tenders Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <h2 className="text-gray-900">Current Tenders</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-gray-700">Tender ID</th>
                  <th className="px-6 py-3 text-left text-gray-700">Title</th>
                  <th className="px-6 py-3 text-left text-gray-700">Category</th>
                  <th className="px-6 py-3 text-left text-gray-700">Published</th>
                  <th className="px-6 py-3 text-left text-gray-700">Closing Date</th>
                  <th className="px-6 py-3 text-left text-gray-700">Est. Value</th>
                  <th className="px-6 py-3 text-left text-gray-700">Status</th>
                  <th className="px-6 py-3 text-left text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {tenders.map((tender, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-gray-600 text-sm">{tender.id}</td>
                    <td className="px-6 py-4 text-gray-900 max-w-xs">{tender.title}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                        {tender.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-sm">{tender.publishDate}</td>
                    <td className="px-6 py-4 text-gray-600 text-sm">{tender.closeDate}</td>
                    <td className="px-6 py-4 text-gray-900">{tender.estValue}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                        tender.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {tender.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm">
                        <FileText className="w-4 h-4" />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Information Box */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-gray-900 mb-3">Important Information</h3>
          <ul className="space-y-2 text-gray-700 text-sm">
            <li>• All tenders are published on the Central Public Procurement Portal (CPPP)</li>
            <li>• Bidders must be registered on the e-procurement platform</li>
            <li>• Pre-bid meetings are scheduled as per individual tender notifications</li>
            <li>• Technical and financial bids must be submitted separately as per guidelines</li>
            <li>• For queries, contact the respective tender issuing authority mentioned in the document</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
