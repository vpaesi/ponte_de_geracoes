import isCPF from "../validate-cpf/ValidateCPF";
import isAdult from "../validate-age/ValidateAge";

interface Address {
  street: string;
  number: string;
  zipCode: string;
  city: string;
  neighborhood: string;
}

interface FormValues {
  name: string;
  dob: string;
  rg: string;
  cpf: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  availableDays: string[];
  address: Address;
  userType: string;
}

export const validateFields = (
  values: FormValues,
  setErrors: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
) => {
  const newErrors: Record<string, boolean> = {};

  const {
    name,
    dob,
    rg,
    cpf,
    email,
    phone,
    password,
    confirmPassword,
    availableDays,
    address,
    userType,
  } = values;

  if (!name.trim()) newErrors.name = true;
  if (!dob) newErrors.dob = true;
  if (!rg.trim()) newErrors.rg = true;
  if (!cpf.trim()) newErrors.cpf = true;
  if (!email.trim()) newErrors.email = true;
  if (!phone.trim()) newErrors.phone = true;
  if (!password.trim()) newErrors.password = true;
  if (password !== confirmPassword) newErrors.confirmPassword = true;
  if (!userType.trim()) newErrors.userType = true;

  if (!address.street.trim()) newErrors.addressStreet = true;
  if (!address.number.trim()) newErrors.addressNumber = true;
  if (!address.zipCode.trim()) newErrors.addressZipCode = true;
  if (!address.city.trim()) newErrors.addressCity = true;
  if (!address.neighborhood.trim()) newErrors.addressNeighborhood = true;

  setErrors(newErrors);

  if (Object.keys(newErrors).length > 0) {
    alert("Por favor, preencha todos os campos obrigatórios.");
    return false;
  }

  if (availableDays.length === 0) {
    newErrors.availableDays = true;
    alert("Selecione pelo menos um dia de disponibilidade.");
  }

  if (!isCPF(cpf)) {
    alert("CPF inválido!");
    return false;
  }

  if (!isAdult(dob)) {
    alert("Você precisa ser maior de idade para se registrar!");
    return false;
  }

  return true;
};
