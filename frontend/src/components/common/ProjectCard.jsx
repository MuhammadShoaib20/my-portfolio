import { Link } from 'react-router-dom';
import { FaGithub, FaExternalLinkAlt, FaEye, FaHeart } from 'react-icons/fa';

const ProjectCard = ({ project }) => {
  const imageUrl = project.image?.trim() || 'https://placehold.co/600x400?text=No+Image';

  return (
    <article className="group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 h-full flex flex-col overflow-hidden">

      {/* Image Container */}
      <div className="relative w-full aspect-video overflow-hidden bg-slate-100 dark:bg-slate-700">
        <img
          src={imageUrl}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Hover overlay with action buttons */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition"
              aria-label="View source code"
              onClick={(e) => e.stopPropagation()}
            >
              <FaGithub size={16} />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition"
              aria-label="View live demo"
              onClick={(e) => e.stopPropagation()}
            >
              <FaExternalLinkAlt size={14} />
            </a>
          )}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col">

        {/* Title + Category */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white line-clamp-1 flex-1 min-w-0">
            {project.title}
          </h3>
          <span className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary whitespace-nowrap flex-shrink-0">
            {project.category}
          </span>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-3 sm:mb-4 leading-relaxed">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1.5 mb-3 sm:mb-4">
          {project.technologies?.slice(0, 4).map((tech, idx) => (
            <span
              key={idx}
              className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
            >
              {tech}
            </span>
          ))}
          {project.technologies?.length > 4 && (
            <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400">
              +{project.technologies.length - 4} more
            </span>
          )}
        </div>

        {/* Footer: views/likes + details link */}
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
            className="text-xs sm:text-sm font-medium text-primary hover:underline flex items-center gap-1"
          >
            Details →
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;