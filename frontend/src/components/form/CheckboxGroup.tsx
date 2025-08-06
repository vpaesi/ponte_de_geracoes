import React from 'react';

interface CheckboxGroupProps {
  title: string;
  options: Array<{ label: string; value: string }>;
  selectedValues: string[];
  onChange: (value: string, checked: boolean) => void;
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  title,
  options,
  selectedValues,
  onChange,
}) => {
  return (
    <div className="space-y-4">
      <label className="block text-sm font-semibold text-accent-700">{title}:</label>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {options.map((option) => (
          <label key={option.value} className="flex items-center space-x-3 cursor-pointer group">
            <input
              type="checkbox"
              name="availableDaysDay"
              value={option.value}
              checked={selectedValues.includes(option.value)}
              onChange={(e) => onChange(option.value, e.target.checked)}
              className="w-4 h-4 text-primary-600 bg-white border-accent-300 rounded focus:ring-primary-500 focus:ring-2 transition-colors duration-200"
            />
            <span className="text-sm text-accent-700 group-hover:text-primary-600 transition-colors duration-200">
              {option.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};
