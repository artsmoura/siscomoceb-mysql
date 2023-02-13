import React from "react";
import Navbar from "./components/Navbar/navbar";
import EventPage from "./modules/Events/events";
import FormEvent from "./modules/Events/FormEvent/formEvent";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import './style.css';
import Auth from "./modules/Auth/auth";
import { useWindowDimensions } from "./utils";
import UserProfile from "./modules/Auth/User/userProfile";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
    const loginPage = window.location.pathname;
    const userLogin = localStorage.getItem('profile');
    const navigate = useNavigate();
    const screenSize = useWindowDimensions();

    return (
        <>
            <div className="container">
                {loginPage !== '/login' ? <Navbar screenSize={screenSize.width} /> : null}
                <div className="pageBox">
                    <Routes>
                        {userLogin && <Route path="/" element={<EventPage />} />}
                        <Route path="/" element={<EventPage />} />
                        <Route path="login" element={<Auth />} />
                        <Route path="criarevento" element={<FormEvent />} />
                        <Route path="/" exact element={<Navigate replace to="/login" />} />
                        <Route path="/perfil" element={<UserProfile />} />
                    </Routes>
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    );
};

export default App;