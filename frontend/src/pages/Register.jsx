import {useState} from "react";
import axios from "axios";
import {toast} from "react-hot-toast";
import {Link, useNavigate} from "react-router-dom";


export function Register() {
    const navigate = useNavigate();
    const [data, setData] = useState({name: '', email: '', password: ''})

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    async function registerUser() {
        console.log(data);
        const { name, email, password } = data;
        try {
            const response = await axios.post('/register', {name, email, password});
            toast.success(response.data.message);
            navigate('/login')
        } catch (error) {
            if (error.response.status === 405 || error.response.status === 409) {
                // Display the error message to the user
                console.log(error.response.data.message);
                toast.error(error.response.data.message);
            } else {
                console.log(error);
            }
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission
        registerUser();
    }

    return (
        <>
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full bg-white p-8 shadow-lg rounded-lg">
               
                <h2 className="text-center text-2xl font-bold text-gray-900 mb-6">Create Account</h2>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <div className="mt-1">
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={data.name}
                                onChange={handleChange}

                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                    </div>
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
                            Create Account
                        </button>
                    </div>
                </form>
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
        </>
    )
}