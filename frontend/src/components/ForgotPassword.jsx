import { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');

    const handleForgotPassword = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/api/send-reset-password-email', { mail: email });
            alert(response.data.message);
        } catch (error) {
            console.error("Error sending reset password email", error);
            alert("Error sending reset password email");
        }
    };

    return (
        <div className="flex h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
                <h2 className="text-2xl font-bold text-center">Recuperar Contraseña</h2>
                <form onSubmit={handleForgotPassword} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>
                    <button type="submit" className="w-full py-2 mt-4 text-white bg-indigo-600 rounded-md hover:bg-indigo-700">Enviar Enlace de Recuperación</button>
                    <div>
                        <a href="/register" className="text-sm text-indigo-600 hover:underline">¿crear nueva cuenta? click aqui</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
