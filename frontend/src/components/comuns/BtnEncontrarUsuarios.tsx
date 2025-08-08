import React from "react";
import Button from "./Button";
import { UsersIcon } from "@heroicons/react/24/outline";

interface BtnEncontrarUsuariosProps {
  to?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  disabled?: boolean;
  children?: React.ReactNode;
  showIcon?: boolean;
}

const BtnEncontrarUsuarios: React.FC<BtnEncontrarUsuariosProps> = ({
  children = "Encontrar usuários",
  showIcon = true,
  ...props
}) => {
  return (
    <Button
      {...props}
      icon={showIcon ? <UsersIcon className="w-5 h-5" /> : undefined}
    >
      {children}
    </Button>
  );
};

export default BtnEncontrarUsuarios;
