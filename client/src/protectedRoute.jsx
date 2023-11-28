import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    console.log('????')
    const auth = localStorage.getItem('profile');
    const cookie = document.cookie
    console.log('????')
    // console.log(auth)
    // console.log(cookie)
    return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;