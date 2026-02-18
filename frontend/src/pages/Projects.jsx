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
  };

  const handleFilterChange = (cat) => {
    setFilter(cat);
    setSearch('');
    setSearchInput('');
  };

  return (
    <div className="py-6 sm:py-10 w-full">
      <div className="w-full">

        {/* Header */}
        <div className="text-center mb-6 sm:mb-10">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-4">
            Selected Projects
          </h1>
          <p className="text-sm sm:text-lg text-slate-600 dark:text-slate-400">
            Explore my recent work and case studies
          </p>
        </div>

        {/* Sticky Filter + Search Bar */}
        <div className="sticky top-16 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 py-3 mb-6 sm:mb-8 overflow-hidden w-full">

          {/* Search Form — full width on mobile */}
          <form
            onSubmit={handleSearch}
            className="flex w-full gap-2 mb-3 sm:hidden"
          >
            <input
              type="text"
              placeholder="Search projects..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="flex-1 min-w-0 px-3 py-2 rounded-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-sm"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-full font-medium hover:bg-primary-dark transition text-sm whitespace-nowrap flex-shrink-0"
            >
              Search
            </button>
          </form>

          {/* Category Pills — full width horizontal scroll, no right-side overflow */}
          <div className="flex items-center gap-3">
            <div className="flex-1 min-w-0 overflow-x-auto scrollbar-hide">
              <div className="flex gap-2 pb-1 pr-1">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => handleFilterChange(cat)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all flex-shrink-0 border ${
                      filter === cat
                        ? 'bg-primary text-white border-primary shadow-sm'
                        : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-primary hover:text-white hover:border-primary'
                    }`}
                  >
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Search — only on sm+ screens */}
            <form
              onSubmit={handleSearch}
              className="hidden sm:flex gap-2 flex-shrink-0"
            >
              <input
                type="text"
                placeholder="Search projects..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-48 lg:w-64 px-4 py-2 rounded-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-sm"
              />
              <button
                type="submit"
                className="px-5 py-2 bg-primary text-white rounded-full font-medium hover:bg-primary-dark transition text-sm whitespace-nowrap"
              >
                Search
              </button>
            </form>
          </div>
        </div>

        {/* Project Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-64 sm:h-80 rounded-2xl bg-slate-200 dark:bg-slate-700 animate-pulse"
              />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20 text-slate-500 dark:text-slate-400">
            <h3 className="text-xl font-semibold mb-2">No projects found</h3>
            <p className="text-sm">Try adjusting your filters or search term.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full">
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