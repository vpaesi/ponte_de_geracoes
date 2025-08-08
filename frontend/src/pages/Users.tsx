import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { apiService } from "../services/apiService";
import { PageLayout } from "../components/PageLayout";
import BtnCriarConta from "../components/comuns/BtnCriarConta";
import DescricaoPonteDeGeracoes from "../components/comuns/DescricaoPonteDeGeracoes";
import iconeGenerico from "../assets/generic-icon.jpg";
import { User } from "../types/index";

const Users: React.FC = () => {
  const [usuarios, setUsuarios] = useState<User[]>([]);
  const [pagina, setPagina] = useState<number>(0);
  const [totalPaginas, setTotalPaginas] = useState<number>(1);
  const [cidades, setCidades] = useState<string[]>([]);
  const [cidadeSelecionada, setCidadeSelecionada] = useState<string>("");
  const [tipoUsuarioSelecionado, setTipoUsuarioSelecionado] = useState<string>("ajudante");
  const [carregando, setCarregando] = useState<boolean>(false);

  // Buscar cidades
  useEffect(() => {
    const buscarCidades = async () => {
      try {
        setCarregando(true);
        const dadosCidades = await apiService.getCities();
        setCidades(dadosCidades);
      } catch (erro) {
        console.error("Erro ao buscar cidades:", erro);
      } finally {
        setCarregando(false);
      }
    };

    buscarCidades();
  }, []);

  // Buscar dados filtrados
  useEffect(() => {
    const buscarDadosFiltrados = async () => {
      try {
        setCarregando(true);

        const parametros: ParametrosBusca = {
          pagina,
          tamanho: 10,
          cidade: cidadeSelecionada || undefined,
        };

        const tipoUsuarioParaAPI = tipoUsuarioSelecionado === "ajudante" ? "helper" : "assisted";
        const resposta = await apiService.getUsers(tipoUsuarioParaAPI, parametros);

        setUsuarios(resposta.conteudo || []);
        setTotalPaginas(resposta.pagina.totalPaginas || 1);
      } catch (erro) {
        console.error("Erro ao buscar dados:", erro);
        setUsuarios([]);
        setTotalPaginas(1);
      } finally {
        setCarregando(false);
      }
    };

    buscarDadosFiltrados();
  }, [pagina, cidadeSelecionada, tipoUsuarioSelecionado]);

  const mudarPagina = (novaPagina: number) => {
    if (novaPagina >= 0 && novaPagina < totalPaginas) {
      setPagina(novaPagina);
    }
  };

  const calcularIdade = (dataNascimento: string): number => {
    return new Date().getFullYear() - new Date(dataNascimento).getFullYear();
  };

  return (
    <PageLayout>
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Cabeçalho */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-4">
              Comunidade Ponte de Gerações
            </h1>
            <p className="text-xl text-accent-600 max-w-3xl mx-auto">
              Conheça os usuários cadastrados e encontre conexões incríveis
              entre gerações
            </p>
          </div>

          {/* Filtros */}
          <div className="glass-card p-6 mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-end gap-6">
              <div className="flex-1">
                <label className="block text-sm font-semibold text-accent-700 mb-2">
                  Tipo de usuário:
                </label>
                <select
                  value={tipoUsuarioSelecionado}
                  onChange={(e) => {
                    setTipoUsuarioSelecionado(e.target.value);
                    setPagina(0);
                  }}
                  className="input-field"
                >
                  <option value="ajudante">Ajudantes</option>
                  <option value="ajudado">Ajudados</option>
                </select>
              </div>

              <div className="flex-1">
                <label className="block text-sm font-semibold text-accent-700 mb-2">
                  Cidade:
                </label>
                <select
                  value={cidadeSelecionada}
                  onChange={(e) => {
                    setCidadeSelecionada(e.target.value);
                    setPagina(0);
                  }}
                  className="input-field"
                >
                  <option value="">Todas as cidades</option>
                  {cidades.map((cidade, indice) => (
                    <option key={indice} value={cidade}>
                      {cidade}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center space-x-4">
                <div className="text-sm text-accent-600">
                  <span className="font-semibold">{usuarios.length}</span>{" "}
                  pessoas encontradas
                </div>
              </div>
            </div>
          </div>

          {/* Grade de Cartões */}
          {carregando ? (
            <div className="flex justify-center items-center py-20">
              <div className="glass-card p-8">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-xl font-semibold text-accent-700">
                    Carregando...
                  </span>
                </div>
              </div>
            </div>
          ) : usuarios.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-8">
              {usuarios.map((pessoa) => (
                <div
                  key={pessoa.id}
                  className="card hover:shadow-2xl hover:-translate-y-2"
                >
                  <div className="relative">
                    {/* Imagem de Perfil */}
                    <div className="aspect-w-16 aspect-h-12 mb-6">
                      <img
                        src={pessoa.profileImageUrl || iconeGenerico}
                        alt={pessoa.name}
                        className="w-full h-48 object-cover rounded-xl shadow-lg"
                        onError={(e) => {
                          e.currentTarget.src = iconeGenerico;
                        }}
                      />
                    </div>

                    {/* Badge Tipo de Usuário */}
                    <div className="absolute top-4 right-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold shadow-md ${
                          tipoUsuarioSelecionado === "ajudante"
                            ? "bg-secondary-500 text-white"
                            : "bg-primary-500 text-white"
                        }`}
                      >
                        {tipoUsuarioSelecionado === "ajudante" ? "Ajudante" : "Ajudado"}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    {/* Nome e Idade */}
                    <h3 className="text-xl font-bold text-accent-800 mb-2">
                      {pessoa.name}
                    </h3>
                    <p className="text-accent-600 mb-3">
                      {calcularIdade(pessoa.birthDate)} anos
                    </p>

                    {/* Localização */}
                    <div className="flex items-center text-accent-600 mb-4">
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span className="text-sm font-medium">
                        {pessoa.address.city}/RS
                      </span>
                    </div>

                    {/* Sobre */}
                    <p className="text-accent-700 text-sm mb-6 text-clamp-3">
                      {pessoa.aboutYou || "Nenhuma descrição disponível."}
                    </p>

                    {/* Dias Disponíveis */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-accent-700 mb-3 text-sm">
                        Disponível nos dias:
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {pessoa.availableDays.map((dia, indice) => (
                          <span
                            key={indice}
                            className="px-2 py-1 bg-primary-100 text-primary-700 rounded text-xs font-medium"
                          >
                            {dia.slice(0, 3)}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Botão de Contato */}
                    <Link
                      to={`/perfil/${pessoa.id}`}
                      className={`w-full inline-block text-center font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 focus:outline-none focus:ring-4 ${
                        tipoUsuarioSelecionado === "ajudante"
                          ? "bg-secondary-500 hover:bg-secondary-600 text-white focus:ring-secondary-200"
                          : "bg-primary-500 hover:bg-primary-600 text-white focus:ring-primary-200"
                      }`}
                    >
                      Entrar em Contato
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="glass-card p-12 max-w-md mx-auto">
                <div className="w-20 h-20 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-10 h-10 text-accent-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-accent-800 mb-2">
                  Nenhum usuário encontrado
                </h3>
                <p className="text-accent-600">
                  Tente ajustar os filtros para encontrar mais pessoas.
                </p>
              </div>
            </div>
          )}

          {/* Paginação */}
          {totalPaginas > 1 && (
            <div className="flex justify-center items-center space-x-6 mb-12">
              <button
                onClick={() => mudarPagina(pagina - 1)}
                disabled={pagina === 0}
                className={`p-3 rounded-lg transition-all duration-300 ${
                  pagina === 0
                    ? "bg-accent-100 text-accent-400 cursor-not-allowed"
                    : "bg-white hover:bg-primary-50 text-primary-600 hover:text-primary-700 shadow-md hover:shadow-lg"
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <div className="flex items-center space-x-2">
                <span className="text-accent-700 font-medium">
                  Página {pagina + 1} de {totalPaginas}
                </span>
              </div>

              <button
                onClick={() => mudarPagina(pagina + 1)}
                disabled={pagina + 1 >= totalPaginas}
                className={`p-3 rounded-lg transition-all duration-300 ${
                  pagina + 1 >= totalPaginas
                    ? "bg-accent-100 text-accent-400 cursor-not-allowed"
                    : "bg-white hover:bg-primary-50 text-primary-600 hover:text-primary-700 shadow-md hover:shadow-lg"
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          )}

          {/* Rodapé CTA */}
          <div className="text-center bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-600 rounded-2xl p-12 shadow-2xl">
            <h2 className="text-3xl font-bold mb-4">
              Faça Parte Desta Comunidade!
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              <DescricaoPonteDeGeracoes />
            </p>
            <BtnCriarConta
              to="/cadastro"
              variante="contorno"
              tamanho="grande"
              className="bg-white text-primary-600 hover:bg-primary-50 border-white hover:border-primary-100"
            />
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Users;