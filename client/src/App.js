import React from "react";
import Navbar from "./components/Navbar/navbar";
import EventPage from "./modules/Events/events";
import FormEvent from "./modules/Events/FormEvent/formEvent";
import { Route, Routes } from "react-router-dom";
import './style.css';
import Auth from "./modules/Auth/auth";
import { useWindowDimensions } from "./utils";
import UserProfile from "./modules/Auth/User/userProfile";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from "./protectedRoute";
import { useSelector } from "react-redux";
import { Box, Center, Flex, VStack } from "@chakra-ui/react";

const App = () => {
    const user = useSelector((state) => state.authState.user);
    const screenSize = useWindowDimensions();

    return (
        <VStack bg={'rgb(240, 240, 240)'}>
            {Object.keys(user).includes('cod_usuario') ? <Navbar screenSize={screenSize.width} /> : null}
            <Routes>
                <Route path="login" element={<Auth />} />
                <Route path="/" element={<ProtectedRoute />}>
                    <Route path="/" element={<EventPage />} />
                </Route>
                <Route path="/criarevento" element={<ProtectedRoute />}>
                    <Route path="/criarevento" element={<FormEvent />} />
                </Route>
                <Route path="/perfil" element={<ProtectedRoute />}>
                    <Route path="/perfil" element={<UserProfile />} />
                </Route>
            </Routes>
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
        </VStack>
    );
};

export default App;