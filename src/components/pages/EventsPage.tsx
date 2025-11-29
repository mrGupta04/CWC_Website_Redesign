import { PageType } from '../../App';
import { Calendar, MapPin, Users, ExternalLink } from 'lucide-react';

interface EventsPageProps {
  onNavigate: (page: PageType) => void;
}

export function EventsPage({ onNavigate }: EventsPageProps) {
  const upcomingEvents = [
    {
      title: 'National Water Conference 2024',
      date: '15-17 December 2024',
      location: 'Vigyan Bhawan, New Delhi',
      type: 'Conference',
      attendees: '500+ Expected',
      description: 'Annual conference on sustainable water resource management and climate adaptation',
      status: 'Registration Open'
    },
    {
      title: 'Workshop on Dam Safety Assessment',
      date: '5-6 December 2024',
      location: 'CWC Headquarters, New Delhi',
      type: 'Workshop',
      attendees: '100 Participants',
      description: 'Technical workshop on modern dam safety monitoring techniques and risk assessment',
      status: 'Registration Open'
    },
    {
      title: 'Flood Forecasting Training Program',
      date: '28-30 November 2024',
      location: 'Regional Office, Patna',
      type: 'Training',
      attendees: '50 Participants',
      description: 'Capacity building program for state officials on flood forecasting systems',
      status: 'Registration Closing Soon'
    },
    {
      title: 'International Symposium on River Basin Management',
      date: '20-22 January 2025',
      location: 'India Habitat Centre, New Delhi',
      type: 'Symposium',
      attendees: '300+ Expected',
      description: 'Global experts discussing integrated river basin management approaches',
      status: 'Coming Soon'
    },
  ];

  const pastEvents = [
    {
      title: 'World Water Day Celebration 2024',
      date: '22 March 2024',
      location: 'New Delhi',
      attendees: '200+'
    },
    {
      title: 'Technical Seminar on Groundwater Management',
      date: '15 October 2024',
      location: 'Jaipur',
      attendees: '150'
    },
    {
      title: 'Climate Change Adaptation Workshop',
      date: '8 September 2024',
      location: 'Mumbai',
      attendees: '120'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-white mb-4">Events & Conferences</h1>
          <p className="text-blue-100 max-w-3xl">
            Join us for conferences, workshops, and training programs on water resource management
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Upcoming Events */}
        <div className="mb-12">
          <h2 className="text-gray-900 mb-6">Upcoming Events</h2>
          <div className="space-y-6">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 bg-blue-100 rounded-lg flex flex-col items-center justify-center">
                        <Calendar className="w-8 h-8 text-blue-600 mb-1" />
                        <span className="text-blue-600 text-xs">{event.date.split(' ')[0]}</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-gray-900">{event.title}</h3>
                        <span className={`px-3 py-1 text-xs rounded-full flex-shrink-0 ml-4 ${
                          event.status === 'Registration Open' ? 'bg-green-100 text-green-700' :
                          event.status === 'Registration Closing Soon' ? 'bg-orange-100 text-orange-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {event.status}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4">{event.description}</p>
                      <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center gap-2 text-gray-600 text-sm">
                          <Calendar className="w-4 h-4 flex-shrink-0" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 text-sm">
                          <MapPin className="w-4 h-4 flex-shrink-0" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 text-sm">
                          <Users className="w-4 h-4 flex-shrink-0" />
                          <span>{event.attendees}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded">
                          {event.type}
                        </span>
                        {event.status === 'Registration Open' && (
                          <button className="px-4 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors flex items-center gap-1">
                            Register Now
                            <ExternalLink className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Past Events */}
        <div>
          <h2 className="text-gray-900 mb-6">Past Events</h2>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-gray-700">Event Name</th>
                  <th className="px-6 py-3 text-left text-gray-700">Date</th>
                  <th className="px-6 py-3 text-left text-gray-700">Location</th>
                  <th className="px-6 py-3 text-left text-gray-700">Attendees</th>
                  <th className="px-6 py-3 text-left text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {pastEvents.map((event, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-gray-900">{event.title}</td>
                    <td className="px-6 py-4 text-gray-600">{event.date}</td>
                    <td className="px-6 py-4 text-gray-600">{event.location}</td>
                    <td className="px-6 py-4 text-gray-600">{event.attendees}</td>
                    <td className="px-6 py-4">
                      <button className="text-blue-600 hover:text-blue-700 text-sm">
                        View Report
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Event Calendar Note */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-gray-900 mb-3">Event Calendar 2025</h3>
          <p className="text-gray-700 text-sm mb-3">
            Complete event calendar for 2025 will be published in December 2024. Subscribe to our newsletter to receive updates about upcoming events and registration deadlines.
          </p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
            Subscribe to Newsletter
          </button>
        </div>
      </div>
    </div>
  );
}
