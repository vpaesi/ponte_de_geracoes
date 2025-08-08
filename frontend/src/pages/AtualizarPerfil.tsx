import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { PageLayout } from "../components/PageLayout";
import { InputsForms } from "../components/forms/InputsForms";
import { InputsFormsFormatado } from "../components/forms/InputsFormsFormatado";
import { formataCpf, formataCelular, formataCep } from "../utils/formatadores";
import { cepService } from "../services/cepService";
import type { User } from "../types";

const URL_BASE_API = import.meta.env.VITE_API_URL || "http://localhost:8080";

const AtualizarPerfil: React.FC = () => {
  const { user } = useUser();
  const { id, userType } = user || {};
  const navegar = useNavigate();

  const [dadosUsuario, setDadosUsuario] = useState<Partial<User>>({
    name: "",
    birthDate: "",
    rg: "",
    cpf: "",
    email: "",
    phone: "",
    address: {
      street: "",
      number: "",
      complement: "",
      zipCode: "",
      city: "",
      neighborhood: ""
    },
    aboutYou: "",
    skills: "",
    needs: "",
    availableDays: []
  });

  const [carregando, setCarregando] = useState(false);

  const atualizarCampo = (campo: keyof User | string, valor: string | string[]) => {
    if (campo.startsWith('address.')) {
      const subcampo = campo.split('.')[1];
      setDadosUsuario(prev => ({
        ...prev,
        address: {
          ...prev.address!,
          [subcampo]: valor
        }
      }));
    } else {
      setDadosUsuario(prev => ({ ...prev, [campo]: valor }));
    }
  };

  const handleDiasDisponiveisChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    dia: string
  ) => {
    const isChecked = event.target.checked;
    const diasAtuais = dadosUsuario.availableDays || [];
    
    if (isChecked) {
      atualizarCampo('availableDays', [...diasAtuais, dia]);
    } else {
      atualizarCampo('availableDays', diasAtuais.filter(d => d !== dia));
    }
  };

  const handleCepBlur = async () => {
    const cep = dadosUsuario.address?.zipCode;
    if (cep && cep.length >= 8) {
      try {
        const endereco = await cepService.fetchAddressByCep(cep);
        if (endereco.logradouro) {
          atualizarCampo('address.street', endereco.logradouro);
        }
        if (endereco.localidade) {
          atualizarCampo('address.city', endereco.localidade);
        }
        if (endereco.bairro) {
          atualizarCampo('address.neighborhood', endereco.bairro);
        }
      } catch (error) {
        console.error('Erro ao buscar CEP:', error);
      }
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const arquivo = e.target.files?.[0];
    if (arquivo) {
      // Aqui você pode implementar o upload da imagem
      console.log('Imagem selecionada:', arquivo);
    }
  };

  useEffect(() => {
    const carregarPerfilUsuario = async () => {
      if (!id || !userType) return;
      
      try {
        setCarregando(true);
        const endpoint = userType === "ajudante" ? `/helper/${id}` : `/assisted/${id}`;
        const response = await fetch(`${URL_BASE_API}${endpoint}`);
        
        if (response.ok) {
          const userData = await response.json();
          setDadosUsuario({
            ...userData,
            address: userData.address || {
              street: "",
              number: "",
              complement: "",
              zipCode: "",
              city: "",
              neighborhood: ""
            }
          });
        }
      } catch (error) {
        console.error('Erro ao carregar perfil:', error);
      } finally {
        setCarregando(false);
      }
    };

    carregarPerfilUsuario();
  }, [id, userType]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setCarregando(true);
      const endpoint = userType === "ajudante" ? `/helper/${id}` : `/assisted/${id}`;
      
      const response = await fetch(`${URL_BASE_API}${endpoint}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosUsuario),
      });

      if (response.ok) {
        alert('Perfil atualizado com sucesso!');
        navegar('/profile');
      } else {
        throw new Error('Erro ao atualizar perfil');
      }
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      alert('Erro ao atualizar perfil. Tente novamente.');
    } finally {
      setCarregando(false);
    }
  };

  if (carregando) {
    return (
      <PageLayout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-blue-600"></div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-4">
              Atualizar Perfil
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Dados Pessoais */}
            <div className="glass-card p-8">
              <h2 className="text-2xl font-bold text-primary-600 mb-6">
                Dados Pessoais
              </h2>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Nova Foto de Perfil
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full p-2 border border-accent-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputsForms
                    label="Nome completo"
                    type="text"
                    placeholder="Seu nome completo"
                    value={dadosUsuario.name || ""}
                    onChange={(valor) => atualizarCampo("name", valor)}
                    required
                  />

                  <InputsForms
                    label="Email"
                    type="email"
                    placeholder="seu@email.com"
                    value={dadosUsuario.email || ""}
                    onChange={(valor) => atualizarCampo("email", valor)}
                    required
                  />

                  <InputsForms
                    label="Data de nascimento"
                    type="date"
                    placeholder=""
                    value={dadosUsuario.birthDate || ""}
                    onChange={(valor) => atualizarCampo("birthDate", valor)}
                    required
                  />

                  <InputsFormsFormatado
                    label="Telefone"
                    type="tel"
                    placeholder="(00) 00000-0000"
                    value={dadosUsuario.phone || ""}
                    onChange={(valor) => atualizarCampo("phone", valor)}
                    formatter={formataCelular}
                    required
                  />

                  <InputsForms
                    label="RG"
                    type="text"
                    placeholder="00.000.000-0"
                    value={dadosUsuario.rg || ""}
                    onChange={(valor) => atualizarCampo("rg", valor)}
                    required
                  />

                  <InputsFormsFormatado
                    label="CPF"
                    type="text"
                    placeholder="000.000.000-00"
                    value={dadosUsuario.cpf || ""}
                    onChange={(valor) => atualizarCampo("cpf", valor)}
                    formatter={formataCpf}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Endereço */}
            <div className="glass-card p-8">
              <h2 className="text-2xl font-bold text-primary-600 mb-6">
                Endereço
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputsFormsFormatado
                  label="CEP"
                  type="text"
                  placeholder="00000-000"
                  value={dadosUsuario.address?.zipCode || ""}
                  onChange={(valor) => atualizarCampo("address.zipCode", valor)}
                  onBlur={handleCepBlur}
                  formatter={formataCep}
                  required
                />

                <InputsForms
                  label="Cidade"
                  type="text"
                  placeholder="Sua cidade"
                  value={dadosUsuario.address?.city || ""}
                  onChange={(valor) => atualizarCampo("address.city", valor)}
                  required
                />

                <InputsForms
                  label="Logradouro"
                  type="text"
                  placeholder="Rua, Avenida, etc."
                  value={dadosUsuario.address?.street || ""}
                  onChange={(valor) => atualizarCampo("address.street", valor)}
                  required
                />

                <InputsForms
                  label="Número"
                  type="text"
                  placeholder="123"
                  value={dadosUsuario.address?.number || ""}
                  onChange={(valor) => atualizarCampo("address.number", valor)}
                  required
                />

                <InputsForms
                  label="Bairro"
                  type="text"
                  placeholder="Seu bairro"
                  value={dadosUsuario.address?.neighborhood || ""}
                  onChange={(valor) => atualizarCampo("address.neighborhood", valor)}
                  required
                />

                <InputsForms
                  label="Complemento (opcional)"
                  type="text"
                  placeholder="Apto, Bloco, etc."
                  value={dadosUsuario.address?.complement || ""}
                  onChange={(valor) => atualizarCampo("address.complement", valor)}
                />
              </div>
            </div>

            {/* Sobre você */}
            <div className="glass-card p-8">
              <h2 className="text-2xl font-bold text-primary-600 mb-6">
                Sobre Você
              </h2>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Fale um pouco sobre você
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Conte um pouco sobre sua personalidade, hobbies, experiências..."
                    value={dadosUsuario.aboutYou || ""}
                    onChange={(e) => atualizarCampo("aboutYou", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    {userType === "ajudante" ? "Suas Habilidades" : "Suas Necessidades"}
                  </label>
                  <textarea
                    rows={3}
                    placeholder={userType === "ajudante" ? "Liste suas habilidades..." : "Liste suas necessidades..."}
                    value={userType === "ajudante" ? (dadosUsuario.skills || "") : (dadosUsuario.needs || "")}
                    onChange={(e) => atualizarCampo(userType === "ajudante" ? "skills" : "needs", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors resize-none"
                  />
                </div>

                {/* Dias disponíveis */}
                <div className="space-y-4">
                  <label className="block text-sm font-semibold text-accent-700">
                    {userType === "ajudante" ? "Quando você está disponível para ajudar?" : "Quando você precisaria de ajuda?"}
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                    {["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"].map((dia) => (
                      <label key={dia} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={dadosUsuario.availableDays?.includes(dia) || false}
                          onChange={(e) => handleDiasDisponiveisChange(e, dia)}
                          className="w-4 h-4 text-primary-600 border-accent-300 rounded focus:ring-primary-500"
                        />
                        <span className="text-sm text-accent-700">{dia.slice(0, 3)}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Botões */}
            <div className="flex justify-between items-center pt-8 border-t border-accent-200">
              <button
                type="button"
                onClick={() => navegar("/profile")}
                className="px-6 py-3 rounded-lg font-semibold bg-accent-200 text-accent-700 hover:bg-accent-300 hover:shadow-md transition-all duration-300"
              >
                Cancelar
              </button>

              <button
                type="submit"
                disabled={carregando}
                className="px-6 py-3 rounded-lg font-semibold bg-primary-600 text-white hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-300 disabled:opacity-50"
              >
                {carregando ? "Salvando..." : "Salvar Alterações"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </PageLayout>
  );
};

export default AtualizarPerfil;