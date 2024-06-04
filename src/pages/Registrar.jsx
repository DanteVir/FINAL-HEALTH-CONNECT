import React, { useState } from 'react'
import Logo from '../assets/img/logo.png'
import axios from 'axios'
import { NavLink} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { AlertaModal } from '../components/AlertaModal'

export const Registrar = () => {
    const [name, setName] = useState("")
    const [lastname, setLastname] = useState("")
    const [username, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [telephone, setTelephone] = useState("")
    const [fechaNacimiento, setFechaNacimiento] = useState("")
    const [genero, setGenero] = useState("")
    const [dni, setDni] = useState("")
    const [mostrarAlerta, setMostrarAlerta] = useState(false)
    const btnlink =("mr-5 hover:text-red-400 text-white")
    const navigate = useNavigate()
    

    const registrarService = async (e) => {
        e.preventDefault()

        if (!validarCamposLlenos()) {
          // Mostrar alerta si alguno de los campos está vacío
          setMostrarAlerta(true)
          return
        }

        const data = {
            name: name,
            lastname: lastname,
            username: username,
            email: email,
            password: password,
            telephone: telephone, 
            fechaNacimiento: fechaNacimiento,
            dni: dni,
            genero: genero
        }

        await axios.post("http://localhost:3000/api/usuarios/registrar", data)
           .then((resp) => {
                console.log(resp)
                navigate('/login')
            })
           .catch((err) => {
                console.log(err)
            })
    }

    const validarCamposLlenos = () => {
        return name.trim() !== "" &&
               lastname.trim() !== "" &&
               username.trim() !== "" &&
               email.trim() !== "" &&
               password.trim() !== "" &&
               telephone.trim() !== "" &&
               fechaNacimiento.trim() !== "" &&
               genero.trim() !== "" &&
               dni.trim() !== ""
    }
    const cerrarAlerta = () => {
        setMostrarAlerta(false)
    }

    return (
        <div className="h-screen w-screen flex justify-center items-center bg-[url('/login.png')] bg-cover" >
            <div className='w-1/2 h-80  flex justify-center items-center'>
                <img src={Logo} alt="Logo" className="w-1/2 animate-pulse" />
            </div>
            <div className="w-1/2 h-0.5 flex items-center absolute top-10 right-10 cursor-pointer">
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            <NavLink to="/login" className={`mx-2 py-1 px-2 rounded-full ${btnlink}`}>Iniciar Sesion</NavLink>
            <NavLink to="/registrar" className={`mx-2 py-1 px-2 rounded-full ${btnlink}`}>Registrar Usuario</NavLink>
            <a href="https://hvdjhonpico.000webhostapp.com/vih/index.html"className="mx-2 py-1 px-2 rounded-full text-white ">Inicio</a>
        
          </nav>
        </div>
            <div className='w-1/2 h-120 flex flex-col justify-between items-center'>
                <h3 className="text-4xl text-white">Registrar</h3>
                <div className='flex justify-between'>
                    <div className='w1/2 mr-10'>
                        <div>
                            <h2 className="text-lg text-white ">Nombre</h2>
                            <input type="text" className="rounded-full bg-red-400 text-white p-5 max-h-12 w-60" value={name}
                            onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div>
                            <h2 className="text-lg text-white">Apellido</h2>
                            <input type="text" className="rounded-full bg-red-400 text-white p-5 max-h-12 w-60"  value={lastname}
                            onChange={(e) => setLastname(e.target.value)} />
                        </div>
                        <div>
                            <h2 className="text-lg text-white">Usuario</h2>
                            <input type="text" className="rounded-full bg-red-400 text-white p-5 max-h-12 w-60" value={username}
                            onChange={(e) => setUserName(e.target.value)}/>
                        </div>
                        <div>
                            <h2 className="text-lg text-white">Email</h2>
                            <input type="email" className="rounded-full bg-red-400 text-white p-5 max-h-12 w-60" value={email} 
                            onChange={(e) => setEmail(e.target.value)} />
                        </div>
                    </div>
                    <div className='w-1/2'>
                        <div>
                            <h2 className="text-lg text-white">Contraseña</h2>
                            <input type="password" className="max-h-12  max-w-full-10 rounded-full bg-red-400 text-white p-5" value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div>
                            <h2 className="text-lg text-white">Telefono</h2>
                            <input type="number" className="rounded-full bg-red-400 text-white p-5 max-h-12 w-60" value={telephone}
                            onChange={(e) => setTelephone(e.target.value)}/>
                        </div>
                        <div>
                            <h2 className="text-lg text-white">Fecha de nacimiento</h2>
                            <input type="date" className="rounded-full bg-red-400 text-white p-5 max-h-12 w-60" value={fechaNacimiento}
                            onChange={(e) => setFechaNacimiento(e.target.value)} />
                        </div>
                        <div>
                            <h2 className="text-lg text-white">Genero</h2>
                            <input type="text" className="rounded-full bg-red-400 text-white p-5 max-h-12 w-60" value={genero}
                            onChange={(e) => setGenero(e.target.value)} />
                        </div>
                        <div>
                            <h2 className="text-lg text-white">DNI</h2>
                            <input type="text" className="rounded-full bg-red-400 text-white p-5 max-h-12 w-60" value={dni}
                            onChange={(e) => setDni(e.target.value)} />
                        </div>
                    </div>
                </div>
                <button className="rounded-full bg-red-500 text-white p-3 hover:bg-pink-500 w-4/5 mt-5" onClick={registrarService}>Registrar</button>
            </div>
            <AlertaModal
                mensaje="Por favor, complete todos los campos"
                mostrar={mostrarAlerta}
                onCerrar={cerrarAlerta}
            />
        </div>
    )
}