import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { usePrivate } from "../../context/PrivateContext"; // Adjust the import if necessary

export function Login() {
    const navigate = useNavigate();
    const [data, setData] = useState({ email: '', password: '' });
    const { setUser } = usePrivate(); // Assuming you use usePrivate to manage user state

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const loginUser = async () => {
        try {
            console.log('Sending login request...');
            const response = await axios.post('/login', data, {
                withCredentials: true
            });
            console.log('Login request successful.');
            setData({ email: '', password: '' });

            const user = response.data.user; // Assuming response contains user data
            setUser(user); // Set the user context with the fetched user data

            // Navigate based on user role
            if (user.role === 'admin') {
                navigate('/admin-dashboard');
            } else {
                navigate('/user-dashboard');
            }

            toast.success(response.data.message);
        } catch (error) {
            console.log('Error occurred during login:', error);
            if (error.response && (error.response.status === 404 || error.response.status === 409)) {
                console.log('Login failed:', error.response.data.message);
                toast.error(error.response.data.message);
            } else {
                console.log('Unexpected error:', error);
            }
        }
    };

    function handleSubmit(e) {
        e.preventDefault();
        loginUser();
    }

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="max-w-md w-full bg-white p-8 shadow-lg rounded-lg">
                    <h2 className="text-center text-2xl font-bold text-gray-900 mb-6">Login</h2>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <div className="mt-1">
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={data.email}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="mt-1">
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={data.password}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Login
                            </button>
                        </div>
                    </form>
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Dont have an account?{' '}
                            <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Create Account
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
