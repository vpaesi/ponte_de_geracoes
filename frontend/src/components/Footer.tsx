const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center space-y-4">
          <div>
            <p className="text-gray-300 text-sm">
              &copy; {new Date().getFullYear()} Ponte de Gerações.
            </p>
            <p className="text-gray-400 text-xs mt-1">
              Projeto realizado por{" "}
              <a
                href="https://github.com/lucasdemattos8"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-blue-400"
              >
                Lucas Miranda
              </a>{" "}
              e{" "}
              <a
                href="https://github.com/vpaesi"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-blue-400"
              >
                Vitória de Camargo
              </a>{" "}
              durante o StartDB 2024.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
