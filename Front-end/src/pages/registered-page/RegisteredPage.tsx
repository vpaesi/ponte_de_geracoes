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
  img: string;
  id: number;
  name: string;
  birthDate: string;
  rg: string;
  cpf: string;
  email: string;
  phone: string;
  skills: string;
  availableDays: string[];
  aboutYou: string;
  address: Address;
  available: boolean;
}

const RegisteredPage: React.FC = () => {
  const [registered, setRegistered] = useState<Registered[]>([]);
  const [type, setType] = useState<"ajudante" | "ajudado">("ajudante");
  const [page, setPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0); // Armazena o total de itens cadastrados

  useEffect(() => {
    const fetchData = async () => {
      try {
        const registeredResponse = await axios.get<{
          content: Registered[];
          totalElements: number;
        }>(`${urlFetch}/helper?page=${page - 1}&type=${type}`); // Ajuste na URL para paginar e filtrar por tipo

        if (registeredResponse.status === 200) {
          setRegistered(registeredResponse.data.content);
          setTotalItems(registeredResponse.data.totalElements); // Captura o total de elementos do banco
        } else {
          console.error("Erro ao buscar dados:", registeredResponse.status);
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, [type, page]);

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setType(event.target.value as "ajudante" | "ajudado");
    setPage(1); // Reinicia para a primeira página ao trocar o tipo
  };

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  return (
    <div className="container">
      <div className="header-registered">
        <h3>Conheça os {type === "ajudante" ? "ajudantes" : "ajudados"} cadastrados da Ponte de Gerações</h3>
        <div className="filter-group">
          <div className="filter-item">
            <label htmlFor="filter-by">Filtrar por:</label>
          </div>
          <div className="filter-item">
            <select
              id="type"
              name="type"
              value={type}
              onChange={handleTypeChange}
            >
              <option value="ajudante">Ajudantes</option>
              <option value="ajudado">Ajudados</option>
            </select>
          </div>
        </div>
      </div>

      <div className="cards-container">
        {registered.map((registered) => (
          <div className="card" key={registered.id}>
            <div className="card-body">
              <h5 className="card-title">
                {registered.name}, {new Date().getFullYear() - new Date(registered.birthDate).getFullYear()} anos
              </h5>
              <p className="card-text">{registered.skills}</p>
              <p className="card-text">{registered.aboutYou}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Componente de Paginação */}
      <div className="pagination">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="page-button"
        >
          &lt;
        </button>
        <span>
          Página {page} de {Math.ceil(totalItems / 10)}
        </span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === Math.ceil(totalItems / 10)}
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
