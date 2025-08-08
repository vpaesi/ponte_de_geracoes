import React from "react";
import { Link } from "react-router-dom";

export const LoginFooter: React.FC = () => {
  return (
    <>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-accent-200" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-accent-500">ou</span>
        </div>
      </div>

      <div className="text-center">
        <p className="text-accent-600">
          Ainda não tem uma conta?{" "}
          <Link
            to="/signup"
            className="text-primary-600 hover:text-primary-700 font-semibold transition-colors duration-300"
          >
            Cadastre-se
          </Link>
        </p>
      </div>
    </>
  );
};
