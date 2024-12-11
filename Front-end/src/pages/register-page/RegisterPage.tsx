import React, { useState } from "react";
import "./RegisterPage.css";
import { Link } from "react-router-dom";
import isCPF from "../../components/validate-cpf/ValidateCPF";
import isAdult from "../../components/validate-age/ValidateAge";

const RegisterPage: React.FC = () => {
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
  const [complement, setComplement] = useState<string>("");
  const [userType, setUserType] = useState<string>("");
  const [about, setAbout] = useState<string>("");
  const [skillsNeeds, setSkillsNeeds] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        alert("As senhas não coincidem!");
        return;
      }

      if (!isCPF(cpf)) {
        alert("CPF inválido!");
        return;
      }

      if (!isAdult(dob)) {
        alert("Você precisa ser maior de idade para se registrar!");
        return;
      }

      const formData = { name, dob, rg, cpf, email, phone, password, city, address, complement, userType, about,skillsNeeds, 
      };
      console.log("Cadastro enviado", formData);
    } catch (error) {
      console.error("Erro ao enviar o formulário:", error);
      alert("Ocorreu um erro ao enviar o formulário. Tente novamente mais tarde.");
    }
  };

  return (
    <div className="cadastro-container">
      <section className="apresentacao">
        <h1>CADASTRE-SE</h1>
        <p>Já é cadastrado? <Link to='/login' className='login-link'>Entrar</Link></p>
      </section>

      <form onSubmit={handleSubmit} className="cadastro-form">
        <fieldset>
          <legend>Dados Pessoais</legend>
          <div className="form-row">
            <div>
              <p>Nome Completo</p>
              <input
                type="text"
                placeholder="Digite seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <p>Email</p>
              <input
                type="email"
                placeholder="nome@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="form-row">
          <div>
              <p>Data de nascimento</p>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
            </div>
            <div>
              <p>RG</p>
              <input
                type="number"
                placeholder="1234567891"
                value={rg}
                onChange={(e) => setRg(e.target.value)}
              />
            </div>
            <div>
              <p>CPF</p>
              <input
                type="number"
                placeholder="12345678901"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
              />
            </div>      
          </div>
        
          <div className="form-row">
          <div>
              <p>Celular</p>
              <input
                type="number"
                placeholder="51999999999"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div>
              <p>Senha</p>
              <input
                type="password"
                placeholder="Digite a senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <p>Confirme sua senha</p>
              <input
                type="password"
                placeholder="Digite novamente"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>Endereço</legend>
          <div className="form-row">
            <div>
              <p>Logradouro</p>
              <input
                type="text"
                placeholder="Avenida Exemplo de Rua, nº 123"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div>
              <p>Complemento</p>
              <input
                type="text"
                placeholder="Casa 2, Bloco A"
                value={complement}
                onChange={(e) => setComplement(e.target.value)}
              />
            </div>
            <div>
              <p>Cidade</p>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
              >
                <option value="">Selecione...</option>
                <option value="Porto Alegre">Porto Alegre</option>
                <option value="Gravataí">Gravataí</option>
              </select>
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
                placeholder="Escreva aqui..."
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
            </div>
            <div>
              <p>Habilidades/ Necessidades</p>
              <textarea
                placeholder="Máximo de 90 caracteres"
                maxLength={90}
                value={skillsNeeds}
                onChange={(e) => setSkillsNeeds(e.target.value)}
              />
            </div>
          </div>
        </fieldset>

        <button type="submit" className="submit-button">Finalizar cadastro</button>
      </form>
    </div>
  );
};

export default RegisterPage;
