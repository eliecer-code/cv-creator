import React from 'react';
import { FormSection, Input } from './FormComponents';
import { t } from '../utils/translations';

const PersonalInfo = ({ cvData, updatePersonalInfo }) => {
  const { personalInfo, settings } = cvData;
  const lang = settings.language || 'es';

  const handleChange = (field) => (value) => {
    updatePersonalInfo(field, value);
  };

  return (
    <FormSection title={t('personalInfo', lang)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <Input 
            label={t('fullName', lang)} 
            value={personalInfo.fullName} 
            onChange={handleChange('fullName')} 
            placeholder="Ej. Juan Pérez"
            required
          />
        </div>
        <Input 
          label={t('jobTitle', lang)} 
          value={lang === 'en' ? (personalInfo.jobTitle_en || '') : (personalInfo.jobTitle_es || '')} 
          onChange={handleChange(lang === 'en' ? 'jobTitle_en' : 'jobTitle_es')} 
          placeholder={lang === 'en' ? "Ex. Software Engineer" : "Ej. Desarrollador de Software"}
        />
        <Input 
          label={t('email', lang)} 
          type="email"
          value={personalInfo.email} 
          onChange={handleChange('email')} 
          placeholder="Ej. juan@email.com"
        />
        <Input 
          label={t('phone', lang)} 
          type="tel"
          value={personalInfo.phone} 
          onChange={handleChange('phone')} 
          placeholder="Ej. +34 123 456 789"
        />
        <Input 
          label={t('city', lang)} 
          value={personalInfo.city} 
          onChange={handleChange('city')} 
          placeholder="Ej. Madrid"
        />
        <Input 
          label={t('country', lang)} 
          value={personalInfo.country} 
          onChange={handleChange('country')} 
          placeholder="Ej. España"
        />
        <Input 
          label="LinkedIn" 
          value={personalInfo.linkedin} 
          onChange={handleChange('linkedin')} 
          placeholder="linkedin.com/in/juanperez"
        />
        <Input 
          label="GitHub" 
          value={personalInfo.github} 
          onChange={handleChange('github')} 
          placeholder="github.com/juanperez"
        />
        <div className="md:col-span-2">
          <Input 
            label={t('portfolio', lang)} 
            value={personalInfo.portfolio} 
            onChange={handleChange('portfolio')} 
            placeholder="juanperez.dev"
          />
        </div>
      </div>
    </FormSection>
  );
};

export default PersonalInfo;
