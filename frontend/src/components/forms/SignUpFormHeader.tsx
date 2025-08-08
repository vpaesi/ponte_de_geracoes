import React from "react";
import { Link } from "react-router-dom";

export const SignUpFormHeader: React.FC = () => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-4">
        Crie sua Conta
      </h1>
      <p className="text-accent-600">
        Já tem uma conta?{" "}
        <Link
          to="/login"
          className="text-primary-600 hover:text-primary-700 font-semibold transition-colors duration-300"
        >
          Fazer login
        </Link>
      </p>
    </div>
  );
};
