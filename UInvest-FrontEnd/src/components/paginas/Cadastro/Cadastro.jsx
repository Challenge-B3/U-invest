import React from 'react';
import { Link } from "react-router-dom";
import "./Cadastro.css";
import { useState } from 'react';
import {enviarDadosCadastro} from '../../../Data'; // Importe a função enviarDadosCadastro aqui

const Cadastro = () => {
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [phone, setPhone] = useState("");
  const [profileType, setProfileType] = useState("not-investor");
  const [CPF, setCPF] = useState("");
  const handlePerfilChange = (event) => {
    setProfileType(event.target.value);
  };
  

  const handleSubmit = (event) => {
    let usuario = {
      nome: name,
      username: username,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      birthdate: birthdate,
      phone: phone,
      profileType: profileType
    };


    enviarDadosCadastro(usuario)
    .then(data => {
      // Tratar a resposta da solicitação POST
      console.log(data);
    })
    .catch(error => {
      // Lidar com erros, se houver
      console.error(error);
    });



    event.preventDefault();
    console.log("Nome:", name);
    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Confirm Password:", confirmPassword);
    console.log("Data de nascimento:", birthdate);
    console.log("Telefone:", phone);
    console.log("Perfil de investidor:", profileType);
    console.log("Usuario: ", usuario)
    
  };

  return (

    // Container da caixa de cadastro
    <div className="signup-container">
      <form onSubmit={handleSubmit}>
        <h1>Cadastre-se</h1>

        {/* Input do nome */}
        <div className="form-input">
          <label htmlFor="name">Nome completo:</label>
          <input
            type="name"
            id="name"
            placeholder="  Digite seu nome:"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>

        {/* Input do username */}
        <div className="form-input">
          <label htmlFor="name">Username:</label>
          <input
            type="name"
            id="username"
            placeholder="  Digite seu username"
            value={username}
            onChange={(event) => setUserName(event.target.value)}
          />
        </div>


        {/* Input do email */}
        <div className="form-input">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="  Digite seu e-mail"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <div className="form-input">
          <label htmlFor="email">Senha:</label>
          <input
            type="password"
            id="password"
            placeholder="  Digite sua senha: "
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <div className="form-input">
          <label htmlFor="confirmPassword">Confirme:</label>
          <input
            type="password"
            id="confirmpassword"
            placeholder="  Confirme sua senha:"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
        </div>
      

      {/* Input do perfil do investidor */}
      <div>
      <h2>Perfil de investidor</h2>
        <label htmlFor="perfil">Selecione seu perfil de investidor:</label>
        <select id="perfil" value={profileType} onChange={handlePerfilChange}>
          <option value="nao-investidor">Não Investidor</option>
          <option value="iniciante">Iniciante</option>
          <option value="conservador">Conservador</option>
          <option value="moderado">Moderado</option>
        </select>
    </div>

        {/* Input do telefone */}
        <div className="form-input">
          <label htmlFor="phone">Telefone:</label>
          <input
            type="tel"
            id="phone"
            placeholder="Digite seu telefone"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          />
        </div>

          {/* Input do CPF */}
          <div className="form-input">
          <label htmlFor="cpf">CPF:</label>
          <input
            type="text"
            id="CPF"
            placeholder="Digite seu CPF"
            value={CPF}
            onChange={(event) => setCPF(event.target.value)}
          />
        </div>

          {/* Input da data de nascimento */}
          <div className="form-input">
          <label htmlFor="birthdate">Data de nascimento:</label>
          <input
            type="date"
            id="birthdate"
            placeholder="Digite sua data de nascimento"
            value={birthdate}
            onChange={(event) => setBirthdate(event.target.value)}
          />
        </div>


        <button type="submit">Cadastre-se</button>
        <p>
          Já possui uma conta? <Link to="/login"> Faça<span id="palavraLogin"> Login </span> </Link>
        </p>
      </form>
    </div>
  );
};

export default Cadastro;