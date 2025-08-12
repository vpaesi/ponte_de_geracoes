import { useLocation } from 'react-router-dom';

export const useNavigationHelpers = () => {
  const location = useLocation();
  
  return {
    isHomePage: location.pathname === '/',
    isRegisterPage: location.pathname === '/signup',
    isRegisteredPage: false,
    isEditRegistrationPage: location.pathname === '/atualizar-perfil',
    isLoginPage: location.pathname === '/login',
    isProfilePage: location.pathname.startsWith('/profile'),
    isUsersPage: location.pathname.startsWith('/users'),
  };
};
