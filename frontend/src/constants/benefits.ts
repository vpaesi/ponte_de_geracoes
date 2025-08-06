import { Images } from '../assets/Images';

export interface Benefit {
  title: string;
  description: string;
  icon: string;
}

export const BENEFITS_FOR_ASSISTED: Benefit[] = [
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

export const BENEFITS_FOR_HELPERS: Benefit[] = [
  {
    title: "Propósito e Significado",
    description: "Encontram um senso profundo de propósito ao fazer a diferença na vida de alguém.",
    icon: Images.iconCompass,
  },
  {
    title: "Troca de Experiências",
    description: "Aprendem com a sabedoria e as histórias dos idosos, enriquecendo suas próprias perspectivas de vida.",
    icon: Images.iconBooks,
  },
  {
    title: "Desenvolvimento Pessoal",
    description: "Desenvolvem habilidades como paciência, empatia e responsabilidade social.",
    icon: Images.iconStar,
  },
  {
    title: "Conexão Comunitária",
    description: "Fortalecem os laços com a comunidade local e criam uma rede de apoio mútuo.",
    icon: Images.iconHeart,
  },
  {
    title: "Reconhecimento",
    description: "Recebem reconhecimento e gratidão pelo trabalho voluntário realizado.",
    icon: Images.iconTrophy,
  },
  {
    title: "Bem-estar Emocional",
    description: "Experimentam a satisfação de ajudar, que contribui para o bem-estar mental e emocional.",
    icon: Images.iconShield,
  },
];
