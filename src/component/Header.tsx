import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface AuthUser {
    id: number;
    email: string;
    role: string[];
}

const Header: React.FC = () => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const navigate = useNavigate(); // Use the recommended hook for navigation

    // Kiểm tra xem có access token trong localStorage không
    const isAuthenticated = !!localStorage.getItem('accessToken');

    useEffect(() => {
        // Lấy thông tin người dùng từ localStorage
        const storedUser = localStorage.getItem('accessToken');

        if (storedUser) {
            const decodedToken: AuthUser = jwtDecode(storedUser);
            setUser(decodedToken);
        } else {
            setUser(null);
        }

    }, []); // Chỉ chạy một lần khi component mount

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        // Reset user state
        setUser(null);

        navigate('/login');

    };


    return (
        <header className="bg-[#7FC7D9] p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-white text-xl font-bold">
                    Social Media
                </Link>
                <div>
                    {isAuthenticated && user ? (
                        <>
                            <span className="text-white mx-2">{user.email}</span>
                            <button className="text-white mx-2 bg-blue-500 hover:bg-blue-600 py-1 px-3 rounded"
                                onClick={handleLogout}>
                                Logout
                            </button>
                        </>

                    ) : (
                        // Hiển thị nút Login nếu chưa đăng nhập
                        <>
                            <Link to="/login" className="text-white mx-2">
                                Login
                            </Link>
                            <Link to="/register" className="text-white mx-2">
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
