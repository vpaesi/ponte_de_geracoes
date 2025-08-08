import React, { useState, useEffect } from "react";
import { PageLayout } from "../components/PageLayout";
import { apiService } from "../services/apiService";
import BtnCriarConta from "../components/comuns/BtnCriarConta";
import ProfileImage from "../components/comuns/ProfileImage";
import type { User } from "../types";

interface ParametrosBusca {
  page: number;
  size: number;
  city?: string;
  isAvailable?: boolean;
  day?: string;
}

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
        const cidadesData = await apiService.getCities();
        setCidades(cidadesData);
      } catch (error) {
        console.error("Erro ao buscar cidades:", error);
        setCidades([]);
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
          page: pagina,
          size: 10,
          ...(cidadeSelecionada && { city: cidadeSelecionada }),
          isAvailable: true,
        };

        const endpoint = tipoUsuarioSelecionado === "ajudante" ? "helper" : "assisted";
        const resposta = await apiService.getUsers(endpoint as "helper" | "assisted", parametros);
        
        setUsuarios(resposta.content as User[]);
        setTotalPaginas(resposta.page.totalPages);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        setUsuarios([]);
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

  const calcularIdade = (dataNascimento?: string): number => {
    if (!dataNascimento) return 0;
    return new Date().getFullYear() - new Date(dataNascimento).getFullYear();
  };

  return (
    <PageLayout>
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Cabeçalho */}
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              Usuários Registrados
            </h1>
            <p className="text-xl text-accent-600 max-w-2xl mx-auto">
              Conecte-se com pessoas da sua comunidade
            </p>
          </div>

          {/* Filtros */}
          <div className="glass-card p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de usuário
                </label>
                <select
                  value={tipoUsuarioSelecionado}
                  onChange={(e) => setTipoUsuarioSelecionado(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="ajudante">Voluntários</option>
                  <option value="assistido">Pessoas que precisam de ajuda</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cidade
                </label>
                <select
                  value={cidadeSelecionada}
                  onChange={(e) => setCidadeSelecionada(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Todas as cidades</option>
                  {cidades.map((cidade) => (
                    <option key={cidade} value={cidade}>
                      {cidade}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Loading */}
          {carregando && (
            <div className="flex justify-center items-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-blue-600"></div>
            </div>
          )}

          {/* Lista de usuários */}
          {!carregando && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {usuarios.map((pessoa) => (
                <div
                  key={pessoa.id}
                  className="glass-card overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  {/* Imagem */}
                  <div className="p-6 pb-0 flex justify-center">
                    <div className="relative">
                      <ProfileImage
                        src={pessoa.profileImageUrl}
                        alt={pessoa.name}
                        size="xl"
                      />
                      <div className="absolute top-0 right-0">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            tipoUsuarioSelecionado === "ajudante"
                              ? "bg-primary-100 text-primary-800"
                              : "bg-secondary-100 text-secondary-800"
                          }`}
                        >
                          {tipoUsuarioSelecionado === "ajudante" ? "Voluntário" : "Assistido"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Conteúdo */}
                  <div className="p-6 space-y-4">
                    <div className="text-center">
                      <h3 className="text-xl font-bold text-accent-800 mb-1">
                        {pessoa.name}
                      </h3>
                      <p className="text-accent-600">
                        {calcularIdade(pessoa.birthDate)} anos
                      </p>
                    </div>

                    {pessoa.address && (
                      <div className="text-center">
                        <p className="text-sm text-accent-600">
                          📍 {pessoa.address.city}/RS
                        </p>
                      </div>
                    )}

                    {pessoa.aboutYou && (
                      <div>
                        <p className="text-sm text-accent-700 text-center line-clamp-3">
                          {pessoa.aboutYou}
                        </p>
                      </div>
                    )}

                    {/* Habilidades/Necessidades */}
                    {(pessoa.skills || pessoa.needs) && (
                      <div>
                        <h4 className="text-sm font-semibold text-accent-700 mb-2">
                          {tipoUsuarioSelecionado === "ajudante" ? "Habilidades:" : "Necessidades:"}
                        </h4>
                        <p className="text-sm text-accent-600 line-clamp-2">
                          {pessoa.skills || pessoa.needs}
                        </p>
                      </div>
                    )}

                    {/* Dias disponíveis */}
                    {pessoa.availableDays && pessoa.availableDays.length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold text-accent-700 mb-2">
                          Dias disponíveis:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {pessoa.availableDays.map((dia, indice) => (
                            <span
                              key={indice}
                              className="px-2 py-1 bg-accent-100 text-accent-700 rounded-full text-xs"
                            >
                              {dia}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Status */}
                    <div className="flex justify-center">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          pessoa.available
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {pessoa.available ? "Disponível" : "Indisponível"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Mensagem quando não há usuários */}
          {!carregando && usuarios.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-accent-600 mb-8">
                Nenhum usuário encontrado com os filtros selecionados.
              </p>
              <BtnCriarConta 
                to="/signup" 
                variant="primary" 
                size="lg"
              >
                Seja o primeiro a se cadastrar!
              </BtnCriarConta>
            </div>
          )}

          {/* Paginação */}
          {!carregando && usuarios.length > 0 && totalPaginas > 1 && (
            <div className="flex justify-center items-center space-x-4 mt-12">
              <button
                onClick={() => mudarPagina(pagina - 1)}
                disabled={pagina === 0}
                className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Anterior
              </button>
              
              <span className="text-accent-600">
                Página {pagina + 1} de {totalPaginas}
              </span>
              
              <button
                onClick={() => mudarPagina(pagina + 1)}
                disabled={pagina === totalPaginas - 1}
                className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Próxima
              </button>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default Users;