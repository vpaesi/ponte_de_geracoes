import React, { useState, useEffect } from "react";
import { PageLayout } from "../components/PageLayout";
import { apiService } from "../services/apiService";
import { userService } from "../services/userService";
import BtnCriarConta from "../components/comuns/BtnCriarConta";
import UserCard from "../components/comuns/UserCard";
import UserFilters from "../components/comuns/UserFilters";
import Pagination from "../components/comuns/Pagination";
import { USER_TYPES } from "../constants/userTypes";
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
  const [tipoUsuarioSelecionado, setTipoUsuarioSelecionado] = useState<string>(
    USER_TYPES.ALL
  );
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
          // Não filtrar por available quando estamos mostrando todos ou específicos
          // isAvailable: true,
        };

        const resposta = await userService.searchUsers(
          tipoUsuarioSelecionado,
          parametros
        );
        setUsuarios(resposta.content);
        setTotalPaginas(resposta.page.totalPages);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        setUsuarios([]);
        setTotalPaginas(0);
      } finally {
        setCarregando(false);
      }
    };

    buscarDadosFiltrados();
  }, [pagina, cidadeSelecionada, tipoUsuarioSelecionado]);

  // Reset da página quando mudar filtros
  useEffect(() => {
    setPagina(0);
  }, [cidadeSelecionada, tipoUsuarioSelecionado]);

  const calcularIdade = (dataNascimento?: string): number => {
    if (!dataNascimento) return 0;
    return new Date().getFullYear() - new Date(dataNascimento).getFullYear();
  };

  // Determinar o tipo de usuário para o UserCard
  const getUserTypeForCard = (user: User): "ajudante" | "assistido" => {
    // Priorizar o userType que vem do serviço
    if (user.userType) {
      return user.userType;
    }

    // Fallback para o tipo selecionado (quando não é "todos")
    if (tipoUsuarioSelecionado !== USER_TYPES.ALL) {
      return tipoUsuarioSelecionado as "ajudante" | "assistido";
    }

    // Último fallback
    return "ajudante";
  };

  return (
    <PageLayout>
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 pt-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Cabeçalho */}
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text">
              Usuários Registrados
            </h1>
            <p className="text-xl text-accent-600 max-w-2xl mx-auto">
              Conecte-se com pessoas da sua comunidade
            </p>
          </div>

          {/* Filtros */}
          <UserFilters
            selectedUserType={tipoUsuarioSelecionado}
            onUserTypeChange={setTipoUsuarioSelecionado}
            selectedCity={cidadeSelecionada}
            onCityChange={setCidadeSelecionada}
            cities={cidades}
            className="mb-8"
            showAllUsersOption={true}
          />

          {/* Loading */}
          {carregando && (
            <div className="flex justify-center items-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-blue-600"></div>
              <span className="ml-3 text-gray-600">Carregando usuários...</span>
            </div>
          )}

          {/* Lista de usuários */}
          {!carregando && usuarios.length > 0 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {usuarios.map((pessoa) => (
                  <UserCard
                    key={`${pessoa.id}-${pessoa.userType || "unknown"}`}
                    user={pessoa}
                    userType={getUserTypeForCard(pessoa)}
                    calculateAge={calcularIdade}
                  />
                ))}
              </div>
            </>
          )}

          {/* Mensagem quando não há usuários */}
          {!carregando && usuarios.length === 0 && (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="mb-8">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">👥</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Nenhum usuário encontrado
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Não encontramos usuários com os filtros selecionados. Tente
                    ajustar os filtros ou seja o primeiro a se cadastrar!
                  </p>
                </div>

                <BtnCriarConta to="/signup" variant="primary" size="lg">
                  Seja o primeiro a se cadastrar!
                </BtnCriarConta>
              </div>
            </div>
          )}

          {/* Contador de resultados */}
          <div className="m-6 text-center">
            <p className="text-gray-600">
              Encontrados {usuarios.length} usuário
              {usuarios.length !== 1 ? "s" : ""}
              {cidadeSelecionada && ` em ${cidadeSelecionada}`}
            </p>
          </div>

          {/* Paginação */}
          {!carregando && usuarios.length > 0 && totalPaginas > 1 && (
            <Pagination
              currentPage={pagina}
              totalPages={totalPaginas}
              onPageChange={setPagina}
              className="mt-12"
            />
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default Users;
