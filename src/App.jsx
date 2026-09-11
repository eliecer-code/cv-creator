import React, { useState } from 'react';
import { useCV } from './hooks/useCV';
import PersonalInfo from './components/PersonalInfo';
import ProfessionalProfile from './components/ProfessionalProfile';
import ExperienceForm from './components/ExperienceForm';
import EducationForm from './components/EducationForm';
import SkillsForm from './components/SkillsForm';
import { ProjectsForm, LanguagesForm, CertificationsForm } from './components/OtherForms';
import SectionManager from './components/SectionManager';
import TemplateSelector from './components/TemplateSelector';
import CVPreview from './components/CVPreview';
import PreviewContainer from './components/PreviewContainer';
import { generatePDF } from './utils/pdfGenerator';
import { FileText, Download, Trash2, Layout } from 'lucide-react';

function App() {
  const [started, setStarted] = useState(false);
  const [activeTab, setActiveTab] = useState('editor'); // 'editor' | 'preview' for mobile
  
  const cvContext = useCV();
  const { cvData, clearCV } = cvContext;

  const handleDownload = () => {
    if (!cvData.personalInfo.fullName.trim()) {
      alert("Por favor, ingresa al menos tu nombre para generar el CV.");
      return;
    }
    generatePDF('cv-preview-content', cvData.personalInfo.fullName);
  };

  if (!started) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="max-w-xl text-center space-y-6">
          <FileText className="w-20 h-20 text-blue-600 mx-auto" />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Crea tu CV profesional
          </h1>
          <p className="text-xl text-gray-600">
            Crea una hoja de vida limpia, profesional y lista para descargar en pocos minutos.
          </p>
          <button 
            onClick={() => setStarted(true)}
            className="px-8 py-4 bg-blue-600 text-white rounded-lg text-xl font-medium hover:bg-blue-700 transition-colors shadow-lg"
          >
            Crear mi CV
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50 px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2 text-blue-600 font-bold text-xl">
          <FileText className="w-6 h-6" />
          <span>CV Profesional</span>
        </div>
        
        {/* Mobile Tabs */}
        <div className="flex lg:hidden bg-gray-100 p-1 rounded-lg">
          <button 
            onClick={() => setActiveTab('editor')}
            className={`px-4 py-1.5 text-sm font-medium rounded-md ${activeTab === 'editor' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600'}`}
          >
            Editar
          </button>
          <button 
            onClick={() => setActiveTab('preview')}
            className={`px-4 py-1.5 text-sm font-medium rounded-md ${activeTab === 'preview' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600'}`}
          >
            Vista previa
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={clearCV}
            className="hidden md:flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors text-sm font-medium"
          >
            <Trash2 className="w-4 h-4" />
            Limpiar CV
          </button>
          <button 
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Descargar PDF</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 max-w-[1600px] w-full mx-auto flex flex-col lg:flex-row overflow-hidden">
        
        {/* Editor Column */}
        <div className={`lg:w-[45%] xl:w-[40%] bg-white border-r flex-col overflow-y-auto ${activeTab === 'editor' ? 'flex' : 'hidden lg:flex'}`} style={{ height: 'calc(100vh - 65px)' }}>
          <div className="p-6 space-y-8">
            <TemplateSelector {...cvContext} />
            
            <div className="space-y-6">
              <PersonalInfo {...cvContext} />
              <ProfessionalProfile {...cvContext} />
              <ExperienceForm {...cvContext} />
              <EducationForm {...cvContext} />
              <SkillsForm {...cvContext} />
              <ProjectsForm {...cvContext} />
              <LanguagesForm {...cvContext} />
              
              {cvData.optionalSections.certifications && (
                <CertificationsForm {...cvContext} />
              )}
              
              {/* Other optional sections can be added similarly */}
              
              <SectionManager {...cvContext} />
            </div>
          </div>
        </div>

        {/* Preview Column */}
        <div className={`lg:w-[55%] xl:w-[60%] bg-gray-200 overflow-y-auto p-4 sm:p-8 flex justify-center ${activeTab === 'preview' ? 'flex' : 'hidden lg:flex'}`} style={{ height: 'calc(100vh - 65px)' }}>
          <div className="cv-preview-wrapper max-w-full pb-8 w-full">
            <PreviewContainer cvData={cvData} />
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
