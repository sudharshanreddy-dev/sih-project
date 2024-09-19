import { createContext, useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

// Create the PrivateContext
export const PrivateContext = createContext({});

// PrivateRoute component
export function PrivateRoute({ children, requiredRole }) {
    const { user, loading } = useContext(PrivateContext);

    if (loading) {
        return <div>Loading...</div>; // or a spinner/loading indicator
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (requiredRole && user.role !== requiredRole) {
        return <Navigate to="/unauthorized" />; // Redirect to unauthorized page or similar
    }

    return children;
}

// Custom hook to use PrivateContext
export const usePrivate = () => useContext(PrivateContext);

// PrivateProvider component
export function PrivateProvider({ children }) {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await fetch('/profile');
                const data = await response.json();
                setUser(data);
                localStorage.setItem('user', JSON.stringify(data));
            } catch (error) {
                console.error('Error fetching user profile:', error);
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

    return (
        <PrivateContext.Provider value={{ user, setUser, loading }}>
            {children}
        </PrivateContext.Provider>
    );
}
