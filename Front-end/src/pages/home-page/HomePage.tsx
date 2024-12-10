import React from "react";
import "./HomePage.css";
import headerImg from "../../assets/header-img.jpg";
import helper1 from "../../assets/helper1.jpg";
import helper2 from "../../assets/helper2.jpg";
import helper3 from "../../assets/helper3.jpg";
import helper4 from "../../assets/helper4.jpg";
import helper5 from "../../assets/helper5.jpg";
import helper6 from "../../assets/helper6.jpg";
import { Link } from "react-router-dom";
import BenefitCard from "../../components/benefit-card/BenefitCard";
import Carousel from "../../components/carousel/Carousel";

const App: React.FC = () => {

  const benefitsForHelped = [
    {
      title: "Facilidade no Dia a Dia",
      description: "Recebem ajuda em tarefas que podem ser desafiadoras, como fazer compras, buscar medicamentos ou resolver questões burocráticas.",
      icon: undefined,
    },
    {
      title: "Saúde e Bem-Estar",
      description: "Recebem suporte para manter uma rotina mais saudável, como ajuda em atividades físicas, incentivo para consultas médicas regulares e orientações para cuidados pessoais.",
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
      title: "Ampliação de Redes de Contatos",
      description: "Conhecem novas pessoas, fortalecendo laços e criando conexões com benefícios pessoais e profissionais.",
    },
    {
      title: "Sentimento de Propósito",
      description: "Participam de uma causa significativa, contribuindo para a construção de uma comunidade mais solidária.",
    },
  ];

  const registered = [
    {
      name: "Mariana",
      yo: 24,
      img: helper1,
      description: "Estudante de enfermagem apaixonada por cuidar de pessoas. Adoro ouvir histórias e ajudar em pequenas tarefas do dia a dia.",
    },
    {
      name: "Lucas",
      yo: 30,
      img: helper2,
      description: "Engenheiro que acredita no poder da empatia. Disponível para ajudar em compras, organização e resolver pendências.",
    },
    {
      name: "Sofia",
      yo: 21,
      img: helper3,
      description: "Universitária com paixão por leitura e tecnologia. Amo compartilhar meu tempo ajudando e aprendendo com os mais experientes.",
    },
    {
      name: "Gabriel",
      yo: 28,
      img: helper4,
      description: "Professor de educação física, gosta de incentivar a prática de exercícios e ajudar na organização de rotinas saudáveis.",
    },
    {
      name: "Ana",
      yo: 26,
      img: helper5,
      description: "Advogada que se dedica ao voluntariado. Adoro ajudar em questões burocráticas e compartilhar conhecimento.",
    },
    {
      name: "Ricardo",
      yo: 35,
      img: helper6,
      description: "Chef de cozinha apaixonado por ensinar receitas simples e práticas, além de oferecer companhia durante as refeições.",
    },
  ]
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
          <img src={headerImg} alt="Imagem do cabeçalho" />
        </div>
      </section>

      <hr />

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

      <hr />

      <section className="row row-3">
        <Carousel title="Conheça alguns dos nossos ajudantes" registered={registered} />
      </section>

      <hr />

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
