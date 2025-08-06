import { Link } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';
import { useNavigationHelpers } from '../../hooks/useNavigationHelpers';

interface NavigationLinksProps {
  className: string;
}

const NavigationLinks: React.FC<NavigationLinksProps> = ({ className }) => {
  const { user } = useUser();
  const { userType } = user || {};
  const {
    isHomePage,
    isRegisterPage,
    isRegisteredPage,
    isEditRegistrationPage,
    isLoginPage,
    isProfilePage,
  } = useNavigationHelpers();

  const shouldShowRegisterLink = 
    userType === "default" &&
    !isRegisterPage &&
    !isLoginPage &&
    !isEditRegistrationPage &&
    !isProfilePage;

  const shouldShowRegisteredLink = 
    userType !== "default" &&
    !isRegisterPage &&
    !isRegisteredPage &&
    !isLoginPage &&
    !isProfilePage;

  const shouldShowEditRegistrationLink = 
    !isRegisterPage &&
    !isLoginPage &&
    !isEditRegistrationPage &&
    !isHomePage &&
    !isRegisteredPage &&
    !isProfilePage;

  const shouldShowLoginLink = 
    userType === "default" &&
    !isLoginPage &&
    !isRegisterPage &&
    !isEditRegistrationPage &&
    !isProfilePage;

  const shouldShowProfileLink = 
    userType !== "default" &&
    !isLoginPage &&
    !isRegisterPage &&
    !isEditRegistrationPage &&
    !isProfilePage;

  return (
    <nav className="header-nav">
      {!isHomePage && (
        <Link to="/" className={className}>
          Página Inicial
        </Link>
      )}

      {shouldShowRegisterLink && (
        <Link to="/register" className={className}>
          Cadastre-se
        </Link>
      )}

      {shouldShowRegisteredLink && (
        <Link to="/registered" className={className}>
          Cadastrados
        </Link>
      )}

      {shouldShowEditRegistrationLink && (
        <Link to="/edit-registration" className={className}>
          Editar Cadastro
        </Link>
      )}

      {shouldShowLoginLink && (
        <Link to="/login" className={className}>
          Entrar
        </Link>
      )}

      {shouldShowProfileLink && (
        <Link to="/profile" className={className}>
          Ver perfil
        </Link>
      )}
    </nav>
  );
};

export default NavigationLinks;
