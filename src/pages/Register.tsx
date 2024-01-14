// Register.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register: React.FC = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        const response = await axios.post('http://localhost:3000/auth/register', {
            fullName,
            email,
            password,
        });

        console.log(response.data);
        toast.success(response.data.message, { position: toast.POSITION.TOP_RIGHT });

        setFullName('');
        setEmail('');
        setPassword('');

    };

    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-3xl font-bold mb-4">Register</h1>
            <form className="max-w-md mx-auto" onSubmit={handleRegister}>
                <div className="mb-4">
                    <label htmlFor="fullName" className="block text-gray-700 text-sm font-bold mb-2">
                        Full Name
                    </label>
                    <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Your full name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                    Register
                </button>
            </form>
            <ToastContainer />

        </div>
    );
};

export default Register;
