import { useState, useEffect, useCallback, useRef } from 'react';
import { projectsAPI } from '../utils/api';
import ProjectCard from '../components/common/ProjectCard';
import toast from 'react-hot-toast';
import { FaSearch, FaTimes } from 'react-icons/fa';

const CATEGORIES = ['all', 'Frontend', 'Full Stack', 'Mobile', 'UI/UX'];

const Projects = () => {
  const [projects,    setProjects]    = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [filter,      setFilter]      = useState('all');
  const [search,      setSearch]      = useState('');
  const [inputVal,    setInputVal]    = useState('');
  const inputRef = useRef(null);

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      const params = {};
      if (filter !== 'all') params.category = filter;
      if (search) params.search = search;
      const res = await projectsAPI.getAll(params);
      setProjects(res.data.projects);
    } catch {
      toast.error('Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  }, [filter, search]);

  useEffect(() => { fetchProjects(); }, [fetchProjects]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(inputVal.trim());
  };

  const clearSearch = () => {
    setInputVal('');
    setSearch('');
    inputRef.current?.focus();
  };

  const handleFilter = (cat) => {
    setFilter(cat);
    setSearch('');
    setInputVal('');
  };

  return (
    <div className="min-h-screen section-padding w-full overflow-x-hidden">
      <div className="container-custom">

        {/* ── Header ── */}
        <header className="text-center mb-8 sm:mb-12">
          <h1 className="section-heading">Selected Projects</h1>
          <p className="section-subheading">
            Explore my recent work and case studies
          </p>
        </header>

        {/* ── Sticky filter bar ── */}
        <div
          className="sticky top-14 sm:top-16 z-40
                     bg-white/90 dark:bg-slate-900/90 backdrop-blur-md
                     border-b border-slate-200 dark:border-slate-700
                     py-3 -mx-4 sm:-mx-6 lg:-mx-8
                     px-4 sm:px-6 lg:px-8 mb-8"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">

            {/* Category pills – horizontal scroll on mobile */}
            <div
              className="w-full sm:w-auto overflow-x-auto scrollbar-hide -mx-1 px-1"
              role="tablist"
              aria-label="Filter by category"
            >
              <div className="flex gap-2 pb-0.5">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    role="tab"
                    aria-selected={filter === cat}
                    onClick={() => handleFilter(cat)}
                    className={`flex-shrink-0 min-h-[40px] px-4 py-2 rounded-full
                                text-xs sm:text-sm font-medium whitespace-nowrap
                                transition-all duration-200
                                focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1
                                ${filter === cat
                                  ? 'bg-primary text-white shadow-md'
                                  : 'bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:border-primary hover:text-primary'
                                }`}
                  >
                    {cat === 'all' ? 'All' : cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Search */}
            <form
              onSubmit={handleSearch}
              className="flex w-full sm:w-auto gap-2"
              role="search"
            >
              <div className="relative flex-1 sm:w-56 lg:w-64">
                <FaSearch
                  size={13}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  ref={inputRef}
                  type="search"
                  placeholder="Search projects…"
                  value={inputVal}
                  onChange={e => setInputVal(e.target.value)}
                  aria-label="Search projects"
                  className="w-full min-h-[40px] pl-9 pr-8 py-2 rounded-full
                             bg-white dark:bg-slate-800
                             border border-slate-300 dark:border-slate-600
                             text-slate-900 dark:text-white placeholder-slate-400
                             text-xs sm:text-sm
                             focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary
                             transition duration-150"
                />
                {inputVal && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    aria-label="Clear search"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2
                               text-slate-400 hover:text-slate-600
                               min-w-[24px] min-h-[24px] flex items-center justify-center"
                  >
                    <FaTimes size={11} />
                  </button>
                )}
              </div>
              <button
                type="submit"
                className="min-h-[40px] px-4 sm:px-5 py-2
                           bg-primary text-white rounded-full text-xs sm:text-sm font-medium
                           hover:bg-primary-dark transition-colors duration-150
                           focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1
                           whitespace-nowrap"
              >
                Search
              </button>
            </form>
          </div>
        </div>

        {/* ── Grid ── */}
        {loading ? (
          <div
            className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
            aria-label="Loading projects"
            aria-busy="true"
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="skeleton h-64 sm:h-72 lg:h-80" />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-16 sm:py-24">
            <p className="text-fluid-lg font-semibold text-slate-600 dark:text-slate-400 mb-2">
              No projects found
            </p>
            <p className="text-slate-500 dark:text-slate-500 text-sm">
              Try adjusting your filters or search term.
            </p>
          </div>
        ) : (
          <ul
            className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
            aria-label={`${projects.length} projects`}
          >
            {projects.map((project, idx) => (
              <li key={project._id} className="animate-fade-up" style={{ animationDelay: `${idx * 50}ms` }}>
                <ProjectCard project={project} />
              </li>
            ))}
          </ul>
        )}

      </div>
    </div>
  );
};

export default Projects;