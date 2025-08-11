import React from "react";

interface FilterSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string; description?: string }>;
  placeholder?: string;
  className?: string;
  required?: boolean;
  disabled?: boolean;
}

const FilterSelect: React.FC<FilterSelectProps> = ({
  label,
  value,
  onChange,
  options,
  placeholder = "Selecione uma opção",
  className = "",
  required = false,
  disabled = false,
}) => {
  const selectId = `filter-${label.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className={className}>
      <label 
        htmlFor={selectId}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <select
        id={selectId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        required={required}
        className={`
          w-full px-4 py-2 border border-gray-300 rounded-lg 
          focus:ring-2 focus:ring-primary-500 focus:border-transparent
          disabled:bg-gray-100 disabled:cursor-not-allowed
          transition-colors duration-200
        `}
      >
        {placeholder && (
          <option value="">{placeholder}</option>
        )}
        {options.map((option) => (
          <option 
            key={option.value} 
            value={option.value}
            title={option.description}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterSelect;