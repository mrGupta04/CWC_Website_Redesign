import { PageType } from '../../App';
import { Search, Filter, X } from 'lucide-react';
import { useState, useMemo } from 'react';
import projectsData from '../../data/projectsData.json';

interface ProjectsPageProps {
  onNavigate: (page: PageType) => void;
}

interface Project {
  id: string;
  name: string;
  state: string;
  status: string;
  budget: string;
  completion: string;
  description?: string;
}

export function ProjectsPage({ onNavigate }: ProjectsPageProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const projects: Project[] = projectsData;

  // Elastic-like search functionality with useMemo for performance
  const filteredProjects = useMemo(() => {
    if (!searchQuery.trim()) return projects;

    const searchTerms = searchQuery.toLowerCase().trim().split(/\s+/);
    console.log('Search terms:', searchTerms);
    
    const filtered = projects.filter((project: Project) => {
      // Combine all searchable fields into a single string
      const searchableContent = [
        project.id,
        project.name,
        project.state,
        project.status,
        project.budget,
        project.completion,
        project.description || ''
      ].join(' ').toLowerCase();

      // Check if all search terms are present (AND logic)
      const matches = searchTerms.every(term => searchableContent.includes(term));
      return matches;
    }).sort((a: Project, b: Project) => {
      // Score-based ranking: projects matching in name get higher priority
      const aNameMatch = a.name.toLowerCase().includes(searchQuery.toLowerCase());
      const bNameMatch = b.name.toLowerCase().includes(searchQuery.toLowerCase());
      
      if (aNameMatch && !bNameMatch) return -1;
      if (!aNameMatch && bNameMatch) return 1;
      
      // Secondary sort by ID
      return a.id.localeCompare(b.id);
    });
    
    console.log('Filtered projects:', filtered.length, 'out of', projects.length);
    return filtered;
  }, [projects, searchQuery]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 dark:from-blue-950 dark:to-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-white mb-4">Major Water Resource Projects</h1>
          <p className="text-blue-100 dark:text-blue-200 max-w-3xl">
            Monitoring and implementation of major and medium irrigation, multipurpose, and hydroelectric projects across India
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Filters */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
                <input
                  type="text"
                  placeholder="Search by name, state, status, or ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
            <button className="flex items-center justify-center gap-2 px-6 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors">
              <Filter className="w-5 h-5" />
              <span>Filter</span>
            </button>
          </div>
          {searchQuery && (
            <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              Searching for: <span className="font-semibold text-blue-600 dark:text-blue-400">"{searchQuery}"</span>
              {' '}- Found {filteredProjects.length} result{filteredProjects.length !== 1 ? 's' : ''}
            </div>
          )}
        </div>

        {/* Projects Table */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 dark:bg-slate-700 border-b border-gray-200 dark:border-slate-600">
            <h2 className="text-gray-900 dark:text-white">
              All Projects {searchQuery && `(${filteredProjects.length} results)`}
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-slate-700">
                <tr>
                  <th className="px-6 py-3 text-left text-gray-700 dark:text-gray-300">Project ID</th>
                  <th className="px-6 py-3 text-left text-gray-700 dark:text-gray-300">Project Name</th>
                  <th className="px-6 py-3 text-left text-gray-700 dark:text-gray-300">State</th>
                  <th className="px-6 py-3 text-left text-gray-700 dark:text-gray-300">Status</th>
                  <th className="px-6 py-3 text-left text-gray-700 dark:text-gray-300">Budget</th>
                  <th className="px-6 py-3 text-left text-gray-700 dark:text-gray-300">Completion</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-slate-600">
                {filteredProjects.length > 0 ? (
                  filteredProjects.map((project: Project, index: number) => (
                    <tr key={index} className="hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{project.id}</td>
                      <td className="px-6 py-4 text-gray-900 dark:text-white">{project.name}</td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{project.state}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                          project.status === 'Completed' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' :
                          project.status === 'Ongoing' || project.status === 'Under Construction' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' :
                          'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                        }`}>
                          {project.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{project.budget}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 dark:bg-slate-600 rounded-full h-2">
                            <div 
                              className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full" 
                              style={{ width: project.completion }}
                            />
                          </div>
                          <span className="text-sm text-gray-600 dark:text-gray-400">{project.completion}</span>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                      No projects found matching "{searchQuery}"
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Project Stats */}
        <div className="grid md:grid-cols-4 gap-6 mt-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6">
            <div className="text-white mb-2">{projects.length}</div>
            <div className="text-blue-100">Total Projects</div>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-6">
            <div className="text-white mb-2">{projects.filter(p => p.status === 'Completed').length}</div>
            <div className="text-green-100">Completed</div>
          </div>
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl p-6">
            <div className="text-white mb-2">{projects.filter(p => p.status === 'Ongoing' || p.status === 'Under Construction').length}</div>
            <div className="text-orange-100">Ongoing</div>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-6">
            <div className="text-white mb-2">{projects.filter(p => p.status === 'Planning').length}</div>
            <div className="text-purple-100">In Planning</div>
          </div>
        </div>
      </div>
    </div>
  );
}
