import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../../servicios/miaxios'; 


const validate = (form) => {
    const errors = {}
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(form.email)) errors.email = "Correo electrónico inválido"
    if (!form.email) errors.email = "Completar correo electrónico"
    if (form.password.length < 8) errors.password = "Contraseña inválida"
    if (!form.password) errors.password = "Completar contraseña"
    return errors
}

function Login ( { onLogin  } ) {
    const [username, setUsername] = useState('');

    const [form, setForm] = useState({
        email: "",
        password: ""
    })

    const [errors, setErrors] = useState({
        email: "",
        password: ""
    })

    const handleChange = (event) => {
        const property = event.target.name
        const value = event.target.value

        setForm({ ...form, [property]: value })
        setErrors(validate({ ...form, [property]: value }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (Object.keys(errors).length === 0) {
            try {
                const response = await axios.post("/users/login", form);

                if (response.data.error === "User not found") {
                    alert("No estás registrado, por favor, registrate para continuar")
                } else if (response.data.error === "Incorrect data") {
                    alert("Datos incorrectos")
                } else {
                    console.log (response.data);
					onLogin(response.data.usuario);

                    localStorage.setItem('token', JSON.stringify(response.data.token));
                    localStorage.setItem("isLoged", JSON.stringify(response.data.usuario));
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <Form onSubmit={handleSubmit} >
            <Form.Group className="mb-3">
                <Form.Label htmlFor="email">Correo electrónico:</Form.Label>
                <Form.Control type="text" name="email" value={form.email} onChange={handleChange}></Form.Control>
                {errors.email && <Form.Text>{errors.email}</Form.Text>}
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label htmlFor="password">Contraseña:</Form.Label>
                <Form.Control type="text" name="password" value={form.password} onChange={handleChange}></Form.Control>
                {errors.password && <Form.Text>{errors.password}</Form.Text>}
            </Form.Group>
            <Button type="submit" variant="secondary">Ingresar</Button>
            <Form.Group className="mb-3">
{/*                <Form.Label>¿No tenés usuario? <Link to="/registro">Registrate</Link></Form.Label>*/}
            </Form.Group>
        </Form>
    )
}

export default Login;