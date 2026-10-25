import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { ROLES } from '../constant/roles';

const EmployeeGuard = ({ children }) => {;
    const { user, isAuthenticated } = useAuth();

    if(!isAuthenticated) return <Navigate to="/login" replace/>
    if(user?.role !== ROLES.EMPLOYEE) return <Navigate to="/unauthorized" replace/>

    return children;
}

export default EmployeeGuard;
