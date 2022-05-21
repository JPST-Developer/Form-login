import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Yup
import * as yup from "yup";

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
import { FaUser, FaLock, FaLockOpen } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

function App() {
  const [user, setUser] = useState({
    name: "",
    password: "",
  });

  const [status, setStatus] = useState({
    type: "",
    mensagem: "",
  });

  let navigate = useNavigate();

  //Receber os dados do formulário
  const valueInput = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  async function handleRegister(e) {
    e.preventDefault();

    if (!(await validate())) return; // Espera a validação do yup para dar continuidade com o cadastro

    const saveDataForm = true;

    if (saveDataForm) {
      setStatus({
        type: "success",
        mensagem: "Usuário cadastrado com sucesso!",
      });
      setUser({
        name: "",
        password: "",
      });
    } else {
      setStatus({
        type: "error",
        mensagem: "Usuário não cadastrado com sucesso!",
      });
    }
  }

  // Validação com Yup
  async function validate() {
    let schema = yup.object().shape({
      passwordConfirmation: yup
        .string()
        .required("Necessário confirmar a senha!")
        .oneOf([yup.ref("password"), null], "As senhas deves ser iguais!"),
      password: yup
        .string("Necessário preencher o campo senha!")
        .required("Necessário preencher o campo senha!")
        .min(6, "A senha deve ter no mínimo 6 caracteres!"),
      name: yup
        .string("Necessário preencher o campo nome!")
        .required("Necessário preencher o campo nome!")
        .min(4, "O nome de usuário deve ter no mínimo 4 caracteres!"),
    });

    try {
      await schema.validate(user);
      await api.post("/user/cadaster", user);

      setTimeout(() => {
        navigate("/"); //Redireciona o usuário para a página de login depois de 2 segundos.
      }, 2000);

      return true;
    } catch (err) {
      setStatus({
        type: "error",
        mensagem: err.errors,
      });

      // Checar se já existe um usuário com o mesmo nome no banco de dados.
      if (!err.response.data.ok) {
        setStatus({
          type: "error",
          mensagem: "Usuário já existente",
        });
      }
      return false;
    }
  }

  return (
    <Container row>
      <Container small>
        <Heading1>Crie uma conta</Heading1>

        <FormContainer>
          <Heading2>Cadastro</Heading2>
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

          <Form onSubmit={handleRegister}>
            <Field>
              <Icon>
                <FaUser />
              </Icon>
              <Input
                type="text"
                name="name"
                id="name"
                required
                placeholder="Nome de usuário"
                onChange={valueInput}
                value={user.name}
              ></Input>
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

            <Field>
              <Icon>
                <FaLockOpen />
              </Icon>
              <Input
                type="password"
                name="passwordConfirmation"
                placeholder="Confirme a senha"
                onChange={valueInput}
              />
            </Field>
            <Button className="button" type="submit">
              Cadastrar
            </Button>

            <StyledLink to="/">
              <FiLogOut size={16} color="blue" style={{ marginRight: "8px" }} />
              Já tenho uma conta
            </StyledLink>
          </Form>
        </FormContainer>
      </Container>
    </Container>
  );
}

export default App;
