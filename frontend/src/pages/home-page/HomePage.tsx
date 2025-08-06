import React from "react";
import { Images } from "../../assets/Images";
import { Link } from "react-router-dom";
import Carousel from "../../components/carousel/Carousel";
import BenefitsForAssisted from "../../components/benefit-card/BenefitsForAssisted";
import BenefitsForHelpers from "../../components/benefit-card/BenefitsForHelpers";
import { useUser } from "../../hooks/useUser";
import { useHelpers } from "../../hooks/useHelpers";

const HomePage: React.FC = () => {
  const { user } = useUser();
  const { userType } = user || {};
  const { getCarouselItems, loading, error } = useHelpers();

  const carouselItems = getCarouselItems();

  if (error) {
    console.error("Erro ao carregar ajudantes:", error);
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 to-secondary-50/50 -z-10"></div>
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                Pontes que aproximam e transformam vidas.
              </h1>
              <p className="text-xl text-accent-600 leading-relaxed">
                Ponte de Gerações é uma plataforma gaúcha que conecta idosos com
                necessidades específicas a pessoas dispostas a ajudar.
              </p>
              {userType === "default" ? (
                <Link 
                  to="/register" 
                  className="inline-block btn-primary text-lg px-8 py-4 transform hover:scale-105"
                >
                  🌉 Suba agora nessa ponte
                </Link>
              ) : (
                <Link 
                  to="/registered" 
                  className="inline-block btn-secondary text-lg px-8 py-4 transform hover:scale-105"
                >
                  👥 Conheça nossos cadastrados
                </Link>
              )}
            </div>
            <div className="relative animate-slide-in">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-200 to-secondary-200 rounded-3xl transform rotate-6 opacity-20"></div>
              <img 
                src={Images.headerImg} 
                alt="Imagem do cabeçalho" 
                className="relative z-10 w-full h-96 object-cover rounded-3xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      <hr />

      {/* Benefits for Assisted Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="mb-16 animate-fade-in">Benefícios para os ajudados</h2>
          <div className="animate-slide-in">
            <BenefitsForAssisted />
          </div>
        </div>
      </section>

      <hr />

      {/* Helpers Carousel Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-warm-50/50 to-primary-50/50">
        <div className="max-w-7xl mx-auto text-center space-y-12">
          {loading ? (
            <div className="flex flex-col items-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-200 border-t-primary-600"></div>
              <p className="text-accent-600">Carregando ajudantes...</p>
            </div>
          ) : (
            <div className="animate-fade-in">
              <Carousel
                title="Conheça alguns dos nossos ajudantes"
                registered={carouselItems}
              />
            </div>
          )}
          <Link 
            to="/registered" 
            className="inline-block btn-outline text-lg px-8 py-4 transform hover:scale-105"
          >
            ✨ Conheça mais ajudantes
          </Link>
        </div>
      </section>

      <hr />

      {/* Benefits for Helpers Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="mb-16 animate-fade-in">Benefícios para os ajudantes</h2>
          <div className="animate-slide-in">
            <BenefitsForHelpers />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
