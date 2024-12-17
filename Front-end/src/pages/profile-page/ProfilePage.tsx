import React, { useEffect, useState } from 'react';
import axios from 'axios';
import urlFetch from '../../components/fetch/Fetch';

interface Address {
    city: string;
    zipCode: string;
    street: string;
    number: string;
    complement: string;
}

interface UserProfile {
    id: number;
    name: string;
    birthDate: string;
    rg: string;
    cpf: string;
    email: string;
    phone: string;
    password: string;
    skills: string;
    availableDays: string[];
    aboutYou: string;
    profileImageUrl: string;
    available: boolean;
    address: Address;
}

const ProfilePage: React.FC = () => {
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const userId = 1; // Altere conforme necessário.

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get<UserProfile>(`${urlFetch}/helper/${userId}`);
                setUserProfile(response.data);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchUserProfile();
    }, [userId]);

    if (!userProfile) {
        return <div>Carregando perfil...</div>;
    }

    return (
        <div>
            <h1>Página de Perfil</h1>
            <h2>Informações pessoais</h2>
            <img
                src={userProfile.profileImageUrl}
                alt={`Foto de perfil de ${userProfile.name}`}
            />
            <p>Nome: {userProfile.name}</p>
            <p>Data de nascimento: {new Date(userProfile.birthDate).toLocaleDateString()}</p>
            <p>RG: {userProfile.rg}</p>
            <p>CPF: {userProfile.cpf}</p>
            <p>Telefone: {userProfile.phone}</p>
            <p>Email: {userProfile.email}</p>
            <p>Habilidades: {userProfile.skills}</p>
            <p>Dias disponíveis: {userProfile.availableDays.join(', ')}</p>
            <p>Sobre você: {userProfile.aboutYou}</p>
            <p>Disponível: {userProfile.available ? 'Sim' : 'Não'}</p>
            <h2>Endereço</h2>
            <p>Cidade: {userProfile.address.city}</p>
            <p>CEP: {userProfile.address.zipCode}</p>
            <p>Logradouro: {userProfile.address.street}</p>
            <p>Número: {userProfile.address.number}</p>
            <p>Complemento: {userProfile.address.complement}</p>
        </div>
    );
};

export default ProfilePage;
