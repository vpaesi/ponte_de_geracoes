import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { handleCepBlur } from "../utils/ValidadeCep";
import { validateFields } from "../utils/ValidateFields";
import { PageLayout } from "../components/PageLayout";
import { FormField } from "../components/form/FormField";

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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

  return (
    <PageLayout>
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-4">
              Crie sua Conta
            </h1>
            <p className="text-lg text-accent-600 mb-6">
              Faça parte da nossa comunidade de conexão entre gerações
            </p>
            <p className="text-accent-600">
              Já tem uma conta?{" "}
              <Link 
                to="/login" 
                className="text-primary-600 hover:text-primary-700 font-semibold transition-colors duration-300"
              >
                Fazer login
              </Link>
            </p>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-4">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 ${
                      step <= currentStep
                        ? 'bg-primary-500 text-white shadow-lg'
                        : 'bg-accent-200 text-accent-500'
                    }`}
                  >
                    {step}
                  </div>
                  {step < 3 && (
                    <div
                      className={`w-16 h-1 mx-2 transition-all duration-300 ${
                        step < currentStep ? 'bg-primary-500' : 'bg-accent-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-3">
              <div className="text-sm text-accent-600 font-medium">
                {currentStep === 1 && "Dados Pessoais"}
                {currentStep === 2 && "Endereço"}
                {currentStep === 3 && "Perfil"}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="glass-card p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Step 1: Personal Data */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-accent-800 mb-6 text-center">
                    Dados Pessoais
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      label="Nome Completo"
                      required
                      error={errors.name ? "Nome é obrigatório" : undefined}
                    >
                      <input
                        type="text"
                        placeholder="Digite seu nome completo"
                        value={formData.name}
                        onChange={(e) => updateFormData('name', e.target.value)}
                        className={`input-field ${errors.name ? 'input-error' : ''}`}
                      />
                    </FormField>

                    <FormField
                      label="Email"
                      required
                      error={errors.email ? "Email é obrigatório" : undefined}
                    >
                      <input
                        type="email"
                        placeholder="nome@exemplo.com"
                        value={formData.email}
                        onChange={(e) => updateFormData('email', e.target.value)}
                        className={`input-field ${errors.email ? 'input-error' : ''}`}
                      />
                    </FormField>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <FormField
                      label="Data de Nascimento"
                      required
                      error={errors.birthDate ? "Data é obrigatória" : undefined}
                    >
                      <input
                        type="date"
                        value={formData.birthDate}
                        onChange={(e) => updateFormData('birthDate', e.target.value)}
                        className={`input-field ${errors.birthDate ? 'input-error' : ''}`}
                      />
                    </FormField>

                    <FormField
                      label="Celular"
                      required
                      error={errors.phone ? "Celular é obrigatório" : undefined}
                    >
                      <input
                        type="tel"
                        placeholder="(11) 99999-9999"
                        value={formData.phone}
                        onChange={(e) => updateFormData('phone', e.target.value)}
                        className={`input-field ${errors.phone ? 'input-error' : ''}`}
                      />
                    </FormField>

                    <FormField
                      label="RG"
                      required
                      error={errors.rg ? "RG é obrigatório" : undefined}
                    >
                      <input
                        type="text"
                        placeholder="12.345.678-9"
                        value={formData.rg}
                        onChange={(e) => updateFormData('rg', e.target.value)}
                        className={`input-field ${errors.rg ? 'input-error' : ''}`}
                      />
                    </FormField>

                    <FormField
                      label="CPF"
                      required
                      error={errors.cpf ? "CPF é obrigatório" : undefined}
                    >
                      <input
                        type="text"
                        placeholder="123.456.789-01"
                        value={formData.cpf}
                        onChange={(e) => updateFormData('cpf', e.target.value)}
                        className={`input-field ${errors.cpf ? 'input-error' : ''}`}
                      />
                    </FormField>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FormField
                      label="Foto de Perfil"
                      error={errors.profileImage ? "Foto é obrigatória" : undefined}
                    >
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setProfileImagePreview(e.target.files[0]);
                          }
                        }}
                        className={`input-field ${errors.profileImage ? 'input-error' : ''}`}
                      />
                    </FormField>

                    <FormField
                      label="Senha"
                      required
                      error={errors.password ? "Senha é obrigatória" : undefined}
                    >
                      <input
                        type="password"
                        placeholder="Digite sua senha"
                        value={formData.password}
                        onChange={(e) => updateFormData('password', e.target.value)}
                        className={`input-field ${errors.password ? 'input-error' : ''}`}
                      />
                    </FormField>

                    <FormField
                      label="Confirme a Senha"
                      required
                      error={errors.confirmPassword ? "As senhas não coincidem" : undefined}
                    >
                      <input
                        type="password"
                        placeholder="Digite novamente"
                        value={formData.confirmPassword}
                        onChange={(e) => updateFormData('confirmPassword', e.target.value)}
                        className={`input-field ${errors.confirmPassword ? 'input-error' : ''}`}
                      />
                    </FormField>
                  </div>
                </div>
              )}

              {/* Step 2: Address */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-accent-800 mb-6 text-center">
                    Endereço
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FormField
                      label="CEP"
                      required
                      error={errors.zipCode ? "CEP é obrigatório" : undefined}
                    >
                      <input
                        type="text"
                        placeholder="00000-000"
                        value={formData.zipCode}
                        onChange={(e) => updateFormData('zipCode', e.target.value)}
                        onBlur={() =>
                          handleCepBlur(
                            formData.zipCode,
                            (value) => updateFormData('street', value),
                            (value) => updateFormData('city', value),
                            (value) => updateFormData('neighborhood', value)
                          )
                        }
                        className={`input-field ${errors.zipCode ? 'input-error' : ''}`}
                      />
                    </FormField>

                    <FormField
                      label="Cidade"
                      required
                      error={errors.city ? "Cidade é obrigatória" : undefined}
                    >
                      <input
                        type="text"
                        placeholder="Digite sua cidade"
                        value={formData.city}
                        readOnly
                        className={`input-field bg-accent-50 ${errors.city ? 'input-error' : ''}`}
                      />
                    </FormField>

                    <FormField
                      label="Bairro"
                      required
                      error={errors.neighborhood ? "Bairro é obrigatório" : undefined}
                    >
                      <input
                        type="text"
                        placeholder="Digite seu bairro"
                        value={formData.neighborhood}
                        readOnly
                        className={`input-field bg-accent-50 ${errors.neighborhood ? 'input-error' : ''}`}
                      />
                    </FormField>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FormField
                      label="Logradouro"
                      required
                      error={errors.street ? "Logradouro é obrigatório" : undefined}
                      className="md:col-span-2"
                    >
                      <input
                        type="text"
                        placeholder="Avenida Exemplo de Rua"
                        value={formData.street}
                        readOnly
                        className={`input-field bg-accent-50 ${errors.street ? 'input-error' : ''}`}
                      />
                    </FormField>

                    <FormField
                      label="Número"
                      required
                      error={errors.number ? "Número é obrigatório" : undefined}
                    >
                      <input
                        type="text"
                        placeholder="123"
                        value={formData.number}
                        onChange={(e) => updateFormData('number', e.target.value)}
                        className={`input-field ${errors.number ? 'input-error' : ''}`}
                      />
                    </FormField>
                  </div>

                  <FormField label="Complemento">
                    <input
                      type="text"
                      placeholder="Casa 2, Bloco A, Apartamento 101..."
                      value={formData.complement}
                      onChange={(e) => updateFormData('complement', e.target.value)}
                      className="input-field"
                    />
                  </FormField>
                </div>
              )}

              {/* Step 3: Profile */}
              {currentStep === 3 && (
                <div className="space-y-8">
                  <h2 className="text-2xl font-bold text-accent-800 mb-6 text-center">
                    Complete seu Perfil
                  </h2>

                  {/* User Type Selection */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-accent-700 text-center">
                      Como você gostaria de participar?
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div
                        onClick={() => updateFormData('userType', 'ajudado')}
                        className={`cursor-pointer p-6 rounded-xl border-2 transition-all duration-300 hover:shadow-lg ${
                          formData.userType === 'ajudado'
                            ? 'border-primary-500 bg-primary-50 shadow-lg'
                            : 'border-accent-200 hover:border-primary-200'
                        }`}
                      >
                        <div className="text-center">
                          <div className="w-16 h-16 mx-auto mb-4 bg-primary-100 rounded-full flex items-center justify-center">
                            <span className="text-2xl">🤝</span>
                          </div>
                          <h4 className="text-xl font-semibold text-accent-800 mb-2">
                            Preciso de Ajuda
                          </h4>
                          <p className="text-accent-600">
                            Sou uma pessoa mais velha que precisa de apoio em algumas atividades
                          </p>
                          <input
                            type="radio"
                            name="userType"
                            value="ajudado"
                            checked={formData.userType === 'ajudado'}
                            onChange={() => updateFormData('userType', 'ajudado')}
                            className="mt-4 w-5 h-5 text-primary-600"
                          />
                        </div>
                      </div>

                      <div
                        onClick={() => updateFormData('userType', 'ajudante')}
                        className={`cursor-pointer p-6 rounded-xl border-2 transition-all duration-300 hover:shadow-lg ${
                          formData.userType === 'ajudante'
                            ? 'border-secondary-500 bg-secondary-50 shadow-lg'
                            : 'border-accent-200 hover:border-secondary-200'
                        }`}
                      >
                        <div className="text-center">
                          <div className="w-16 h-16 mx-auto mb-4 bg-secondary-100 rounded-full flex items-center justify-center">
                            <span className="text-2xl">❤️</span>
                          </div>
                          <h4 className="text-xl font-semibold text-accent-800 mb-2">
                            Quero Ajudar
                          </h4>
                          <p className="text-accent-600">
                            Sou uma pessoa jovem que quer ajudar e aprender com os mais experientes
                          </p>
                          <input
                            type="radio"
                            name="userType"
                            value="ajudante"
                            checked={formData.userType === 'ajudante'}
                            onChange={() => updateFormData('userType', 'ajudante')}
                            className="mt-4 w-5 h-5 text-secondary-600"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Availability */}
                  {formData.userType && (
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold text-accent-700 text-center">
                        {formData.userType === 'ajudante' 
                          ? 'Quando você está disponível para ajudar?' 
                          : 'Quando você precisaria de ajuda?'
                        }
                      </h3>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                        {[
                          { key: 'Domingo', label: 'Dom' },
                          { key: 'Segunda', label: 'Seg' },
                          { key: 'Terça', label: 'Ter' },
                          { key: 'Quarta', label: 'Qua' },
                          { key: 'Quinta', label: 'Qui' },
                          { key: 'Sexta', label: 'Sex' },
                          { key: 'Sábado', label: 'Sáb' }
                        ].map((day) => (
                          <label
                            key={day.key}
                            className={`cursor-pointer p-3 rounded-lg border-2 text-center transition-all duration-300 hover:shadow-md ${
                              availableDays.includes(day.key)
                                ? 'border-primary-500 bg-primary-100 text-primary-700'
                                : 'border-accent-200 hover:border-primary-200'
                            }`}
                          >
                            <input
                              type="checkbox"
                              className="hidden"
                              checked={availableDays.includes(day.key)}
                              onChange={(e) => handleAvailableDaysChange(e, day.key)}
                            />
                            <div className="font-medium text-sm">
                              {day.label}
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* About and Skills/Needs */}
                  {formData.userType && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <FormField label="Fale um pouco sobre você">
                        <textarea
                          rows={4}
                          placeholder="Conte um pouco sobre sua personalidade, hobbies, experiências..."
                          value={formData.aboutYou}
                          onChange={(e) => updateFormData('aboutYou', e.target.value)}
                          className="input-field resize-none"
                        />
                      </FormField>

                      <FormField
                        label={formData.userType === 'ajudante' ? 'Suas Habilidades' : 'Suas Necessidades'}
                        required
                        error={errors.skillsNeeds ? "Este campo é obrigatório" : undefined}
                      >
                        <textarea
                          rows={4}
                          placeholder={
                            formData.userType === 'ajudante'
                              ? 'Ex: Gosto de ensinar tecnologia, ajudar com compras...'
                              : 'Ex: Preciso de ajuda para ir ao mercado, usar o computador...'
                          }
                          maxLength={150}
                          value={formData.skillsNeeds}
                          onChange={(e) => updateFormData('skillsNeeds', e.target.value)}
                          className={`input-field resize-none ${errors.skillsNeeds ? 'input-error' : ''}`}
                        />
                        <div className="text-right text-sm text-accent-500 mt-1">
                          {formData.skillsNeeds.length}/150
                        </div>
                      </FormField>
                    </div>
                  )}
                </div>
              )}

              {/* Navigation Buttons */}
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
                      onClick={() => setCurrentStep(Math.min(3, currentStep + 1))}
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
