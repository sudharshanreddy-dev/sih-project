import { useNavigate } from "react-router-dom";
import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export function UserContextProvider({ children }) {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const { data } = await axios.get('/profile');
                setUser(data);
            } catch (error) {
                console.error('Error fetching profile:', error);
            } finally {
                setLoading(false);
            }
        };

        if (!user) {
            fetchUserProfile();
        } else {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    const logout = async () => {
        try {
            await axios.post('/logout');
            setUser(null);
            localStorage.removeItem('user');
            navigate('/login');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <UserContext.Provider value={{ user, setUser, logout, loading }}>
            {children}
        </UserContext.Provider>
    );
}
