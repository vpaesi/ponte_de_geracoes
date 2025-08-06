import React from 'react';
import {
  CalendarDaysIcon,
  HeartIcon,
  KeyIcon,
  UsersIcon,
  ShieldCheckIcon,
  TrophyIcon,
  MapIcon,
  BookOpenIcon,
  SparklesIcon,
  FaceSmileIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline';

export interface Benefit {
  title: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  iconColor?: string;
}

export const BENEFITS_FOR_ASSISTED: Benefit[] = [
  {
    title: "Facilidade no Dia a Dia",
    description: "Recebem ajuda em tarefas que podem ser desafiadoras, como fazer compras, buscar medicamentos ou resolver questões burocráticas.",
    icon: CalendarDaysIcon,
    iconColor: "text-primary-600",
  },
  {
    title: "Saúde e Bem-Estar",
    description: "Recebem suporte para manter uma rotina mais saudável, como ajuda em atividades físicas, incentivo para consultas médicas regulares e orientações para cuidados pessoais.",
    icon: HeartIcon,
    iconColor: "text-red-500",
  },
  {
    title: "Maior Autonomia",
    description: "Continuam vivendo de forma independente em suas casas, com o suporte necessário para as atividades diárias.",
    icon: KeyIcon,
    iconColor: "text-secondary-600",
  },
  {
    title: "Companhia e Socialização",
    description: "O contato com os ajudantes pode reduzir a solidão e proporcionar conversas e trocas de experiências.",
    icon: UsersIcon,
    iconColor: "text-warm-600",
  },
  {
    title: "Segurança",
    description: "Contam com uma rede confiável de apoio, o que traz tranquilidade para lidar com suas necessidades.",
    icon: ShieldCheckIcon,
    iconColor: "text-green-600",
  },
  {
    title: "Valorização",
    description: "Sentem-se parte da comunidade, com suas histórias e sabedoria reconhecidas e valorizadas.",
    icon: TrophyIcon,
    iconColor: "text-yellow-600",
  },
];

export const BENEFITS_FOR_HELPERS: Benefit[] = [
  {
    title: "Propósito e Significado",
    description: "Encontram um senso profundo de propósito ao fazer a diferença na vida de alguém.",
    icon: MapIcon,
    iconColor: "text-primary-600",
  },
  {
    title: "Troca de Experiências",
    description: "Aprendem com a sabedoria e as histórias dos idosos, enriquecendo suas próprias perspectivas de vida.",
    icon: BookOpenIcon,
    iconColor: "text-secondary-600",
  },
  {
    title: "Desenvolvimento Pessoal",
    description: "Desenvolvem habilidades como paciência, empatia e responsabilidade social.",
    icon: AcademicCapIcon,
    iconColor: "text-indigo-600",
  },
  {
    title: "Conexão Comunitária",
    description: "Fortalecem os laços com a comunidade local e criam uma rede de apoio mútuo.",
    icon: UsersIcon,
    iconColor: "text-warm-600",
  },
  {
    title: "Reconhecimento",
    description: "Recebem reconhecimento e gratidão pelo trabalho voluntário realizado.",
    icon: SparklesIcon,
    iconColor: "text-purple-600",
  },
  {
    title: "Bem-estar Emocional",
    description: "Experimentam a satisfação de ajudar, que contribui para o bem-estar mental e emocional.",
    icon: FaceSmileIcon,
    iconColor: "text-pink-500",
  },
];
