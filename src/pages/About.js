import React from 'react';
import { Mail, Github, Linkedin, Globe, Package } from 'lucide-react';
import { APP_VERSION, APP_NAME, AUTHOR, VERSION_HISTORY, REPO_URL, LINKEDIN_URL } from '../config/version';
import { useLanguage } from '../hooks/useLanguage';

export default function About() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{
          background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 pt-8">
          <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
            {t.about.title}
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-400 to-purple-600 mx-auto rounded-full"></div>
        </div>

        {/* Profile Card */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-12 mb-8 shadow-2xl">
          {/* Avatar */}
          <div className="flex justify-center mb-8">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center text-6xl shadow-lg">
              💻
            </div>
          </div>

          {/* Name and Title */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">{t.about.profileTitle}</h2>
            <p className="text-blue-200 text-lg">{t.about.profileSubtitle}</p>
          </div>

          {/* Bio */}
          <div className="space-y-6 mb-8">
            <div className="bg-white/5 rounded-lg p-6 border border-blue-400/20">
              <h3 className="text-xl font-semibold text-white mb-3">🎯 {t.about.aboutSection}</h3>
              <p className="text-blue-100 leading-relaxed">
                {t.about.aboutText}
              </p>
            </div>

            <div className="bg-white/5 rounded-lg p-6 border border-purple-400/20">
              <h3 className="text-xl font-semibold text-white mb-3">{t.about.skillsSection}</h3>
              <div className="grid grid-cols-2 gap-3">
                {t.about.skills.map((skill, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className={idx % 2 === 0 ? "text-blue-400" : "text-purple-400"}>▸</span>
                    <span className="text-blue-100">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-6 border border-blue-400/20">
              <h3 className="text-xl font-semibold text-white mb-3">📚 {t.about.projectSection}</h3>
              <p className="text-blue-100 leading-relaxed mb-3">
                {t.about.projectText}
              </p>
              <ul className="space-y-2 text-blue-100">
                {t.about.projectFeatures.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className={idx % 2 === 0 ? "text-blue-400 font-bold mt-1" : "text-purple-400 font-bold mt-1"}>•</span>
                    <span><strong>{feature.name}:</strong> {feature.desc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white/5 rounded-lg p-6 border border-purple-400/20">
              <h3 className="text-xl font-semibold text-white mb-3">{t.about.techSection}</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {['React 18', 'Tailwind CSS', 'GSAP', 'React Router', 'SVG', 'Lucide Icons'].map((tech) => (
                  <div key={tech} className="bg-blue-600/30 rounded-lg px-4 py-2 border border-blue-400/30 text-center">
                    <span className="text-blue-100 font-medium">{tech}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Version History Section */}
          <div className="border-t border-white/10 pt-8 mb-8">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <Package size={24} />
              Versiyon Geçmişi
            </h3>
            <div className="space-y-4">
              {VERSION_HISTORY.map((version, idx) => (
                <div key={idx} className="bg-white/5 rounded-lg p-6 border border-blue-400/20">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="text-lg font-semibold text-white">v{version.version}</h4>
                      <p className="text-sm text-blue-300">{version.date}</p>
                    </div>
                    {idx === 0 && (
                      <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        Mevcut Versiyon
                      </span>
                    )}
                  </div>
                  <div className="space-y-2">
                    {version.features.map((feature, fidx) => (
                      <div key={fidx} className="flex items-start gap-2 text-blue-100">
                        <span className="text-blue-400 mt-1">✓</span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div className="border-t border-white/10 pt-8">
            <h3 className="text-xl font-semibold text-white mb-6 text-center">{t.about.contactSection}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <a 
                href="mailto:info@fabus.app"
                className="flex flex-col items-center gap-2 p-4 bg-blue-600/20 hover:bg-blue-600/40 rounded-lg border border-blue-400/30 transition-all duration-300 group"
              >
                <Mail size={24} className="text-blue-400 group-hover:scale-110 transition-transform" />
                <span className="text-sm text-blue-100">{t.about.email}</span>
              </a>
              
              <a 
                href={REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 p-4 bg-purple-600/20 hover:bg-purple-600/40 rounded-lg border border-purple-400/30 transition-all duration-300 group"
              >
                <Github size={24} className="text-purple-400 group-hover:scale-110 transition-transform" />
                <span className="text-sm text-blue-100">GitHub</span>
              </a>
              
              <a 
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 p-4 bg-blue-600/20 hover:bg-blue-600/40 rounded-lg border border-blue-400/30 transition-all duration-300 group"
              >
                <Linkedin size={24} className="text-blue-400 group-hover:scale-110 transition-transform" />
                <span className="text-sm text-blue-100">{t.about.linkedin}</span>
              </a>
              
              <a 
                href="https://www.fabus.app"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 p-4 bg-purple-600/20 hover:bg-purple-600/40 rounded-lg border border-purple-400/30 transition-all duration-300 group"
              >
                <Globe size={24} className="text-purple-400 group-hover:scale-110 transition-transform" />
                <span className="text-sm text-blue-100">{t.about.website}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mb-8">
          <p className="text-blue-300 text-sm">
            {t.about.footer}
          </p>
          <p className="text-blue-400/60 text-xs mt-2">
            © 2024-2025 FABUS.app | v{APP_VERSION} | {t.about.footerNote}
          </p>
        </div>
      </div>
    </div>
  );
}
