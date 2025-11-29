import { PageType } from '../../App';
import { Users, Target, Award, Building2 } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: PageType) => void;
}

export function AboutPage({ onNavigate }: AboutPageProps) {
  const organizationData = [
    { designation: 'Chairman', name: 'Shri Kushvinder Vohra', division: 'Administration Wing' },
    { designation: 'Member (RM)', name: 'Shri R.K. Gupta', division: 'River Management' },
    { designation: 'Member (WP&P)', name: 'Shri A.K. Lohani', division: 'Water Planning & Projects' },
    { designation: 'Member (D&R)', name: 'Dr. S.K. Haldar', division: 'Design & Research' },
    { designation: 'Member (WQ&M)', name: 'Dr. Sharad Kumar Jain', division: 'Water Quality & Modelling' },
  ];

  const statistics = [
    { icon: Users, label: 'Employees', value: '3,500+' },
    { icon: Building2, label: 'Regional Offices', value: '15' },
    { icon: Award, label: 'Years of Service', value: '75+' },
    { icon: Target, label: 'Projects Monitored', value: '500+' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 dark:from-blue-950 dark:to-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-white mb-4">About Central Water Commission</h1>
          <p className="text-blue-100 dark:text-blue-200 max-w-3xl">
            The Central Water Commission is a premier Technical Organization of India in the field of Water Resources
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {statistics.map((stat, index) => (
            <div key={index} className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-3">
                <stat.icon className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-gray-900 dark:text-white mb-1">{stat.value}</div>
              <div className="text-gray-600 dark:text-gray-300 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-sm">
            <h2 className="text-gray-900 dark:text-white mb-4">Our Vision</h2>
            <p className="text-gray-600 dark:text-gray-300">
              To be a world-class organization for sustainable water resource development and management through optimal utilization of available resources for national prosperity.
            </p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-sm">
            <h2 className="text-gray-900 dark:text-white mb-4">Our Mission</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Provide technical expertise and support for planning, design, and implementation of water resource projects while ensuring environmental sustainability and stakeholder participation.
            </p>
          </div>
        </div>

        {/* Organization Structure */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden mb-8">
          <div className="px-6 py-4 bg-gray-50 dark:bg-slate-700 border-b border-gray-200 dark:border-slate-600">
            <h2 className="text-gray-900 dark:text-white">Organization Structure</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-slate-700">
                <tr>
                  <th className="px-6 py-3 text-left text-gray-700 dark:text-gray-200">Designation</th>
                  <th className="px-6 py-3 text-left text-gray-700 dark:text-gray-200">Name</th>
                  <th className="px-6 py-3 text-left text-gray-700 dark:text-gray-200">Division</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
                {organizationData.map((member, index) => (
                  <tr key={index} className="hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                    <td className="px-6 py-4 text-gray-900 dark:text-white">{member.designation}</td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{member.name}</td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{member.division}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Functions */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-sm">
          <h2 className="text-gray-900 dark:text-white mb-6">Main Functions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-gray-900 dark:text-white mb-3">Planning & Development</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>• Assessment of water resources potential</li>
                <li>• Preparation of master plans for river basins</li>
                <li>• Appraisal and clearance of major projects</li>
                <li>• Inter-state water dispute resolution</li>
              </ul>
            </div>
            <div>
              <h3 className="text-gray-900 dark:text-white mb-3">Technical Services</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>• Design and research activities</li>
                <li>• Dam safety monitoring and evaluation</li>
                <li>• Flood forecasting and management</li>
                <li>• Water quality assessment</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
