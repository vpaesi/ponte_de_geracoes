import React from 'react';
import {
  HeartIcon,
  UsersIcon,
  ShieldCheckIcon,
  TrophyIcon,
  BookOpenIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline';

export interface Benefit {
  title: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  iconColor?: string;
}

export const BENEFITS: Benefit[] = [
  {
    title: "Conexão e Companhia",
    description: "Fortalece laços humanos através de conversas, trocas de experiências e redução da solidão.",
    icon: UsersIcon,
    iconColor: "text-warm-600",
  },
  {
    title: "Bem-estar e Saúde",
    description: "Promove saúde física e mental através do cuidado mútuo e incentivo a hábitos saudáveis.",
    icon: HeartIcon,
    iconColor: "text-red-500",
  },
  {
    title: "Aprendizado e Crescimento",
    description: "Possibilita troca de conhecimentos, sabedoria e desenvolvimento de novas habilidades.",
    icon: BookOpenIcon,
    iconColor: "text-secondary-600",
  },
  {
    title: "Propósito e Valorização",
    description: "Oferece senso de propósito e reconhecimento mútuo, valorizando a contribuição de cada pessoa.",
    icon: TrophyIcon,
    iconColor: "text-yellow-600",
  },
  {
    title: "Segurança e Confiança",
    description: "Cria uma rede confiável de apoio e suporte para necessidades do dia a dia.",
    icon: ShieldCheckIcon,
    iconColor: "text-green-600",
  },
  {
    title: "Desenvolvimento Pessoal",
    description: "Desenvolve empatia, paciência e responsabilidade social em ambas as partes.",
    icon: AcademicCapIcon,
    iconColor: "text-indigo-600",
  }
];
