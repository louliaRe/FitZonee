import React, { createContext, useState, useContext } from 'react';
import { useRouter } from 'expo-router';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
        role: null,
        username: null
    });

    const router = useRouter();

    const login = (accessToken, refreshToken, role,username) => {
        setAuthState({
            accessToken,
            refreshToken,
            isAuthenticated: true,
            role,
            username,
        });

        switch (role) {
            case 1:
                router.push('/admin');
                break;
            case 2:
                router.push('/ManagerInterface');
                break;
            case 3:
                router.push('/EmpMainP');
                break;
            case 4:
                router.push('ClientsList');
                break;
            case 5:
                router.push('Services');
                break;
            default:
                router.push('/');
                break;
        }
    };

    const logout = () => {
        setAuthState({
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,
            role: null,
            username:null,

        });
        router.push('/');
    };

    return (
        <AuthContext.Provider value={{ authState, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};