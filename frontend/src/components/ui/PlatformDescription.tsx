import React from "react";

interface PlatformDescriptionProps {
  className?: string;
}

const PlatformDescription: React.FC<PlatformDescriptionProps> = ({ 
  className = "" 
}) => {
  return (
    <span className={className}>
      Ponte de Gerações é uma plataforma gaúcha que conecta idosos com necessidades específicas a pessoas dispostas a ajudar.
    </span>
  );
};

export default PlatformDescription;
