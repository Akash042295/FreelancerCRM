import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const AuthGuard = ({ children }) => {
    const { isAuthenticated, initialized } = useAuth();
    const location = useLocation();

    if(!initialized) {
        return (
            <div className="flex items-center justify-center h-screen bg-[#0f0f0f]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
            </div>
        );
    };

    if(!isAuthenticated){
        return <Navigate to="/login" state={{ from: location }} replace/>
    };

    return children;
}

export default AuthGuard
