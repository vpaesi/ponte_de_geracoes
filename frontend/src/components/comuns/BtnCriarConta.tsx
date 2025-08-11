import React from "react";
import Button from "./Button";
import { UserPlusIcon } from "@heroicons/react/24/outline";

interface BtnCriarContaProps {
  to?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  disabled?: boolean;
  children?: React.ReactNode;
  showIcon?: boolean;
}

const BtnCriarConta: React.FC<BtnCriarContaProps> = ({
  children = "Criar conta",
  showIcon = true,
  ...props
}) => {
  return (
    <Button
      {...props}
      icon={showIcon ? <UserPlusIcon className="w-5 h-5" /> : undefined}
    >
      {children}
    </Button>
  );
};

export default BtnCriarConta;
