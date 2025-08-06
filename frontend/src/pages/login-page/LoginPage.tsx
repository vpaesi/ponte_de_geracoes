import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import { PageLayout } from "../../components/layout/PageLayout";
import { FormField } from "../../components/form/FormField";

const LoginPage: React.FC = () => {
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
    // Clear error when user starts typing
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
      
      // Set user data in context
      setUser({
        id: userData.id,
        name: userData.name,
        email: userData.email,
        userType: formData.userType
      });

      // Navigate to appropriate page
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

  return (
    <PageLayout>
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-4">
              Fazer Login
            </h1>
            <p className="text-lg text-accent-600 mb-8">
              Acesse sua conta na Ponte de Gerações
            </p>
          </div>

          {/* Login Form */}
          <div className="glass-card p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* User Type Selection */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-accent-700 text-center mb-4">
                  Tipo de Conta
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => updateFormData('userType', 'ajudado')}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                      formData.userType === 'ajudado'
                        ? 'border-primary-500 bg-primary-50 shadow-md'
                        : 'border-accent-200 hover:border-primary-200 hover:bg-primary-25'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-2">🤝</div>
                      <div className="text-sm font-semibold text-accent-800">
                        Ajudado
                      </div>
                      <div className="text-xs text-accent-600 mt-1">
                        Preciso de ajuda
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => updateFormData('userType', 'ajudante')}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                      formData.userType === 'ajudante'
                        ? 'border-secondary-500 bg-secondary-50 shadow-md'
                        : 'border-accent-200 hover:border-secondary-200 hover:bg-secondary-25'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-2">❤️</div>
                      <div className="text-sm font-semibold text-accent-800">
                        Ajudante
                      </div>
                      <div className="text-xs text-accent-600 mt-1">
                        Quero ajudar
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Email Field */}
              <FormField
                label="Email"
                type="email"
                placeholder="digite@seuemail.com"
                value={formData.email}
                onChange={(value) => updateFormData('email', value)}
                error={errors.email}
                required
              />

              {/* Password Field */}
              <FormField
                label="Senha"
                type="password"
                placeholder="Digite sua senha"
                value={formData.password}
                onChange={(value) => updateFormData('password', value)}
                error={errors.password}
                required
              />

              {/* Submit Error */}
              {errors.submit && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-800">{errors.submit}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center items-center space-x-2 ${
                  formData.userType === 'ajudante' ? 'btn-secondary' : 'btn-primary'
                } ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isLoading && (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                )}
                <span>{isLoading ? 'Entrando...' : 'Entrar'}</span>
              </button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-accent-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-accent-500">ou</span>
                </div>
              </div>

              {/* Register Link */}
              <div className="text-center">
                <p className="text-accent-600">
                  Ainda não tem uma conta?{" "}
                  <Link
                    to="/register"
                    className="text-primary-600 hover:text-primary-700 font-semibold transition-colors duration-300"
                  >
                    Cadastre-se
                  </Link>
                </p>
              </div>
            </form>
          </div>

          {/* Additional Info */}
          <div className="text-center text-sm text-accent-500">
            <p>
              Ao fazer login, você concorda com nossos{" "}
              <a href="#" className="text-primary-600 hover:text-primary-700">
                Termos de Uso
              </a>{" "}
              e{" "}
              <a href="#" className="text-primary-600 hover:text-primary-700">
                Política de Privacidade
              </a>
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default LoginPage;
