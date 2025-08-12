import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PageLayout } from "../components/PageLayout";
import { userService } from "../services/userService";
import { addressService } from "../services/addressService";
import BtnCriarConta from "../components/comuns/BtnCriarConta";
import UserCard from "../components/comuns/UserCard";
import UserFilters from "../components/comuns/UserFilters";
import Pagination from "../components/comuns/Pagination";
import { useEmbaralhaLista } from "../hooks/useEmbaralhaLista";
import { USER_TYPES } from "../constants/userTypes";
import type { User } from "../types";

interface ParametrosBusca {
  page: number;
  size: number;
  city?: string;
  isAvailable?: boolean;
  day?: string;
  userType?: string;
}

const Users: React.FC = () => {
  const { userType } = useParams<{ userType: string }>();
  const [usuarios, setUsuarios] = useState<User[]>([]);
  const [pagina, setPagina] = useState<number>(0);
  const [totalPaginas, setTotalPaginas] = useState<number>(1);
  const [cidades, setCidades] = useState<string[]>([]);
  const [cidadeSelecionada, setCidadeSelecionada] = useState<string>("");
  const [tipoUsuarioSelecionado, setTipoUsuarioSelecionado] = useState<string>(
    USER_TYPES.ALL
  );
  const [carregando, setCarregando] = useState<boolean>(false);
  const { shuffleArray } = useEmbaralhaLista();

  useEffect(() => {
    const buscarCidades = async () => {
      try {
        console.log('🔍 Buscando cidades...'); // Debug
        const cidadesData = await addressService.getCities();
        console.log('📍 Cidades recebidas:', cidadesData); // Debug
        
        if (Array.isArray(cidadesData)) {
          setCidades(cidadesData);
          console.log('✅ Cidades definidas:', cidadesData.length); // Debug
        } else {
          console.warn('⚠️ Dados de cidades não são array:', cidadesData);
          setCidades([]);
        }
      } catch (error) {
        console.error("❌ Erro ao buscar cidades:", error);
        setCidades([]);
      }
    };

    buscarCidades();
  }, []);

  useEffect(() => {
    const buscarDadosFiltrados = async () => {
      try {
        setCarregando(true);

        const parametros: ParametrosBusca = {
          page: pagina,
          size: 10,
          ...(cidadeSelecionada && { city: cidadeSelecionada }),
        };

        const tipoParaBuscar =
          userType ||
          (tipoUsuarioSelecionado !== USER_TYPES.ALL
            ? tipoUsuarioSelecionado
            : undefined);

        if (tipoParaBuscar) {
          parametros.userType = tipoParaBuscar;
        }

        const response = await userService.getAllUsers(parametros);

        const usuariosEmbaralhados = shuffleArray(response.content) as User[];
        setUsuarios(usuariosEmbaralhados);
        setTotalPaginas(response.totalPages || 0);
        setPagina(pagina);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        setUsuarios([]);
        setTotalPaginas(0);
      } finally {
        setCarregando(false);
      }
    };

    buscarDadosFiltrados();
  }, [pagina, cidadeSelecionada, tipoUsuarioSelecionado, shuffleArray, userType]);

  useEffect(() => {
    setPagina(0);
  }, [cidadeSelecionada, tipoUsuarioSelecionado]);

  const calcularIdade = (dataNascimento?: string): number => {
    if (!dataNascimento) return 0;
    return new Date().getFullYear() - new Date(dataNascimento).getFullYear();
  };

  const getUserTypeForCard = (user: User): "ajudante" | "assistido" => {
    if (user.userType) {
      return user.userType === "helper" ? "ajudante" : "assistido";
    }

    if (tipoUsuarioSelecionado !== USER_TYPES.ALL) {
      return tipoUsuarioSelecionado === "helper" ? "ajudante" : "assistido";
    }

    return "ajudante";
  };

  const handlePageChange = (page: number) => {
    setPagina(page);
  };

  return (
    <PageLayout>
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 pt-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {userType === "helper"
                ? "Ajudantes"
                : userType === "assisted"
                ? "Pessoas que Precisam de Ajuda"
                : "Todos os Usuários"}
            </h1>
          </div>

          <UserFilters
            selectedUserType={tipoUsuarioSelecionado}
            onUserTypeChange={setTipoUsuarioSelecionado}
            selectedCity={cidadeSelecionada}
            onCityChange={setCidadeSelecionada}
            cities={cidades}
            className="mb-8"
            showAllUsersOption={true}
          />

          {carregando && (
            <div className="flex justify-center items-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-blue-600"></div>
              <span className="ml-3 text-gray-600">Carregando usuários...</span>
            </div>
          )}

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

          <div className="m-6 text-center">
            <p className="text-gray-600">
              Encontrados {usuarios.length} usuário
              {usuarios.length !== 1 ? "s" : ""}
              {cidadeSelecionada && ` em ${cidadeSelecionada}`}
            </p>
          </div>

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
