import React from 'react';
import { t } from '../utils/translations';
import { MapPin, Phone, Mail, Linkedin, Github, Globe } from 'lucide-react';

const CompactTemplate = ({ cvData }) => {
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
    <div className="font-ats-sans text-gray-900 leading-snug text-[9.5pt] bg-white w-full h-full text-left">
      <header className="mb-3 text-center border-b-2 pb-2" style={{ borderColor: color }}>
        <h1 className="text-2xl font-bold uppercase mb-0.5" style={{ color }}>{personalInfo.fullName}</h1>
        {jobTitleText && <h2 className="text-sm font-semibold uppercase text-gray-700">{jobTitleText}</h2>}
        
        <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-1 mt-1.5 text-xs font-medium text-gray-600">
          {(personalInfo.city || personalInfo.country) && (
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" style={{ color }} />
              <span>{personalInfo.city}{personalInfo.city && personalInfo.country ? ', ' : ''}{personalInfo.country}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-1">
              <Phone className="w-3 h-3" style={{ color }} />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.email && (
            <div className="flex items-center gap-1">
              <Mail className="w-3 h-3" style={{ color }} />
              <span>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="flex items-center gap-1">
              <Linkedin className="w-3 h-3" style={{ color }} />
              <span>{personalInfo.linkedin.replace(/^https?:\/\/(www\.)?/, '')}</span>
            </div>
          )}
          {personalInfo.github && (
            <div className="flex items-center gap-1">
              <Github className="w-3 h-3" style={{ color }} />
              <span>{personalInfo.github.replace(/^https?:\/\/(www\.)?/, '')}</span>
            </div>
          )}
          {personalInfo.portfolio && (
            <div className="flex items-center gap-1">
              <Globe className="w-3 h-3" style={{ color }} />
              <span>{personalInfo.portfolio.replace(/^https?:\/\/(www\.)?/, '')}</span>
            </div>
          )}
        </div>
      </header>

      {profileText && (
        <section className="mb-2.5">
          <h3 className="font-bold text-xs uppercase mb-0.5 text-gray-800 tracking-wider">{t('profile', lang)}</h3>
          <p className="text-justify text-xs leading-relaxed">{profileText}</p>
        </section>
      )}

      {experiences.length > 0 && (
        <section className="mb-2.5">
          <h3 className="font-bold text-xs uppercase mb-1.5 text-gray-800 tracking-wider">{t('experience', lang)}</h3>
          {experiences.map(exp => (
            <div key={exp.id} className="mb-1.5 break-inside-avoid">
              <div className="flex justify-between items-end mb-0.5">
                <span className="font-bold text-xs">{getVal(exp, 'title')} <span className="font-medium text-gray-700">| {exp.company}</span></span>
                <span className="text-[10px] font-semibold text-gray-600">{exp.startDate} – {exp.current ? t('present', lang) : exp.endDate}</span>
              </div>
              {getVal(exp, 'description') && <p className="text-justify text-[11px] leading-snug">{getVal(exp, 'description')}</p>}
            </div>
          ))}
        </section>
      )}

      <div className="flex gap-4 mb-2.5 break-inside-avoid">
        {education.length > 0 && (
          <div className="flex-1">
            <h3 className="font-bold text-xs uppercase mb-1.5 text-gray-800 tracking-wider">{t('education', lang)}</h3>
            {education.map(edu => (
              <div key={edu.id} className="mb-1">
                <div className="font-bold text-[11px]">{getVal(edu, 'degree')}</div>
                <div className="flex justify-between text-[10px] font-medium text-gray-600">
                  <span>{edu.institution}</span>
                  <span>{edu.startDate} – {edu.endDate}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {skills.length > 0 && (
          <div className="flex-1">
            <h3 className="font-bold text-xs uppercase mb-1.5 text-gray-800 tracking-wider">{t('skills', lang)}</h3>
            <div className="text-[11px] leading-relaxed font-medium text-gray-800">
              {skills.map((skill, index) => (
                <span key={skill.id}>{skill.name}{index < skills.length - 1 ? ' • ' : ''}</span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-4 break-inside-avoid">
        {projects.length > 0 && (
          <div className="flex-1">
            <h3 className="font-bold text-xs uppercase mb-1.5 text-gray-800 tracking-wider">{t('projects', lang)}</h3>
            {projects.map(proj => (
              <div key={proj.id} className="mb-1">
                <span className="font-bold text-[11px]">{proj.name}</span>
                {proj.techStack && <span className="text-[10px] font-medium text-gray-500 ml-1">[{proj.techStack}]</span>}
                {getVal(proj, 'description') && <p className="text-[10px] text-gray-700 leading-snug mt-0.5">{getVal(proj, 'description')}</p>}
              </div>
            ))}
          </div>
        )}

        {languages.length > 0 && (
          <div className="flex-1">
            <h3 className="font-bold text-xs uppercase mb-1.5 text-gray-800 tracking-wider">{t('languages', lang)}</h3>
            <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-[11px]">
              {languages.map(langItem => (
                <div key={langItem.id}><span className="font-bold">{langItem.language}:</span> <span className="text-gray-600">{langItem.level}</span></div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompactTemplate;
