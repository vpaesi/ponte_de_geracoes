import './Header.css';
import logo from '../../assets/logo.png';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
	const location = useLocation();
	const isHomePage = location.pathname === '/';
	const isRegisterPage = location.pathname === '/register';
	const isRegisteredPage = location.pathname === '/registered';
	const isEditRegistrationPage = location.pathname === '/edit-registration';
	const isLoginPage = location.pathname === '/login';

	return (
		<header className='header'>
			<div className='header-left'>
				<img src={logo} alt="Logo contendo duas pessoas em cima de uma ponte com um pedaço faltando. As duas pessoas estão colocando o pedaço faltante." />
				<h1>Ponte de Gerações</h1>
			</div>
			<div className='header-right'>
				<nav className='header-nav'>
					{!isHomePage && <Link to='/' className='header-link'>Página Inicial</Link>}

					{!isRegisterPage && !isLoginPage && <Link to='/register' className='header-link'>Cadastre-se</Link>}

					{!isHomePage && !isRegisterPage && !isRegisteredPage && <Link to='/registered' className='header-link'>Cadastrados</Link>}

					{!isHomePage && !isRegisterPage && !isLoginPage && !isEditRegistrationPage && !isRegisteredPage && <Link to='/edit-registration' className='header-link'>Editar Cadastro</Link>}

					{!isLoginPage && !isRegisterPage && <Link to='/login' className='header-link'>Entrar</Link>}
				</nav>
			</div>
		</header>
	);
};

export default Header;