import React from "react";
import { Link } from "react-router-dom";
import variantClassBtn from "./variantClassBtn";

interface CriarContaBtnProps {
    to?: string;
    onClick?: () => void;
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
    disabled?: boolean;
    children?: React.ReactNode;
}

const CriarContaBtn: React.FC<CriarContaBtnProps> = ({
    to,
    onClick,
    variant = 'primary',
    size = 'md',
    className = '',
    disabled = false,
    children,
}) => {
    const getDefaultText = () => {
        return children || "Criar conta";
    };

    const baseClasses = 'inline-block font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
    


    const sizeClasses = {
        sm: 'px-3 py-2 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg'
    };

    const disabledClasses = disabled 
        ? 'opacity-50 cursor-not-allowed' 
        : '';

    const finalClasses = `${baseClasses} ${variantClassBtn[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`.trim();

    const content = getDefaultText();

    if (to && !disabled) {
        return (
            <Link to={to} className={finalClasses}>
                {content}
            </Link>
        );
    }

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={finalClasses}
        >
            {content}
        </button>
    );
};

export default CriarContaBtn;
