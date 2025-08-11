import React, { useState, useEffect, useCallback, useMemo } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { apiService } from "../../services/apiService";
import ProfileImage from "./ProfileImage";
import { useEmbaralhaLista } from "../../hooks/useEmbaralhaLista";
import type { CarouselItem, User } from "../../types";

interface CarrosselProps {
  titulo: string;
  city?: string;
}

const Carrossel: React.FC<CarrosselProps> = ({ titulo, city }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [usuarios, setUsuarios] = useState<CarouselItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { shuffleArray } = useEmbaralhaLista();

  const visibleItems = 4;
  const totalItems = usuarios.length;

  const calcularIdade = useCallback((birthDate?: string): number => {
    if (!birthDate) return 0;
    const hoje = new Date();
    const nascimento = new Date(birthDate);
    return hoje.getFullYear() - nascimento.getFullYear();
  }, []);

  const buscarUsuarios = useCallback(async () => {
    try {
      setLoading(true);
      const todosUsuarios: CarouselItem[] = [];

      // Buscar helpers
      const helpersResponse = await apiService.getUsers("helper", {
        page: 0,
        size: 10,
        ...(city && { city }),
      });

      if (helpersResponse.content && Array.isArray(helpersResponse.content)) {
        const helpers = (helpersResponse.content as User[]).map(
          (user: User) => ({
            id: Number(user.id) || 0,
            nome: user.nome || "Nome não informado",
            age: calcularIdade(user.birthDate),
            img: user.profileImageUrl || "",
            descricao: user.aboutYou || "Sem descrição disponível",
            userType: "helper" as const,
          })
        );
        todosUsuarios.push(...helpers);
      }

      // Buscar assisted
      const assistedResponse = await apiService.getUsers("assisted", {
        page: 0,
        size: 10,
        ...(city && { city }),
      });

      if (assistedResponse.content && Array.isArray(assistedResponse.content)) {
        const assisted = (assistedResponse.content as User[]).map(
          (user: User) => ({
            id: Number(user.id) + 1000 || 1000,
            nome: user.nome || "Nome não informado",
            age: calcularIdade(user.birthDate),
            img: user.profileImageUrl || "",
            descricao: user.aboutYou || "Sem descrição disponível",
            userType: "assisted" as const,
          })
        );
        todosUsuarios.push(...assisted);
      }

      // Embaralhar a lista de usuários antes de definir no state
      const usuariosEmbaralhados = shuffleArray(todosUsuarios);
      setUsuarios(usuariosEmbaralhados);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      setUsuarios([]);
    } finally {
      setLoading(false);
    }
  }, [city, calcularIdade, shuffleArray]);

  useEffect(() => {
    buscarUsuarios();
  }, [buscarUsuarios]);

  const proximoSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      return nextIndex >= totalItems - visibleItems + 1 ? 0 : nextIndex;
    });
  }, [totalItems, visibleItems]);

  const slideAnterior = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      return prevIndex === 0
        ? Math.max(0, totalItems - visibleItems)
        : prevIndex - 1;
    });
  }, [totalItems, visibleItems]);

  const usuariosVisiveis = useMemo(() => {
    return usuarios.slice(currentIndex, currentIndex + visibleItems);
  }, [usuarios, currentIndex, visibleItems]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-blue-600"></div>
      </div>
    );
  }

  if (usuarios.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-600 text-lg">Nenhum usuário encontrado</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-center text-gray-900">{titulo}</h2>

      <div className="relative">
        <div className="flex items-center justify-center space-x-4">
          {currentIndex > 0 && (
            <button
              onClick={slideAnterior}
              className="p-2 rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow z-10"
            >
              <ChevronLeftIcon className="w-6 h-6 text-[#e76f51]" />
            </button>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl">
            {usuariosVisiveis.map((usuario) => (
              <div
                key={usuario.id}
                className="overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="mb-2 flex justify-center bg-transparent">
                  <ProfileImage
                    src={usuario.img}
                    alt={usuario.nome}
                    size="xl"
                  />
                </div>
                <div className="p-4 pt-2 bg-white rounded-lg shadow-md">
                  <h3 className="font-semibold text-lg text-gray-900 mb-1 text-center">
                    {usuario.nome}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2 text-center">
                    {usuario.age} anos
                  </p>
                  <p className="text-gray-700 text-sm line-clamp-3 text-center">
                    {usuario.descricao}
                  </p>
                  <div className="mt-3 text-center">
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        usuario.userType === "helper"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-purple-100 text-purple-800"
                      }`}
                    >
                      {usuario.userType === "helper"
                        ? "Voluntário"
                        : "Assistido"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {currentIndex < totalItems - visibleItems && (
            <button
              onClick={proximoSlide}
              className="p-2 rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow z-10"
            >
              <ChevronRightIcon className="w-6 h-6 text-[#e76f51]" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Carrossel;
