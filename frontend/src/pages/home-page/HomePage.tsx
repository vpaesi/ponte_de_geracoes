import React from "react";
import "./HomePage.css";
import "../../components/benefit-card/BenefitCard.css";
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
    <div className="home-page">
      <section className="row row-1">
        <div className="column text-column">
          <h1>Pontes que aproximam e transformam vidas.</h1>
          <p>
            Ponte de Gerações é uma plataforma gaúcha que conecta idosos com
            necessidades específicas a pessoas dispostas a ajudar.
          </p>
          {userType === "default" ? (
            <Link to="/register" className="row1-link">
              Suba agora nessa ponte
            </Link>
          ) : (
            <Link to="/registered" className="row1-link">
              Conheça nossos cadastrados
            </Link>
          )}
        </div>
        <div className="column image-column">
          <img src={Images.headerImg} alt="Imagem do cabeçalho" />
        </div>
      </section>

      <hr />

      <section className="row row-2">
        <h2>Benefícios para os ajudados</h2>
        <BenefitsForAssisted />
      </section>

      <hr />

      <section className="row row-3">
        {loading ? (
          <div>Carregando ajudantes...</div>
        ) : (
          <Carousel
            title="Conheça alguns dos nossos ajudantes"
            registered={carouselItems}
          />
        )}
        <Link to={"/registered"} className="row3-link">
          Conheça mais ajudantes
        </Link>
      </section>

      <hr />

      <section className="row row-4">
        <h2>Benefícios para os ajudantes</h2>
        <BenefitsForHelpers />
      </section>
    </div>
  );
};

export default HomePage;
