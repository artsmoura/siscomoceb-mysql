import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './auth.css';
import { authUser, clearAuthFields, login, register } from './redux/authAction';
import { GoogleLogin } from 'react-google-login';
import RegisterForm from './register/registerForm';
import LoginForm from './login/loginForm';

const Auth = () => {

    const dispatch = useDispatch();

    const [isRegister, setRegister] = useState(false);

    const handleScreenType = () => {
        setRegister(!isRegister);
        dispatch(clearAuthFields());
    };

    return (

        <div className='loginBox'>
            <div className={`boxForm${isRegister === true ? '-signup' : '-login'}`}>
                {isRegister === true ?
                    <h2>CRIAR CONTA</h2> :
                    (
                        <>
                            <h2>Bem Vindo</h2>
                            <p>Faça login para continuar</p>
                        </>
                    )
                }

                {isRegister === false ? <LoginForm /> : <RegisterForm />}

                {!isRegister ? (
                    <>
                        {/* <span className='entryWith'>Ou entrar com</span>
                        <GoogleLogin
                            buttonText="Entrar com Google"
                            onSuccess={googleSuccess}
                            onFailure={googleFailure}
                            cookiePolicy="single_host_origin"
                        /> */}
                        <div className='haveAccount'>
                            <p>
                                {"Não possui conta? "}
                                <span onClick={handleScreenType}>Cadastre-se</span>
                            </p>
                        </div>
                    </>

                ) : (
                    <div className='haveAccount'>
                        <p>
                            {"Possui conta? "}
                            <span onClick={handleScreenType}>Entre aqui</span>
                        </p>
                    </div>
                )}

            </div>
            {!isRegister && (
                <>
                    <div className='loginImg'>
                        <img src="img/login.jpg" alt='perfil'></img>
                    </div>
                </>
            )}
        </div>

    );
};

export default Auth;