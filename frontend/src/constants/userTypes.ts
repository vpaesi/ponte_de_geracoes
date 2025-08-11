export const USER_TYPES = {
  HELPER: 'ajudante',
  ASSISTED: 'assistido',
  ALL: 'todos'
} as const;

export const USER_TYPE_LABELS = {
  [USER_TYPES.HELPER]: 'Voluntários',
  [USER_TYPES.ASSISTED]: 'Assistidos',
  [USER_TYPES.ALL]: 'Todos os usuários'
} as const;

export const USER_TYPE_DESCRIPTIONS = {
  [USER_TYPES.HELPER]: 'Pessoas dispostas a oferecer ajuda e apoio',
  [USER_TYPES.ASSISTED]: 'Pessoas que precisam de ajuda e suporte',
  [USER_TYPES.ALL]: 'Visualizar voluntários e assistidos juntos'
} as const;

export type UserType = typeof USER_TYPES[keyof typeof USER_TYPES];