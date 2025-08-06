import React from 'react';

interface FormFieldProps {
  label: string;
  type: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: boolean;
  errorMessage?: string;
  readOnly?: boolean;
  required?: boolean;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  type,
  placeholder,
  value,
  onChange,
  onBlur,
  error = false,
  errorMessage,
  readOnly = false,
  required = false,
}) => {
  return (
    <div>
      <p>
        {label}
        {required && '*'}
      </p>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        className={error ? "input-error" : ""}
        readOnly={readOnly}
      />
      {error && errorMessage && (
        <span className="error-message">{errorMessage}</span>
      )}
    </div>
  );
};
