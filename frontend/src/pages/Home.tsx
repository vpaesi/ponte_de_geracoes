import React from "react";
import { useUser } from "../hooks/useUser";
import { useHelpers } from "../hooks/useHelpers";
import SecaoBeneficios from "../components/secoes/SecaoBeneficios";
import SecaoCarrossel from "../components/secoes/SecaoCarrossel";
import HeroSection from "../components/secoes/SecaoHero";

const Home: React.FC = () => {
  const { user } = useUser();
  const { userType } = user || {};
  const { getCarouselItems, loading, error } = useHelpers();

  const carouselItems = getCarouselItems();

  if (error) {
    console.error("Erro ao carregar ajudantes:", error);
  }

  return (
    <div className="min-h-screen mx-20">
      <HeroSection userType={userType} />
      <hr className="border-gray-200 m-4" />

      <SecaoBeneficios />
      <hr className="border-gray-200 m-4" />

      <SecaoCarrossel loading={loading} carouselItems={carouselItems} />
    </div>
  );
};

export default Home;
