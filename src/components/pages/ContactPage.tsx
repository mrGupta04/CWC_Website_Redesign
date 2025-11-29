import { PageType } from '../../App';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

interface ContactPageProps {
  onNavigate: (page: PageType) => void;
}

export function ContactPage({ onNavigate }: ContactPageProps) {
  const regionalOffices = [
    {
      region: 'Northern Region',
      address: 'CWC Building, Sector 18-B, Chandigarh - 160018',
      phone: '+91-172-270-4121',
      email: 'ro.chandigarh@cwc.gov.in'
    },
    {
      region: 'Eastern Region',
      address: '34, Belvedere Road, Alipore, Kolkata - 700027',
      phone: '+91-33-2479-1143',
      email: 'ro.kolkata@cwc.gov.in'
    },
    {
      region: 'Western Region',
      address: 'Killa Pardi, Near Daman, Gujarat - 396125',
      phone: '+91-260-232-3101',
      email: 'ro.narmada@cwc.gov.in'
    },
    {
      region: 'Southern Region',
      address: 'CWC Building, K.K. Nagar, Chennai - 600078',
      phone: '+91-44-2374-4136',
      email: 'ro.chennai@cwc.gov.in'
    },
    {
      region: 'Central Region',
      address: 'Ambedkar Bhawan, Link Road No. 1, Bhopal - 462003',
      phone: '+91-755-255-1525',
      email: 'ro.bhopal@cwc.gov.in'
    },
    {
      region: 'North Eastern Region',
      address: 'Housefed Complex, Beltola, Guwahati - 781028',
      phone: '+91-361-226-4624',
      email: 'ro.guwahati@cwc.gov.in'
    },
  ];

  const departments = [
    { name: 'Administration', phone: '+91-11-2610-6597', email: 'admin@cwc.gov.in' },
    { name: 'Flood Forecasting', phone: '+91-11-2610-6598', email: 'flood.cwc@nic.in' },
    { name: 'Dam Safety', phone: '+91-11-2610-6599', email: 'damsafety@cwc.gov.in' },
    { name: 'Water Quality', phone: '+91-11-2610-6600', email: 'waterquality@cwc.gov.in' },
    { name: 'Project Appraisal', phone: '+91-11-2610-6601', email: 'projects@cwc.gov.in' },
    { name: 'IT & Data Services', phone: '+91-11-2610-6602', email: 'data@cwc.gov.in' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 dark:from-blue-950 dark:to-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-white mb-4">Contact Us</h1>
          <p className="text-blue-100 dark:text-blue-200 max-w-3xl">
            Get in touch with us for any queries or information about our services
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-8">
              <h2 className="text-gray-900 dark:text-white mb-6">Send us a Message</h2>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 dark:text-gray-200 mb-2 text-sm">Full Name *</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-200 mb-2 text-sm">Email Address *</label>
                    <input
                      type="email"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 dark:text-gray-200 mb-2 text-sm">Phone Number</label>
                    <input
                      type="tel"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                      placeholder="+91-XXXXX-XXXXX"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-200 mb-2 text-sm">Subject *</label>
                    <select className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400">
                      <option>General Inquiry</option>
                      <option>Project Information</option>
                      <option>Data Request</option>
                      <option>Technical Support</option>
                      <option>Complaint</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-200 mb-2 text-sm">Message *</label>
                  <textarea
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                    placeholder="Type your message here..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full md:w-auto px-8 py-3 bg-blue-600 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* Headquarters Info */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6">
              <h3 className="text-gray-900 dark:text-white mb-4">Headquarters</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                  <div className="text-gray-600 text-sm">
                    Sewa Bhawan (R. Wing),<br />
                    R.K. Puram,<br />
                    New Delhi - 110066
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <div className="text-gray-600 text-sm">+91-11-2610-6597</div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <div className="text-gray-600 text-sm">cechq@cwc.gov.in</div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                  <div className="text-gray-600 text-sm">
                    Monday - Friday<br />
                    9:30 AM - 6:00 PM
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
              <h3 className="text-gray-900 dark:text-white mb-3">Quick Links</h3>
              <div className="space-y-2 text-sm">
                <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 block">RTI Information</button>
                <button className="text-blue-600 hover:text-blue-700 block">Grievance Portal</button>
                <button className="text-blue-600 hover:text-blue-700 block">Public Information Officer</button>
                <button className="text-blue-600 hover:text-blue-700 block">Vigilance Department</button>
              </div>
            </div>
          </div>
        </div>

        {/* Department Contacts */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden mb-8">
          <div className="px-6 py-4 bg-gray-50 dark:bg-slate-700 border-b border-gray-200 dark:border-slate-600">
            <h2 className="text-gray-900 dark:text-white">Department Contacts</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-slate-700">
                <tr>
                  <th className="px-6 py-3 text-left text-gray-700 dark:text-gray-200">Department</th>
                  <th className="px-6 py-3 text-left text-gray-700 dark:text-gray-200">Phone</th>
                  <th className="px-6 py-3 text-left text-gray-700 dark:text-gray-200">Email</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
                {departments.map((dept, index) => (
                  <tr key={index} className="hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                    <td className="px-6 py-4 text-gray-900 dark:text-white">{dept.name}</td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{dept.phone}</td>
                    <td className="px-6 py-4">
                      <a href={`mailto:${dept.email}`} className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                        {dept.email}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Regional Offices */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 dark:bg-slate-700 border-b border-gray-200 dark:border-slate-600">
            <h2 className="text-gray-900 dark:text-white">Regional Offices</h2>
          </div>
          <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200 dark:divide-slate-700">
            {regionalOffices.map((office, index) => (
              <div key={index} className="p-6">
                <h3 className="text-gray-900 dark:text-white mb-3">{office.region}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-gray-400 dark:text-gray-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600 dark:text-gray-300">{office.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-400 dark:text-gray-500 flex-shrink-0" />
                    <span className="text-gray-600 dark:text-gray-300">{office.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-400 dark:text-gray-500 flex-shrink-0" />
                    <a href={`mailto:${office.email}`} className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                      {office.email}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
