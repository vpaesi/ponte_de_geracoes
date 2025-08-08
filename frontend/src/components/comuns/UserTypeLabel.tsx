import React from "react";

interface UserTypeLabelProps {
  userType: 'ajudante' | 'assistido';
  className?: string;
}

const UserTypeLabel: React.FC<UserTypeLabelProps> = ({ userType, className = "" }) => {
  const isHelper = userType === "ajudante";
  
  return (
    <span
      className={`
        px-3 py-1 rounded-full text-sm font-semibold
        ${isHelper
          ? "bg-blue-100 text-blue-800"
          : "bg-green-100 text-green-800"
        }
        ${className}
      `}
    >
      {isHelper ? "Voluntário" : "Assistido"}
    </span>
  );
};

export default UserTypeLabel;