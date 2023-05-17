import React from "react";
import "./Login.css";
import { useState } from "react";
// import { enviarDadosLogin } from '../../../Data';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let usuario = {
    nickNameOuEmail: email,
    senha: password,
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`http://localhost:8080/UInvest/login`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    }).then(() => {
      window.location = "/";
    });
  };

  return (
    // Container da caixa de cadastro
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>

        {/* Input do email */}
        <div className="email-input-group">
          <label htmlFor="email">Username:</label>
          <input
            type="text"
            id="email"
            placeholder=" Digite seu e-mail ou username:"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <div className="password-input-group">
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            placeholder="Digite sua senha: "
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};
export default Login;
