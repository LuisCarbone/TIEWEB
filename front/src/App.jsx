import React, { useState , useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from './servicios/miaxios.jsx'; 
import './App.css'

// componentes 
import Login from './componentes/login/Login';
import BCNavigationBar from './componentes/bcNavigationBar/BCNavigationBar';

function App() {
	const [usuarioLogueado, setUsuarioLogueado] = useState(null);

	useEffect(() => {
		const token = localStorage.getItem('token');

		if (token) {
			validarToken(token);
		}
	}, []);

	const validarToken = async (token) => {
		try {
			const response = await axios.post("/users/validarToken", null,  {
				headers:{
					'Content-Type': 'application/json',
					Authorization : `Bearer ${token}`,
				}
			});
			if (response.ok) {
				const usuario = await response.json();
				setUsuarioLogueado(usuario);
			} else {
				// si el token no es valido limpiarlo del localStorage
				localStorage.removeItem('token');
			}
		} catch (error) {
			console.error('Error al validar el token: ', error);			
		}

	};

	// Función para hacer logout
	const handleLogout = () => {
	  setUsuarioLogueado(null);
	  // También se puede limpiar el token JWT almacenado en localStorage aquí
	};

	// Función para manejar la inactividad y hacer logout después de 15 minutos
	useEffect(() => {
		let timeoutId;

		const resetTimer = () => {
			clearTimeout(timeoutId);
			timeoutId = setTimeout(handleLogout, 15 * 60 * 1000); // 15 minutos en milisegundos
		};

		const startTimer = () => {
			window.addEventListener('mousemove', resetTimer);
			window.addEventListener('keydown', resetTimer);

			resetTimer();
		};

		startTimer();

		return () => {
			clearTimeout(timeoutId);

			window.removeEventListener('mousemove', resetTimer);
			window.removeEventListener('keydown', resetTimer);
		};
	}, [usuarioLogueado]);
  
  
	return (
		<Router>
			<div className='App'>
				<Routes>
					<Route path="/" element={usuarioLogueado ? 
						<BCNavigationBar  usuario={usuarioLogueado} onLogout={handleLogout} /> : 
						<Login  onLogin={setUsuarioLogueado} />} />					
				</Routes>
			</div>
		</Router>
	);
}

export default App
