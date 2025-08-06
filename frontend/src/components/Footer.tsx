const Footer = () => {
    return (
        <footer className='bg-gray-800 text-white mt-16'>
            <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
                <div className='text-center space-y-4'>
                    <div className='flex justify-center items-center space-x-2'>
                        <div className='w-6 h-1 bg-blue-500 rounded-full'></div>
                        <h3 className='text-lg font-semibold text-blue-300'>Grupo 09</h3>
                        <div className='w-6 h-1 bg-blue-500 rounded-full'></div>
                    </div>
                    
                    <div className='border-t border-gray-700 pt-4'>
                        <p className='text-gray-300 text-sm'> 
                            &copy; {new Date().getFullYear()} Ponte de Gerações. Todos os direitos reservados.
                        </p>
                        <p className='text-gray-400 text-xs mt-2'>
                            Conectando gerações, construindo pontes de solidariedade
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;