import './RegisteredPage.css';

import React, { useState, useEffect } from "react";
import axios from "axios";
import urlFetch from '../../components/fetch/Fetch';

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

  useEffect(() => {
    const fetchData = async () => {
      try {
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
      }
    };

    fetchData();
  }, [page]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="container">
      <div className="header-registered">
        <h3>Conheça os ajudantes da Ponte de Gerações</h3>
      </div>

      <div className="cards-container">
        {registered.length > 0 ? (
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
                    {person.name},{" "}
                    {new Date().getFullYear() - new Date(person.birthDate).getFullYear()} anos
                  </h5>
                  <p className="card-text">{person.aboutYou}</p>
                </div>
              </div>
              <p className="card-available">
                <b>Disponível para ajudar nos dias:</b> {person.availableDays.join(", ")}
              </p>
            </div>
          ))
        ) : (
          <p>Nenhum dado encontrado.</p>
        )}
      </div>

      {/* Paginação */}
      <div className="pagination">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 0}
          className="page-button"
        >
          &lt;
        </button>
        <span>
          Página {page + 1} de {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page + 1 >= totalPages}
          className="page-button"
        >
          &gt;
        </button>
      </div>

      <div className="footer-registered">
        <p>Ponte de Gerações é uma plataforma gaúcha que conecta idosos com necessidades específicas a pessoas dispostas a ajudar.</p>
        <a href="/register" className='footer-registered_btn'>Suba agora nessa ponte</a>
      </div>
    </div>
  );
};

export default RegisteredPage;
