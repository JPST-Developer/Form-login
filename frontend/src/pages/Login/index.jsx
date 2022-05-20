import React, { useState } from 'react'

import api from "../../services/api"



export default function Logon() {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
  
    async function handleLogin(e) {
        e.preventDefault()

        const data = {
            name,
            password
        }
        try {
            const response = await api.post('/login', data)
            alert("passou")
            localStorage.setItem('nameUser', response.data.name)
            console.log(response)
        } catch (err) {
            alert('Falha no login, tente novamente. ')
        }
    }

    return (
        <div className="Register-container">
            <div className="content">
                <section>
                    <h1>Login</h1>
                </section>

                <form onSubmit={handleLogin}>
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

                    <button className="button" type="submit">Logar</button>
                </form>
            </div>
        </div>
    );
}