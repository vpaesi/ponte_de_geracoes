import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";

interface LoginFormData {
  email: string;
  password: string;
}

export const useLoginForm = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: ""
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const updateField = (field: keyof LoginFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Limpar erro quando usuário digitar
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
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }

    if (!formData.password) {
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
    setErrors({});

    try {
      const user = await authService.login(formData);
      
      // Salvar dados do usuário
      authService.saveUser(user);
      
      console.log("✅ Login realizado:", user);
      
      // Redirecionar para home ou dashboard
      navigate("/");
    } catch (error: any) {
      console.error("❌ Erro no login:", error);
      setErrors({ 
        submit: error.message || "Erro ao fazer login. Tente novamente." 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const clearErrors = () => {
    setErrors({});
  };

  return {
    formData,
    errors,
    isLoading,
    updateField,
    handleSubmit,
    clearErrors,
    validateForm
  };
};