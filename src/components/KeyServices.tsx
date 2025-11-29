import { ImageWithFallback } from './figma/ImageWithFallback';
import { Database, LineChart, Shield, BookOpen } from 'lucide-react';

export function KeyServices() {
  const services = [
    {
      icon: Database,
      title: 'Hydrological Data',
      description: 'Comprehensive database of water resources, rainfall, and river flow data across India.',
      image: 'https://images.unsplash.com/photo-1707989654953-4b4db329eaa1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyaXZlciUyMHdhdGVyJTIwZmxvd2luZ3xlbnwxfHx8fDE3NjM4OTA3MDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      icon: LineChart,
      title: 'Flood Forecasting',
      description: 'Advanced flood forecasting and early warning systems to protect lives and property.',
      image: 'https://images.unsplash.com/photo-1760775850558-68e24f4c621f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMG1hbmFnZW1lbnQlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc2Mzg5MDcwNHww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      icon: Shield,
      title: 'Dam Safety',
      description: 'Monitoring and ensuring the safety of dams and water infrastructure nationwide.',
      image: 'https://images.unsplash.com/photo-1736781855659-19f11610ad00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYW0lMjB3YXRlciUyMGluZnJhc3RydWN0dXJlfGVufDF8fHx8MTc2Mzg5MDcwM3ww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      icon: BookOpen,
      title: 'Technical Guidelines',
      description: 'Comprehensive guidelines and standards for water resource development projects.',
      image: 'https://images.unsplash.com/photo-1707989654953-4b4db329eaa1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyaXZlciUyMHdhdGVyJTIwZmxvd2luZ3xlbnwxfHx8fDE3NjM4OTA3MDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  return (
    <div className="bg-gray-100 dark:bg-slate-900 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-gray-900 dark:text-white mb-4">Key Services & Functions</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Providing essential services for sustainable water resource management and development
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all group cursor-pointer"
            >
              <div className="flex flex-col sm:flex-row">
                <div className="sm:w-1/3 h-48 sm:h-auto relative overflow-hidden">
                  <ImageWithFallback
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent" />
                </div>
                <div className="sm:w-2/3 p-6">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                    <service.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{service.description}</p>
                  <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                    Learn More →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
