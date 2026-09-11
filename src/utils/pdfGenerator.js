import html2pdf from 'html2pdf.js';

export const generatePDF = async (elementId, username) => {
  const element = document.getElementById(elementId);
  if (!element) return;

  // Añadir la clase para quitar los paddings Y del HTML y delegarlos a html2pdf
  element.classList.add('pdf-exporting');

  const fileName = username 
    ? `${username.replace(/\s+/g, '_')}_CV.pdf` 
    : 'CV_Profesional.pdf';

  // Configuración de html2pdf
  const opt = {
    margin:       [15, 0, 15, 0], // Top, Right, Bottom, Left en mm
    filename:     fileName,
    image:        { type: 'jpeg', quality: 1 },
    html2canvas:  { scale: 3, useCORS: true, logging: false },
    jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' },
    pagebreak:    { mode: ['css', 'legacy'], avoid: ['.break-inside-avoid', 'h3', 'header', '.grid-avoid'] }
  };

  await html2pdf().set(opt).from(element).save();

  // Restaurar estado
  element.classList.remove('pdf-exporting');
};
