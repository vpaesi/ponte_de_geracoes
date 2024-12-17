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
  const [birthDate, setBirthDate] = useState<string>("");
  const [rg, setRg] = useState<string>("");
  const [cpf, setCpf] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [zipCode, setZipCode] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [neighborhood, setNeighborhood] = useState<string>("");
  const [complement, setComplement] = useState<string>("");
  const [userType, setUserType] = useState<string>("");
  const [aboutYou, setAboutYou] = useState<string>("");
  const [skillsNeeds, setSkillsNeeds] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchRegisteredData = async () => {
      try {
        // CONFIRMAR ENDPOINT - GITHUB SAIU DO AR PRA EU VERFICAR O SWAGGER
        const response = await fetch(`${urlFetch}/helper/${id}`);
        if (!response.ok) {
          throw new Error("Erro ao carregar dados do cadastro.");
        }

        const data = await response.json();
        setName(data.name);
        setBirthDate(data.birthDate);
        setRg(data.rg);
        setCpf(data.cpf);
        setEmail(data.email);
        setPhone(data.phone);
        setPassword(data.password);
        setConfirmPassword(data.password);
        setCity(data.city);
        setAddress(data.address);
        setNeighborhood(data.neighborhood);
        setZipCode(data.zipCode);
        setComplement(data.complement);
        setUserType(data.userType);
        setAboutYou(data.aboutYou);
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
      dob: birthDate,
      rg,
      cpf,
      email,
      phone,
      password,
      confirmPassword,
      address,
      city,
      cep: zipCode,
      complement,
      neighborhood,
      userType,
    };

    if (!validateFields(formValues, setErrors)) {
          return;
        }

    try {
      const updatedData = {
        name,
        birthDate,
        rg,
        cpf,
        email,
        phone,
        password,
        zipCode,
        city,
        address,
        neighborhood,
        complement,
        userType,
        aboutYou,
        skillsNeeds,
      };

      //ALTERAR ENDPOINT P/INDIVIDUAL /HELPER OU ASSISTED
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

  const setProfileImage = (file: File) => {
    console.log("Imagem de perfil carregada: ", file);
  };

  return (
    <div className="cadastro-container">
      <section className="apresentacao">
        <h1>EDITAR CADASTRO</h1>
      </section>

      <form onSubmit={handleUpdate} className="cadastro-form">
        <fieldset>
                  <legend>Dados Pessoais</legend>
                  <div className="form-row nome-email">
                    <div>
                      <p>Nome Completo</p>
                      <input
                        type="text"
                        placeholder="Digite seu nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={errors.name ? "input-error" : ""}
                      />
                      {errors.name && <span className="error-message">Nome é obrigatório</span>}
                    </div>
                    <div>
                      <p>Email</p>
                      <input
                        type="email"
                        placeholder="nome@exemplo.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={errors.email ? "input-error" : ""}
                      />
                      {errors.email && <span className="error-message">Email é obrigatório</span>}
                    </div>
                  </div>
        
                  <div className="form-row phone-dob-rg-cpf">
                    <div>
                      <p>Nascimento</p>
                      <input
                        type="date"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                        className={errors.birthDate ? "input-error" : ""}
                      />
                      {errors.birthDate && <span className="error-message">Data de nascimento é obrigatória</span>}
                    </div>
                    <div>
                      <p>Celular</p>
                      <input
                        type="number"
                        placeholder="51999999999"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className={errors.phone ? "input-error" : ""}
                      />
                      {errors.phone && <span className="error-message">Celular é obrigatório</span>}
                    </div>
                    <div>
                      <p>RG</p>
                      <input
                        type="text"
                        placeholder="1234567891"
                        value={rg}
                        onChange={(e) => setRg(e.target.value)}
                        className={errors.rg ? "input-error" : ""}
                      />
                      {errors.rg && <span className="error-message">RG é obrigatório</span>}
                    </div>
                    <div>
                      <p>CPF</p>
                      <input
                        type="text"
                        placeholder="12345678901"
                        value={cpf}
                        onChange={(e) => setCpf(e.target.value)}
                        className={errors.cpf ? "input-error" : ""}
                      />
                      {errors.cpf && <span className="error-message">CPF é obrigatório</span>}
                    </div>
        
                  </div>
                  <div className="form-row upload-password-confirm">
                    <div>
                      <p>Upload de imagem</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setProfileImage(e.target.files[0]);
                          }
                        }}
                        className={errors.profileImage ? "input-error" : ""}
                      />
                      {errors.profileImage && <span className="error-message">Imagem é obrigatória</span>}
                    </div>
                    <div>
                      <p>Senha</p>
                      <input
                        type="password"
                        placeholder="Digite a senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={errors.password ? "input-error" : ""}
                      />
                      {errors.password && <span className="error-message">Senha é obrigatória</span>}
                    </div>
                    <div>
                      <p>Confirme sua senha</p>
                      <input
                        type="password"
                        placeholder="Digite novamente"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className={errors.confirmPassword ? "input-error" : ""}
                      />
                      {errors.confirmPassword && <span className="error-message">As senhas não coincidem</span>}
                    </div>
                  </div>
                </fieldset>
        
                <fieldset>
                  <legend>Endereço</legend>
                  <div className="form-row address">
                    <div>
                      <p>CEP</p>
                      <input
                        type="text"
                        placeholder="99999-999"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                        onBlur={() => handleCepBlur(zipCode, setAddress, setCity, setNeighborhood)}
                        className={errors.zipCode ? "input-error" : ""}
                      />
                      {errors.zipCode && <span className="error-message">CEP é obrigatório</span>}
                    </div>
                    <div>
                      <p>Cidade</p>
                      <input
                        type="text"
                        placeholder="Digite sua cidade"
                        value={city}
                        readOnly
                        className={errors.city ? "input-error" : ""}
                      />
                      {errors.city && <span className="error-message">Cidade é obrigatória</span>}
                    </div>
                    <div>
                      <p>Bairro</p>
                      <input
                        type="text"
                        placeholder="Digite seu bairro"
                        value={neighborhood}
                        readOnly
                        className={errors.neighborhood ? "input-error" : ""}
                      />
                      {errors.neighborhood && <span className="error-message">Bairro é obrigatório</span>}
                    </div>
                  </div>
                  <div className="form-row address">
                    <div>
                      <p>Logradouro</p>
                      <input
                        type="text"
                        placeholder="Avenida Exemplo de Rua"
                        value={address}
                        readOnly
                        className={errors.address ? "input-error" : ""}
                      />
                      {errors.address && <span className="error-message">Logradouro é obrigatório</span>}
                    </div>
                    <div>
                      <p>Número</p>
                      <input type="number" placeholder="123" id="number" />
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
                  </div>
                </fieldset>
                <fieldset id="userType">
                  <legend>Sou...</legend>
                  <div className="form-row">
            <div className="col-1">
              <div className="form-row user-type">
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
        
              <div className="form-row availability">
                <div className="availability-title">
                  <p>Estou disponível/Preciso de ajuda nos dias:</p>
                </div>
                <div className="availability-days">
                  <label>
                    <input
                      type="radio"
                      name="userType"
                      value="sunday"
                      onChange={() => setUserType("sunday")}
                    />
                    Domingo
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="userType"
                      value="monday"
                      onChange={() => setUserType("monday")}
                    />
                    Segunda-feira
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="userType"
                      value="tuesday"
                      onChange={() => setUserType("tuesday")}
                    />
                    Terça-feira
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="userType"
                      value="wednesday"
                      onChange={() => setUserType("wednesday")}
                    />
                    Quarta-feira
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="userType"
                      value="thursday"
                      onChange={() => setUserType("thursday")}
                    />
                    Quinta-feira
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="userType"
                      value="friday"
                      onChange={() => setUserType("friday")}
                    />
                    Sexta-feira
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="userType"
                      value="saturday"
                      onChange={() => setUserType("saturday")}
                    />
                    Sábado
                  </label>
                </div>
              </div>
            </div>
        
            <div className="col-2">
              <div className="form-row about">
                <div>
                  <p>Fale um pouco sobre você:</p>
                  <textarea
                    placeholder="Escreva aqui..."
                    value={aboutYou}
                    onChange={(e) => setAboutYou(e.target.value)}
                  />
                </div>
                <div>
                  <p>Habilidades/ Necessidades</p>
                  <textarea
                    placeholder="Máximo de 90 caracteres"
                    maxLength={90}
                    value={skillsNeeds}
                    onChange={(e) => setSkillsNeeds(e.target.value)}
                    className={errors.skillsNeeds ? "input-error" : ""}
                  />
                  {errors.skillsNeeds && <span className="error-message">Campo obrigatório</span>}
                </div>
              </div>
            </div>
          </div>
        </fieldset>

        <button type="submit" className="submit-button">Salvar Alterações</button>

      </form>
    </div>
  );
};

export default EditRegistrationPage;
