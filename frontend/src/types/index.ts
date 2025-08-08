export interface User {
  id: string | null | number;
  nome: string;
  birthDate?: string;
  rg?: string;
  cpf?: string;
  email: string;
  phone?: string;
  password?: string;
  availableDays?: string[];
  aboutYou?: string;
  profileImageUrl?: string;
  available?: boolean;
  address?: Address;
  skills?: string;
  needs?: string;
  userType?: 'ajudante' | 'assistido'; // Adicionar esta propriedade
}

export interface UserContextType {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

export interface RegisteredPerson {
  id: number;
  nome: string;
  age: number;
  profileImageUrl: string;
  aboutYou: string;
  birthDate?: string;
  address: Address;
  availableDays: string[];
}

export interface Address {
  id?: number;
  street: string;
  number: string;
  complement?: string;
  zipCode: string;
  city: string;
  neighborhood: string;
}

export interface CarouselItem {
  id: number;
  nome: string;
  age: number;
  img: string;
  descricao: string;
  userType: 'helper' | 'assisted';
}

export interface FormData {
  nome: string;
  dataNascimento: string;
  rg: string;
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
  page: {
    size: number;
    number: number;
    totalPages: number;
    totalElements: number;
  };
}
