import React, { useState, useEffect, useCallback, useMemo } from "react";
import { apiService } from "../../services/apiService";
import genericIcon from "../../assets/generic-icon.jpg";
import type { CarouselItem, ApiResponse, User } from "../../types";

interface CarrosselProps {
  title: string;
  city?: string;
}

const Carrossel: React.FC<CarrosselProps> = ({ title, city }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [usuarios, setUsuarios] = useState<CarouselItem[]>([]);
  const [loading, setLoading] = useState(false);

  const visibleItems = 4;
  const totalItems = usuarios.length;

  const calcularIdade = useCallback((birthDate: string): number => {
    if (!birthDate) return 0;
    const hoje = new Date();
    const nascimento = new Date(birthDate);
    return hoje.getFullYear() - nascimento.getFullYear();
  }, []);

  const buscarUsuarios = useCallback(async () => {
    try {
      setLoading(true);

      const params = {
        page: 0,
        size: 20,
        ...(city && { city }),
      };

      const [helpersResponse, assistedResponse] = await Promise.all([
        apiService.getUsers("helper", params),
        apiService.getUsers("assisted", params),
      ]);

      const todosUsuarios: CarouselItem[] = [];

      // Processar helpers
      if (helpersResponse?.content) {
        const helpers = helpersResponse.content.map((user: User) => ({
          id: user.id,
          name: user.name,
          age: calcularIdade(user.birthDate),
          img: user.profileImageUrl || genericIcon,
          description:
            user.skills || user.aboutYou || "Pode ajudar em diversas áreas",
          userType: "helper" as const,
        }));
        todosUsuarios.push(...helpers);
      }

      // Processar assistidos
      if (assistedResponse?.content) {
        const assisted = assistedResponse.content.map((user: User) => ({
          id: Number(user.id) + 1000,
          name: user.name,
          age: calcularIdade(user.birthDate),
          img: user.profileImageUrl || genericIcon,
          description: user.needs || user.aboutYou || "Precisa de ajuda",
          userType: "assisted" as const,
        }));
        todosUsuarios.push(...assisted);
      }

      // Embaralhar usuários
      const usuariosEmbaralhados = todosUsuarios.sort(() => Math.random() - 0.5);
      setUsuarios(usuariosEmbaralhados);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      setUsuarios([]);
    } finally {
      setLoading(false);
    }
  }, [city, calcularIdade]);

  useEffect(() => {
    buscarUsuarios();
  }, [buscarUsuarios]);

  const proximoSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalItems);
  }, [totalItems]);

  const slideAnterior = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
  }, [totalItems]);

  const usuariosVisiveis = useMemo(() => {
    if (totalItems === 0) return [];

    const visible = [];
    for (let i = 0; i < visibleItems; i++) {
      const item = usuarios[(currentIndex + i) % totalItems];
      visible.push({
        ...item,
        isVisible: i === 1,
      });
    }
    return visible;
  }, [usuarios, currentIndex, totalItems]);

  if (loading) {
    return (
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
          {title}
        </h2>
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          <p className="text-accent-500 mt-4">Carregando usuários...</p>
        </div>
      </section>
    );
  }

  if (usuarios.length === 0) {
    return (
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
          {title}
        </h2>
        <div className="text-center py-12">
          <p className="text-accent-500">Nenhum usuário encontrado.</p>
          {city && (
            <p className="text-xs text-gray-400 mt-2">Cidade: {city}</p>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
        {title}
      </h2>

      <div className="relative max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-center space-x-8">
          {/* Botão Anterior */}
          <button
            onClick={slideAnterior}
            disabled={totalItems <= visibleItems}
            className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg
              className="w-6 h-6 text-accent-600"
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

          {/* Cards dos Usuários */}
          <div className="flex space-x-6 overflow-hidden">
            {usuariosVisiveis.map((usuario, index) => (
              <div
                key={`${usuario.id}-${index}`}
                className={`flex-shrink-0 transition-all duration-500 ${
                  index === 1 ? "scale-110 z-10" : "scale-90 opacity-70"
                }`}
                style={{ width: "280px" }}
              >
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                  <div className="relative">
                    <img
                      src={usuario.img}
                      alt={usuario.name}
                      className="w-full h-48 object-cover"
                    />
                    <div
                      className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium text-white ${
                        usuario.userType === "helper"
                          ? "bg-secondary-500"
                          : "bg-primary-500"
                      }`}
                    >
                      {usuario.userType === "helper"
                        ? "Ajudante"
                        : "Precisa de Ajuda"}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-accent-800 mb-2">
                      {usuario.name}
                    </h3>
                    <p className="text-accent-600 mb-3">{usuario.age} anos</p>
                    <p className="text-accent-700 text-sm leading-relaxed mb-4 line-clamp-3">
                      {usuario.description}
                    </p>

                    <button
                      className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                        usuario.userType === "helper"
                          ? "bg-secondary-500 hover:bg-secondary-600 text-white"
                          : "bg-primary-500 hover:bg-primary-600 text-white"
                      }`}
                    >
                      Ver Perfil
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Botão Próximo */}
          <button
            onClick={proximoSlide}
            disabled={totalItems <= visibleItems}
            className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg
              className="w-6 h-6 text-accent-600"
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

        {/* Indicadores */}
        {totalItems > visibleItems && (
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: Math.ceil(totalItems / visibleItems) }).map(
              (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index * visibleItems)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    Math.floor(currentIndex / visibleItems) === index
                      ? "bg-primary-600"
                      : "bg-accent-300"
                  }`}
                />
              )
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Carrossel;
