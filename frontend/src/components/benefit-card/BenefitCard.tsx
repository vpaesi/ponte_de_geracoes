import React from "react";

interface BenefitCardProps {
  title: string;
  description: string;
  icon?: string;
}

const BenefitCard: React.FC<BenefitCardProps> = ({ title, description, icon }) => {
  return (
    <div className="card p-8 h-full group hover:scale-105 transition-all duration-300">
      <div className="flex flex-col items-center text-center space-y-6">
        {icon && (
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
            <img 
              src={icon} 
              alt={`Ícone para ${title}`} 
              className="relative z-10 w-16 h-16 object-contain rounded-none shadow-none hover:scale-100" 
            />
          </div>
        )}
        <h3 className="text-xl font-bold text-primary-600 group-hover:text-primary-700 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-accent-600 leading-relaxed text-base group-hover:text-accent-700 transition-colors duration-300">
          {description}
        </p>
      </div>
    </div>
  );
};

export default BenefitCard;
