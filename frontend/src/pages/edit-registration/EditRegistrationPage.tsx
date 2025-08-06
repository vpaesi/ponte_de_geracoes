import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleCepBlur } from "../../utils/validate-cep/ValidadeCep";
import { validateFields } from "../../utils/validate-fields/ValidateFields";
import { API_BASE_URL } from "../../constants/api";
import { useUser } from "../../hooks/useUser";
import { PageLayout } from "../../components/layout/PageLayout";
import { FormField } from "../../components/form/FormField";

const EditRegistrationPage: React.FC = () => {
  const { user } = useUser();
  const { id } = user || {};
  const userType = user.userType;
  const navigate = useNavigate();

  const [name, setName] = useState<string>("");
  const [birthDate, setBirthDate] = useState<string>("");
  const [rg, setRg] = useState<string>("");
  const [cpf, setCpf] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [number, setNumber] = useState<string>("");
  const [zipCode, setZipCode] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const [neighborhood, setNeighborhood] = useState<string>("");
  const [complement, setComplement] = useState<string>("");
  const [aboutYou, setAboutYou] = useState<string>("");
  const [skillsNeeds, setSkillsNeeds] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [profileImagePreview, setProfileImagePreview] = useState<File | null>(
    null
  );
  const [availableDays, setAvailableDays] = useState<string[]>([]);

  const handleavailableDaysChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    day: string
  ) => {
    if (event.target.checked) {
      setAvailableDays([...availableDays, day]);
    } else {
      setAvailableDays(availableDays.filter((d) => d !== day));
    }
  };

  useEffect(() => {
    if (!id) return;

    const fetchRegisteredData = async () => {
      try {
        const endpoint = userType === "ajudante" ? "helper" : "assisted";

        const response = await fetch(`${API_BASE_URL}/${endpoint}/${id}`);
        if (!response.ok) {
          throw new Error("Erro ao carregar dados do cadastro.");
        }

        const data = await response.json();
        console.log(typeof data);
        setName(data.name);
        setBirthDate(data.birthDate);
        setRg(data.rg);
        setCpf(data.cpf);
        setEmail(data.email);
        setPhone(data.phone);
        setPassword(data.password);
        setConfirmPassword(data.password);
        setStreet(data.address.street);
        setNumber(data.address.number);
        setComplement(data.address.complement);
        setZipCode(data.address.zipCode);
        setCity(data.address.city);
        setNeighborhood(data.address.neighborhood);
        setAboutYou(data.aboutYou);
        setAvailableDays(data.availableDays);
        if (userType === "ajudante") {
          setSkillsNeeds(data.skills);
        } else {
          setSkillsNeeds(data.needs);
        }
      } catch (error) {
        console.error(error);
        alert("Ocorreu um erro ao carregar os dados do cadastro.");
      }
    };

    fetchRegisteredData();
  }, [id, userType]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    const baseFormValues = {
      name,
      birthDate,
      rg,
      cpf,
      email,
      phone,
      password,
      confirmPassword,
      dob: birthDate,
      availableDays,
      address: {
        street,
        number,
        complement,
        zipCode,
        city,
        neighborhood,
      },
      userType: userType,
      aboutYou,
      ...(userType === "ajudante"
        ? { skills: skillsNeeds }
        : { needs: skillsNeeds }),
    };

    if (!validateFields(baseFormValues, setErrors)) {
      return;
    }

    try {
      const endpoint = user.userType === "ajudante" ? "helper" : "assisted";
      const response = await fetch(`${API_BASE_URL}/${endpoint}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(baseFormValues),
      });

      if (!response.ok) {
        throw new Error("Erro ao enviar os dados para o banco de dados");
      }

      const createdUser = await response.json();
      const userId = createdUser.id;

      if (profileImagePreview && userId) {
        await uploadProfileImage(userType, userId, profileImagePreview);
      }

      alert("Cadastro atualizado com sucesso!");
      navigate("/registered");
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Ocorreu um erro ao realizar o cadastro.");
      }
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

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
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
              Editar Cadastro
            </h1>
            <p className="text-lg text-accent-600">
              Atualize suas informações pessoais e mantenha seu perfil sempre atualizado
            </p>
          </div>

          {/* Form */}
          <div className="glass-card p-8">
            <form onSubmit={handleUpdate} className="space-y-8">
              {/* Personal Data Section */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-accent-800 mb-6 text-center border-b border-accent-200 pb-4">
                  Dados Pessoais
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    label="Nome Completo"
                    type="text"
                    placeholder="Digite seu nome completo"
                    value={name}
                    onChange={setName}
                    error={errors.name ? "Nome é obrigatório" : undefined}
                    required
                  />

                  <FormField
                    label="Email"
                    type="email"
                    placeholder="nome@exemplo.com"
                    value={email}
                    onChange={setEmail}
                    error={errors.email ? "Email é obrigatório" : undefined}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <FormField
                    label="Data de Nascimento"
                    type="date"
                    value={birthDate}
                    onChange={setBirthDate}
                    error={errors.birthDate ? "Data é obrigatória" : undefined}
                    required
                  />

                  <FormField
                    label="Celular"
                    type="tel"
                    placeholder="(11) 99999-9999"
                    value={phone}
                    onChange={setPhone}
                    error={errors.phone ? "Celular é obrigatório" : undefined}
                    required
                  />

                  <FormField
                    label="RG"
                    type="text"
                    placeholder="12.345.678-9"
                    value={rg}
                    onChange={setRg}
                    error={errors.rg ? "RG é obrigatório" : undefined}
                    required
                  />

                  <FormField
                    label="CPF"
                    type="text"
                    placeholder="123.456.789-01"
                    value={cpf}
                    onChange={setCpf}
                    error={errors.cpf ? "CPF é obrigatório" : undefined}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormField label="Nova Foto de Perfil">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setProfileImagePreview(e.target.files[0]);
                        }
                      }}
                      className="input-field"
                    />
                  </FormField>

                  <FormField
                    label="Nova Senha"
                    type="password"
                    placeholder="Digite sua nova senha"
                    value={password}
                    onChange={setPassword}
                    error={errors.password ? "Senha é obrigatória" : undefined}
                  />

                  <FormField
                    label="Confirme a Nova Senha"
                    type="password"
                    placeholder="Digite novamente"
                    value={confirmPassword}
                    onChange={setConfirmPassword}
                    error={errors.confirmPassword ? "As senhas não coincidem" : undefined}
                  />
                </div>
              </div>

              {/* Address Section */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-accent-800 mb-6 text-center border-b border-accent-200 pb-4">
                  Endereço
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormField
                    label="CEP"
                    type="text"
                    placeholder="00000-000"
                    value={zipCode}
                    onChange={setZipCode}
                    onBlur={() => handleCepBlur(zipCode, setStreet, setCity, setNeighborhood)}
                    error={errors.zipCode ? "CEP é obrigatório" : undefined}
                    required
                  />

                  <FormField
                    label="Cidade"
                    type="text"
                    placeholder="Digite sua cidade"
                    value={city}
                    onChange={setCity}
                    readOnly
                    className="bg-accent-50"
                    error={errors.city ? "Cidade é obrigatória" : undefined}
                    required
                  />

                  <FormField
                    label="Bairro"
                    type="text"
                    placeholder="Digite seu bairro"
                    value={neighborhood}
                    onChange={setNeighborhood}
                    readOnly
                    className="bg-accent-50"
                    error={errors.neighborhood ? "Bairro é obrigatório" : undefined}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormField
                    label="Logradouro"
                    type="text"
                    placeholder="Avenida Exemplo de Rua"
                    value={street}
                    onChange={setStreet}
                    readOnly
                    className="md:col-span-2 bg-accent-50"
                    error={errors.address ? "Logradouro é obrigatório" : undefined}
                    required
                  />

                  <FormField
                    label="Número"
                    type="text"
                    placeholder="123"
                    value={number}
                    onChange={setNumber}
                    error={errors.number ? "Número é obrigatório" : undefined}
                    required
                  />
                </div>

                <FormField
                  label="Complemento"
                  type="text"
                  placeholder="Casa 2, Bloco A, Apartamento 101..."
                  value={complement}
                  onChange={setComplement}
                />
              </div>

              {/* Profile Section */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-accent-800 mb-6 text-center border-b border-accent-200 pb-4">
                  Perfil e Disponibilidade
                </h2>

                {/* User Type (Read Only) */}
                <div className="bg-accent-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-accent-700 mb-4 text-center">
                    Tipo de Usuário (não pode ser alterado)
                  </h3>
                  <div className="flex justify-center">
                    <div className={`px-6 py-3 rounded-full font-semibold text-white shadow-lg ${
                      userType === 'ajudante' ? 'bg-secondary-500' : 'bg-primary-500'
                    }`}>
                      {userType === 'ajudante' ? '🤝 Ajudante' : '❤️ Ajudado'}
                    </div>
                  </div>
                </div>

                {/* Available Days */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-accent-700 text-center">
                    {userType === 'ajudante' 
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
                          onChange={(e) => handleavailableDaysChange(e, day.key)}
                        />
                        <div className="font-medium text-sm">
                          {day.label}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* About and Skills */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <FormField label="Fale um pouco sobre você">
                    <textarea
                      rows={4}
                      placeholder="Conte um pouco sobre sua personalidade, hobbies, experiências..."
                      value={aboutYou}
                      onChange={(e) => setAboutYou(e.target.value)}
                      className="input-field resize-none"
                    />
                  </FormField>

                  <FormField
                    label={userType === 'ajudante' ? 'Suas Habilidades' : 'Suas Necessidades'}
                    error={errors.skillsNeeds ? "Este campo é obrigatório" : undefined}
                  >
                    <textarea
                      rows={4}
                      placeholder={
                        userType === 'ajudante'
                          ? 'Ex: Gosto de ensinar tecnologia, ajudar com compras...'
                          : 'Ex: Preciso de ajuda para ir ao mercado, usar o computador...'
                      }
                      maxLength={150}
                      value={skillsNeeds}
                      onChange={(e) => setSkillsNeeds(e.target.value)}
                      className={`input-field resize-none ${errors.skillsNeeds ? 'input-error' : ''}`}
                    />
                    <div className="text-right text-sm text-accent-500 mt-1">
                      {skillsNeeds.length}/150
                    </div>
                  </FormField>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-8 border-t border-accent-200">
                <button
                  type="submit"
                  className="btn-primary px-12 py-4 text-lg"
                >
                  Salvar Alterações
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default EditRegistrationPage;
