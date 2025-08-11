import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../utils/UserContext";
import { useNavigationHelpers } from "../hooks/useNavigationHelpers";

interface HeaderLinksProps {
  className?: string;
}

const HeaderLinks: React.FC<HeaderLinksProps> = ({ className }) => {
  const { user, isLoggedIn } = useUser();

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
    <div className={className}>
      <div className="flex items-center space-x-4">
        {isLoggedIn? (
          <>
            <span className="text-gray-700">Olá, {user?.name}</span>
            {shouldShowProfileLink && (
              <Link to="/profile" className="btn-outline">
                Meu Perfil
              </Link>
            )}
          </>
        ) : (
          <>
            <Link to="/login" className="btn-outline">
              Entrar
            </Link>
            <Link
              to="/signup"
              className="btn-primary"
            >
              Cadastrar
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default HeaderLinks;
