import React from "react";
import { useUser } from "../hooks/useUser";
import { useHelpers } from "../hooks/useHelpers";
import HeroSection from "../components/HeroSection";
import BenefitsSection from "../components/BenefitsSection";
import ListaOfUSersSection from "../components/ListaOfUSersSection";

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
      <hr className="border-gray-200" />

      <BenefitsSection />
      <hr className="border-gray-200" />

      <ListaOfUSersSection
        loading={loading}
        carouselItems={carouselItems}
      />
    </div>
  );
};

export default Home;
