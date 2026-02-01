import type { SearchSelectProps, SelectOption } from '@/types/global/types';
import React from 'react';
import Select, { type StylesConfig, type GroupBase } from 'react-select';

export const SelectField: React.FC<SearchSelectProps> = ({ 
  label, 
  value, 
  onChange, 
  options, 
  placeholder = "Select...", 
  error,
  className = ""
}) => {
  
  const customStyles: StylesConfig<SelectOption, false, GroupBase<SelectOption>> = {
    control: (base, state) => ({
      ...base,
      backgroundColor: 'transparent',
      border: 'none',
      borderBottom: state.isFocused ? '1px solid #007473' : '1px solid #E5E7EB',
      borderRadius: '0',
      boxShadow: 'none',
      minHeight: '45px',
      padding: '0',
      transition: 'border-color 0.3s ease',
      '&:hover': {
        borderBottom: '1px solid #007473',
      },
    }),
    valueContainer: (base) => ({ ...base, padding: '0' }),
    input: (base) => ({
      ...base,
      fontSize: '0.875rem',
      fontWeight: '500', // Matches your InputField font-medium
      color: '#1F2937', // Matches text-gray-800
      margin: '0',
      padding: '0',
    }),
    placeholder: (base) => ({
      ...base,
      color: '#D1D5DB', // Matches placeholder:text-gray-300
      fontSize: '0.875rem',
    }),
    singleValue: (base) => ({
      ...base,
      color: '#1F2937', // Same as input text color
      fontSize: '0.875rem',
      fontWeight: '500',
    }),
    // The menu styling for when it is portaled
    menuPortal: (base) => ({
      ...base,
      zIndex: 9999, // Ensure it sits above the modal
    }),
    menu: (base) => ({
      ...base,
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
      border: '1px solid rgba(0, 0, 0, 0.05)',
      marginTop: '4px',
    }),
    option: (base, state) => ({
      ...base,
      fontSize: '0.875rem',
      fontWeight: '500',
      backgroundColor: state.isSelected ? '#007473' : state.isFocused ? '#F0F9F9' : 'transparent',
      color: state.isSelected ? 'white' : '#1F2937',
      cursor: 'pointer',
      '&:active': {
        backgroundColor: '#007473',
      }
    })
  };

  const selectedOption = options.find(opt => opt.value === value) || null;

  return (
    <div className={`w-full flex flex-col items-start group ${className}`}>
      <label className="text-[10px] font-black uppercase tracking-widest text-[#005C5C] text-left mb-1">
        {label}
      </label>
      <Select
        options={options}
        value={selectedOption}
        onChange={(option) => onChange(option?.value || '')}
        styles={customStyles}
        placeholder={placeholder}
        className="w-full"
        isSearchable
        blurInputOnSelect
        // Portaling logic
        menuPortalTarget={typeof document !== 'undefined' ? document.body : null}
        menuPosition="fixed" 
      />
      {error && (
        <p className="text-[10px] text-red-500 font-bold mt-1 animate-in fade-in slide-in-from-top-1">
          {error}
        </p>
      )}
    </div>
  );
};