import React from "react";

interface InputsFormsFormatadoProps {
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  formatter?: (value: string) => string;
  maxLength?: number;
}

export const InputsFormsFormatado: React.FC<InputsFormsFormatadoProps> = ({
  label,
  type,
  placeholder,
  value,
  onChange,
  error,
  required = false,
  formatter,
  maxLength,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;
    if (formatter) {
      newValue = formatter(newValue);
    }
    onChange(newValue);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        maxLength={maxLength}
        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
          error ? "border-red-500 focus:ring-red-500" : "border-gray-300"
        }`}
        required={required}
      />
      {error && (
        <div className="ml-4 mt-1">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}
    </div>
  );
};
