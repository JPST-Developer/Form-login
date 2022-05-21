import React, { useState } from "react";

// API
import api from "../../services/api";

// Styled-Components
import { Input } from "../../components/input";
import { Container, Form, FormContainer } from "../../components/containers";
import { Button } from "../../components/button";
import { Heading1, Heading2 } from "../../components/typography";
import { Icon } from "../../components/icon";
import { Field } from "../../components/field";
import { StyledLink } from "../../components/styledLink";

// React-icons
import { FiLogIn } from "react-icons/fi";
import { FaUser, FaLock } from "react-icons/fa";

export default function Login() {
  const [user, setUser] = useState({
    name: "",
    password: "",
  });

  const [status, setStatus] = useState({
    type: "",
    mensagem: "",
  });

  //Receber os dados do formulário
  const valueInput = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  async function handleLogin(e) {
    e.preventDefault();

    //Validação de login
    try {
      const response = await api.post("/login", user);
      // Pega dados do back-end para fazer a validação, se existe o usuário no banco de dadados ou se os dados inseridos batem com os que estão no banco
      if (!response.data.ok) {
        // Se 'Ok' for 'false' ele retorna um erro
        setStatus({
          type: "error",
          mensagem: "Nome de usuário ou senha incorreto!",
        });
      } else if (response.data.ok) {
        // Se 'Ok' for 'true' ele retorna success e o usuário pode logar normalmente
        setStatus({
          type: "success",
          mensagem: `Logado com sucesso!`,
        });

        localStorage.setItem("nameUser", response.data.login); //Coloca o nome do usuário em um Local Storage, caso queira usar mais tarde
      }
    } catch (err) {
      setStatus({
        type: "error",
        mensagem:
          "Usuário e/ou senha incorretos, tente novamente ou cadastre-se!",
      });
    }
  }

  return (
    <Container row>
      <Container small>
        <Heading1>
          {status.type === "success"
            ? `Seja bem-vindo(a), ${user.name}`
            : "Acessar o site"}
        </Heading1>
        <FormContainer>
          <Heading2>Entrar</Heading2>
          {status.type === "success" ? (
            <p style={{ color: "green" }}>{status.mensagem}</p>
          ) : (
            ""
          )}
          {status.type === "error" ? (
            <p style={{ color: "#ff0000" }}>{status.mensagem}</p>
          ) : (
            ""
          )}
          <Form onSubmit={handleLogin}>
            <Field>
              <Icon>
                <FaUser />
              </Icon>
              <Input
                type="text"
                name="name"
                id="name"
                required
                placeholder=" Nome de usuário"
                onChange={valueInput}
                value={user.name}
              />
            </Field>
            <Field>
              <Icon>
                <FaLock />
              </Icon>
              <Input
                type="password"
                name="password"
                placeholder="Senha"
                autoComplete="on"
                onChange={valueInput}
                value={user.password}
              />
            </Field>

            <Button type="submit">Logar</Button>

            <StyledLink to="/register">
              <FiLogIn size={16} color="blue" style={{ marginRight: "8px" }} />
              Não tenho cadastro
            </StyledLink>
          </Form>
        </FormContainer>
      </Container>
    </Container>
  );
}
