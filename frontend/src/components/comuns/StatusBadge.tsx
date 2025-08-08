import React from "react";

interface StatusBadgeProps {
  available: boolean;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ available, className = "" }) => {
  return (
    <span
      className={`
        px-3 py-1 rounded-full text-sm font-medium
        ${available
          ? "bg-green-100 text-green-800"
          : "bg-red-100 text-red-800"
        }
        ${className}
      `}
    >
      {available ? "Disponível" : "Indisponível"}
    </span>
  );
};

export default StatusBadge;