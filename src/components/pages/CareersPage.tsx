import { PageType } from '../../App';
import { Briefcase, MapPin, Clock, GraduationCap } from 'lucide-react';

interface CareersPageProps {
  onNavigate: (page: PageType) => void;
}

export function CareersPage({ onNavigate }: CareersPageProps) {
  const openings = [
    {
      position: 'Senior Civil Engineer',
      department: 'Design & Research Wing',
      location: 'New Delhi',
      type: 'Full-time',
      experience: '8-12 years',
      qualification: 'B.Tech/M.Tech in Civil Engineering',
      openings: 5,
      lastDate: '15-Dec-2024'
    },
    {
      position: 'Hydrologist',
      department: 'Water Planning Wing',
      location: 'Mumbai',
      type: 'Full-time',
      experience: '5-8 years',
      qualification: 'M.Sc/M.Tech in Hydrology',
      openings: 3,
      lastDate: '20-Dec-2024'
    },
    {
      position: 'Data Analyst',
      department: 'Information Systems',
      location: 'New Delhi',
      type: 'Contract',
      experience: '3-5 years',
      qualification: 'B.Tech/M.Tech in Computer Science',
      openings: 4,
      lastDate: '10-Dec-2024'
    },
    {
      position: 'Environmental Scientist',
      department: 'Water Quality Wing',
      location: 'Bangalore',
      type: 'Full-time',
      experience: '5-10 years',
      qualification: 'M.Sc/Ph.D in Environmental Science',
      openings: 2,
      lastDate: '18-Dec-2024'
    },
    {
      position: 'Assistant Engineer',
      department: 'River Management',
      location: 'Kolkata',
      type: 'Full-time',
      experience: '2-4 years',
      qualification: 'B.Tech in Civil Engineering',
      openings: 8,
      lastDate: '25-Dec-2024'
    },
    {
      position: 'GIS Specialist',
      department: 'Basin Planning',
      location: 'Pune',
      type: 'Full-time',
      experience: '4-7 years',
      qualification: 'M.Tech/M.Sc in GIS/Remote Sensing',
      openings: 3,
      lastDate: '22-Dec-2024'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-white mb-4">Career Opportunities</h1>
          <p className="text-blue-100 max-w-3xl">
            Join India's premier water resource management organization and contribute to nation building
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="text-gray-600 mb-1">Open Positions</div>
            <div className="text-gray-900">25</div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="text-gray-600 mb-1">Total Vacancies</div>
            <div className="text-gray-900">87</div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="text-gray-600 mb-1">Departments</div>
            <div className="text-gray-900">12</div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="text-gray-600 mb-1">Locations</div>
            <div className="text-gray-900">15+</div>
          </div>
        </div>

        {/* Job Listings */}
        <div className="space-y-4 mb-8">
          {openings.map((job, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Briefcase className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-gray-900 mb-1">{job.position}</h3>
                      <p className="text-gray-600 mb-2">{job.department}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{job.type}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <GraduationCap className="w-4 h-4" />
                          <span>{job.experience}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded">
                      {job.qualification}
                    </span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded">
                      {job.openings} {job.openings === 1 ? 'Opening' : 'Openings'}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    Last Date: <span className="text-red-600">{job.lastDate}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Apply Now
                  </button>
                  <button className="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recruitment Process */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <h2 className="text-gray-900 mb-6">Recruitment Process</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600">1</span>
              </div>
              <h3 className="text-gray-900 mb-2">Application</h3>
              <p className="text-gray-600 text-sm">Submit online application with required documents</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600">2</span>
              </div>
              <h3 className="text-gray-900 mb-2">Screening</h3>
              <p className="text-gray-600 text-sm">Shortlisting based on eligibility criteria</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600">3</span>
              </div>
              <h3 className="text-gray-900 mb-2">Written Test</h3>
              <p className="text-gray-600 text-sm">Technical and aptitude assessment</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600">4</span>
              </div>
              <h3 className="text-gray-900 mb-2">Interview</h3>
              <p className="text-gray-600 text-sm">Final selection interview</p>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-xl p-8">
          <h2 className="text-white mb-6">Why Join CWC?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-white mb-2">Competitive Benefits</h3>
              <p className="text-blue-100 text-sm">Central Government pay scales with HRA, medical benefits, and pension</p>
            </div>
            <div>
              <h3 className="text-white mb-2">Career Growth</h3>
              <p className="text-blue-100 text-sm">Clear career progression and opportunities for professional development</p>
            </div>
            <div>
              <h3 className="text-white mb-2">Work-Life Balance</h3>
              <p className="text-blue-100 text-sm">Government holidays, leave benefits, and flexible working arrangements</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
