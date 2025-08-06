import React from "react";
import ActiveSupport from "../assets/active-support.svg";
import Carousel from "../components/Carousel";
import BenefitsForAssisted from "../components/benefit-card/BenefitsForAssisted";
import BenefitsForHelpers from "../components/benefit-card/BenefitsForHelpers";
import CriarContaBtn from "../components/ui/CriarContaBtn";
import EncontrarUsuariosBtn from "../components/ui/EncontrarUsuariosBtn";
import PlatformDescription from "../components/ui/PlatformDescription";
import { useUser } from "../hooks/useUser";
import { useHelpers } from "../hooks/useHelpers";

const Home: React.FC = () => {
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
      <section className="relative py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Pontes que aproximam e transformam vidas.
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                <PlatformDescription />
              </p>
              <div className="pt-4">
                {userType === "default" ? (
                  <CriarContaBtn 
                    to="/signup" 
                    variant="primary"
                    size="lg"
                  />
                ) : (
                  <EncontrarUsuariosBtn 
                    to="/users" 
                    size="lg"
                  />
                )}
              </div>
            </div>
              <img 
                src={ActiveSupport} 
                alt="Imagem do cabeçalho" 
                className="w-full h-80 object-contain"
              />
          </div>
        </div>
      </section>

      <hr className="border-gray-200" />

      {/* Benefits for Assisted Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Benefícios para os ajudados
          </h2>
          <div>
            <BenefitsForAssisted />
          </div>
        </div>
      </section>

      <hr className="border-gray-200" />

      {/* Helpers Carousel Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center space-y-12">
          {loading ? (
            <div className="flex flex-col items-center space-y-4 py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-blue-600"></div>
              <p className="text-gray-600 text-lg">Carregando ajudantes...</p>
            </div>
          ) : (
            <div>
              <Carousel
                title="Conheça alguns dos nossos ajudantes"
                registered={carouselItems}
              />
            </div>
          )}
          <div className="pt-6">
            <EncontrarUsuariosBtn 
              to="/users" 
              variant="outline"
              size="lg"
            >
              Encontrar ajudantes
            </EncontrarUsuariosBtn>
          </div>
        </div>
      </section>

      <hr className="border-gray-200" />

      {/* Benefits for Helpers Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Benefícios para os ajudantes
          </h2>
          <div>
            <BenefitsForHelpers />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
