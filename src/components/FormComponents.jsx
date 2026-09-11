import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export const FormSection = ({ title, children, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  return (
    <div className="border rounded-lg bg-white overflow-hidden shadow-sm">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors border-b"
      >
        <h2 className="font-semibold text-lg text-gray-800">{title}</h2>
        {isOpen ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
      </button>
      {isOpen && (
        <div className="p-4 space-y-4">
          {children}
        </div>
      )}
    </div>
  );
};

export const Input = ({ label, type = "text", value, onChange, placeholder, required = false }) => (
  <div className="space-y-1 w-full">
    <label className="block text-sm font-medium text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
    />
  </div>
);

export const Textarea = ({ label, value, onChange, placeholder, maxLength }) => (
  <div className="space-y-1 w-full">
    <label className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={4}
      maxLength={maxLength}
      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-y"
    />
    {maxLength && (
      <div className="text-right text-xs text-gray-500">
        {value.length}/{maxLength}
      </div>
    )}
  </div>
);
