import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import NavigationLinks from "../navigation/NavigationLinks";

const Header = () => {
  return (
    <header className="bg-white/95 backdrop-blur-md shadow-xl border-b border-primary-100 sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            <img
              src={logo}
              alt="Logo contendo duas pessoas em cima de uma ponte com um pedaço faltando. As duas pessoas estão colocando o pedaço faltante."
              className="h-12 w-auto special-image-size animate-bounce-gentle"
            />
            <h1 className="text-2xl lg:text-3xl">
              <Link 
                to="/" 
                className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent hover:from-primary-700 hover:to-secondary-700 transition-all duration-300 font-bold"
              >
                Ponte de Gerações
              </Link>
            </h1>
          </div>
          <div className="hidden md:block">
            <NavigationLinks className="text-accent-700 hover:text-primary-600 px-4 py-2 rounded-lg hover:bg-primary-50 transition-all duration-300 font-medium" />
          </div>
          {/* Mobile menu button - pode ser implementado depois */}
          <div className="md:hidden">
            <button className="p-2 rounded-lg hover:bg-primary-50 transition-colors">
              <svg className="w-6 h-6 text-accent-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
