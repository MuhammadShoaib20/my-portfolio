import { useState, useEffect, useCallback } from 'react';
import { projectsAPI } from '../utils/api';
import ProjectCard from '../components/common/ProjectCard';
import toast from 'react-hot-toast';

const categories = ['all', 'Frontend', 'Full Stack', 'Mobile', 'UI/UX'];

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');

  const fetchProjects = useCallback(async (searchTerm = search) => {
    try {
      setLoading(true);
      const params = {};
      if (filter !== 'all') params.category = filter;
      if (searchTerm) params.search = searchTerm;
      const res = await projectsAPI.getAll(params);
      setProjects(res.data.projects);
    } catch (error) {
      toast.error('Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  }, [filter, search]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchInput);
    // fetchProjects will be called because `search` changed, triggering useEffect
  };

  const handleFilterChange = (cat) => {
    setFilter(cat);
    setSearch('');
    setSearchInput('');
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Selected Projects</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">Explore my recent work and case studies</p>
        </div>

        {/* Sticky Filter Bar */}
        <div className="sticky top-16 z-40 backdrop-blur-md bg-white/70 dark:bg-slate-900/70 border-b border-white/20 dark:border-slate-700/30 py-4 mb-8">
          <div className="container-custom flex flex-wrap items-center justify-between gap-4">
            {/* Category filters - horizontal scroll on mobile */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide w-full md:w-auto">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => handleFilterChange(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition flex-shrink-0 ${
                    filter === cat
                      ? 'bg-primary text-white'
                      : 'bg-white/30 dark:bg-slate-800/30 backdrop-blur-sm border border-white/20 dark:border-slate-700/30 text-slate-600 dark:text-slate-300 hover:bg-primary hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search form */}
            <form onSubmit={handleSearch} className="flex w-full sm:w-auto gap-2">
              <input
                type="text"
                placeholder="Search projects..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="flex-1 sm:w-64 px-4 py-2 rounded-full bg-white/30 dark:bg-slate-800/30 backdrop-blur-sm border border-white/20 dark:border-slate-700/30 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:border-primary"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-primary text-white rounded-full font-medium hover:bg-primary-dark transition"
              >
                Search
              </button>
            </form>
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-80 rounded-2xl bg-white/30 dark:bg-slate-800/30 backdrop-blur-sm border border-white/20 dark:border-slate-700/30 animate-pulse"></div>
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20 text-slate-500 dark:text-slate-500">
            <h3 className="text-xl font-semibold mb-2">No projects found</h3>
            <p>Try adjusting your filters or search term.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map(project => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;