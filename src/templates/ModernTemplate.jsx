import React from 'react';
import { t } from '../utils/translations';
import { MapPin, Phone, Mail, Linkedin, Github, Globe } from 'lucide-react';

const ModernTemplate = ({ cvData }) => {
  const { personalInfo, experiences, education, skills, projects, languages, certifications, optionalSections, settings } = cvData;
  const color = settings.primaryColor;
  const lang = settings.language || 'es';
  const getVal = (obj, field) => {
    if (!obj) return '';
    const val = obj[`${field}_${lang}`];
    return val !== undefined ? val : (obj[field] || '');
  };
  const profileText = getVal(cvData, 'profile');
  const jobTitleText = getVal(personalInfo, 'jobTitle');

  return (
    <div className="font-ats-sans text-gray-900 leading-normal text-[10.5pt] bg-white w-full h-full text-left">
      <header className="mb-8 border-l-4 pl-4" style={{ borderColor: color }}>
        <h1 className="text-4xl font-extrabold uppercase tracking-tight mb-1" style={{ color }}>{personalInfo.fullName}</h1>
        {jobTitleText && <h2 className="text-xl font-semibold text-gray-600 mb-3 uppercase tracking-wide">{jobTitleText}</h2>}
        
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[10pt] font-medium text-gray-500">
          {(personalInfo.city || personalInfo.country) && (
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" style={{ color }} />
              <span>{personalInfo.city}{personalInfo.city && personalInfo.country ? ', ' : ''}{personalInfo.country}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5" style={{ color }} />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.email && (
            <div className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5" style={{ color }} />
              <span>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="flex items-center gap-1.5">
              <Linkedin className="w-3.5 h-3.5" style={{ color }} />
              <span>{personalInfo.linkedin.replace(/^https?:\/\/(www\.)?/, '')}</span>
            </div>
          )}
          {personalInfo.github && (
            <div className="flex items-center gap-1.5">
              <Github className="w-3.5 h-3.5" style={{ color }} />
              <span>{personalInfo.github.replace(/^https?:\/\/(www\.)?/, '')}</span>
            </div>
          )}
          {personalInfo.portfolio && (
            <div className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5" style={{ color }} />
              <span>{personalInfo.portfolio.replace(/^https?:\/\/(www\.)?/, '')}</span>
            </div>
          )}
        </div>
      </header>

      {profileText && (
        <section className="mb-7">
          <h3 className="text-sm font-bold uppercase tracking-widest mb-3 text-gray-400">{t('profile', lang)}</h3>
          <p className="text-justify whitespace-pre-wrap leading-relaxed text-gray-700">{profileText}</p>
        </section>
      )}

      {experiences.length > 0 && (
        <section className="mb-7">
          <h3 className="text-sm font-bold uppercase tracking-widest mb-4 text-gray-400">{t('experience', lang)}</h3>
          <div className="space-y-5">
            {experiences.map(exp => (
              <div key={exp.id} className="relative break-inside-avoid">
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="font-bold text-[11.5pt] text-gray-900">{getVal(exp, 'title')}</h4>
                  <span className="text-sm font-semibold" style={{ color }}>{exp.startDate} – {exp.current ? t('present', lang) : exp.endDate}</span>
                </div>
                <div className="flex justify-between items-baseline mb-2 text-sm text-gray-600 font-medium">
                  <span>{exp.company}</span>
                  <span>{exp.location}</span>
                </div>
                {getVal(exp, 'description') && <p className="text-justify whitespace-pre-wrap text-[10pt] text-gray-700">{getVal(exp, 'description')}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {education.length > 0 && (
        <section className="mb-7">
          <h3 className="text-sm font-bold uppercase tracking-widest mb-4 text-gray-400">{t('education', lang)}</h3>
          <div className="space-y-4">
            {education.map(edu => (
              <div key={edu.id} className="break-inside-avoid">
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="font-bold text-gray-900">{getVal(edu, 'degree')}</h4>
                  <span className="text-sm font-semibold" style={{ color }}>{edu.startDate} – {edu.endDate}</span>
                </div>
                <div className="flex justify-between items-baseline text-sm text-gray-600 font-medium">
                  <span>{edu.institution}</span>
                  <span>{edu.location}</span>
                </div>
                {getVal(edu, 'description') && <p className="text-justify mt-1 text-[10pt] text-gray-700">{getVal(edu, 'description')}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="grid grid-cols-2 gap-8 mb-7 break-inside-avoid">
        {skills.length > 0 && (
          <section>
            <h3 className="text-sm font-bold uppercase tracking-widest mb-3 text-gray-400">{t('skills', lang)}</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map(skill => <span key={skill.id} className="px-2.5 py-1 bg-gray-100 text-gray-800 text-[9.5pt] font-semibold rounded-sm">{skill.name}</span>)}
            </div>
          </section>
        )}

        {languages.length > 0 && (
          <section>
            <h3 className="text-sm font-bold uppercase tracking-widest mb-3 text-gray-400">{t('languages', lang)}</h3>
            <ul className="space-y-1.5 text-[10pt]">
              {languages.map(langItem => (
                <li key={langItem.id} className="flex justify-between border-b border-gray-100 pb-1">
                  <span className="font-semibold text-gray-800">{langItem.language}</span>
                  <span className="text-gray-500 font-medium">{langItem.level}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>

      {projects.length > 0 && (
        <section className="mb-7">
          <h3 className="text-sm font-bold uppercase tracking-widest mb-4 text-gray-400">{t('projects', lang)}</h3>
          <div className="space-y-4">
            {projects.map(proj => (
              <div key={proj.id} className="break-inside-avoid">
                <h4 className="font-bold text-gray-900 flex items-center gap-2">
                  {proj.name}
                  {proj.projectUrl && <span className="font-normal text-xs text-gray-500">| {proj.projectUrl.replace(/^https?:\/\/(www\.)?/, '')}</span>}
                </h4>
                {proj.techStack && <p className="text-[9.5pt] font-semibold text-gray-500 mb-1">{proj.techStack}</p>}
                {getVal(proj, 'description') && <p className="text-justify text-[10pt] text-gray-700">{getVal(proj, 'description')}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {optionalSections.certifications && certifications.length > 0 && (
        <section className="mb-7 break-inside-avoid">
          <h3 className="text-sm font-bold uppercase tracking-widest mb-4 text-gray-400">{t('certifications', lang)}</h3>
          <ul className="space-y-2 text-[10pt]">
            {certifications.map(cert => (
              <li key={cert.id} className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                <div>
                  <span className="font-bold text-gray-900">{cert.name}</span>
                  <span className="text-gray-600 font-medium"> {lang === 'en' ? 'at' : 'en'} {cert.institution}</span>
                </div>
                <span className="text-[9.5pt] font-semibold" style={{ color }}>{cert.date}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default ModernTemplate;
