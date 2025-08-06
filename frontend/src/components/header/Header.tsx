import "./Header.css";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import NavigationLinks from "../navigation/NavigationLinks";

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <img
          src={logo}
          alt="Logo contendo duas pessoas em cima de uma ponte com um pedaço faltando. As duas pessoas estão colocando o pedaço faltante."
          className="special-image-size"
        />
        <h1>
          <Link to={"/"} className="header-left-link">
            Ponte de Gerações
          </Link>
        </h1>
      </div>
      <div className="header-right">
        <NavigationLinks className="header-link" />
      </div>
    </header>
  );
};

export default Header;
