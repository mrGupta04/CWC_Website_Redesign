import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Youtube } from 'lucide-react';
import { PageType } from '../App';

interface FooterProps {
  onNavigate: (page: PageType) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const quickLinks = [
    { label: 'About CWC', page: 'about' as PageType },
    { label: 'Organization Structure', page: 'about' as PageType },
    { label: 'Acts & Rules', page: 'about' as PageType },
    { label: 'RTI', page: 'about' as PageType },
    { label: 'Citizen Charter', page: 'about' as PageType },
    { label: 'Vigilance', page: 'about' as PageType },
  ];

  const services = [
    { label: 'Flood Forecasting', page: 'flood-alerts' as PageType },
    { label: 'Dam Safety', page: 'projects' as PageType },
    { label: 'Water Quality', page: 'water-data' as PageType },
    { label: 'Basin Planning', page: 'basin-maps' as PageType },
    { label: 'Data Services', page: 'data-reports' as PageType },
    { label: 'Technical Support', page: 'contact' as PageType },
  ];

  const resources = [
    { label: 'Annual Reports', page: 'publications' as PageType },
    { label: 'Publications', page: 'publications' as PageType },
    { label: 'Guidelines', page: 'publications' as PageType },
    { label: 'Tenders', page: 'tenders' as PageType },
    { label: 'Careers', page: 'careers' as PageType },
    { label: 'Gallery', page: 'home' as PageType },
  ];

  const handleNavClick = (page: PageType) => {
    onNavigate(page);
    window.scrollTo(0, 0);
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-white mb-4">Central Water Commission</h3>
            <p className="text-gray-400 text-sm mb-4">
              A premier technical organization working in the field of water resources 
              development and management in India.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-400 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button 
                    onClick={() => handleNavClick(link.page)}
                    className="text-gray-400 hover:text-white transition-colors text-sm text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white mb-4">Our Services</h4>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index}>
                  <button 
                    onClick={() => handleNavClick(service.page)}
                    className="text-gray-400 hover:text-white transition-colors text-sm text-left"
                  >
                    {service.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-blue-400 flex-shrink-0 mt-1" />
                <p className="text-gray-400 text-sm">
                  Sewa Bhawan, R.K. Puram<br />
                  New Delhi - 110066
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <p className="text-gray-400 text-sm">+91-11-2610-6597</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <p className="text-gray-400 text-sm">cechq@cwc.gov.in</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © 2024 Central Water Commission. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                Terms of Use
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                Accessibility
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}