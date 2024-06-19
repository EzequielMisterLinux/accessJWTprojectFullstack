import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/UsersProvider.jsx';

const Login = () => {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login(nombreUsuario, password);
      if (response) {
        navigate('/dashboard');
      }
    } catch (error) {
      alert('Credentials are incorrect');
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Iniciar Sesión</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="nombreUsuario" className="block text-sm font-medium text-gray-700">Nombre de Usuario</label>
            <input
              type="text"
              id="nombreUsuario"
              value={nombreUsuario}
              onChange={(e) => setNombreUsuario(e.target.value)}
              className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <button type="submit" className="w-full py-2 mt-4 text-white bg-indigo-600 rounded-md hover:bg-indigo-700">Iniciar Sesión</button>
          <div className="text-center">
            <a href="/forgot-password" className="text-sm text-indigo-600 hover:underline">¿Olvidó su contraseña?</a>

          </div>
          <div>
          <a href="/register" className="text-sm text-indigo-600 hover:underline">¿aun no tiene cuenta? click aqui</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
