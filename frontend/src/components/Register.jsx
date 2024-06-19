import { useState } from 'react';
import { Register } from '../api/UsersProvider';
import { useNavigate } from 'react-router-dom';

const Registeruser = () => {
  const [name, setName] = useState('');
  const [middlename, setMiddlename] = useState('');
  const [username, setUsername] = useState('');
  const [passw, setPassw] = useState('');
  const [mail, setMail] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await Register(name, middlename, mail, username, passw);
      if (response) {
        navigate('/dashboard'); // Redirigir al Dashboard después del registro
      }
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Registrar Usuario</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="middlename" className="block text-sm font-medium text-gray-700">Apellido</label>
            <input
              type="text"
              id="middlename"
              value={middlename}
              onChange={(e) => setMiddlename(e.target.value)}
              className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Nombre de Usuario</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="passw" className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input
              type="password"
              id="passw"
              value={passw}
              onChange={(e) => setPassw(e.target.value)}
              className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="mail" className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
            <input
              type="email"
              id="mail"
              value={mail}
              onChange={(e) => setMail(e.target.value)}
              className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <button type="submit" className="w-full py-2 mt-4 text-white bg-indigo-600 rounded-md hover:bg-indigo-700">Registrar</button>
          <div>
            <a href="/login" className="text-sm text-indigo-600 hover:underline">¿ya tiene una cuenta? click aqui</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registeruser;
