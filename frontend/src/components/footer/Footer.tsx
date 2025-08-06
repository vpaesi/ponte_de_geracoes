const Footer = () => {
    return (
        <footer className='bg-gradient-to-r from-accent-800 to-accent-900 text-white mt-20'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
                <div className='text-center space-y-6'>
                    <div className='flex justify-center items-center space-x-2'>
                        <div className='w-8 h-1 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full'></div>
                        <h3 className='text-xl font-semibold text-primary-300'>Grupo 09</h3>
                        <div className='w-8 h-1 bg-gradient-to-r from-secondary-400 to-primary-400 rounded-full'></div>
                    </div>
                    
                    <div className='border-t border-accent-600 pt-6'>
                        <p className='text-accent-300 text-sm'> 
                            &copy; {new Date().getFullYear()} Ponte de Gerações. Todos os direitos reservados.
                        </p>
                        <p className='text-accent-400 text-xs mt-2'>
                            Conectando gerações, construindo pontes de solidariedade
                        </p>
                    </div>

                    {/* Social links ou links adicionais podem ser adicionados aqui */}
                    <div className='flex justify-center space-x-6 pt-4'>
                        <div className='w-2 h-2 bg-primary-400 rounded-full animate-pulse'></div>
                        <div className='w-2 h-2 bg-secondary-400 rounded-full animate-pulse' style={{animationDelay: '0.2s'}}></div>
                        <div className='w-2 h-2 bg-warm-400 rounded-full animate-pulse' style={{animationDelay: '0.4s'}}></div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;