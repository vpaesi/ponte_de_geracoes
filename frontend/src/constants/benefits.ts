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
  id: string;
  titulo: string;
  descricao: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  iconColor: string;
  categoria?: 'social' | 'health' | 'learning' | 'personal' | 'security';
}

// Cores padronizadas para os ícones
export const ICON_COLORS = {
  warm: "text-warm-600",
  red: "text-red-500",
  secondary: "text-secondary-600",
  yellow: "text-yellow-600",
  green: "text-green-600",
  indigo: "text-indigo-600",
} as const;

export const BENEFITS: Benefit[] = [
  {
    id: "conexao-companhia",
    titulo: "Conexão e Companhia",
    descricao: "Fortalece laços humanos através de conversas, trocas de experiências e redução da solidão.",
    icon: UsersIcon,
    iconColor: ICON_COLORS.warm,
    categoria: 'social',
  },
  {
    id: "bem-estar-saude",
    titulo: "Bem-estar e Saúde",
    descricao: "Promove saúde física e mental através do cuidado mútuo e incentivo a hábitos saudáveis.",
    icon: HeartIcon,
    iconColor: ICON_COLORS.red,
    categoria: 'health',
  },
  {
    id: "aprendizado-crescimento",
    titulo: "Aprendizado e Crescimento",
    descricao: "Possibilita troca de conhecimentos, sabedoria e desenvolvimento de novas habilidades.",
    icon: BookOpenIcon,
    iconColor: ICON_COLORS.secondary,
    categoria: 'learning',
  },
  {
    id: "proposito-valorizacao",
    titulo: "Propósito e Valorização",
    descricao: "Oferece senso de propósito e reconhecimento mútuo, valorizando a contribuição de cada pessoa.",
    icon: TrophyIcon,
    iconColor: ICON_COLORS.yellow,
    categoria: 'personal',
  },
  {
    id: "seguranca-confianca",
    titulo: "Segurança e Confiança",
    descricao: "Cria uma rede confiável de apoio e suporte para necessidades do dia a dia.",
    icon: ShieldCheckIcon,
    iconColor: ICON_COLORS.green,
    categoria: 'security',
  },
  {
    id: "desenvolvimento-pessoal",
    titulo: "Desenvolvimento Pessoal",
    descricao: "Desenvolve empatia, paciência e responsabilidade social em ambas as partes.",
    icon: AcademicCapIcon,
    iconColor: ICON_COLORS.indigo,
    categoria: 'personal',
  }
];

// Função utilitária para filtrar benefícios por categoria
export const getBenefitsBycategoria = (categoria: Benefit['categoria']) => 
  BENEFITS.filter(benefit => benefit.categoria === categoria);

// Função utilitária para buscar benefício por ID
export const getBenefitById = (id: string) => 
  BENEFITS.find(benefit => benefit.id === id);
