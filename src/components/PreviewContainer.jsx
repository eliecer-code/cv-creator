import React, { useRef, useEffect, useState } from 'react';
import CVPreview from './CVPreview';

const PreviewContainer = ({ cvData }) => {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [height, setHeight] = useState('auto');

  useEffect(() => {
    const calculateScale = () => {
      if (containerRef.current && contentRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const targetWidth = 794; // 210mm in pixels at 96 DPI
        
        let newScale = 1;
        if (containerWidth < targetWidth) {
          // Leave some padding
          newScale = (containerWidth - 32) / targetWidth;
        }
        setScale(newScale);
        
        const actualHeight = contentRef.current.clientHeight;
        if (newScale !== 1) {
          setHeight(`${actualHeight * newScale}px`);
        } else {
          setHeight('auto');
        }
      }
    };

    calculateScale();
    window.addEventListener('resize', calculateScale);
    
    const observer = new ResizeObserver(() => calculateScale());
    if (contentRef.current) observer.observe(contentRef.current);
    
    return () => {
      window.removeEventListener('resize', calculateScale);
      observer.disconnect();
    };
  }, [cvData]);

  return (
    <div ref={containerRef} className="w-full flex justify-center" style={{ height }}>
      <div 
        style={{ 
          transform: `scale(${scale})`, 
          transformOrigin: 'top center',
          width: '794px'
        }}
      >
        <div id="cv-preview-content" ref={contentRef} className="cv-page shrink-0">
          <CVPreview cvData={cvData} />
        </div>
      </div>
    </div>
  );
};

export default PreviewContainer;
