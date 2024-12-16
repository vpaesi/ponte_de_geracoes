import './RegisteredPage.css';

import React, { useState, useEffect } from "react";
import axios from "axios";
import urlFetch from '../../components/fetch/Fetch';
import '@fortawesome/fontawesome-free/css/all.min.css';

interface Address {
  city: string;
  zipCode: string;
  street: string;
  number: string;
  complement: string;
}

interface Registered {
  id: number;
  name: string;
  birthDate: string;
  profileImageUrl?: string;
  availableDays: string[];
  aboutYou: string;
  address: Address;
}

interface PageInfo {
  size: number;
  number: number;
  totalElements: number;
  totalPages: number;
}

const RegisteredPage: React.FC = () => {
  const [registered, setRegistered] = useState<Registered[]>([]);
  const [page, setPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [cities, setCities] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    axios
    //CONFIRMAR SE A ROTA ESTÁ CORRETA
      .get(`${urlFetch}/addresses/cities`, { params: { page: 0, size: 100 } })
      .then((response) => {
        const data = response.data as { content: string[] };
        setCities(data.content || []);
      })
      .catch((error) => console.error('Erro ao buscar cidades:', error));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log(`Fetching page ${page}`);

        const response = await axios.get<{
          content: Registered[];
          page: PageInfo;
        }>(`${urlFetch}/helper?page=${page}&size=10`);

        if (response.status === 200 && response.data) {
          setRegistered(response.data.content || []);
          setTotalPages(response.data.page.totalPages || 1);
          setTotalItems(response.data.page.totalElements || 0);
        } else {
          console.error("Erro ao buscar dados. Status:", response.status);
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, selectedCity]);

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const city = event.target.value;
    setSelectedCity(city);
    setPage(0);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="container">
      <div className="header-registered">
        <h3>Conheça os ajudantes da Ponte de Gerações</h3>

        <div className="city-filter">
          <label htmlFor="city-select">Filtrar por Cidade:</label>
          <select id="city-select" onChange={handleCityChange} value={selectedCity}>
            <option value="">Todas as cidades</option>
            {cities.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="cards-container">
        {loading ? (
          <p>Carregando...</p>
        ) : registered.length > 0 ? (
          registered.map((person) => (
            <div className="card" key={person.id}>
              <div className="card-body">
                <div className="card-image-container">
                  <img
                    src={person.profileImageUrl}
                    className="card-img"
                    alt={person.name}
                  />
                </div>
                <div className="card-content">
                  <h5 className="card-title">
                    {person.name},{' '}
                    {new Date().getFullYear() - new Date(person.birthDate).getFullYear()} anos
                  </h5>
                  <div className="card-address">
                    <i className="fas fa-location-dot"></i>{person.address.city}/RS
                    <p className="card-text">{person.aboutYou}</p>
                  </div>
                </div>
              </div>
              <div className="card-available">
                <p>
                  <b>Disponível nos dias:</b>
                  <br />
                  {person.availableDays.join(', ')}
                </p>
                <button>Entrar em contato</button>
              </div>
            </div>
          ))
        ) : (
          <p>Nenhum dado encontrado.</p>
        )}
      </div>

      <div className="pagination">
        <span
          onClick={() => handlePageChange(page - 1)}
          className={`page-arrow ${page === 0 ? 'disabled' : ''}`}
        >
          <i className="fas fa-chevron-left"></i>
        </span>

        <span>
          Página {page + 1} de {totalPages}
        </span>

        <span
          onClick={() => handlePageChange(page + 1)}
          className={`page-arrow ${page + 1 >= totalPages ? 'disabled' : ''}`}
        >
          <i className="fas fa-chevron-right"></i>
        </span>
      </div>

      <div className="footer-registered">
        <p>Ponte de Gerações é uma plataforma gaúcha que conecta idosos com necessidades específicas a pessoas dispostas a ajudar.</p>
        <a href="/register" className='footer-registered_btn'>Suba agora nessa ponte</a>
      </div>
    </div>
  );
};

export default RegisteredPage;
