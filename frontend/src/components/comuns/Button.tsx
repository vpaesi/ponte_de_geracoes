import React from "react";
import { Link } from "react-router-dom";

interface ButtonProps {
  to?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  disabled?: boolean;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  to,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  children,
  type = "button",
  icon,
}) => {
  // Estilos base
  const baseClasses = `
    inline-flex items-center justify-center gap-2
    font-semibold rounded-lg 
    transition-all duration-200 
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  // Variantes de estilo
  const variantClasses = {
    primary: `
      bg-[#e76f51] 
      hover:bg-red-100 hover:text-[#e76f51] 
      text-white 
      focus:ring-primary-500 
      border border-primary-600
    `,
    secondary: `
      bg-secondary-600 hover:bg-secondary-700 
      text-white 
      focus:ring-secondary-500 
      border border-secondary-600
    `,
    outline: `
      border border-[#e76f51] 
      text-[#e76f51] 
      hover:bg-red-100 hover:text-[#e76f51] 
      focus:ring-primary-500 
      bg-transparent
    `,
  };

  // Tamanhos
  const sizeClasses = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const finalClasses = `
    ${baseClasses} 
    ${variantClasses[variant]} 
    ${sizeClasses[size]} 
    ${className}
  `
    .trim()
    .replace(/\s+/g, " ");

  const content = (
    <>
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </>
  );

  // Se tem link e não está desabilitado, renderiza como Link
  if (to && !disabled) {
    return (
      <Link to={to} className={finalClasses}>
        {content}
      </Link>
    );
  }

  // Senão, renderiza como button
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={finalClasses}
    >
      {content}
    </button>
  );
};

export default Button;
