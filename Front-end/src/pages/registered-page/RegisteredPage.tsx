import './RegisteredPage.css'

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const registeredResponse = await axios.get<
          { content: Registered[]; page: { totalPages: number } }>
          // verificar endpoint dos ajudantes+ajudados
          (`${urlFetch}/helper`);
          if (registeredResponse.status === 200) {
          setRegistered(registeredResponse.data.content);
        } else {
          console.error("Erro ao buscar dados:", registeredResponse.status);
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }

    };

    fetchData();
  }, [type, page]);

  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setType(event.target.value as "ajudante" | "ajudado");
  };

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  return (

    <div className="container mt-4">
      <div>
        <h5 className="text-center">Conheça os {type === "ajudante" ? "ajudantes" : "ajudados"} cadastrados da Ponte de Gerações</h5>
        <div className="d-flex justify-content-between mb-3">
          <div className="btn-group">
            <input
              type="radio"
              className="btn-check"
              name="type"
              id="ajudante"
              value="ajudante"
              checked={type === "ajudante"}
              onChange={handleTypeChange}
              autoComplete="off"
            />
            <label className="btn btn-outline-primary" htmlFor="ajudante">
              Ajudantes
            </label>

            <input
              type="radio"
              className="btn-check"
              name="type"
              id="ajudado"
              value="ajudado"
              checked={type === "ajudado"}
              onChange={handleTypeChange}
              autoComplete="off"
            />
            <label className="btn btn-outline-primary" htmlFor="ajudado">
              Ajudados
            </label>
          </div>
        </div>
      </div>

      <div className="registered-row row-cols-1 row-cols-md-2 g-4">
        {registered.map((registered) => (
          <div className="col" key={registered.id}>
            <div className="card">

              <div className="card-body">
                <h5 className="card-title">{registered.name}, {new Date().getFullYear() - new Date(registered.birthDate).getFullYear()} anos</h5>
                <p className="card-text">{registered.skills}</p>
                <p className="card-text">{registered.aboutYou}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="btn-toolbar justify-content-center mt-4" role="toolbar">
        <div className="btn-group me-2" role="group" aria-label="Pagination">
          {/* Lógica para paginação */}
          {[...Array(3).keys()].map((num) => (
            <button
              key={num + 1}
              type="button"
              className="btn btn-primary"
              onClick={() => handlePageChange(num + 1)}
            >
              {num + 1}
            </button>
          ))}
        </div>
      </div>

      <div className="text-center mt-4">
        <p>Ponte de Gerações é uma plataforma gaúcha que conecta idosos com necessidades específicas a pessoas dispostas a ajudar.</p>
        <a href="/register" className="btn btn-warning">Suba agora nessa ponte</a>
      </div>
    </div>
  );
};

export default RegisteredPage;
