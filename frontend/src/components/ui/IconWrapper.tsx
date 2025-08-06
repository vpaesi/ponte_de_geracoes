import React from "react";

interface IconWrapperProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  bgColor?: string;
  hoverScale?: boolean;
  className?: string;
}

const IconWrapper: React.FC<IconWrapperProps> = ({
  icon: IconComponent,
  size = 'md',
  color = 'text-primary-600',
  bgColor = 'from-primary-50 to-secondary-50',
  hoverScale = true,
  className = ''
}) => {
  const sizeClasses = {
    sm: { container: 'w-12 h-12', icon: 'w-6 h-6' },
    md: { container: 'w-16 h-16', icon: 'w-8 h-8' },
    lg: { container: 'w-20 h-20', icon: 'w-10 h-10' },
    xl: { container: 'w-24 h-24', icon: 'w-12 h-12' }
  };

  return (
    <div className={`relative group ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-full opacity-60 group-hover:opacity-80 transition-opacity duration-300 scale-125"></div>
      <div className={`relative z-10 ${sizeClasses[size].container} flex items-center justify-center rounded-full bg-gradient-to-br ${bgColor} group-hover:from-primary-100 group-hover:to-secondary-100 transition-all duration-300`}>
        <IconComponent 
          className={`${sizeClasses[size].icon} ${color} ${hoverScale ? 'group-hover:scale-110' : ''} transition-all duration-300`}
        />
      </div>
    </div>
  );
};

export default IconWrapper;
