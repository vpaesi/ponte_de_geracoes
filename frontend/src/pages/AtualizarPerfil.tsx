import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { PageLayout } from "../components/PageLayout";
import { DadosPessoaisSection } from "../components/forms/sections/DadosPessoaisSection";
import { EnderecoSection } from "../components/forms/sections/EnderecoSection";
import { SobreVoceSection } from "../components/forms/sections/SobreVoceSection";
import { cepService } from "../services/cepService";
import type { User } from "../types";

const URL_BASE_API = import.meta.env.VITE_API_URL || "http://localhost:8080";

const AtualizarPerfil: React.FC = () => {
  const { user } = useUser();
  const { id, userType } = user || {};
  const navegar = useNavigate();

  const [dadosUsuario, setDadosUsuario] = useState<Partial<User>>({
    nome: "",
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

  const handleImageChange = (file: File | null) => {
    if (file) {
      console.log('Imagem selecionada:', file);
      // Implementar upload da imagem aqui
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
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-4">
              Atualizar Perfil
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <DadosPessoaisSection
              dados={{
                ...dadosUsuario,
                email: dadosUsuario.email ?? ""
              }}
              atualizarCampo={atualizarCampo}
              showFileUpload={true}
              onImageChange={handleImageChange}
              fileInputLabel="Nova Foto de Perfil"
            />

            <EnderecoSection
              endereco={{
                ...dadosUsuario.address!,
                neighborhood: dadosUsuario.address?.neighborhood ?? ""
              }}
              atualizarCampo={atualizarCampo}
              onCepBlur={handleCepBlur}
            />

            <SobreVoceSection
              dados={dadosUsuario}
              userType={userType || "ajudante"}
              atualizarCampo={atualizarCampo}
              onDiasDisponiveisChange={handleDiasDisponiveisChange}
            />

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