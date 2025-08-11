import React from "react";
import { Link } from "react-router-dom";
import HeaderLinks from "./HeaderLinks";
import goldenGateBridge from "../assets/golden-gate-bridge.svg";

const Header: React.FC = () => {

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            <img
              src={goldenGateBridge}
              alt="Logo contendo duas pessoas em cima de uma ponte com um pedaço faltando. As duas pessoas estão colocando o pedaço faltante."
              className="h-10 w-auto"
            />
            <h1 className="text-xl lg:text-2xl font-bold">
              <Link
                to="/"
                className="text-gray-900 hover:text-blue-600 transition-colors"
              >
                Ponte de Gerações
              </Link>
            </h1>
          </div>

          <nav className="hidden md:block">
            <HeaderLinks className="px-4 py-2 rounded-lg  transition-colors font-medium" />
          </nav>

        </div>
      </div>
    </header>
  );
};

export default Header;
