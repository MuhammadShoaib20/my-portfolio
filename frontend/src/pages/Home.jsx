import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { profileAPI } from '../utils/api';
import ResumeDownloadButton from '../components/common/ResumeDownloadButton';
import { FaArrowRight, FaGithub, FaLinkedin, FaTwitter, FaFacebook, FaInstagram, FaGlobe } from 'react-icons/fa';

const Home = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    profileAPI.getProfile()
      .then(res => setProfile(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const socialIcons = {
    github: FaGithub,
    linkedin: FaLinkedin,
    twitter: FaTwitter,
    facebook: FaFacebook,
    instagram: FaInstagram,
    website: FaGlobe,
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center py-12">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <div className="space-y-6 animate-fade-up">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              👋 Hello, I'm
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white">
              {profile?.name || 'Your Name'}
            </h1>
            <h2 className="text-xl sm:text-2xl text-slate-600 dark:text-slate-400">
              {profile?.title || 'Full Stack Developer'}
            </h2>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-xl">
              {profile?.bio || 'I craft robust and scalable web applications with modern technologies.'}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/projects" className="btn-primary">
                View Projects <FaArrowRight className="ml-2 group-hover:translate-x-1 transition" />
              </Link>
              <Link to="/contact" className="btn-outline">
                Contact Me
              </Link>
              <ResumeDownloadButton variant="outline" />
            </div>
            <div className="flex gap-4 pt-4">
              {profile?.socialLinks && Object.entries(profile.socialLinks).map(([key, url]) => {
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
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Right Column */}
          <div className="flex justify-center animate-fade-up animation-delay-200">
            {profile?.profileImage ? (
              <img
                src={profile.profileImage}
                alt={profile.name}
                className="w-72 sm:w-80 lg:w-96 h-auto aspect-square object-cover rounded-3xl shadow-2xl border-4 border-white/30 dark:border-slate-700/50"
              />
            ) : (
              <div className="w-72 sm:w-80 lg:w-96 h-auto aspect-square rounded-3xl bg-white/30 dark:bg-slate-800/30 backdrop-blur-sm border border-white/20 dark:border-slate-700/30 flex items-center justify-center text-slate-500 dark:text-slate-400">
                Your Photo
              </div>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 pt-12 border-t border-slate-200 dark:border-slate-700">
          {[
            { label: 'Years Experience', value: '3+' },
            { label: 'Projects Completed', value: '20+' },
            { label: 'Happy Clients', value: '10+' },
          ].map((stat, idx) => (
            <div key={idx} className="text-center p-6 rounded-2xl card">
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-sm sm:text-base text-slate-600 dark:text-slate-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;