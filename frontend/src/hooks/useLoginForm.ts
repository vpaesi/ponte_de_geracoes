import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "./useUser";

export const useLoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userType: "ajudante" as "ajudante" | "ajudado"
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
      newErrors.email = "Digite um email válido";
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
      const endpoint = formData.userType === "ajudante" ? "/helper/login" : "/assisted/login";
      const response = await fetch(`http://localhost:8080${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Email ou senha incorretos");
        } else if (response.status === 404) {
          throw new Error("Usuário não encontrado");
        } else {
          throw new Error("Erro ao fazer login. Tente novamente.");
        }
      }

      const userData = await response.json();
      
      setUser({
        id: userData.id,
        name: userData.name,
        email: userData.email,
        userType: formData.userType
      });

      navigate("/profile");
      
    } catch (error) {
      console.error("Erro no login:", error);
      setErrors({
        submit: error instanceof Error ? error.message : "Erro inesperado ao fazer login"
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