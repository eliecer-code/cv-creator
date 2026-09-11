import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FormSection, Input, Textarea } from './FormComponents';
import { Plus, Trash2 } from 'lucide-react';
import { t } from '../utils/translations';

const ExperienceForm = ({ cvData, addArrayItem, updateArrayItem, removeArrayItem }) => {
  const { experiences, settings } = cvData;
  const lang = settings.language || 'es';

  const handleAdd = () => {
    addArrayItem('experiences', {
      id: uuidv4(),
      title_es: '',
      title_en: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description_es: '',
      description_en: ''
    });
  };

  return (
    <FormSection title={t('workExp', lang)}>
      <div className="space-y-6">
        {experiences.map((exp) => (
          <div key={exp.id} className="p-4 border rounded-md bg-white space-y-4 relative group">
            <button 
              onClick={() => removeArrayItem('experiences', exp.id)}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input 
                label={t('title', lang)} 
                value={lang === 'en' ? (exp.title_en || '') : (exp.title_es || exp.title || '')} 
                onChange={(val) => updateArrayItem('experiences', exp.id, { ...exp, [lang === 'en' ? 'title_en' : 'title_es']: val })}
                placeholder={lang === 'en' ? "Ex. Backend Developer" : "Ej. Desarrollador Backend"}
              />
              <Input 
                label={t('company', lang)} 
                value={exp.company} 
                onChange={(val) => updateArrayItem('experiences', exp.id, { ...exp, company: val })}
              />
              <Input 
                label={t('location', lang)} 
                value={exp.location} 
                onChange={(val) => updateArrayItem('experiences', exp.id, { ...exp, location: val })}
              />
              <div className="grid grid-cols-2 gap-2">
                <Input 
                  label={t('startDate', lang)} 
                  type="month"
                  value={exp.startDate} 
                  onChange={(val) => updateArrayItem('experiences', exp.id, { ...exp, startDate: val })}
                />
                <div className="space-y-1">
                  <Input 
                    label={t('endDate', lang)} 
                    type="month"
                    value={exp.endDate} 
                    onChange={(val) => updateArrayItem('experiences', exp.id, { ...exp, endDate: val })}
                    disabled={exp.current}
                  />
                  <label className="flex items-center gap-2 mt-2 text-sm text-gray-700">
                    <input 
                      type="checkbox" 
                      checked={exp.current}
                      onChange={(e) => updateArrayItem('experiences', exp.id, { ...exp, current: e.target.checked, endDate: '' })}
                      className="rounded text-blue-600 focus:ring-blue-500"
                    />
                    {t('currentJob', lang)}
                  </label>
                </div>
              </div>
            </div>
            
            <Textarea 
              label={t('description', lang)} 
              value={lang === 'en' ? (exp.description_en || '') : (exp.description_es || exp.description || '')} 
              onChange={(val) => updateArrayItem('experiences', exp.id, { ...exp, [lang === 'en' ? 'description_en' : 'description_es']: val })}
              placeholder="..."
            />
          </div>
        ))}
        
        <button 
          onClick={handleAdd}
          className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-gray-300 rounded-lg text-blue-600 hover:border-blue-500 hover:bg-blue-50 transition-all font-medium"
        >
          <Plus className="w-5 h-5" />
          {t('addExp', lang)}
        </button>
      </div>
    </FormSection>
  );
};

export default ExperienceForm;
