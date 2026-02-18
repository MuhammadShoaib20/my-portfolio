import { useState, useEffect, useCallback, useRef } from 'react';
import { projectsAPI } from '../utils/api';
import ProjectCard from '../components/common/ProjectCard';
import toast from 'react-hot-toast';

const categories = ['All', 'Frontend', 'Full Stack', 'Mobile', 'UI/UX'];

// Animated counter for project count
const AnimatedCount = ({ count }) => {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (count === 0) return;
    let start = 0;
    const step = Math.ceil(count / 20);
    const timer = setInterval(() => {
      start += step;
      if (start >= count) { setDisplay(count); clearInterval(timer); }
      else setDisplay(start);
    }, 30);
    return () => clearInterval(timer);
  }, [count]);
  return <span>{display}</span>;
};

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [visible, setVisible] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  const fetchProjects = useCallback(async (searchTerm = search) => {
    try {
      setLoading(true);
      const params = {};
      if (filter !== 'All') params.category = filter;
      if (searchTerm) params.search = searchTerm;
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
    setSearch(searchInput);
  };

  const handleFilterChange = (cat) => {
    setFilter(cat);
    setSearch('');
    setSearchInput('');
  };

  const clearAll = () => {
    setFilter('All');
    setSearch('');
    setSearchInput('');
    searchRef.current?.focus();
  };

  const hasActiveFilter = filter !== 'All' || search;

  return (
    <div
      className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Fonts & custom styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,700;1,9..40,300&family=Bebas+Neue&display=swap');

        .font-display { font-family: 'Bebas Neue', cursive; }

        .card-hover {
          transition: transform 0.4s cubic-bezier(0.23,1,0.32,1),
                      box-shadow 0.4s cubic-bezier(0.23,1,0.32,1);
        }
        .card-hover:hover {
          transform: translateY(-8px) scale(1.01);
          box-shadow: 0 32px 64px -12px rgba(99,102,241,0.25);
        }

        .pill-btn { transition: all 0.25s cubic-bezier(0.23,1,0.32,1); }

        .skeleton-shimmer {
          background: linear-gradient(90deg,#1a1a2e 25%,#22223a 50%,#1a1a2e 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }
        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        .stagger-in {
          animation: fadeUp 0.5s cubic-bezier(0.23,1,0.32,1) both;
        }
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(24px); }
          to   { opacity:1; transform:translateY(0); }
        }

        .glow-ring:focus {
          outline: none;
          box-shadow: 0 0 0 2px rgba(99,102,241,0.6);
        }

        .no-scrollbar::-webkit-scrollbar { display:none; }
        .no-scrollbar { -ms-overflow-style:none; scrollbar-width:none; }

        /* Subtle noise texture */
        .noise-layer::before {
          content:'';
          position:fixed;
          inset:0;
          pointer-events:none;
          opacity:0.025;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size:200px;
          z-index:9999;
        }
      `}</style>

      <div className="noise-layer" />

      {/* ── HERO ── */}
      <div className="relative pt-24 pb-16 px-6">
        {/* Background glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-indigo-600/10 blur-[120px] pointer-events-none" />
        <div className="absolute top-20 right-1/4 w-[300px] h-[300px] rounded-full bg-violet-500/8 blur-[100px] pointer-events-none" />

        <div className="max-w-6xl mx-auto">
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(32px)',
              transition: 'opacity 0.7s ease, transform 0.7s ease',
            }}
          >
            {/* Tag */}
            <div className="flex items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.2em] uppercase text-indigo-400 bg-indigo-400/10 border border-indigo-400/20 px-3 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                Portfolio
              </span>
            </div>

            {/* Heading + counter */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-4">
              <h1
                className="leading-none tracking-tight text-white"
                style={{
                  fontFamily: "'Bebas Neue', cursive",
                  fontSize: 'clamp(4rem,12vw,9rem)',
                }}
              >
                SELECTED
                <br />
                <span
                  style={{
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundImage: 'linear-gradient(to right, #818cf8, #a78bfa, #c084fc)',
                    backgroundClip: 'text',
                  }}
                >
                  WORK
                </span>
              </h1>

              {!loading && (
                <div className="flex items-end gap-6 pb-3">
                  <div className="text-right">
                    <div
                      className="text-white leading-none"
                      style={{ fontFamily: "'Bebas Neue', cursive", fontSize: '3rem' }}
                    >
                      <AnimatedCount count={projects.length} />
                    </div>
                    <div className="text-xs text-slate-500 tracking-widest uppercase mt-1">Projects</div>
                  </div>
                </div>
              )}
            </div>

            <p className="text-slate-400 text-lg font-light max-w-xl leading-relaxed">
              Explore my recent work, case studies, and experiments in design &amp; development.
            </p>
          </div>
        </div>
      </div>

      {/* ── STICKY FILTER BAR ── */}
      <div className="sticky top-0 z-50 border-b border-white/5 bg-[#0a0a0f]/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">

          {/* Category pills */}
          <div className="flex gap-2 no-scrollbar overflow-x-auto flex-shrink-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleFilterChange(cat)}
                aria-pressed={filter === cat}
                className={`pill-btn flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium border
                  ${filter === cat
                    ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/25'
                    : 'border-white/10 text-slate-400 hover:text-white hover:border-white/20 bg-white/5'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className="hidden sm:block h-6 w-px bg-white/10 flex-shrink-0" />

          {/* Search form */}
          <form onSubmit={handleSearch} className="flex gap-2 w-full sm:w-auto flex-1">
            <div className="relative flex-1 sm:w-72">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
              <input
                ref={searchRef}
                type="text"
                placeholder="Search projects…"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                aria-label="Search projects"
                className="glow-ring w-full pl-10 pr-4 py-2 rounded-full bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm hover:border-white/20 transition-colors"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-full transition-colors whitespace-nowrap shadow-lg shadow-indigo-500/20"
            >
              Search
            </button>

            {hasActiveFilter && (
              <button
                type="button"
                onClick={clearAll}
                title="Clear all filters"
                className="px-3 py-2 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-white/20 transition-colors text-sm"
              >
                ✕
              </button>
            )}
          </form>
        </div>

        {/* Active filter chips */}
        {hasActiveFilter && (
          <div className="max-w-6xl mx-auto px-6 pb-3 flex items-center gap-2 text-xs text-slate-500">
            <span>Filtering by:</span>
            {filter !== 'All' && (
              <span className="px-2 py-0.5 rounded-full bg-indigo-600/20 text-indigo-300 border border-indigo-500/30">
                {filter}
              </span>
            )}
            {search && (
              <span className="px-2 py-0.5 rounded-full bg-violet-600/20 text-violet-300 border border-violet-500/30">
                "{search}"
              </span>
            )}
          </div>
        )}
      </div>

      {/* ── CONTENT ── */}
      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* Skeletons */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-80 rounded-2xl skeleton-shimmer border border-white/5"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && projects.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 text-center stagger-in">
            <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
              <svg className="w-9 h-9 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No projects found</h3>
            <p className="text-slate-500 mb-8 max-w-xs">
              We couldn't find any projects matching your current filters or search term.
            </p>
            <button
              onClick={clearAll}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-full transition-colors text-sm shadow-lg shadow-indigo-500/20"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Project grid */}
        {!loading && projects.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <div
                key={project._id}
                className="card-hover stagger-in"
                style={{ animationDelay: `${i * 0.07}s` }}
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── FOOTER ACCENT ── */}
      <div className="max-w-6xl mx-auto px-6 py-12 mt-6 border-t border-white/5 flex items-center justify-between">
        <span
          className="text-white/20 tracking-widest text-2xl"
          style={{ fontFamily: "'Bebas Neue', cursive" }}
        >
          PORTFOLIO
        </span>
        <span className="text-slate-600 text-xs">{new Date().getFullYear()} · All rights reserved</span>
      </div>
    </div>
  );
};

export default Projects;