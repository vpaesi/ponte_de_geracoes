import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { buscarEnderecoPorCep } from "../utils/validadoresForm";
import { useUser } from "../hooks/useUser";
import { PageLayout } from "../components/PageLayout";
import { InputsForms } from "../components/forms/InputsForms";
import { formatadorCpf, formatadorCelular, formatadorCep } from "../utils/formatadoresSignupForm";
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

  const [imagemPerfilPreview, setImagemPerfilPreview] = useState<File | null>(null);
  const [erros, setErros] = useState<Record<string, boolean>>({});
  const [carregando, setCarregando] = useState(false);

  const atualizarCampo = (campo: keyof User | string, valor: string | string[]) => {
    if (campo.startsWith('address.')) {
      const subcampo = campo.split('.')[1] as keyof User['address'];
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

    if (erros[campo]) {
      setErros(prev => ({ ...prev, [campo]: false }));
    }
  };

  const handleDiasDisponiveisChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    dia: string
  ) => {
    const diasAtuais = dadosUsuario.availableDays || [];
    const novosDias = event.target.checked
      ? [...diasAtuais, dia]
      : diasAtuais.filter((d) => d !== dia);
    
    atualizarCampo('availableDays', novosDias);
  };

  const handleCepBlur = () => {
    const cep = dadosUsuario.address?.zipCode;
    if (cep && cep.length >= 8) {
      buscarEnderecoPorCep(
        cep,
        (valor) => atualizarCampo('address.street', valor),
        (valor) => atualizarCampo('address.city', valor),
        (valor) => atualizarCampo('address.neighborhood', valor)
      );
    }
  };

  useEffect(() => {
    if (!id) return;

    const buscarDadosUsuario = async () => {
      try {
        setCarregando(true);
        const endpoint = userType === "ajudante" ? "helper" : "assisted";
        const resposta = await fetch(`${URL_BASE_API}/${endpoint}/${id}`);
        
        if (!resposta.ok) {
          throw new Error("Erro ao carregar dados do usuário.");
        }

        const dados = await resposta.json();
        setDadosUsuario({
          ...dados,
          skills: userType === "ajudante" ? dados.skills : undefined,
          needs: userType !== "ajudante" ? dados.needs : undefined
        });
      } catch (erro) {
        console.error(erro);
        alert("Ocorreu um erro ao carregar os dados do usuário.");
      } finally {
        setCarregando(false);
      }
    };

    buscarDadosUsuario();
  }, [id, userType]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validação básica
    const novosErros: Record<string, boolean> = {};
    if (!dadosUsuario.name) novosErros.name = true;
    if (!dadosUsuario.email) novosErros.email = true;
    if (!dadosUsuario.birthDate) novosErros.birthDate = true;
    if (!dadosUsuario.phone) novosErros.phone = true;
    
    setErros(novosErros);
    if (Object.keys(novosErros).length > 0) return;

    try {
      setCarregando(true);
      const endpoint = userType === "ajudante" ? "helper" : "assisted";
      
      const resposta = await fetch(`${URL_BASE_API}/${endpoint}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dadosUsuario),
      });

      if (!resposta.ok) {
        throw new Error("Erro ao atualizar os dados.");
      }

      if (imagemPerfilPreview) {
        await enviarImagemPerfil(userType!, id!, imagemPerfilPreview);
      }

      alert("Perfil atualizado com sucesso!");
      navegar("/perfil");
    } catch (erro) {
      const mensagem = erro instanceof Error ? erro.message : "Erro ao atualizar perfil.";
      alert(mensagem);
    } finally {
      setCarregando(false);
    }
  };

  const enviarImagemPerfil = async (
    userType: string,
    userId: string,
    imagem: File
  ) => {
    const formData = new FormData();
    formData.append("file", imagem);

    const endpoint = userType === "ajudante"
      ? `/helper/upload-image/${userId}`
      : `/assisted/upload-image/${userId}`;

    const resposta = await fetch(`${URL_BASE_API}${endpoint}`, {
      method: "POST",
      body: formData,
    });

    if (!resposta.ok) {
      throw new Error("Erro ao fazer upload da imagem");
    }
  };

  if (carregando) {
    return (
      <PageLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-accent-600">Carregando dados...</p>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-4">
              Editar Perfil
            </h1>
            <p className="text-lg text-accent-600">
              Atualize suas informações pessoais
            </p>
          </div>

          <div className="glass-card p-8">
            <form onSubmit={handleUpdate} className="space-y-8">
              {/* Dados Pessoais */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-accent-800 mb-6 text-center border-b border-accent-200 pb-4">
                  Dados Pessoais
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputsForms
                    label="Nome Completo"
                    type="text"
                    placeholder="Digite seu nome completo"
                    value={dadosUsuario.name || ""}
                    onChange={(value) => atualizarCampo('name', value)}
                    error={erros.name ? "Nome é obrigatório" : undefined}
                    required
                  />

                  <InputsForms
                    label="Email"
                    type="email"
                    placeholder="nome@exemplo.com"
                    value={dadosUsuario.email || ""}
                    onChange={(value) => atualizarCampo('email', value)}
                    error={erros.email ? "Email é obrigatório" : undefined}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <InputsForms
                    label="Data de Nascimento"
                    type="date"
                    value={dadosUsuario.birthDate || ""}
                    onChange={(value) => atualizarCampo('birthDate', value)}
                    error={erros.birthDate ? "Data é obrigatória" : undefined}
                    required
                    placeholder=""
                  />

                  <InputsForms
                    label="Celular"
                    type="tel"
                    placeholder="(11) 99999-9999"
                    value={dadosUsuario.phone || ""}
                    onChange={(value: string) => atualizarCampo('phone', formatadorCelular(value))}
                    error={erros.phone ? "Celular é obrigatório" : undefined}
                    required
                  />                 

                  <InputsForms
                    label="CPF"
                    type="text"
                    placeholder="123.456.789-01"
                    value={dadosUsuario.cpf || ""}
                    onChange={(value: string) => atualizarCampo('cpf', formatadorCpf(value))}
                    error={erros.cpf ? "CPF é obrigatório" : undefined}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <InputsForms label="Nova Foto de Perfil">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setImagemPerfilPreview(e.target.files[0]);
                        }
                      }}
                      className="input-field"
                    />
                  </InputsForms>
                </div>
              </div>

              {/* Seção de Endereço */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-accent-800 mb-6 text-center border-b border-accent-200 pb-4">
                  Endereço
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <InputsForms
                    label="CEP"
                    type="text"
                    placeholder="00000-000"
                    value={dadosUsuario.address?.zipCode || ""}
                    onChange={(value: string) => atualizarCampo('address.zipCode', formatadorCep(value))}
                    onBlur={handleCepBlur}
                    error={erros.cep ? "CEP é obrigatório" : undefined}
                    required
                  />

                  <InputsForms
                    label="Cidade"
                    type="text"
                    placeholder="Digite sua cidade"
                    value={dadosUsuario.address?.city || ""}
                    onChange={(value) => atualizarCampo('address.city', value)}
                    readonly
                    className="bg-accent-50"
                    error={erros.cidade ? "Cidade é obrigatória" : undefined}
                    required
                  />

                  <InputsForms
                    label="Bairro"
                    type="text"
                    placeholder="Digite seu bairro"
                    value={dadosUsuario.address?.neighborhood || ""}
                    onChange={(value) => atualizarCampo('address.neighborhood', value)}
                    readonly
                    className="bg-accent-50"
                    error={
                      erros.bairro ? "Bairro é obrigatório" : undefined
                    }
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <InputsForms
                    label="Logradouro"
                    type="text"
                    placeholder="Avenida Exemplo de Rua"
                    value={dadosUsuario.address?.street || ""}
                    onChange={(value) => atualizarCampo('address.street', value)}
                    readonly
                    className="md:col-span-2 bg-accent-50"
                    error={
                      erros.logradouro ? "Logradouro é obrigatório" : undefined
                    }
                    required
                  />

                  <InputsForms
                    label="Número"
                    type="text"
                    placeholder="123"
                    value={dadosUsuario.address?.number || ""}
                    onChange={(value) => atualizarCampo('address.number', value)}
                    error={erros.numero ? "Número é obrigatório" : undefined}
                    required
                  />
                </div>

                <InputsForms
                  label="Complemento"
                  type="text"
                  placeholder="Casa 2, Bloco A, Apartamento 101..."
                  value={dadosUsuario.address?.complement || ""}
                  onChange={(value) => atualizarCampo('address.complement', value)}
                />
              </div>

              {/* Seção de Perfil */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-accent-800 mb-6 text-center border-b border-accent-200 pb-4">
                  Perfil e Disponibilidade
                </h2>

                {/* Tipo de Usuário (Somente Leitura) */}
                <div className="bg-accent-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-accent-700 mb-4 text-center">
                    Tipo de Usuário (não pode ser alterado)
                  </h3>
                  <div className="flex justify-center">
                    <div
                      className={`px-6 py-3 rounded-full font-semibold text-white shadow-lg ${
                        userType === "ajudante"
                          ? "bg-secondary-500"
                          : "bg-primary-500"
                      }`}
                    >
                      {userType === "ajudante" ? "🤝 Ajudante" : "❤️ Ajudado"}
                    </div>
                  </div>
                </div>

                {/* Dias Disponíveis */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-accent-700 text-center">
                    {userType === "ajudante"
                      ? "Quando você está disponível para ajudar?"
                      : "Quando você precisaria de ajuda?"}
                  </h3>

                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                    {[
                      { key: "Domingo", label: "Dom" },
                      { key: "Segunda", label: "Seg" },
                      { key: "Terça", label: "Ter" },
                      { key: "Quarta", label: "Qua" },
                      { key: "Quinta", label: "Qui" },
                      { key: "Sexta", label: "Sex" },
                      { key: "Sábado", label: "Sáb" },
                    ].map((dia) => (
                      <label
                        key={dia.key}
                        className={`cursor-pointer p-3 rounded-lg border-2 text-center transition-all duration-300 hover:shadow-md ${
                          dadosUsuario.availableDays?.includes(dia.key)
                            ? "border-primary-500 bg-primary-100 text-primary-700"
                            : "border-accent-200 hover:border-primary-200"
                        }`}
                      >
                        <input
                          type="checkbox"
                          className="hidden"
                          checked={dadosUsuario.availableDays?.includes(dia.key)}
                          onChange={(e) =>
                            handleDiasDisponiveisChange(e, dia.key)
                          }
                        />
                        <div className="font-medium text-sm">{dia.label}</div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Sobre e Habilidades */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <InputsForms label="Fale um pouco sobre você">
                    <textarea
                      rows={4}
                      placeholder="Conte um pouco sobre sua personalidade, hobbies, experiências..."
                      value={dadosUsuario.aboutYou || ""}
                      onChange={(e) => atualizarCampo('aboutYou', e.target.value)}
                      className="input-field resize-none"
                    />
                  </InputsForms>

                  <InputsForms
                    label={
                      userType === "ajudante"
                        ? "Suas Habilidades"
                        : "Suas Necessidades"
                    }
                    error={
                      erros.habilidadesNecessidades
                        ? "Este campo é obrigatório"
                        : undefined
                    }
                  >
                    <textarea
                      rows={4}
                      placeholder={
                        userType === "ajudante"
                          ? "Ex: Gosto de ensinar tecnologia, ajudar com compras..."
                          : "Ex: Preciso de ajuda para ir ao mercado, usar o computador..."
                      }
                      maxLength={150}
                      value={userType === "ajudante" ? dadosUsuario.skills : dadosUsuario.needs}
                      onChange={(e) => atualizarCampo(userType === "ajudante" ? 'skills' : 'needs', e.target.value)}
                      className={`input-field resize-none ${
                        erros.habilidadesNecessidades ? "input-error" : ""
                      }`}
                    />
                    <div className="text-right text-sm text-accent-500 mt-1">
                      {userType === "ajudante" ? dadosUsuario.skills?.length : dadosUsuario.needs?.length}/150
                    </div>
                  </InputsForms>
                </div>
              </div>

              {/* Botão de Envio */}
              <div className="flex justify-center pt-8 border-t border-accent-200">
                <button
                  type="submit"
                  disabled={carregando}
                  className="btn-primary px-12 py-4 text-lg disabled:opacity-50"
                >
                  {carregando ? "Salvando..." : "Salvar Alterações"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default AtualizarPerfil;