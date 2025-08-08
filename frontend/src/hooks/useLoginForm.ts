import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "./useUser";

export const useLoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userType: "ajudante" as "ajudante" | "assistido"
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useUser();
  const navigate = useNavigate();

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email é obrigatório";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Senha é obrigatória";
    } else if (formData.password.length < 6) {
      newErrors.password = "Senha deve ter pelo menos 6 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simular login - aqui você faria a requisição real para o backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simular resposta do backend
      const userData = {
        id: "1",
        name: "Usuário Teste",
        email: formData.email,
        userType: formData.userType as "ajudante" | "assistido",
      };

      setUser(userData);
      navigate("/");
    } catch (error) {
      setErrors({
        submit: "Erro ao fazer login. Verifique suas credenciais."
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    errors,
    isLoading,
    updateFormData,
    handleSubmit
  };
};