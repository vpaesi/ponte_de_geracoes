import React from 'react';

interface FormFieldProps {
  label: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  readOnly?: boolean;
  required?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  type,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  readOnly = false,
  required = false,
  className = "",
  children,
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <label className="block text-sm font-semibold text-accent-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children || (
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          onBlur={onBlur}
          className={`input-field ${error ? 'input-error' : ''}`}
          readOnly={readOnly}
        />
      )}
      {error && (
        <span className="error-message">{error}</span>
      )}
    </div>
  );
};
