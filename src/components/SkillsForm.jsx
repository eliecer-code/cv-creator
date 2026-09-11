import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FormSection } from './FormComponents';
import { Plus, X } from 'lucide-react';

const SkillsForm = ({ cvData, addArrayItem, removeArrayItem }) => {
  const { skills } = cvData;
  const [newSkill, setNewSkill] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    if (newSkill.trim()) {
      addArrayItem('skills', { id: uuidv4(), name: newSkill.trim() });
      setNewSkill('');
    }
  };

  return (
    <FormSection title="Habilidades">
      <div className="space-y-4">
        <form onSubmit={handleAdd} className="flex gap-2">
          <input 
            type="text" 
            value={newSkill} 
            onChange={(e) => setNewSkill(e.target.value)} 
            placeholder="Ej. React, Python, Liderazgo..."
            className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
          <button 
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Agregar
          </button>
        </form>
        
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <div key={skill.id} className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full text-sm text-gray-800">
              <span>{skill.name}</span>
              <button 
                onClick={() => removeArrayItem('skills', skill.id)}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </FormSection>
  );
};

export default SkillsForm;
