import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {

    const auth = localStorage.getItem('profile');

    return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;