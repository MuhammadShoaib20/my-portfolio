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
          {/* Right Column - Image (now appears first on mobile) */}
          <div className="flex justify-center order-1 lg:order-2 animate-fade-up animation-delay-200">
            {profile?.profileImage ? (
              <img
                src={profile.profileImage}
                alt={profile.name}
                className="w-64 sm:w-72 lg:w-80 xl:w-96 h-auto aspect-square object-cover rounded-3xl shadow-2xl border-4 border-white/30 dark:border-slate-700/50"
              />
            ) : (
              <div className="w-64 sm:w-72 lg:w-80 xl:w-96 h-auto aspect-square rounded-3xl bg-white/30 dark:bg-slate-800/30 backdrop-blur-sm border border-white/20 dark:border-slate-700/30 flex items-center justify-center text-slate-500 dark:text-slate-400">
                Your Photo
              </div>
            )}
          </div>

          {/* Left Column - Text (now below image on mobile) */}
          <div className="space-y-4 sm:space-y-6 order-2 lg:order-1 animate-fade-up text-center lg:text-left">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              👋 Hello, I'm
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-900 dark:text-white">
              {profile?.name || 'Your Name'}
            </h1>
            <h2 className="text-lg sm:text-xl lg:text-2xl text-slate-600 dark:text-slate-400">
              {profile?.title || 'Full Stack Developer'}
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto lg:mx-0">
              {profile?.bio || 'I craft robust and scalable web applications with modern technologies.'}
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Link to="/projects" className="btn-primary">
                View Projects <FaArrowRight className="ml-2 group-hover:translate-x-1 transition" />
              </Link>
              <Link to="/contact" className="btn-outline">
                Contact Me
              </Link>
              <ResumeDownloadButton variant="outline" />
            </div>
            <div className="flex gap-4 pt-4 justify-center lg:justify-start">
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
        </div>

        {/* Quick Stats - updated with honest values */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 pt-12 border-t border-slate-200 dark:border-slate-700">
          <div className="text-center p-6 rounded-2xl card">
            <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">1+</div>
            <div className="text-sm sm:text-base text-slate-600 dark:text-slate-400">Years Experience</div>
          </div>
          <div className="text-center p-6 rounded-2xl card">
            <div className="text-xl sm:text-2xl font-bold text-primary mb-2">3+</div>
            <div className="text-sm sm:text-base text-slate-600 dark:text-slate-400">Projects</div>
          </div>
          <div className="text-center p-6 rounded-2xl card">
            <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">Always</div>
            <div className="text-sm sm:text-base text-slate-600 dark:text-slate-400">Learning</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;