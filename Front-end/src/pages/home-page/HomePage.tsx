import React, { useEffect, useState } from "react";
import "./HomePage.css";
import { Images } from "../../assets/Images";
import { Link } from "react-router-dom";
import BenefitCard from "../../components/benefit-card/BenefitCard";
import Carousel from "../../components/carousel/Carousel";

const App: React.FC = () => {

  const [helpers, setHelpers] = useState<any[]>([])

  // Função assíncrona que faz a requisição GET à API para buscar os dados dos ajudantes. Depois, ela atualiza o estado helpers.
  const fetchHelpers = async () => {
    try {
      // confirmar caminho da API
      const response = await fetch("http://localhost:3001/helpers");
      const data = await response.json();
      setHelpers(data);
    } catch (error) {
      console.error("Erro ao buscar ajudantes:", error);
    }
  }

  //chama o fetchHelpers() assim que o componente é montado, buscando os dados da API.
  useEffect(() => {
    fetchHelpers();
  }, []);

  const benefitsForHelped = [
    {
      title: "Facilidade no Dia a Dia",
      description: "Recebem ajuda em tarefas que podem ser desafiadoras, como fazer compras, buscar medicamentos ou resolver questões burocráticas.",
      icon: Images.iconCalendar,
    },
    {
      title: "Saúde e Bem-Estar",
      description: "Recebem suporte para manter uma rotina mais saudável, como ajuda em atividades físicas, incentivo para consultas médicas regulares e orientações para cuidados pessoais.",
      icon: Images.iconHeart,
    },
    {
      title: "Maior Autonomia",
      description: "Continuam vivendo de forma independente em suas casas, com o suporte necessário para as atividades diárias.",
      icon: Images.iconFreedom,
    },
    {
      title: "Companhia e Socialização",
      description: "O contato com os ajudantes pode reduzir a solidão e proporcionar conversas e trocas de experiências.",
      icon: Images.iconSocial,
    },
    {
      title: "Segurança",
      description: "Contam com uma rede confiável de apoio, o que traz tranquilidade para lidar com suas necessidades.",
      icon: Images.iconShield,
    },
    {
      title: "Valorização",
      description: "Sentem-se parte da comunidade, com suas histórias e sabedoria reconhecidas e valorizadas.",
      icon: Images.iconTrophy,
    },
  ];

  const benefitsForHelpers = [
    {
      title: "Desenvolvimento Pessoal",
      description: "Aprendem com as experiências e histórias dos idosos, ganhando uma nova perspectiva sobre a vida.",
      icon: Images.iconStar,
    },
    {
      title: "Fortalecimento de Valores",
      description: "Desenvolvem empatia, paciência e responsabilidade ao ajudar quem precisa.",
      icon: Images.iconShield,
    },
    {
      title: "Reconhecimento Social",
      description: "Sentem-se valorizados ao fazer parte de um projeto que promove impacto positivo na sociedade.",
      icon: Images.iconTrophy
    },
    {
      title: "Novas Habilidades",
      description: "Adquirem habilidades práticas, como comunicação e resolução de problemas, que podem ser úteis em outras áreas da vida.",
      icon: Images.iconBooks
    },
    {
      title: "Redes de Contatos",
      description: "Conhecem novas pessoas, fortalecendo laços e criando conexões com benefícios pessoais e profissionais.",
      icon: Images.iconSocial,
    },
    {
      title: "Sentimento de Propósito",
      description: "Participam de uma causa significativa, contribuindo para a construção de uma comunidade mais solidária.",
      icon: Images.iconCompass
    },
  ];

  // excluir a const registered depois que a API estiver funcionando
  // confirmar se a API tem name + age + imagens dos cadastrados + description
  const registered = [
    {
      name: "Mariana",
      age: 24,
      img: Images.helper1,
      description: "Estudante de enfermagem apaixonada por cuidar de pessoas. Adoro ouvir histórias e ajudar em pequenas tarefas do dia a dia.",
    },
    {
      name: "Lucas",
      age: 30,
      img: Images.helper2,
      description: "Engenheiro que acredita no poder da empatia. Disponível para ajudar em compras, organização e resolver pendências.",
    },
    {
      name: "Sofia",
      age: 21,
      img: Images.helper3,
      description: "Universitária com paixão por leitura e tecnologia. Amo compartilhar meu tempo ajudando e aprendendo com os mais experientes.",
    },
    {
      name: "Gabriel",
      age: 28,
      img: Images.helper4,
      description: "Professor de educação física, gosta de incentivar a prática de exercícios e ajudar na organização de rotinas saudáveis.",
    },
    {
      name: "Ana",
      age: 26,
      img: Images.helper5,
      description: "Advogada que se dedica ao voluntariado. Adoro ajudar em questões burocráticas e compartilhar conhecimento.",
    },
    {
      name: "Ricardo",
      age: 35,
      img: Images.helper6,
      description: "Chef de cozinha apaixonado por ensinar receitas simples e práticas, além de oferecer companhia durante as refeições.",
    },
  ];

  return (
    <div className="home-page">
      <section className="row row-1">
        <div className="column text-column">
          <h1>Pontes que aproximam e transformam vidas.</h1>
          <p>
            Ponte de Gerações é uma plataforma gaúcha que conecta idosos com necessidades específicas a pessoas dispostas a ajudar.
          </p>
          <Link to='/register' className='row1-link'>Suba agora nessa ponte</Link>
        </div>
        <div className="column image-column">
          <img src={Images.headerImg} alt="Imagem do cabeçalho" />
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
        {/* se não tiver api de helpers, usar o {registered} */}
        {/* <Carousel title="Conheça alguns dos nossos ajudantes" registered={registered} /> */}
        <Carousel title="Conheça alguns dos nossos ajudantes" registered={helpers} />
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
             icon={benefit.icon} 
            />
          ))}
        </section>
      </section>
    </div>
  );
};

export default App;
