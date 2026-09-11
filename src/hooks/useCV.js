import { useState, useEffect } from 'react';
import { initialCV } from '../data/initialCV';

export const useCV = () => {
  const [cvData, setCvData] = useState(() => {
    try {
      const saved = localStorage.getItem('cvData');
      if (saved) {
        const parsed = JSON.parse(saved);
        const merged = {
          ...initialCV,
          ...parsed,
          personalInfo: { ...initialCV.personalInfo, ...(parsed.personalInfo || {}) },
          settings: { ...initialCV.settings, ...(parsed.settings || {}) },
          optionalSections: { ...initialCV.optionalSections, ...(parsed.optionalSections || {}) },
        };
        // Migración de campos antiguos a bilingües
        if (merged.profile && !merged.profile_es) {
          merged.profile_es = merged.profile;
          delete merged.profile;
        }
        if (merged.personalInfo?.jobTitle && !merged.personalInfo.jobTitle_es) {
          merged.personalInfo.jobTitle_es = merged.personalInfo.jobTitle;
          delete merged.personalInfo.jobTitle;
        }
        merged.experiences = (merged.experiences || []).map(exp => ({
          ...exp,
          title_es: exp.title_es !== undefined ? exp.title_es : exp.title,
          description_es: exp.description_es !== undefined ? exp.description_es : exp.description,
        }));
        merged.education = (merged.education || []).map(edu => ({
          ...edu,
          degree_es: edu.degree_es !== undefined ? edu.degree_es : edu.degree,
          description_es: edu.description_es !== undefined ? edu.description_es : edu.description,
        }));
        merged.projects = (merged.projects || []).map(proj => ({
          ...proj,
          description_es: proj.description_es !== undefined ? proj.description_es : proj.description,
        }));
        return merged;
      }
      return initialCV;
    } catch (error) {
      console.error("Error reading from localStorage", error);
      return initialCV;
    }
  });

  useEffect(() => {
    localStorage.setItem('cvData', JSON.stringify(cvData));
  }, [cvData]);

  const updatePersonalInfo = (field, value) => {
    setCvData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }));
  };

  const updateProfile = (field, value) => {
    setCvData(prev => ({ ...prev, [field]: value }));
  };

  const updateSettings = (field, value) => {
    setCvData(prev => ({
      ...prev,
      settings: { ...prev.settings, [field]: value }
    }));
  };

  const toggleOptionalSection = (section) => {
    setCvData(prev => ({
      ...prev,
      optionalSections: {
        ...prev.optionalSections,
        [section]: !prev.optionalSections[section]
      }
    }));
  };

  const sortCollection = (collectionName, array) => {
    if (collectionName !== 'experiences' && collectionName !== 'education') {
      return array;
    }
    
    return [...array].sort((a, b) => {
      // Items without a start date stay at the top so they are easy to edit when added
      if (!a.startDate && !b.startDate) return 0;
      if (!a.startDate) return -1;
      if (!b.startDate) return 1;
      
      // Current jobs have priority
      if (a.current && !b.current) return -1;
      if (!a.current && b.current) return 1;

      // Sort by start date (descending)
      const dateA = new Date(a.startDate);
      const dateB = new Date(b.startDate);
      return dateB - dateA;
    });
  };

  const addArrayItem = (collection, item) => {
    setCvData(prev => {
      const newArray = [item, ...prev[collection]];
      return { ...prev, [collection]: sortCollection(collection, newArray) };
    });
  };

  const updateArrayItem = (collection, id, updatedItem) => {
    setCvData(prev => {
      const newArray = prev[collection].map(item => item.id === id ? updatedItem : item);
      return { ...prev, [collection]: sortCollection(collection, newArray) };
    });
  };

  const removeArrayItem = (collection, id) => {
    setCvData(prev => ({
      ...prev,
      [collection]: prev[collection].filter(item => item.id !== id)
    }));
  };

  const clearCV = () => {
    if (window.confirm("¿Estás seguro de que quieres eliminar todos los datos?")) {
      setCvData(initialCV);
    }
  };

  const autoTranslate = async (targetLang) => {
    const sourceLang = targetLang === 'en' ? 'es' : 'en';
    const { translateText } = await import('../utils/translator');
    
    setCvData(prev => {
      const next = { ...prev, settings: { ...prev.settings, language: targetLang } };
      
      const doTranslate = async () => {
        let updated = false;
        const stateToUpdate = JSON.parse(JSON.stringify(next));
        
        const delay = ms => new Promise(res => setTimeout(res, ms));

        // 1. Profile
        const profileSource = stateToUpdate[`profile_${sourceLang}`] || stateToUpdate.profile;
        if (!stateToUpdate[`profile_${targetLang}`] && profileSource) {
          stateToUpdate[`profile_${targetLang}`] = await translateText(profileSource, targetLang);
          updated = true;
          await delay(300);
        }

        // 2. Personal Info (Job Title)
        const jobTitleSource = stateToUpdate.personalInfo[`jobTitle_${sourceLang}`] || stateToUpdate.personalInfo.jobTitle;
        if (!stateToUpdate.personalInfo[`jobTitle_${targetLang}`] && jobTitleSource) {
          stateToUpdate.personalInfo[`jobTitle_${targetLang}`] = await translateText(jobTitleSource, targetLang);
          updated = true;
          await delay(300);
        }

        // 3. Experiences
        for (let i = 0; i < stateToUpdate.experiences.length; i++) {
          const exp = stateToUpdate.experiences[i];
          const titleSource = exp[`title_${sourceLang}`] || exp.title;
          if (!exp[`title_${targetLang}`] && titleSource) {
            exp[`title_${targetLang}`] = await translateText(titleSource, targetLang);
            updated = true;
            await delay(300);
          }
          const descSource = exp[`description_${sourceLang}`] || exp.description;
          if (!exp[`description_${targetLang}`] && descSource) {
            exp[`description_${targetLang}`] = await translateText(descSource, targetLang);
            updated = true;
            await delay(300);
          }
        }

        // 4. Education
        for (let i = 0; i < stateToUpdate.education.length; i++) {
          const edu = stateToUpdate.education[i];
          const degreeSource = edu[`degree_${sourceLang}`] || edu.degree;
          if (!edu[`degree_${targetLang}`] && degreeSource) {
            edu[`degree_${targetLang}`] = await translateText(degreeSource, targetLang);
            updated = true;
            await delay(300);
          }
          const descSource = edu[`description_${sourceLang}`] || edu.description;
          if (!edu[`description_${targetLang}`] && descSource) {
            edu[`description_${targetLang}`] = await translateText(descSource, targetLang);
            updated = true;
            await delay(300);
          }
        }

        // 5. Projects
        for (let i = 0; i < stateToUpdate.projects.length; i++) {
          const proj = stateToUpdate.projects[i];
          const descSource = proj[`description_${sourceLang}`] || proj.description;
          if (!proj[`description_${targetLang}`] && descSource) {
            proj[`description_${targetLang}`] = await translateText(descSource, targetLang);
            updated = true;
            await delay(300);
          }
        }

        if (updated) {
          setCvData(stateToUpdate);
        }
      };

      doTranslate();
      return next;
    });
  };

  return {
    cvData,
    setCvData,
    updatePersonalInfo,
    updateProfile,
    updateSettings,
    toggleOptionalSection,
    addArrayItem,
    updateArrayItem,
    removeArrayItem,
    clearCV,
    autoTranslate
  };
};
