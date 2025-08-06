// Re-export all utilities
export { handleCepBlur } from "./ValidadeCep";
export { validateFields } from "./ValidateFields";
export { UserProvider } from "./UserContext";

// Create simplified versions if needed
export const validateAge = (birthDate: string) => {
  const today = new Date();
  const birth = new Date(birthDate);
  const age = today.getFullYear() - birth.getFullYear();
  return age >= 16;
};

export const validateCPF = (cpf: string) => {
  return cpf.length >= 11;
};
