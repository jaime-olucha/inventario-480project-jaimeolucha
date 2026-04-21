import { useState } from 'react'
import { loginApi } from '../../../infrastructure/auth/auth.api'
import type { SubmitEvent } from 'react'


export const LoginTest = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")

    const handleLogin = async(e:SubmitEvent) =>{
        e.preventDefault();
        setMessage("Comprobando...")

        try{
            const response = await loginApi({
                email,
                password
            });

            console.log('Respuesta back: ', response.token)
            console.log('Access token: ', response)

            if(response.token) {
                localStorage.setItem('accessToken', response.token)
                setMessage('Token recibido y guardado en localStorage.');
            }

        } catch(error: any) {
            console.error('ERROR: ', error);
            setMessage(`Error: ${error.message}.`)
        } 
    }

  return (
    <div>
        {/* HOOK FORM */}
        <h1>Prueba Login 480 Project</h1>
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '10px', width:'500px'}}>
            <label htmlFor="email"></label>
            <input type="text" id='email' placeholder='Email...' value={email} onChange={(e)=>setEmail(e.target.value)} />
            <label htmlFor="password"></label>
            <input type="password" id='password' placeholder='*****' value={password} onChange={(e)=>setPassword(e.target.value)} />
            <button type='submit'>Probando conexión...</button>
        </form>
        <p>{message}</p>
    </div>
  )
}
