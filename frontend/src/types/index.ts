export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  userType: string;
  isAvailable: boolean;
  birthDate?: string;
  cpf?: string;
  password?: string;
  confirmPassword?: string;
  profileImageUrl?: string;
  availableDays?: string[];
  needsAndSkills?: string[];
  aboutYou?: string;
  address?: {
    id?: number;
    street: string;
    number: string;
    complement?: string;
    zipCode: string;
    city: string;
  };
}

export interface UserContextType {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

export interface RegisteredPerson {
  id: number;
  name: string;
  age: number;
  profileImageUrl: string;
  aboutYou: string;
  birthDate?: string;
  address: Address;
  availableDays: string[];
}

export interface Address {
  id?: number;
  city: string;
  zipCode: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood?: string;
}

export interface CarouselItem {
  id: number;
  name: string;
  age: number;
  img: string;
  descricao: string;
  userType: 'helper' | 'assisted';
}

export interface FormData {
  name: string;
  dataNascimento: string;
  cpf: string;
  email: string;
  telefone: string;
  senha: string;
  confirmarSenha: string;
  endereco: {
    street: string;
    number: string;
    complement?: string;
    zipCode: string;
    city: string;
    neighborhood: string;
  };
  tipoUsuario: 'ajudante' | 'assistido';
  sobreMim: string;
  habilidades?: string;
  necessidades?: string;
  diasDisponiveis: string[];
}

export interface ValidationError {
  campo: string;
  mensagem: string;
}

export interface ValidationResult {
  valido: boolean;
  erros: Record<string, boolean>;
  mensagens: ValidationError[];
}

export interface ApiResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}
