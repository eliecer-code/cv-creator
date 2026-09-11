import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FormSection, Input, Textarea } from './FormComponents';
import { Plus, Trash2 } from 'lucide-react';
import { t } from '../utils/translations';

export const ProjectsForm = ({ cvData, addArrayItem, updateArrayItem, removeArrayItem }) => {
  const { projects, settings } = cvData;
  const lang = settings.language || 'es';

  const handleAdd = () => {
    addArrayItem('projects', {
      id: uuidv4(), name: '', description_es: '', description_en: '', techStack: '', projectUrl: '', githubUrl: ''
    });
  };

  return (
    <FormSection title={t('projects', lang)} defaultOpen={false}>
      <div className="space-y-6">
        {projects.map((proj) => (
          <div key={proj.id} className="p-4 border rounded-md bg-white space-y-4 relative">
            <button onClick={() => removeArrayItem('projects', proj.id)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500">
              <Trash2 className="w-4 h-4" />
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label={t('projectName', lang)} value={proj.name} onChange={(val) => updateArrayItem('projects', proj.id, { ...proj, name: val })} />
              <Input label={t('techStack', lang)} value={proj.techStack} onChange={(val) => updateArrayItem('projects', proj.id, { ...proj, techStack: val })} />
              <Input label={t('projectUrl', lang)} value={proj.projectUrl} onChange={(val) => updateArrayItem('projects', proj.id, { ...proj, projectUrl: val })} />
              <Input label={t('githubUrl', lang)} value={proj.githubUrl} onChange={(val) => updateArrayItem('projects', proj.id, { ...proj, githubUrl: val })} />
            </div>
            <Textarea label={t('description', lang)} value={lang === 'en' ? (proj.description_en || '') : (proj.description_es || proj.description || '')} onChange={(val) => updateArrayItem('projects', proj.id, { ...proj, [lang === 'en' ? 'description_en' : 'description_es']: val })} />
          </div>
        ))}
        <button onClick={handleAdd} className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-gray-300 rounded-lg text-blue-600 font-medium">
          <Plus className="w-5 h-5" /> {t('addProject', lang)}
        </button>
      </div>
    </FormSection>
  );
};

export const LanguagesForm = ({ cvData, addArrayItem, updateArrayItem, removeArrayItem }) => {
  const { languages } = cvData;
  const levels = ['Básico', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'Nativo'];

  const handleAdd = () => {
    addArrayItem('languages', { id: uuidv4(), language: '', level: 'Básico' });
  };

  return (
    <FormSection title="Idiomas" defaultOpen={false}>
      <div className="space-y-4">
        {languages.map((lang) => (
          <div key={lang.id} className="flex gap-4 items-end bg-white p-4 border rounded-md relative">
            <div className="flex-1">
              <Input label="Idioma" value={lang.language} onChange={(val) => updateArrayItem('languages', lang.id, { ...lang, language: val })} />
            </div>
            <div className="w-1/3 space-y-1">
              <label className="block text-sm font-medium text-gray-700">Nivel</label>
              <select 
                value={lang.level} 
                onChange={(e) => updateArrayItem('languages', lang.id, { ...lang, level: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md bg-white"
              >
                {levels.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
            <button onClick={() => removeArrayItem('languages', lang.id)} className="p-2 text-gray-400 hover:text-red-500 mb-1">
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
        <button onClick={handleAdd} className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-gray-300 rounded-lg text-blue-600 font-medium">
          <Plus className="w-5 h-5" /> Agregar idioma
        </button>
      </div>
    </FormSection>
  );
};

export const CertificationsForm = ({ cvData, addArrayItem, updateArrayItem, removeArrayItem }) => {
  const { certifications } = cvData;
  const handleAdd = () => addArrayItem('certifications', { id: uuidv4(), name: '', institution: '', date: '', url: '' });

  return (
    <FormSection title="Certificaciones" defaultOpen={false}>
      <div className="space-y-6">
        {certifications.map((cert) => (
          <div key={cert.id} className="p-4 border rounded-md bg-white space-y-4 relative">
            <button onClick={() => removeArrayItem('certifications', cert.id)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500">
              <Trash2 className="w-4 h-4" />
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Nombre de certificación" value={cert.name} onChange={(val) => updateArrayItem('certifications', cert.id, { ...cert, name: val })} />
              <Input label="Institución" value={cert.institution} onChange={(val) => updateArrayItem('certifications', cert.id, { ...cert, institution: val })} />
              <Input label="Fecha (Mes/Año)" value={cert.date} onChange={(val) => updateArrayItem('certifications', cert.id, { ...cert, date: val })} />
              <Input label="URL de validación (opcional)" value={cert.url} onChange={(val) => updateArrayItem('certifications', cert.id, { ...cert, url: val })} />
            </div>
          </div>
        ))}
        <button onClick={handleAdd} className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-gray-300 rounded-lg text-blue-600 font-medium">
          <Plus className="w-5 h-5" /> Agregar certificación
        </button>
      </div>
    </FormSection>
  );
};
