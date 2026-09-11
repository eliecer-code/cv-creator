import React from 'react';
import { Layout, Check, Settings } from 'lucide-react';

const TemplateSelector = ({ cvData, updateSettings, autoTranslate }) => {
  const { settings } = cvData;

  const templates = [
    { id: 'classic', name: 'Clásica', description: 'Sobria y profesional' },
    { id: 'modern', name: 'Moderna', description: 'Diseño limpio con toques de color' },
    { id: 'compact', name: 'Compacta', description: 'Aprovecha al máximo el espacio' }
  ];

  return (
    <div className="bg-white p-6 rounded-lg border shadow-sm">
      <div className="flex items-center gap-2 mb-4 text-gray-800">
        <Layout className="w-5 h-5" />
        <h2 className="font-semibold text-lg">Personalización</h2>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Plantilla</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {templates.map(t => (
              <button
                key={t.id}
                onClick={() => updateSettings('template', t.id)}
                className={`p-3 border rounded-lg text-left transition-all ${settings.template === t.id ? 'border-blue-500 ring-1 ring-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium text-gray-900">{t.name}</span>
                  {settings.template === t.id && <Check className="w-4 h-4 text-blue-600" />}
                </div>
                <p className="text-xs text-gray-500">{t.description}</p>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Color Principal</label>
          <div className="flex gap-3">
            {['#000000', '#2563eb', '#059669', '#dc2626', '#4f46e5', '#7c3aed'].map(color => (
              <button
                key={color}
                onClick={() => updateSettings('primaryColor', color)}
                className={`w-8 h-8 rounded-full border-2 ${settings.primaryColor === color ? 'border-gray-900 scale-110' : 'border-transparent hover:scale-110'} transition-all`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Idioma del Documento</label>
          <div className="flex gap-3">
            <button
              onClick={() => autoTranslate('es')}
              className={`px-4 py-2 border rounded-lg text-sm transition-all ${settings.language !== 'en' ? 'border-blue-500 bg-blue-50 text-blue-700 font-medium' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
            >
              Español
            </button>
            <button
              onClick={() => autoTranslate('en')}
              className={`px-4 py-2 border rounded-lg text-sm transition-all ${settings.language === 'en' ? 'border-blue-500 bg-blue-50 text-blue-700 font-medium' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
            >
              English
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateSelector;
