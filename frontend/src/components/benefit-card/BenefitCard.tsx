import React from "react";
import IconWrapper from "../ui/IconWrapper";

interface BenefitCardProps {
  title: string;
  description: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  iconColor?: string;
}

const BenefitCard: React.FC<BenefitCardProps> = ({ 
  title, 
  description, 
  icon: IconComponent,
  iconColor = "text-primary-600"
}) => {
  return (
    <div className="card p-8 h-full group hover:scale-105 transition-all duration-300">
      <div className="flex flex-col items-center text-center space-y-6">
        {IconComponent && (
          <IconWrapper 
            icon={IconComponent}
            size="lg"
            color={iconColor}
            className="mb-2"
          />
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
