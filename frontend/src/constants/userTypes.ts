export const USER_TYPES = {
  ALL: "all",
  HELPER: "helper",
  ASSISTED: "assisted",
} as const;

export const USER_TYPE_LABELS = {
  [USER_TYPES.ALL]: "Todos os usuários",
  [USER_TYPES.HELPER]: "Voluntários",
  [USER_TYPES.ASSISTED]: "Assistidos",
} as const;

export const USER_TYPE_DESCRIPTIONS = {
  [USER_TYPES.ALL]: "Visualizar todos os tipos de usuários",
  [USER_TYPES.HELPER]: "Pessoas dispostas a ajudar outros",
  [USER_TYPES.ASSISTED]: "Pessoas que buscam ajuda da comunidade",
} as const;

export type UserType = typeof USER_TYPES[keyof typeof USER_TYPES];