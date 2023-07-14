import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    console.log('entrou??')
    const auth = localStorage.getItem('profile');
    console.log(auth)
    return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;