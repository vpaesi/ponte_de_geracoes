import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { userService } from "../services/userService";
import { useUser } from "../utils/UserContext";
import {PageLayout} from "../components/PageLayout";
import ProfileImage from "../components/comuns/ProfileImage";
import StatusBadge from "../components/comuns/StatusBadge";
import AvailableDays from "../components/comuns/AvailableDays";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  userType: string;
  isAvailable: boolean;
  profileImageUrl?: string;
  availableDays?: string[];
  needsAndSkills?: string[];
  aboutYou?: string;
  address?: {
    city: string;
    street: string;
    number: string;
    zipCode: string;
  };
}

const Profile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user: currentUser, logout } = useUser();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);  

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);

        if (id) {
          const userData = await userService.getUserById(parseInt(id));
          setUser(userData);
        }
        else if (currentUser) {
          const userData = await userService.getUserById(currentUser.id);
          setUser(userData);
        }
        else {
          setError("Usuário não encontrado. Faça login para ver seu perfil.");
        }
      } catch (err) {
        console.error("Error fetching user profile:", err);
        setError("Erro ao carregar perfil do usuário");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [id, currentUser]);

  if (loading) {
    return (
      <PageLayout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-lg">Carregando perfil...</div>
        </div>
      </PageLayout>
    );
  }

  if (error) {
    return (
      <PageLayout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-red-500 text-lg">{error}</div>
        </div>
      </PageLayout>
    );
  }

  if (!user) {
    return (
      <PageLayout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-lg">Usuário não encontrado</div>
        </div>
      </PageLayout>
    );
  }

  const isOwnProfile = currentUser && currentUser.id === user.id;

  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {isOwnProfile && (
            <div className="mb-4 text-right">
              <button
                onClick={() => (window.location.href = "/atualizar-perfil")}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Editar Perfil
              </button>
            </div>
          )}

          <div className="flex flex-col md:flex-row gap-8">
            {/* Foto e informações básicas */}
            <div className="md:w-1/3">
              <ProfileImage
                src={user.profileImageUrl}
                alt={user.name}
                size="lg"
              />
              <div className="mt-4 text-center">
                <h1 className="text-2xl font-bold text-gray-800">
                  {user.name}
                </h1>
                <div className="mt-2">
                  <StatusBadge available={user.isAvailable} />
                </div>
              </div>
            </div>

            {/* Informações detalhadas */}
            <div className="md:w-2/3">
              <div className="space-y-6">
                {/* Tipo de usuário */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    Tipo de Usuário
                  </h3>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      user.userType === "helper"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {user.userType === "helper" ? "Ajudante" : "Ajudado"}
                  </span>
                </div>

                {/* Contato */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    Contato
                  </h3>
                  <div className="space-y-1">
                    <p className="text-gray-600">
                      <strong>Email:</strong> {user.email}
                    </p>
                    <p className="text-gray-600">
                      <strong>Telefone:</strong> {user.phone}
                    </p>
                  </div>
                </div>

                {/* Endereço */}
                {user.address && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                      Endereço
                    </h3>
                    <p className="text-gray-600">
                      {user.address.street}, {user.address.number}
                      <br />
                      {user.address.city} - CEP: {user.address.zipCode}
                    </p>
                  </div>
                )}

                {/* Dias disponíveis */}
                {user.availableDays && user.availableDays.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                      Dias Disponíveis
                    </h3>
                    <AvailableDays days={user.availableDays} />
                  </div>
                )}

                {/* Habilidades/Necessidades */}
                {user.needsAndSkills && user.needsAndSkills.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                      {user.userType === "helper" ? "Habilidades" : "Necessidades"}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {user.needsAndSkills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Sobre */}
                {user.aboutYou && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                      Sobre
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {user.aboutYou}
                    </p>
                  </div>
                )}

                            <button
              onClick={logout}
              className="btn-outline"
            >
              Sair
            </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Profile;
