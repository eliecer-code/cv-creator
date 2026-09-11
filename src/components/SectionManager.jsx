import React from 'react';
import { Settings2 } from 'lucide-react';

const SectionManager = ({ cvData, toggleOptionalSection }) => {
  const { optionalSections } = cvData;

  const sections = [
    { id: 'certifications', label: 'Certificaciones' },
    { id: 'courses', label: 'Cursos' },
    { id: 'volunteering', label: 'Voluntariado' },
    { id: 'awards', label: 'Premios' },
    { id: 'publications', label: 'Publicaciones' }
  ];

  return (
    <div className="bg-white p-6 rounded-lg border shadow-sm">
      <div className="flex items-center gap-2 mb-4 text-gray-800">
        <Settings2 className="w-5 h-5" />
        <h2 className="font-semibold text-lg">Secciones adicionales</h2>
      </div>
      <p className="text-sm text-gray-500 mb-4">
        Activa las secciones que necesites incluir en tu hoja de vida.
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {sections.map(section => (
          <label key={section.id} className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
            <input 
              type="checkbox"
              checked={optionalSections[section.id] || false}
              onChange={() => toggleOptionalSection(section.id)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="text-gray-700">{section.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default SectionManager;
