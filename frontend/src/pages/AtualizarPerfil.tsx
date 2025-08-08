import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { buscarEnderecoPorCep } from "../utils/validadoresForm";
import { useUser } from "../hooks/useUser";
import { PageLayout } from "../components/PageLayout";
import { InputsForms } from "../components/forms/InputsForms";
import { formatadorCpf, formatadorCelular, formatadorCep } from "../utils/formatadoresSignupForm";

// Defina a URL base da sua API aqui ou importe de um arquivo de configuração
const URL_BASE_API = import.meta.env.VITE_API_URL || "http://localhost:3000";

const AtualizarPerfil: React.FC = () => {
  const { user } = useUser();
  const { id } = user || {};
  const userType = user.userType;
  const navegar = useNavigate();

  const [nome, setNome] = useState<string>("");
  const [dataNascimento, setDataNascimento] = useState<string>("");
  const [rg, setRg] = useState<string>("");
  const [cpf, setCpf] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [telefone, setTelefone] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [confirmarSenha, setConfirmarSenha] = useState<string>("");
  const [numero, setNumero] = useState<string>("");
  const [cep, setCep] = useState<string>("");
  const [cidade, setCidade] = useState<string>("");
  const [logradouro, setLogradouro] = useState<string>("");
  const [bairro, setBairro] = useState<string>("");
  const [complemento, setComplemento] = useState<string>("");
  const [sobreMim, setSobreMim] = useState<string>("");
  const [habilidadesNecessidades, setHabilidadesNecessidades] = useState<string>("");
  const [erros, setErros] = useState<Record<string, boolean>>({});
  const [imagemPerfilPreview, setImagemPerfilPreview] = useState<File | null>(null);
  const [diasDisponiveis, setDiasDisponiveis] = useState<string[]>([]);

  const handleDiasDisponiveisChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    dia: string
  ) => {
    if (event.target.checked) {
      setDiasDisponiveis([...diasDisponiveis, dia]);
    } else {
      setDiasDisponiveis(diasDisponiveis.filter((d) => d !== dia));
    }
  };

  const handleCepBlur = () => {
    if (cep.length >= 8) {
      buscarEnderecoPorCep(
        cep,
        setLogradouro,
        setCidade,
        setBairro
      );
    }
  };

  useEffect(() => {
    if (!id) return;

    const buscarDadosRegistrados = async () => {
      try {
        const endpoint = userType === "ajudante" ? "helper" : "assisted";

        const resposta = await fetch(`${URL_BASE_API}/${endpoint}/${id}`);
        if (!resposta.ok) {
          throw new Error("Erro ao carregar dados do cadastro.");
        }

        const dados = await resposta.json();
        setNome(dados.name);
        setDataNascimento(dados.birthDate);
        setRg(dados.rg);
        setCpf(dados.cpf);
        setEmail(dados.email);
        setTelefone(dados.phone);
        setSenha(dados.password);
        setConfirmarSenha(dados.password);
        setLogradouro(dados.address.street);
        setNumero(dados.address.number);
        setComplemento(dados.address.complement);
        setCep(dados.address.zipCode);
        setCidade(dados.address.city);
        setBairro(dados.address.neighborhood);
        setSobreMim(dados.aboutYou);
        setDiasDisponiveis(dados.availableDays);
        if (userType === "ajudante") {
          setHabilidadesNecessidades(dados.skills);
        } else {
          setHabilidadesNecessidades(dados.needs);
        }
      } catch (erro) {
        console.error(erro);
        alert("Ocorreu um erro ao carregar os dados do cadastro.");
      }
    };

    buscarDadosRegistrados();
  }, [id, userType]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    const dadosFormulario = {
      name: nome,
      birthDate: dataNascimento,
      rg,
      cpf,
      email,
      phone: telefone,
      password: senha,
      confirmPassword: confirmarSenha,
      availableDays: diasDisponiveis,
      address: {
        street: logradouro,
        number: numero,
        complement: complemento,
        zipCode: cep,
        city: cidade,
        neighborhood: bairro,
      },
      aboutYou: sobreMim,
      ...(userType === "ajudante"
        ? { skills: habilidadesNecessidades }
        : { needs: habilidadesNecessidades }),
    };

    // Aqui poderia usar validarFormularioAtualizacao do validadoresForm.tsx
    const novosErros: Record<string, boolean> = {};
    if (!nome) novosErros.nome = true;
    if (!email) novosErros.email = true;
    if (!dataNascimento) novosErros.dataNascimento = true;
    if (!telefone) novosErros.telefone = true;
    if (!rg) novosErros.rg = true;
    if (!cpf) novosErros.cpf = true;
    if (senha !== confirmarSenha) novosErros.confirmarSenha = true;
    
    setErros(novosErros);
    if (Object.keys(novosErros).length > 0) return;

    try {
      const endpoint = userType === "ajudante" ? "helper" : "assisted";
      const resposta = await fetch(`${URL_BASE_API}/${endpoint}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dadosFormulario),
      });

      if (!resposta.ok) {
        throw new Error("Erro ao enviar os dados para o banco de dados");
      }

      const userAtualizado = await resposta.json();
      const iduser = userAtualizado.id;

      if (imagemPerfilPreview && iduser) {
        await enviarImagemPerfil(userType, iduser, imagemPerfilPreview);
      }

      alert("Cadastro atualizado com sucesso!");
      navegar("/perfil");
    } catch (erro) {
      if (erro instanceof Error) {
        alert(erro.message);
      } else {
        alert("Ocorreu um erro ao atualizar o cadastro.");
      }
    }
  };

  const enviarImagemPerfil = async (
    userType: string,
    iduser: string,
    imagem: File
  ) => {
    const formDataImagem = new FormData();
    formDataImagem.append("file", imagem);

    const endpoint =
      userType === "ajudante"
        ? `/helper/upload-image/${iduser}`
        : `/assisted/upload-image/${iduser}`;

    const resposta = await fetch(`${URL_BASE_API}${endpoint}`, {
      method: "POST",
      body: formDataImagem,
    });

    if (!resposta.ok) {
      throw new Error("Erro ao fazer o upload da imagem");
    }
  };

  return (
    <PageLayout>
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Cabeçalho */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-4">
              Editar Cadastro
            </h1>
            <p className="text-lg text-accent-600">
              Atualize suas informações pessoais e mantenha seu perfil sempre
              atualizado
            </p>
          </div>

          {/* Formulário */}
          <div className="glass-card p-8">
            <form onSubmit={handleUpdate} className="space-y-8">
              {/* Seção de Dados Pessoais */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-accent-800 mb-6 text-center border-b border-accent-200 pb-4">
                  Dados Pessoais
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputsForms
                    label="Nome Completo"
                    type="text"
                    placeholder="Digite seu nome completo"
                    value={nome}
                    onChange={setNome}
                    error={erros.nome ? "Nome é obrigatório" : undefined}
                    required
                  />

                  <InputsForms
                    label="Email"
                    type="email"
                    placeholder="nome@exemplo.com"
                    value={email}
                    onChange={setEmail}
                    error={erros.email ? "Email é obrigatório" : undefined}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <InputsForms
                    label="Data de Nascimento"
                    type="date"
                    value={dataNascimento}
                    onChange={setDataNascimento}
                    error={erros.dataNascimento ? "Data é obrigatória" : undefined}
                    required
                    placeholder=""
                  />

                  <InputsForms
                    label="Celular"
                    type="tel"
                    placeholder="(11) 99999-9999"
                    value={telefone}
                    onChange={(value: string) => setTelefone(formatadorCelular(value))}
                    error={erros.telefone ? "Celular é obrigatório" : undefined}
                    required
                  />                 

                  <InputsForms
                    label="CPF"
                    type="text"
                    placeholder="123.456.789-01"
                    value={cpf}
                    onChange={(value: string) => setCpf(formatadorCpf(value))}
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

                  <InputsForms
                    label="Nova Senha"
                    type="password"
                    placeholder="Digite sua nova senha"
                    value={senha}
                    onChange={setSenha}
                    error={erros.senha ? "Senha é obrigatória" : undefined}
                  />

                  <InputsForms
                    label="Confirme a Nova Senha"
                    type="password"
                    placeholder="Digite novamente"
                    value={confirmarSenha}
                    onChange={setConfirmarSenha}
                    error={
                      erros.confirmarSenha
                        ? "As senhas não coincidem"
                        : undefined
                    }
                  />
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
                    value={cep}
                    onChange={(value: string) => setCep(formatadorCep(value))}
                    onBlur={handleCepBlur}
                    error={erros.cep ? "CEP é obrigatório" : undefined}
                    required
                  />

                  <InputsForms
                    label="Cidade"
                    type="text"
                    placeholder="Digite sua cidade"
                    value={cidade}
                    onChange={setCidade}
                    readonly
                    className="bg-accent-50"
                    error={erros.cidade ? "Cidade é obrigatória" : undefined}
                    required
                  />

                  <InputsForms
                    label="Bairro"
                    type="text"
                    placeholder="Digite seu bairro"
                    value={bairro}
                    onChange={setBairro}
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
                    value={logradouro}
                    onChange={setLogradouro}
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
                    value={numero}
                    onChange={setNumero}
                    error={erros.numero ? "Número é obrigatório" : undefined}
                    required
                  />
                </div>

                <InputsForms
                  label="Complemento"
                  type="text"
                  placeholder="Casa 2, Bloco A, Apartamento 101..."
                  value={complemento}
                  onChange={setComplemento}
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
                          diasDisponiveis.includes(dia.key)
                            ? "border-primary-500 bg-primary-100 text-primary-700"
                            : "border-accent-200 hover:border-primary-200"
                        }`}
                      >
                        <input
                          type="checkbox"
                          className="hidden"
                          checked={diasDisponiveis.includes(dia.key)}
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
                      value={sobreMim}
                      onChange={(e) => setSobreMim(e.target.value)}
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
                      value={habilidadesNecessidades}
                      onChange={(e) => setHabilidadesNecessidades(e.target.value)}
                      className={`input-field resize-none ${
                        erros.habilidadesNecessidades ? "input-error" : ""
                      }`}
                    />
                    <div className="text-right text-sm text-accent-500 mt-1">
                      {habilidadesNecessidades.length}/150
                    </div>
                  </InputsForms>
                </div>
              </div>

              {/* Botão de Envio */}
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

export default AtualizarPerfil;