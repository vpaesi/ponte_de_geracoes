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
    <div className="form-row availableDays">
      <div className="availableDays-title">
        <p>{title}:</p>
      </div>
      <div className="availableDays-days">
        {options.map((option) => (
          <label key={option.value}>
            <input
              type="checkbox"
              name="availableDaysDay"
              value={option.value}
              checked={selectedValues.includes(option.value)}
              onChange={(e) => onChange(option.value, e.target.checked)}
            />
            {option.label}
          </label>
        ))}
      </div>
    </div>
  );
};
