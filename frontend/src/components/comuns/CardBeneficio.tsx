import React from "react";
import IconWrapper from "../IconesLayout";

interface CardBeneficioProps {
  titulo: string;
  descricao: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  iconColor?: string;
  className?: string;
}

const CardBeneficio: React.FC<CardBeneficioProps> = ({
  titulo,
  descricao,
  icon: IconComponent,
  iconColor = "text-primary-600",
  className = "",
}) => {
  return (
    <div
      className={`
      glass-card p-6 h-full group 
      hover:scale-105 hover:shadow-xl 
      transition-all duration-300 
      ${className}
      rounded-lg border
      bg-white
    `}
    >
      <div className="flex flex-col items-center text-center space-y-4">
        {IconComponent && (
          <div className="mb-2">
            <IconWrapper icon={IconComponent} size="md" color={iconColor} />
          </div>
        )}

        <h3 className="text-xl font-bold text-primary-600 group-hover:text-primary-700 transition-colors duration-300">
          {titulo}
        </h3>

        <p className="text-accent-600 leading-relaxed group-hover:text-accent-700 transition-colors duration-300">
          {descricao}
        </p>
      </div>
    </div>
  );
};

export default CardBeneficio;
