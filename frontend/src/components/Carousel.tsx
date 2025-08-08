import React, { useState, useEffect } from "react";
import { apiService } from "../services/apiService";
import genericIcon from "../assets/generic-icon.jpg";

interface CarouselItem {
  id: number;
  name: string;
  age: number;
  img: string;
  description: string;
  userType: 'helper' | 'assisted';
  isVisible?: boolean;
}

interface CarouselProps {
  title: string;
  city?: string;
}

const Carousel: React.FC<CarouselProps> = ({ title, city }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [registered, setRegistered] = useState<CarouselItem[]>([]);
  const [loading, setLoading] = useState(false);

  const visibleItems = 4;
  const totalItems = registered.length;

  // Buscar usuários de ambos os tipos
  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        setLoading(true);
        console.log('Buscando todos os usuários:', { city });
        
        const params = {
          page: 0,
          size: 20,
          ...(city && { city })
        };

        // Buscar helpers e assisted em paralelo
        const [helpersResponse, assistedResponse] = await Promise.all([
          apiService.getUsers('helper', params),
          apiService.getUsers('assisted', params)
        ]);

        console.log('Respostas do API:', { helpersResponse, assistedResponse });

        const allUsers: CarouselItem[] = [];

        // Processar helpers
        if (helpersResponse?.content) {
          const helpers = helpersResponse.content.map((user: any) => ({
            id: user.id,
            name: user.name,
            age: calculateAge(user.birthDate),
            img: user.profileImageUrl || genericIcon,
            description: user.skills || user.aboutYou || 'Disponível para ajudar',
            userType: 'helper' as const
          }));
          allUsers.push(...helpers);
        }

        // Processar assisted
        if (assistedResponse?.content) {
          const assisted = assistedResponse.content.map((user: any) => ({
            id: user.id + 1000, // Evitar conflito de IDs
            name: user.name,
            age: calculateAge(user.birthDate),
            img: user.profileImageUrl || genericIcon,
            description: user.needs || user.aboutYou || 'Precisa de ajuda',
            userType: 'assisted' as const
          }));
          allUsers.push(...assisted);
        }

        // Embaralhar os usuários para misturar helpers e assisted
        const shuffledUsers = allUsers.sort(() => Math.random() - 0.5);
        
        console.log('Todos os usuários processados:', shuffledUsers);
        setRegistered(shuffledUsers);
      } catch (error) {
        console.error("Erro ao buscar usuários para o carousel:", error);
        setRegistered([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAllUsers();
  }, [city]);

  const calculateAge = (birthDate: string): number => {
    if (!birthDate) return 0;
    
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  };

  const handleNext = () => {
    if (totalItems > 1) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalItems);
    }
  };

  const handlePrev = () => {
    if (totalItems > 1) {
      setCurrentIndex((prevIndex) => 
        prevIndex === 0 ? totalItems - 1 : prevIndex - 1
      );
    }
  };

  const getVisibleItems = () => {
    if (totalItems === 0) return [];
    
    const visible = [];
    const itemsToShow = Math.min(visibleItems, totalItems);
    
    for (let i = 0; i < itemsToShow; i++) {
      const item = registered[(currentIndex + i) % totalItems];
      visible.push({
        ...item,
        isVisible: i === 1,
      });
    }
    return visible;
  };

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

  if (registered.length === 0) {
    return (
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
          {title}
        </h2>
        <div className="text-center py-12">
          <p className="text-accent-500">Nenhum usuário encontrado.</p>
          <p className="text-xs text-gray-400 mt-2">
            Cidade: {city || 'Todas'}
          </p>
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
        {/* Carousel Container */}
        <div className="flex items-center justify-center space-x-8">
          
          {/* Previous Button */}
          <button 
            className="flex-shrink-0 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-primary-50 hover:shadow-xl transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handlePrev}
            disabled={totalItems <= 1}
          >
            <svg className="w-6 h-6 text-primary-600 group-hover:text-primary-700 transform group-hover:-translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Carousel Items */}
          <div className="flex space-x-6 overflow-hidden">
            {getVisibleItems().map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className={`
                  flex-shrink-0 transition-all duration-500 transform
                  ${item.isVisible 
                    ? "scale-110 opacity-100 z-10" 
                    : "scale-90 opacity-60 hover:opacity-80"
                  }
                `}
              >
                <div className="card p-6 w-80 text-center space-y-4 group hover:scale-105 transition-all duration-300">
                  {/* Badge para indicar tipo de usuário */}
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mb-2 ${
                    item.userType === 'helper' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {item.userType === 'helper' ? '🤝 Ajudante' : '💙 Precisa de Ajuda'}
                  </div>
                  
                  <div className="relative mx-auto w-24 h-24">
                    <div className={`absolute inset-0 rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-300 ${
                      item.userType === 'helper' 
                        ? 'bg-gradient-to-r from-green-400 to-green-600' 
                        : 'bg-gradient-to-r from-blue-400 to-blue-600'
                    }`}></div>
                    <img 
                      src={item.img} 
                      alt={`Foto de ${item.name}`}
                      className="relative z-10 w-24 h-24 object-cover rounded-full shadow-lg"
                      onError={(e) => {
                        e.currentTarget.src = genericIcon;
                      }}
                    />
                  </div>
                  
                  <h3 className="text-xl font-bold text-primary-600 group-hover:text-primary-700 transition-colors duration-300">
                    {`${item.name}, ${item.age} anos`}
                  </h3>
                  
                  <p className="text-accent-600 leading-relaxed group-hover:text-accent-700 transition-colors duration-300">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Next Button */}
          <button 
            className="flex-shrink-0 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-primary-50 hover:shadow-xl transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleNext}
            disabled={totalItems <= 1}
          >
            <svg className="w-6 h-6 text-primary-600 group-hover:text-primary-700 transform group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: Math.min(totalItems, 5) }).map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex % Math.min(totalItems, 5)
                  ? "bg-primary-600 scale-125"
                  : "bg-primary-200 hover:bg-primary-300"
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Carousel;
