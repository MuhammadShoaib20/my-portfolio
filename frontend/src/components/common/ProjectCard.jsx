import { Link } from 'react-router-dom';
import { FaGithub, FaExternalLinkAlt, FaEye, FaHeart } from 'react-icons/fa';

const ProjectCard = ({ project }) => {
  const imageUrl = project.image?.trim() || 'https://placehold.co/600x400?text=No+Image';

  return (
    <article className="group card overflow-hidden hover:-translate-y-2 transition-all duration-300">
      <div className="relative aspect-video overflow-hidden">
        <img src={imageUrl} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition">
              <FaGithub />
            </a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition">
              <FaExternalLinkAlt />
            </a>
          )}
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white truncate">{project.title}</h3>
          <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary whitespace-nowrap">
            {project.category}
          </span>
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-4">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies?.slice(0, 4).map((tech, idx) => (
            <span key={idx} className="text-xs px-3 py-1 rounded-full bg-white/30 dark:bg-slate-700/30 border border-white/20 dark:border-slate-600/30 text-slate-700 dark:text-slate-300">
              {tech}
            </span>
          ))}
          {project.technologies?.length > 4 && (
            <span className="text-xs px-3 py-1 rounded-full bg-white/30 dark:bg-slate-700/30 border border-white/20 dark:border-slate-600/30 text-slate-700 dark:text-slate-300">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-white/20 dark:border-slate-700/30">
          <div className="flex gap-3 text-xs text-slate-500 dark:text-slate-500">
            <span className="flex items-center gap-1"><FaEye /> {project.views || 0}</span>
            <span className="flex items-center gap-1"><FaHeart /> {project.likes || 0}</span>
          </div>
          <Link to={`/projects/${project._id}`} className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
            Details →
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;