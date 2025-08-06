import { useLocation } from 'react-router-dom';

interface UseNavigationHelpers {
  isCurrentPage: (path: string) => boolean;
  isHomePage: boolean;
  isRegisterPage: boolean;
  isRegisteredPage: boolean;
  isEditRegistrationPage: boolean;
  isLoginPage: boolean;
  isProfilePage: boolean;
}

export const useNavigationHelpers = (): UseNavigationHelpers => {
  const location = useLocation();

  const isCurrentPage = (path: string): boolean => location.pathname === path;

  return {
    isCurrentPage,
    isHomePage: isCurrentPage('/'),
    isRegisterPage: isCurrentPage('/register'),
    isRegisteredPage: isCurrentPage('/registered'),
    isEditRegistrationPage: isCurrentPage('/edit-registration'),
    isLoginPage: isCurrentPage('/login'),
    isProfilePage: isCurrentPage('/profile'),
  };
};
