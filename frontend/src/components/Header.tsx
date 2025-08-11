import { Link } from "react-router-dom";
import goldenGateBridge from "../assets/golden-gate-bridge.svg";
import NavigationLinks from "./HeaderLinks";

const Header = () => {
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
          <div className="hidden md:block">
            <NavigationLinks className="btn-secondary px-4 py-2 rounded-lg  transition-colors font-medium" />
          </div>
          {/* Mobile menu button - pode ser implementado depois */}
          <div className="md:hidden">
            <button className="p-2 rounded-lg hover:bg-gray-50 transition-colors">
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
