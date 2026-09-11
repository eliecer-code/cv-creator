import React from 'react';
import { FormSection, Textarea } from './FormComponents';
import { t } from '../utils/translations';

const ProfessionalProfile = ({ cvData, updateProfile }) => {
  const lang = cvData.settings?.language || 'es';
  const profileKey = lang === 'en' ? 'profile_en' : 'profile_es';

  return (
    <FormSection title={t('profProfile', lang)}>
      <Textarea 
        label={t('profDesc', lang)} 
        value={cvData[profileKey] || ''} 
        onChange={(val) => updateProfile(profileKey, val)} 
        placeholder={lang === 'en' ? "Ex. Backend developer..." : "Ej. Desarrollador backend..."}
        maxLength={600}
      />
    </FormSection>
  );
};

export default ProfessionalProfile;
