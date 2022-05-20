import React from "react"
import { useState } from "react";
import api from "./services/api";

function App() {

  const [name, setName] = useState('')
    const [password, setPassword] = useState('')
  


    async function handleRegister(e) {
        e.preventDefault()

        const data = {
            name,
            password
        }

        try{
            const response = await api.post('/user/cadaster', data)

            alert(`Seu ID de acesso: ${response.data.user.name}`)
            console.log(response.data)
        } catch (err) {
            alert('Erro no cadastro, tente novamente. ')
            console.log(err)
        }
    }

  

    return (
        <div className="Register-container">
            <div className="content">
                <section>
                    <h1>Cadastro</h1>
                </section>

                <form onSubmit={handleRegister}>
                    <input
                        placeholder="Nome de usuário"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />

                    <input
                        type="password" placeholder="Sua senha"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />

                    

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}
 
export default App;
