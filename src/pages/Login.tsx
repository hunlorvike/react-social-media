// Login.tsx
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Use the recommended hook for navigation

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/auth/login', {
                email,
                password,
            });

            // Lưu AccessToken vào Local Storage
            localStorage.setItem('accessToken', response.data.data.accessToken);

            // Hiển thị thông báo thành công
            console.log(response.data.message);
            toast.success('Đăng nhập thành công', { position: toast.POSITION.TOP_RIGHT });
            setEmail('');
            setPassword('');

            // Điều hướng tới trang "posts"
            navigate('/posts');
            window.location.reload();

        } catch (error) {
            // Xử lý lỗi và hiển thị thông báo lỗi
            if (error.response && error.response.data) {
                toast.error(error.response.data.message, { position: toast.POSITION.TOP_RIGHT });
            } else if (error.request) {
                toast.error('No response received from the server', { position: toast.POSITION.TOP_RIGHT });
            } else {
                toast.error('Login failed. An unexpected error occurred', { position: toast.POSITION.TOP_RIGHT });
            }
        }
    };


    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-3xl font-bold mb-4">Login</h1>
            <form className="max-w-md mx-auto" onSubmit={handleLogin}>
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
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    Log in
                </button>
            </form>
            <ToastContainer />

        </div>
    );
};

export default Login;
