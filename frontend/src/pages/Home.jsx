import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { profileAPI } from '../utils/api';
import ResumeDownloadButton from '../components/common/ResumeDownloadButton';
import {
  FaArrowRight,
  FaGithub, FaLinkedin, FaTwitter,
  FaFacebook, FaInstagram, FaGlobe,
} from 'react-icons/fa';

const socialIcons = {
  github: FaGithub, linkedin: FaLinkedin, twitter: FaTwitter,
  facebook: FaFacebook, instagram: FaInstagram, website: FaGlobe,
};

const stats = [
  { label: 'Years Experience', value: '3+' },
  { label: 'Projects Completed', value: '20+' },
  { label: 'Happy Clients', value: '10+' },
];

const Home = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    profileAPI.getProfile()
      .then(res => setProfile(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" aria-label="Loading">
        <div className="spinner" role="status" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center section-padding">
      <div className="container-custom w-full">

        {/* ── Hero ── */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Left */}
          <div className="space-y-5 sm:space-y-6 animate-fade-up order-2 lg:order-1">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                             bg-primary/10 text-primary text-sm font-medium">
              <span aria-hidden="true">👋</span> Hello, I'm
            </span>

            <h1 className="text-fluid-5xl font-bold text-slate-900 dark:text-white leading-tight">
              {profile?.name || 'Your Name'}
            </h1>

            <p className="text-fluid-xl text-slate-600 dark:text-slate-400 font-medium">
              {profile?.title || 'Full Stack Developer'}
            </p>

            <p className="text-fluid-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl">
              {profile?.bio || 'I craft robust and scalable web applications with modern technologies.'}
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3">
              <Link to="/projects" className="btn-primary group">
                View Projects
                <FaArrowRight
                  size={14}
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                  aria-hidden="true"
                />
              </Link>
              <Link to="/contact" className="btn-outline">Contact Me</Link>
              <ResumeDownloadButton variant="outline" />
            </div>

            {/* Social links */}
            {profile?.socialLinks && (
              <div className="flex flex-wrap gap-3 pt-2" role="list" aria-label="Social links">
                {Object.entries(profile.socialLinks).map(([key, url]) => {
                  if (!url) return null;
                  const Icon = socialIcons[key] || FaGlobe;
                  return (
                    <a
                      key={key}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-icon"
                      aria-label={key}
                      role="listitem"
                    >
                      <Icon size={18} />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right – profile photo */}
          <div className="flex justify-center order-1 lg:order-2 animate-fade-up delay-200">
            {profile?.profileImage
              ? <img
                  src={profile.profileImage}
                  alt={`Portrait of ${profile.name}`}
                  loading="eager"
                  width="400"
                  height="400"
                  className="w-56 xs:w-64 sm:w-72 lg:w-80 xl:w-96
                             aspect-square object-cover
                             rounded-3xl shadow-2xl
                             border-4 border-white/30 dark:border-slate-700/50"
                />
              : <div
                  className="w-56 xs:w-64 sm:w-72 lg:w-80 xl:w-96
                             aspect-square rounded-3xl
                             bg-white/30 dark:bg-slate-800/30 backdrop-blur-sm
                             border border-white/20 dark:border-slate-700/30
                             flex items-center justify-center
                             text-slate-500 dark:text-slate-400 text-sm"
                  aria-label="Profile photo placeholder"
                >
                  Your Photo
                </div>
            }
          </div>
        </div>

        {/* ── Stats ── */}
        <div
          className="grid grid-cols-1 xs:grid-cols-3 gap-4 sm:gap-6
                     mt-14 sm:mt-16 pt-10 sm:pt-12
                     border-t border-slate-200 dark:border-slate-700"
          role="list"
          aria-label="Key statistics"
        >
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="text-center p-5 sm:p-6 card animate-fade-up"
              style={{ animationDelay: `${idx * 100 + 300}ms` }}
              role="listitem"
            >
              <div className="text-fluid-4xl font-bold text-primary mb-1">{stat.value}</div>
              <div className="text-fluid-sm text-slate-600 dark:text-slate-400">{stat.label}</div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Home;