import React from "react";

interface AvailableDaysProps {
  days: string[];
  title?: string;
  className?: string;
}

const AvailableDays: React.FC<AvailableDaysProps> = ({ 
  days, 
  title = "Dias disponíveis:", 
  className = "" 
}) => {
  if (!days || days.length === 0) return null;

  return (
    <div className={className}>
      <h4 className="text-sm font-semibold text-accent-700 mb-2">
        {title}
      </h4>
      <div className="flex flex-wrap gap-2">
        {days.map((dia, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-accent-100 text-accent-700 rounded-full text-xs"
          >
            {dia}
          </span>
        ))}
      </div>
    </div>
  );
};

export default AvailableDays;