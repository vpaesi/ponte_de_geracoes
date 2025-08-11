import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../constants/api";
import { Link } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { PageLayout } from "../components/PageLayout";
import ProfileImage from "../components/comuns/ProfileImage";

interface Address {
  city: string;
  zipCode: string;
  street: string;
  number: string;
  complement: string;
}

interface UserProfile {
  id: number;
  nome: string;
  birthDate: string;
  cpf: string;
  email: string;
  phone: string;
  password: string;
  availableDays: string[];
  aboutYou: string;
  profileImageUrl: string;
  available: boolean;
  address: Address;
}

const Profile: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const { user } = useUser();
  const { id, userType } = user || {};
  const userId = id;

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const endpoint = userType === "ajudante" ? "helper" : "assisted";
        const response = await axios.get<UserProfile>(
          `${API_BASE_URL}/${endpoint}/${userId}`
        );
        setUserProfile(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [userId, userType]);

  if (!userProfile) {
    return (
      <PageLayout>
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center">
          <div className="glass-card p-8">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-xl font-semibold text-accent-700">
                Carregando perfil...
              </span>
            </div>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-4">
              Meu Perfil
            </h1>
            <p className="text-lg text-accent-600">
              Aqui você pode visualizar e gerenciar suas informações
            </p>
          </div>

          <div className="space-y-8">
            {/* Profile Card */}
            <div className="glass-card p-8">
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 mb-8">
                {/* Profile Image */}
                <div className="relative">
                  <div className="shadow-xl ring-4 ring-primary-100">
                    <ProfileImage
                      src={userProfile.profileImageUrl}
                      alt={`Foto de perfil de ${userProfile.nome}`}
                      size="2xl"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg ${
                        userProfile.available ? "bg-green-500" : "bg-accent-400"
                      }`}
                    >
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>

                {/* Profile Info Header */}
                <div className="flex-1 text-center lg:text-left">
                  <h2 className="text-3xl font-bold text-accent-800 mb-2">
                    {userProfile.nome}
                  </h2>
                  <p className="text-lg text-accent-600 mb-4">
                    {userProfile.available
                      ? "Disponível para ajudar"
                      : "Indisponível no momento"}
                  </p>
                  <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                    {userProfile.availableDays.map((day) => (
                      <span
                        key={day}
                        className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium"
                      >
                        {day}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Edit Button */}
                <div className="flex flex-col items-center lg:items-end gap-4">
                  <Link
                    to="/edit-profile"
                    className="btn-primary flex items-center space-x-2 text-center"
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
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    <span>Editar Perfil</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Information Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Personal Information */}
              <div className="glass-card p-6">
                <h3 className="text-2xl font-bold text-accent-800 mb-6 flex items-center">
                  <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
                    <svg
                      className="w-5 h-5 text-primary-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  Dados Pessoais
                </h3>

                <div className="space-y-4">
                  {[
                    { label: "Nome", value: userProfile.nome },
                    {
                      label: "Data de nascimento",
                      value: new Date(userProfile.birthDate).toLocaleDateString(
                        "pt-BR"
                      ),
                    },
                    { label: "CPF", value: userProfile.cpf },
                    { label: "Telefone", value: userProfile.phone },
                    { label: "Email", value: userProfile.email },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center py-2 border-b border-accent-100 last:border-b-0"
                    >
                      <span className="font-medium text-accent-600">
                        {item.label}:
                      </span>
                      <span className="text-accent-800 font-semibold">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Address Information */}
              <div className="glass-card p-6">
                <h3 className="text-2xl font-bold text-accent-800 mb-6 flex items-center">
                  <div className="w-8 h-8 bg-secondary-100 rounded-lg flex items-center justify-center mr-3">
                    <svg
                      className="w-5 h-5 text-secondary-600"
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
                  </div>
                  Endereço
                </h3>

                <div className="space-y-4">
                  {[
                    {
                      label: "Cidade",
                      value: `${userProfile.address.city}/RS`,
                    },
                    { label: "CEP", value: userProfile.address.zipCode },
                    { label: "Logradouro", value: userProfile.address.street },
                    { label: "Número", value: userProfile.address.number },
                    {
                      label: "Complemento",
                      value: userProfile.address.complement || "Não informado",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center py-2 border-b border-accent-100 last:border-b-0"
                    >
                      <span className="font-medium text-accent-600">
                        {item.label}:
                      </span>
                      <span className="text-accent-800 font-semibold">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Skills and Availability */}
            <div className="glass-card p-8">
              <h3 className="text-2xl font-bold text-accent-800 mb-6 flex items-center">
                <div className="w-8 h-8 bg-warm-100 rounded-lg flex items-center justify-center mr-3">
                  <svg
                    className="w-5 h-5 text-warm-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                Habilidades e Disponibilidade
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-accent-700 mb-3">
                      Dias disponíveis:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {userProfile.availableDays.map((day) => (
                        <span
                          key={day}
                          className="px-4 py-2 bg-primary-500 text-white rounded-lg text-sm font-medium shadow-md hover:shadow-lg transition-shadow duration-300"
                        >
                          {day}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-accent-700 mb-3">
                      Status atual:
                    </h4>
                    <div
                      className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                        userProfile.available
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      <div
                        className={`w-2 h-2 rounded-full mr-2 ${
                          userProfile.available ? "bg-green-400" : "bg-red-400"
                        }`}
                      ></div>
                      {userProfile.available
                        ? "Disponível para ajudar"
                        : "Indisponível no momento"}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-accent-700 mb-3">
                    Sobre mim:
                  </h4>
                  <div className="bg-accent-50 rounded-lg p-4">
                    <p className="text-accent-700 leading-relaxed">
                      {userProfile.aboutYou ||
                        "Nenhuma informação adicional foi fornecida."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Profile;
