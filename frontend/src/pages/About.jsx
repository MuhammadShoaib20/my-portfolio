import { useState, useEffect } from 'react';
import { profileAPI } from '../utils/api';
import ResumeDownloadButton from '../components/common/ResumeDownloadButton';
import { FaGraduationCap, FaBriefcase, FaAward, FaHeart } from 'react-icons/fa';

const About = () => {
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Me</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">Get to know more about my journey and passion</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="flex justify-center">
            {profile?.profileImage ? (
              <img
                src={profile.profileImage}
                alt={profile.name}
                className="w-72 sm:w-80 lg:w-96 h-auto aspect-square object-cover rounded-3xl shadow-2xl border-4 border-white/30 dark:border-slate-700/50"
              />
            ) : (
              <div className="w-72 sm:w-80 lg:w-96 h-auto aspect-square rounded-3xl bg-white/30 dark:bg-slate-800/30 backdrop-blur-sm border border-white/20 dark:border-slate-700/30 flex items-center justify-center text-slate-500 dark:text-slate-400">
                Profile Photo
              </div>
            )}
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Hi, I'm {profile?.name || 'Your Name'}</h2>
            <p className="text-xl text-primary">{profile?.title || 'Full Stack Developer'}</p>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              {profile?.bio || 'I\'m a passionate full-stack developer with expertise in building modern web applications using the MERN stack. I love creating user-friendly interfaces and scalable backend systems.'}
            </p>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              With a strong foundation in JavaScript and modern web technologies, I'm constantly learning and adapting to new challenges. My goal is to build applications that solve real-world problems and provide exceptional user experiences.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
          {[
            { label: 'Years Experience', value: '3+' },
            { label: 'Projects Completed', value: '50+' },
            { label: 'Happy Clients', value: '30+' },
            { label: 'Satisfaction', value: '100%' },
          ].map((stat, idx) => (
            <div key={idx} className="text-center p-6 card">
              <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Resume Download Button */}
        <div className="flex justify-center mb-16">
          <ResumeDownloadButton variant="primary" />
        </div>

        {/* Timeline */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">My Journey</h2>
          <div className="space-y-8">
            {[
              { icon: FaGraduationCap, title: 'Education', date: '2018 – 2022', role: 'Bachelor\'s in Computer Science', desc: 'Learned fundamental programming concepts, data structures, algorithms, and web development.' },
              { icon: FaBriefcase, title: 'First Job', date: '2022 – 2023', role: 'Junior Full Stack Developer', desc: 'Started my professional journey, working on real-world projects and learning industry best practices.' },
              { icon: FaBriefcase, title: 'Career Growth', date: '2023 – Present', role: 'Senior Full Stack Developer', desc: 'Leading development teams, architecting scalable solutions, and mentoring junior developers.' },
              { icon: FaAward, title: 'Achievements', date: 'Ongoing', role: 'Continuous Learning & Growth', desc: 'Building side projects, contributing to open source, and staying updated with latest technologies.' },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row gap-4 sm:gap-8">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  <item.icon size={24} />
                </div>
                <div className="flex-1 card p-6">
                  <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-primary mb-2">{item.date}</p>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{item.role}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-12">What I Value</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: FaHeart, title: 'Passion', desc: 'I love what I do and always strive for excellence in every project.' },
              { icon: FaAward, title: 'Quality', desc: 'Delivering high-quality, maintainable code is always my priority.' },
              { icon: FaGraduationCap, title: 'Learning', desc: 'Constantly learning new technologies and improving my skills.' },
              { icon: FaBriefcase, title: 'Collaboration', desc: 'Working with teams to create amazing products together.' },
            ].map((item, idx) => (
              <div key={idx} className="text-center p-6 card">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  <item.icon size={32} />
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;