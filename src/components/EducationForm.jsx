import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FormSection, Input, Textarea } from './FormComponents';
import { Plus, Trash2 } from 'lucide-react';
import { t } from '../utils/translations';

const EducationForm = ({ cvData, addArrayItem, updateArrayItem, removeArrayItem }) => {
  const { education, settings } = cvData;
  const lang = settings.language || 'es';

  const handleAdd = () => {
    addArrayItem('education', {
      id: uuidv4(),
      degree_es: '',
      degree_en: '',
      institution: '',
      location: '',
      startDate: '',
      endDate: '',
      description_es: '',
      description_en: ''
    });
  };

  return (
    <FormSection title={t('education', lang)}>
      <div className="space-y-6">
        {education.map((edu) => (
          <div key={edu.id} className="p-4 border rounded-md bg-white space-y-4 relative">
            <button 
              onClick={() => removeArrayItem('education', edu.id)}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input 
                label={t('degree', lang)} 
                value={lang === 'en' ? (edu.degree_en || '') : (edu.degree_es || edu.degree || '')} 
                onChange={(val) => updateArrayItem('education', edu.id, { ...edu, [lang === 'en' ? 'degree_en' : 'degree_es']: val })}
              />
              <Input 
                label={t('institution', lang)} 
                value={edu.institution} 
                onChange={(val) => updateArrayItem('education', edu.id, { ...edu, institution: val })}
              />
              <Input 
                label={t('location', lang)} 
                value={edu.location} 
                onChange={(val) => updateArrayItem('education', edu.id, { ...edu, location: val })}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:col-span-2">
                <Input 
                  label={t('startDate', lang)} 
                  type="month"
                  value={edu.startDate} 
                  onChange={(val) => updateArrayItem('education', edu.id, { ...edu, startDate: val })}
                />
                <Input 
                  label={t('endDate', lang)} 
                  type="month"
                  value={edu.endDate} 
                  onChange={(val) => updateArrayItem('education', edu.id, { ...edu, endDate: val })}
                />
              </div>
            </div>
            
            <Textarea 
              label={t('descOptional', lang)} 
              value={lang === 'en' ? (edu.description_en || '') : (edu.description_es || edu.description || '')} 
              onChange={(val) => updateArrayItem('education', edu.id, { ...edu, [lang === 'en' ? 'description_en' : 'description_es']: val })}
            />
          </div>
        ))}
        
        <button 
          onClick={handleAdd}
          className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-gray-300 rounded-lg text-blue-600 hover:border-blue-500 hover:bg-blue-50 transition-all font-medium"
        >
          <Plus className="w-5 h-5" />
          {t('addEdu', lang)}
        </button>
      </div>
    </FormSection>
  );
};

export default EducationForm;
