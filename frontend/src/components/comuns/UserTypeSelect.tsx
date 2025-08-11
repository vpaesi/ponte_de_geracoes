import React from "react";
import { USER_TYPES } from "../../constants/userTypes";

interface UserTypeSelectProps {
  value: string;
  onChange: (type: string) => void;
  includeAllOption?: boolean;
  className?: string;
  label?: string;
  size?: "sm" | "md" | "lg";
  variant?: "select" | "tabs" | "radio";
}

const UserTypeSelect: React.FC<UserTypeSelectProps> = ({
  value,
  onChange,
  includeAllOption = false,
  className = "",
  label = "Tipo de usuário",
  size = "md",
  variant = "select",
}) => {
  const options = [
    ...(includeAllOption
      ? [
          {
            value: USER_TYPES.ALL,
            label: "Todos",
            icon: "👥",
            description: "Voluntários e assistidos",
          },
        ]
      : []),
    {
      value: USER_TYPES.HELPER,
      label: "Voluntários",
      icon: "🤝",
      description: "Pessoas que oferecem ajuda",
    },
    {
      value: USER_TYPES.ASSISTED,
      label: "Assistidos",
      icon: "🙏",
      description: "Pessoas que precisam de ajuda",
    },
  ];

  const sizeClasses = {
    sm: "text-sm px-2 py-1",
    md: "text-base px-3 py-2",
    lg: "text-lg px-4 py-3",
  };

  if (variant === "tabs") {
    return (
      <div className={className}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-3">
            {label}
          </label>
        )}
        <div className="flex bg-gray-100 rounded-lg p-1">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => onChange(option.value)}
              className={`
                flex-1 ${sizeClasses[size]} rounded-md font-medium
                transition-all duration-200 text-center
                ${
                  value === option.value
                    ? "bg-white text-primary-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-800"
                }
              `}
            >
              <span className="mr-2">{option.icon}</span>
              {option.label}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (variant === "radio") {
    return (
      <div className={className}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-3">
            {label}
          </label>
        )}
        <div className="space-y-3">
          {options.map((option) => (
            <label
              key={option.value}
              className="flex items-center cursor-pointer"
            >
              <input
                type="radio"
                name="userType"
                value={option.value}
                checked={value === option.value}
                onChange={(e) => onChange(e.target.value)}
                className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-gray-300"
              />
              <div className="ml-3">
                <div className="flex items-center">
                  <span className="mr-2">{option.icon}</span>
                  <span className="font-medium text-gray-900">
                    {option.label}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{option.description}</p>
              </div>
            </label>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`
          w-full border border-gray-300 rounded-lg 
          focus:ring-2 focus:ring-primary-500 focus:border-transparent
          ${sizeClasses[size]}
        `}
      >
        <option value="">Selecione o tipo de usuário</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.icon} {option.label} - {option.description}
          </option>
        ))}
      </select>
    </div>
  );
};

export default UserTypeSelect;
