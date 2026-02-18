import { Link } from 'react-router-dom';
import { FaGithub, FaExternalLinkAlt, FaEye, FaHeart } from 'react-icons/fa';

const ProjectCard = ({ project }) => {
  const imageUrl = project.image?.trim() || 'https://placehold.co/600x400?text=No+Image';

  return (
    <article className="group w-full max-w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col overflow-hidden box-border">

      {/* Image */}
      <div className="relative w-full overflow-hidden bg-slate-100 dark:bg-slate-700" style={{ aspectRatio: '16/9' }}>
        <img
          src={imageUrl}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 bg-white rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition"
              aria-label="View source code"
              onClick={(e) => e.stopPropagation()}
            >
              <FaGithub size={15} />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 bg-white rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition"
              aria-label="View live demo"
              onClick={(e) => e.stopPropagation()}
            >
              <FaExternalLinkAlt size={13} />
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Title + Category Badge */}
        <div className="flex items-start gap-2 mb-2 min-w-0 overflow-hidden">
          <h3 className="flex-1 min-w-0 text-base font-semibold text-slate-900 dark:text-white truncate">
            {project.title}
          </h3>
          <span className="flex-shrink-0 text-xs px-2 py-1 rounded-full bg-primary/10 text-primary leading-none whitespace-nowrap">
            {project.category}
          </span>
        </div>

        {/* Description */}
        <p className="w-full text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mb-3 leading-relaxed break-words overflow-hidden">
          {project.description}
        </p>

        {/* Tech Badges — show max 3 to prevent overflow */}
        <div className="flex flex-wrap gap-1.5 mb-3 overflow-hidden">
          {project.technologies?.slice(0, 3).map((tech, idx) => (
            <span
              key={idx}
              className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 whitespace-nowrap"
            >
              {tech}
            </span>
          ))}
          {project.technologies?.length > 3 && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 whitespace-nowrap">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-700 mt-auto">
          <div className="flex gap-3 text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1">
              <FaEye size={11} /> {project.views || 0}
            </span>
            <span className="flex items-center gap-1">
              <FaHeart size={11} /> {project.likes || 0}
            </span>
          </div>
          <Link
            to={`/projects/${project._id}`}
            className="text-xs font-medium text-primary hover:underline flex-shrink-0"
          >
            Details →
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;