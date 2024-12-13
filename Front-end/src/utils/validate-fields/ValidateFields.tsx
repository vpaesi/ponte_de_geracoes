import isCPF from "../validate-cpf/ValidateCPF";
import isAdult from "../validate-age/ValidateAge";

interface FormValues {
  name: string;
  dob: string;
  rg: string;
  cpf: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  address: string;
  city: string;
  cep: string;
  userType: string;
}

export const validateFields = (values: FormValues, setErrors: React.Dispatch<React.SetStateAction<Record<string, boolean>>>) => {
  const newErrors: Record<string, boolean> = {};

  const { name, dob, rg, cpf, email, phone, password, confirmPassword, address, city, cep, userType } = values;

  if (!name.trim()) newErrors.name = true;
  if (!dob) newErrors.dob = true;
  if (!rg.trim()) newErrors.rg = true;
  if (!cpf.trim()) newErrors.cpf = true;
  if (!email.trim()) newErrors.email = true;
  if (!phone.trim()) newErrors.phone = true;
  if (!password.trim()) newErrors.password = true;
  if (password !== confirmPassword) newErrors.confirmPassword = true;
  if (!address.trim()) newErrors.address = true;
  if (!city.trim()) newErrors.city = true;
  if (!cep.trim()) newErrors.cep = true;
  if (!userType.trim()) newErrors.userType = true;

  setErrors(newErrors);

  if (Object.keys(newErrors).length > 0) {
    alert("Por favor, preencha todos os campos obrigatórios.");
    return false;
  };

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
