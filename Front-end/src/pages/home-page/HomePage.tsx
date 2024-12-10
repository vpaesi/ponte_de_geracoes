import React from "react";
import "./HomePage.css";
import cabecalhoImage from "../../assets/imagem-cabecalho.jpg";
import ajudante1 from "../../assets/moca-enfermeira.jpg";
import ajudante2 from "../../assets/rapaz-engenheiro.jpg";
import ajudante3 from "../../assets/moca-universitaria.jpg";
import { Link } from "react-router-dom";
import BenefitCard from "../../components/benefit-card/BenefitCard";

const App: React.FC = () => {

  const benefitsForHelped = [
    {
      title: "Facilidade no Dia a Dia",
      description: "Recebem ajuda em tarefas que podem ser desafiadoras, como fazer compras, buscar medicamentos ou resolver questões burocráticas.",
      icon: undefined,
    },
    {
      title: "Maior Autonomia",
      description: "Continuam vivendo de forma independente em suas casas, com o suporte necessário para as atividades diárias.",
    },
    {
      title: "Companhia e Socialização",
      description: "O contato com os ajudantes pode reduzir a solidão e proporcionar conversas e trocas de experiências.",
    },
    {
      title: "Segurança",
      description: "Contam com uma rede confiável de apoio, o que traz tranquilidade para lidar com suas necessidades.",
    },
    {
      title: "Valorização",
      description: "Sentem-se parte da comunidade, com suas histórias e sabedoria reconhecidas e valorizadas.",
    },
  ];

  const benefitsForHelpers = [
    {
      title: "Desenvolvimento Pessoal",
      description: "Aprendem com as experiências e histórias dos idosos, ganhando uma nova perspectiva sobre a vida.",
    },
    {
      title: "Fortalecimento de Valores",
      description: "Desenvolvem empatia, paciência e responsabilidade ao ajudar quem precisa.",
    },
    {
      title: "Reconhecimento Social",
      description: "Sentem-se valorizados ao fazer parte de um projeto que promove impacto positivo na sociedade.",
    },
    {
      title: "Aprimoramento de Habilidades",
      description: "Adquirem habilidades práticas, como comunicação e resolução de problemas, que podem ser úteis em outras áreas da vida.",
    },
    {
      title: "Sentimento de Propósito",
      description: "Participam de uma causa significativa, contribuindo para a construção de uma comunidade mais solidária.",
    },
  ];

  return (
    <div className="home-page">
      <section className="row row-1">
      <div className="column text-column">
        <h1>Pontes que aproximam e transformam vidas.</h1>
        <p>
          Ponte de Gerações é uma plataforma gaúcha que conecta idosos com
          necessidades específicas a pessoas dispostas a ajudar.
        </p>
        <Link to='/register' className='row1-link'>Suba agora nessa ponte</Link>
        </div>
      <div className="column image-column">
        <img src={cabecalhoImage} alt="Imagem do cabeçalho" />
      </div>
  </section>

      <section className="row row-2">
        <h2>Benefícios para os ajudados</h2>
        <section className="benefits-section">
          {benefitsForHelped.map((benefit, index) => (
            <BenefitCard 
            key={index} 
            title={benefit.title} 
            description={benefit.description} 
            icon={benefit.icon} />
          ))}
        </section>
      </section>

      <section className="row row-3">
        <h2>Conheça alguns de nossos ajudantes</h2>
        <div className="carousel">
          <div className="carousel-item">
          <img src={ajudante1} alt="Foto de um jovem ajudante" />
            <h3>Mariana, 24 anos</h3>
            <p>"Estudante de enfermagem apaixonada por cuidar de pessoas. Adoro ouvir histórias e ajudar em pequenas tarefas do dia a dia."</p>
          </div>
          <div className="carousel-item">
          <img src={ajudante2} alt="Foto de um jovem ajudante" />
            <h3>Lucas, 30 anos</h3>
            <p>"Engenheiro que acredita no poder da empatia. Disponível para ajudar em compras, organização e resolver pendências."</p>
          </div>
          <div className="carousel-item">
          <img src={ajudante3} alt="Foto de um jovem ajudante" />
            <h3>Sofia, 21 anos</h3>
            <p>"Universitária com paixão por leitura e tecnologia. Amo compartilhar meu tempo ajudando e aprendendo com os mais experientes."</p>
          </div>
          {/* adicionar mais 2 ajudantes */}
        </div>
      </section>

      <section className="row row-4">
        <h2>Benefícios para os ajudantes</h2>
        <section className="benefits-section">
          {benefitsForHelpers.map((benefit, index) => (
            <BenefitCard 
            key={index} 
            title={benefit.title} 
            description={benefit.description} 
            // icon={benefit.icon} 
            />
          ))}
        </section>
      </section>
    </div>
  );
};

export default App;
