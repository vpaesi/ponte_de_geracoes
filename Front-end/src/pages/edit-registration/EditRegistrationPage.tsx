import React, { useEffect, useState } from "react";
import '../register-page/RegisterPage.css';
import { useNavigate, useParams } from "react-router-dom";
import { handleCepBlur } from "../../utils/validate-cep/ValidadeCep";
import { validateFields } from "../../utils/validate-fields/ValidateFields";
import urlFetch from "../../components/fetch/Fetch";

const EditRegistrationPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [name, setName] = useState<string>("");
  const [dob, setDob] = useState<string>("");
  const [rg, setRg] = useState<string>("");
  const [cpf, setCpf] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [neighborhood, setNeighborhood] = useState<string>("");
  const [cep, setCep] = useState<string>("");
  const [complement, setComplement] = useState<string>("");
  const [userType, setUserType] = useState<string>("");
  const [about, setAbout] = useState<string>("");
  const [skillsNeeds, setSkillsNeeds] = useState<string>("");

  const [errors, setErrors] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchRegisteredData = async () => {
      try {
        // verificar endpoint dos ajudantes+ajudados
        const response = await fetch(`${urlFetch}/registerd/${id}`);
        if (!response.ok) {
          throw new Error("Erro ao carregar dados do cadastro.");
        }

        const data = await response.json();
        setName(data.name);
        setDob(data.dob);
        setRg(data.rg);
        setCpf(data.cpf);
        setEmail(data.email);
        setPhone(data.phone);
        setPassword(data.password);
        setConfirmPassword(data.password);
        setCity(data.city);
        setAddress(data.address);
        setNeighborhood(data.neighborhood);
        setCep(data.cep);
        setComplement(data.complement);
        setUserType(data.userType);
        setAbout(data.about);
        setSkillsNeeds(data.skillsNeeds);
      } catch (error) {
        console.error(error);
        alert("Ocorreu um erro ao carregar os dados do cadastro.");
      }
    };

    fetchRegisteredData();
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    const formValues = {
      name,
      dob,
      rg,
      cpf,
      email,
      phone,
      password,
      confirmPassword,
      address,
      city,
      cep,
      userType,
    };

    const isValid = validateFields(formValues, setErrors);

    if (!isValid) {
      return;
    }

    try {
      const updatedData = {
        name,
        dob,
        rg,
        cpf,
        email,
        phone,
        city,
        address,
        neighborhood,
        cep,
        complement,
        userType,
        about,
        skillsNeeds,
      };

      const response = await fetch(`/registerd/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error("Erro ao atualizar cadastro.");
      }

      alert("Cadastro atualizado com sucesso!");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Ocorreu um erro ao atualizar o cadastro.");
    }
  };

  return (
    <div className="cadastro-container">
      <section className="apresentacao">
        <h1>EDITAR CADASTRO</h1>
        <p>* Campos obrigatórios</p>
      </section>
      <form onSubmit={handleUpdate} className="cadastro-form">
        <fieldset>
          <legend>Dados Pessoais</legend>
          <div className="form-row">
            <div>
              <p>Nome Completo *</p>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={errors.name ? "error" : ""}
              />
              {errors.name && <span className="error-message">Nome é obrigatório</span>}
            </div>
            <div>
              <p>Email *</p>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={errors.email ? "error" : ""}
              />
              {errors.email && <span className="error-message">Email é obrigatório</span>}
            </div>
          </div>

          <div className="form-row">
            <div>
              <p>Data de nascimento *</p>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className={errors.dob ? "error" : ""}
              />
              {errors.dob && <span className="error-message">Data de nascimento é obrigatória</span>}
            </div>
            <div>
              <p>RG *</p>
              <input
                type="text"
                value={rg}
                onChange={(e) => setRg(e.target.value)}
                className={errors.rg ? "error" : ""}
              />
              {errors.rg && <span className="error-message">RG é obrigatório</span>}
            </div>
            <div>
              <p>CPF *</p>
              <input
                type="text"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                className={errors.cpf ? "error" : ""}
              />
              {errors.cpf && <span className="error-message">CPF é obrigatório</span>}
            </div>      
          </div>
        
          <div className="form-row">
            <div>
              <p>Celular *</p>
              <input
                type="number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={errors.phone ? "error" : ""}
              />
              {errors.phone && <span className="error-message">Celular é obrigatório</span>}
            </div>
            <div>
              <p>Senha *</p>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={errors.password ? "error" : ""}
              />
              {errors.password && <span className="error-message">Senha é obrigatória</span>}
            </div>
            <div>
              <p>Confirme sua senha *</p>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={errors.confirmPassword ? "error" : ""}
              />
              {errors.confirmPassword && <span className="error-message">As senhas não coincidem</span>}
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>Endereço</legend>
          <div className="form-row">
            <div>
              <p>CEP *</p>
              <input
                type="text"
                value={cep}
                onChange={(e) => setCep(e.target.value)}
                onBlur={() => handleCepBlur(cep, setAddress, setCity, setNeighborhood)}
                className={errors.cep ? "error" : ""}
              />
              {errors.cep && <span className="error-message">CEP é obrigatório</span>}
            </div>
            <div>
              <p>Cidade *</p>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className={errors.city ? "error" : ""}
              />
              {errors.city && <span className="error-message">Cidade é obrigatória</span>}
            </div>
            <div>
              <p>Bairro *</p>
              <input
                type="text"
                value={neighborhood}
                onChange={(e) => setNeighborhood(e.target.value)}
              />
                            {errors.neighborhood && <span className="error-message">Bairro é obrigatório</span>}

            </div>
          </div>
          <div className="form-row">
            <div>
              <p>Logradouro *</p>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className={errors.address ? "error" : ""}
              />
              {errors.address && <span className="error-message">Logradouro é obrigatório</span>}
            </div>
            <div>
              <p>Número</p>
              <input
                type="number"
              />
            </div>
            <div>
              <p>Complemento</p>
              <input
                type="text"
                value={complement}
                onChange={(e) => setComplement(e.target.value)}
              />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>Sou...</legend>
          <div className="form-row">
            <label>
              <input
                type="radio"
                name="userType"
                value="ajudado"
                onChange={() => setUserType("ajudado")}
              />
              Ajudado
            </label>
            <label>
              <input
                type="radio"
                name="userType"
                value="ajudante"
                onChange={() => setUserType("ajudante")}
              />
              Ajudante
            </label>
          </div>
          <div className="form-row">
            <div>
              <p>Fale um pouco sobre você:</p>
              <textarea
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                className={errors.about ? "error" : ""}
              />
            </div>
            <div>
              <p>Habilidades/ Necessidades: *</p>
              <textarea
                maxLength={90}
                value={skillsNeeds}
                onChange={(e) => setSkillsNeeds(e.target.value)}
              />
            {errors.skillsNeeds && <span className="error-message">Campo obrigatório</span>}

            </div>
          </div>
        </fieldset>

        <button type="submit" className="submit-button">Salvar Alterações</button>
      </form>
    </div>
  );
};

export default EditRegistrationPage;
