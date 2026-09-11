export const t = (key, lang = 'es') => {
  const translations = {
    es: {
      profile: "Resumen Profesional",
      experience: "Experiencia Profesional",
      education: "Educación",
      skills: "Habilidades Core",
      languages: "Idiomas",
      projects: "Proyectos Destacados",
      certifications: "Certificaciones",
      present: "Presente",
      
      // Form Labels
      personalInfo: "Información Personal",
      fullName: "Nombre completo",
      jobTitle: "Cargo profesional",
      email: "Correo electrónico",
      phone: "Teléfono",
      city: "Ciudad",
      country: "País",
      portfolio: "Portafolio / Sitio web",
      
      profProfile: "Perfil profesional",
      profDesc: "Descripción profesional",
      
      workExp: "Experiencia laboral",
      title: "Cargo",
      company: "Empresa",
      location: "Ubicación",
      startDate: "Fecha de inicio",
      endDate: "Fecha de finalización",
      currentJob: "Actualmente trabajo aquí",
      description: "Descripción",
      addExp: "Agregar experiencia",
      
      degree: "Título",
      institution: "Institución",
      descOptional: "Descripción (opcional)",
      addEdu: "Agregar educación",
      
      add: "Agregar",
      addSkill: "Ej. React, Python, Liderazgo...",
      
      projectName: "Nombre del proyecto",
      techStack: "Tecnologías (separadas por coma)",
      projectUrl: "URL del proyecto",
      githubUrl: "URL de GitHub",
      addProject: "Agregar proyecto",
      
      language: "Idioma",
      level: "Nivel",
      addLanguage: "Agregar idioma",
      
      certName: "Nombre de certificación",
      dateMsg: "Fecha (Mes/Año)",
      urlOptional: "URL de validación (opcional)",
      addCert: "Agregar certificación",
      
      personalization: "Personalización",
      template: "Plantilla",
      mainColor: "Color Principal",
      docLang: "Idioma del Documento",
      
      addSections: "Secciones adicionales",
      addSectionsDesc: "Activa las secciones que necesites incluir en tu hoja de vida.",
      courses: "Cursos",
      volunteering: "Voluntariado",
      awards: "Premios",
      publications: "Publicaciones",
      
      cleanCV: "Limpiar CV",
      downloadPDF: "Descargar PDF"
    },
    en: {
      profile: "Professional Summary",
      experience: "Professional Experience",
      education: "Education",
      skills: "Core Skills",
      languages: "Languages",
      projects: "Selected Projects",
      certifications: "Certifications",
      present: "Present",
      
      // Form Labels
      personalInfo: "Personal Information",
      fullName: "Full Name",
      jobTitle: "Job Title",
      email: "Email",
      phone: "Phone",
      city: "City",
      country: "Country",
      portfolio: "Portfolio / Website",
      
      profProfile: "Professional Profile",
      profDesc: "Professional Description",
      
      workExp: "Work Experience",
      title: "Job Title",
      company: "Company",
      location: "Location",
      startDate: "Start Date",
      endDate: "End Date",
      currentJob: "I currently work here",
      description: "Description",
      addExp: "Add Experience",
      
      degree: "Degree",
      institution: "Institution",
      descOptional: "Description (optional)",
      addEdu: "Add Education",
      
      add: "Add",
      addSkill: "Ex. React, Python, Leadership...",
      
      projectName: "Project Name",
      techStack: "Technologies (comma separated)",
      projectUrl: "Project URL",
      githubUrl: "GitHub URL",
      addProject: "Add Project",
      
      language: "Language",
      level: "Level",
      addLanguage: "Add Language",
      
      certName: "Certification Name",
      dateMsg: "Date (Month/Year)",
      urlOptional: "Validation URL (optional)",
      addCert: "Add Certification",
      
      personalization: "Personalization",
      template: "Template",
      mainColor: "Main Color",
      docLang: "Document Language",
      
      addSections: "Additional Sections",
      addSectionsDesc: "Enable the sections you need to include in your resume.",
      courses: "Courses",
      volunteering: "Volunteering",
      awards: "Awards",
      publications: "Publications",
      
      cleanCV: "Clear CV",
      downloadPDF: "Download PDF"
    }
  };
  
  return translations[lang === 'en' ? 'en' : 'es'][key] || key;
};
