import React from 'react';
import ClassicTemplate from '../templates/ClassicTemplate';
import ModernTemplate from '../templates/ModernTemplate';
import CompactTemplate from '../templates/CompactTemplate';

const CVPreview = ({ cvData }) => {
  const { settings } = cvData;
  
  switch (settings.template) {
    case 'modern':
      return <ModernTemplate cvData={cvData} />;
    case 'compact':
      return <CompactTemplate cvData={cvData} />;
    case 'classic':
    default:
      return <ClassicTemplate cvData={cvData} />;
  }
};

export default CVPreview;
