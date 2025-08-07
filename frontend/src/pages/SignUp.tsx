import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateFields } from "../utils/ValidateFields";
import { PageLayout } from "../components/PageLayout";
import { SignUpHeader } from "../components/signup/SignUpHeader";
import { IndicacaoDeEtapa } from "../components/signup/IndicacaoDeEtapa";
import { DadosPessoaisForm } from "../components/signup/DadosPessoaisForm";
import { EnderecoForm } from "../components/signup/EnderecoForm";
import { ProfileStep } from "../components/signup/CompleteSeuPerfil";

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    birthDate: "",
    rg: "",
    cpf: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    street: "",
    number: "",
    zipCode: "",
    city: "",
    neighborhood: "",
    complement: "",
    userType: "",
    aboutYou: "",
    skillsNeeds: "",
  });
  
  const [profileImagePreview, setProfileImagePreview] = useState<File | null>(null);
  const [availableDays, setAvailableDays] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAvailableDaysChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    day: string
  ) => {
    if (event.target.checked) {
      setAvailableDays([...availableDays, day]);
    } else {
      setAvailableDays(availableDays.filter((d) => d !== day));
    }
  };

  const validateCurrentStep = (stepToValidate: number): boolean => {
    const newErrors: Record<string, boolean> = {};

    if (stepToValidate === 3) {
      // Validação apenas quando finalizar cadastro
      if (availableDays.length === 0) {
        alert("Por favor, selecione ao menos um dia da semana em que você está disponível.");
        return false;
      }
      
      if (!formData.skillsNeeds.trim()) {
        newErrors.skillsNeeds = true;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    setCurrentStep(Math.min(3, currentStep + 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateCurrentStep(3)) {
      return;
    }

    setIsLoading(true);

    const baseFormValues = {
      name: formData.name,
      birthDate: formData.birthDate,
      rg: formData.rg,
      cpf: formData.cpf,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      dob: formData.birthDate,
      availableDays,
      address: {
        street: formData.street,
        number: formData.number,
        complement: formData.complement,
        zipCode: formData.zipCode,
        city: formData.city,
        neighborhood: formData.neighborhood,
      },
      userType: formData.userType,
      aboutYou: formData.aboutYou,
      ...(formData.userType === "ajudante"
        ? { skills: formData.skillsNeeds }
        : { needs: formData.skillsNeeds }),
    };

    if (!validateFields(baseFormValues, setErrors)) {
      setIsLoading(false);
      return;
    }

    try {
      const endpoint = formData.userType === "ajudante" ? "/helper" : "/assisted";
      const response = await fetch(`http://localhost:8080${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(baseFormValues),
      });

      if (!response.ok) {
        throw new Error("Erro ao enviar os dados para o banco de dados");
      }

      const createdUser = await response.json();
      const userId = createdUser.id;

      if (profileImagePreview && userId) {
        await uploadProfileImage(formData.userType, userId, profileImagePreview);
      }

      alert("Cadastro realizado com sucesso!");
      navigate("/registered");
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Ocorreu um erro ao realizar o cadastro.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const uploadProfileImage = async (
    userType: string,
    userId: string,
    image: File
  ) => {
    const formDataImage = new FormData();
    formDataImage.append("file", image);

    const endpoint =
      userType === "ajudante"
        ? `/helper/upload-image/${userId}`
        : `/assisted/upload-image/${userId}`;
    const response = await fetch(`http://localhost:8080${endpoint}`, {
      method: "POST",
      body: formDataImage,
    });

    if (!response.ok) {
      throw new Error("Erro ao fazer o upload da imagem");
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <DadosPessoaisForm
            formData={formData}
            errors={errors}
            updateFormData={updateFormData}
            setProfileImagePreview={setProfileImagePreview}
          />
        );
      case 2:
        return (
          <EnderecoForm
            formData={formData}
            errors={errors}
            updateFormData={updateFormData}
          />
        );
      case 3:
        return (
          <ProfileStep
            formData={formData}
            errors={errors}
            availableDays={availableDays}
            updateFormData={updateFormData}
            handleAvailableDaysChange={handleAvailableDaysChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <PageLayout>
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <SignUpHeader />
          <IndicacaoDeEtapa currentStep={currentStep} />

          <div className="glass-card p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {renderCurrentStep()}
              
              <div className="flex justify-between items-center pt-8 border-t border-accent-200">
                <button
                  type="button"
                  onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                  disabled={currentStep === 1}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    currentStep === 1
                      ? 'bg-accent-100 text-accent-400 cursor-not-allowed'
                      : 'bg-accent-200 text-accent-700 hover:bg-accent-300 hover:shadow-md'
                  }`}
                >
                  Anterior
                </button>

                <div className="flex space-x-4">
                  {currentStep < 3 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="btn-primary"
                    >
                      Próximo
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`btn-primary flex items-center space-x-2 ${
                        isLoading ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                    >
                      {isLoading && (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      )}
                      <span>{isLoading ? 'Finalizando...' : 'Finalizar Cadastro'}</span>
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default SignUp;
