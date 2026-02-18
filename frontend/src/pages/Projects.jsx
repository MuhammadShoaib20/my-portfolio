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
    <div className="min-h-screen py-8 sm:py-12">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

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
        <div className="sticky top-16 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 py-3 mb-6 sm:mb-8 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">

          {/* Search Form — full width on mobile, shown on top */}
          <form
            onSubmit={handleSearch}
            className="flex w-full gap-2 mb-3 sm:mb-0 sm:hidden"
          >
            <input
              type="text"
              placeholder="Search projects..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="flex-1 min-w-0 px-4 py-2 rounded-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-sm"
            />
            <button
              type="submit"
              className="px-5 py-2 bg-primary text-white rounded-full font-medium hover:bg-primary-dark transition text-sm whitespace-nowrap flex-shrink-0"
            >
              Search
            </button>
          </form>

          {/* Categories + Search (desktop: side by side, mobile: categories scroll row) */}
          <div className="flex items-center justify-between gap-3">

            {/* Category Pills — horizontal scroll */}
            <div className="flex-1 overflow-x-auto scrollbar-hide -mx-1 px-1">
              <div className="flex gap-2 pb-1">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => handleFilterChange(cat)}
                    className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all flex-shrink-0 ${
                      filter === cat
                        ? 'bg-primary text-white shadow-sm'
                        : 'bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-primary hover:text-white hover:border-primary'
                    }`}
                  >
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Search — hidden on mobile (shown above), visible sm+ */}
            <form
              onSubmit={handleSearch}
              className="hidden sm:flex gap-2 flex-shrink-0"
            >
              <input
                type="text"
                placeholder="Search projects..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-52 lg:w-64 px-4 py-2 rounded-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-sm"
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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