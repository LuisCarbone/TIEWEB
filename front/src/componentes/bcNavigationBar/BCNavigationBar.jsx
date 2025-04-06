import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import NavBar from 'react-bootstrap/NavBar';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import axios from 'axios';


const BCNavigationBar = (props) => {
    // Convertir tiempoRestante a minutos y segundos para mostrarlo
    const minutos = Math.floor(props.tiempoRestante / 60);
    const segundos = props.tiempoRestante % 60;    

    const [ busqueda, setBusqueda ] = useState('');

    const handleChange = (event) => {
        console.log(props)
        setBusqueda (event.target.value)
    }

    const handleSearch = async (event) => {
        event.preventDefault()
        if (busqueda === '') alert('Escribí que estas buscando')
        else {
            try {
                const response = await axios(`/calificaciones?name=${busqueda}`)
                if (response.data.error) alert('No hay resultados')
                else {
                    props.setFilteredData(response.data)
                }
            } catch (error) {
                console.log(error)
            }
            setBusqueda('')
            if (location.pathname !== "/") navigate("/")
        }
    }
    


return (
        <NavBar expand="lg" className="bg-body-tertiary" fixed='top'>
            <Container>
                <Link to="/" className="nav-link">
                    <NavBar.Brand>
                        <img
                            alt=""
                            src="logo.png"
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{" "}
                        PIRULO
                    </NavBar.Brand>
                </Link>
                <NavBar.Toggle aria-controls="basic-navbar-nav" />
                <NavBar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#link">Link</Nav.Link>
                    </Nav>
                </NavBar.Collapse>
                <Form>
                    <Row>
                        <Col xs="auto">
                            <Form.Control
                                type="text"
                                placeholder="Buscá un alumno"
                                className=" mr-sm-2"
                                value={busqueda}
                                onChange={handleChange}
                            />
                        </Col>
                        <Col xs="auto">
                            <Button type="submit" variant="secondary" onClick={handleSearch}>
                                Buscar
                            </Button>
                        </Col>
                    </Row>
                </Form>
                {props.usuario.id ?
                    <Nav.Link onClick={props.onLogout} style={{ marginLeft: "15px" }}>Cerrar sesión</Nav.Link>
                    : <Link to="/calificaciones" className="nav-link" style={{ marginLeft: "15px" }}>Ingresar</Link>}

            </Container>
        </NavBar>
    );
}

export default BCNavigationBar;