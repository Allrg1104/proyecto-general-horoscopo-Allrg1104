import './styles/Form.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Form({ callback }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const validateUser = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('https://horoscopo-backend.vercel.app/v1/signos/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            if (data && data.success) {
                alert(data.message);
                callback(data.role);
                navigate(data.role === 'user' ? "/userHome" : "/adminHome");
            } else {
                alert(data.message || 'Error desconocido');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error en la solicitud: ' + error.message);
        }
    };

    return (
        <form onSubmit={validateUser}>
            <h1 id="txtBienvenida">Bienvenido a nuestro portal del Zodiaco</h1>
            <h4 className="txt">Nombre de Usuario</h4>
            <input type="text" className="entry" onChange={(e) => setUsername(e.target.value)} /><br />
            <h4 className="txt">Contraseña</h4>
            <input type="password" className="entry" onChange={(e) => setPassword(e.target.value)} /><br />
            <input type="submit" value="Ingresar" id="btnEnviar" />

            {/* Botón para cambiar contraseña */}
            <button
                type="button"
                id="btnChangePassword"
                onClick={() => navigate('/changePassword')}
            >
                Cambiar Contraseña
            </button>

            {/* Botón para crear usuario */}
            <button
                type="button"
                id="btnCreateUser"
                onClick={() => navigate('/createUser')}
            >
                Crear Usuario
            </button>
            {/* Botón para crear administrador */}
            <button type="button" id="btnCreateAdmin" onClick={() => navigate('/createAdmin')}>
                Crear Administrador
            </button>

        </form>

    );
}

export default Form;