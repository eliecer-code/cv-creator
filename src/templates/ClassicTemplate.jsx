import React from 'react';
import { t } from '../utils/translations';
import { MapPin, Phone, Mail, Linkedin, Github, Globe } from 'lucide-react';

const ClassicTemplate = ({ cvData }) => {
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
    <div className="font-ats-serif text-black leading-relaxed text-[11pt] bg-white w-full h-full text-left">
      {/* Header */}
      <header className="mb-6 text-center">
        <h1 className="text-3xl font-bold uppercase tracking-widest mb-1" style={{ color }}>{personalInfo.fullName}</h1>
        {jobTitleText && <h2 className="text-xl font-medium mb-3 text-gray-800">{jobTitleText}</h2>}
        
        <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-[10pt] text-gray-700">
          {(personalInfo.city || personalInfo.country) && (
            <div className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" style={{ color }} />
              <span>{personalInfo.city}{personalInfo.city && personalInfo.country ? ', ' : ''}{personalInfo.country}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5" style={{ color }} />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.email && (
            <div className="flex items-center gap-1">
              <Mail className="w-3.5 h-3.5" style={{ color }} />
              <span>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="flex items-center gap-1">
              <Linkedin className="w-3.5 h-3.5" style={{ color }} />
              <span>{personalInfo.linkedin.replace(/^https?:\/\/(www\.)?/, '')}</span>
            </div>
          )}
          {personalInfo.github && (
            <div className="flex items-center gap-1">
              <Github className="w-3.5 h-3.5" style={{ color }} />
              <span>{personalInfo.github.replace(/^https?:\/\/(www\.)?/, '')}</span>
            </div>
          )}
          {personalInfo.portfolio && (
            <div className="flex items-center gap-1">
              <Globe className="w-3.5 h-3.5" style={{ color }} />
              <span>{personalInfo.portfolio.replace(/^https?:\/\/(www\.)?/, '')}</span>
            </div>
          )}
        </div>
      </header>

      {/* Profile */}
      {profileText && (
        <section className="mb-6">
          <h3 className="text-sm font-bold uppercase tracking-widest mb-2 border-b-2" style={{ borderColor: color, color }}>{t('profile', lang)}</h3>
          <p className="text-justify whitespace-pre-wrap">{profileText}</p>
        </section>
      )}

      {/* Experience */}
      {experiences.length > 0 && (
        <section className="mb-6">
          <h3 className="text-sm font-bold uppercase tracking-widest mb-3 border-b-2" style={{ borderColor: color, color }}>{t('experience', lang)}</h3>
          <div className="space-y-4">
            {experiences.map(exp => (
              <div key={exp.id} className="break-inside-avoid">
                <div className="flex justify-between items-baseline mb-0.5">
                  <h4 className="font-bold text-[11.5pt]">{getVal(exp, 'title')}</h4>
                  <span className="text-[10pt] font-medium whitespace-nowrap">
                    {exp.startDate} – {exp.current ? t('present', lang) : exp.endDate}
                  </span>
                </div>
                <div className="flex justify-between items-baseline mb-2 text-[10.5pt]">
                  <span className="font-semibold italic">{exp.company}</span>
                  <span>{exp.location}</span>
                </div>
                {getVal(exp, 'description') && <p className="text-justify whitespace-pre-wrap text-[10pt] leading-normal">{getVal(exp, 'description')}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-6">
          <h3 className="text-sm font-bold uppercase tracking-widest mb-3 border-b-2" style={{ borderColor: color, color }}>{t('education', lang)}</h3>
          <div className="space-y-3">
            {education.map(edu => (
              <div key={edu.id} className="break-inside-avoid">
                <div className="flex justify-between items-baseline mb-0.5">
                  <h4 className="font-bold">{getVal(edu, 'degree')}</h4>
                  <span className="text-[10pt] whitespace-nowrap">{edu.startDate} – {edu.endDate}</span>
                </div>
                <div className="flex justify-between items-baseline text-[10.5pt]">
                  <span className="italic">{edu.institution}</span>
                  <span>{edu.location}</span>
                </div>
                {getVal(edu, 'description') && <p className="text-justify mt-1 text-[10pt]">{getVal(edu, 'description')}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills & Languages */}
      <div className="grid grid-cols-2 gap-8 mb-6 break-inside-avoid">
        {skills.length > 0 && (
          <section>
            <h3 className="text-sm font-bold uppercase tracking-widest mb-3 border-b-2" style={{ borderColor: color, color }}>{t('skills', lang)}</h3>
            <ul className="list-disc list-inside space-y-1 text-[10.5pt]">
              {skills.map(skill => (
                <li key={skill.id}>{skill.name}</li>
              ))}
            </ul>
          </section>
        )}

        {languages.length > 0 && (
          <section>
            <h3 className="text-sm font-bold uppercase tracking-widest mb-3 border-b-2" style={{ borderColor: color, color }}>{t('languages', lang)}</h3>
            <ul className="list-disc list-inside space-y-1 text-[10.5pt]">
              {languages.map(lang => (
                <li key={lang.id}>
                  <span className="font-semibold">{lang.language}:</span> {lang.level}
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-6">
          <h3 className="text-sm font-bold uppercase tracking-widest mb-3 border-b-2" style={{ borderColor: color, color }}>{t('projects', lang)}</h3>
          <div className="space-y-4">
            {projects.map(proj => (
              <div key={proj.id} className="break-inside-avoid">
                <h4 className="font-bold flex items-center gap-2">
                  {proj.name}
                  {proj.projectUrl && <span className="font-normal text-[10pt]">| {proj.projectUrl.replace(/^https?:\/\/(www\.)?/, '')}</span>}
                </h4>
                {proj.techStack && <p className="text-[10pt] italic mb-1">{lang === 'en' ? 'Technologies' : 'Tecnologías'}: {proj.techStack}</p>}
                {getVal(proj, 'description') && <p className="text-justify text-[10pt] leading-normal">{getVal(proj, 'description')}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {optionalSections.certifications && certifications.length > 0 && (
        <section className="mb-6 break-inside-avoid">
          <h3 className="text-sm font-bold uppercase tracking-widest mb-3 border-b-2" style={{ borderColor: color, color }}>{t('certifications', lang)}</h3>
          <ul className="list-disc list-inside space-y-1.5 text-[10.5pt]">
            {certifications.map(cert => (
              <li key={cert.id}>
                <span className="font-bold">{cert.name}</span>
                <span className="italic"> — {cert.institution}</span> ({cert.date})
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default ClassicTemplate;
