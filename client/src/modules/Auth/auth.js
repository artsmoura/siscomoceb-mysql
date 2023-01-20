import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/button';
import Input from '../../components/Input/input';
import './auth.css';
import { authUser, clearAuthFields, login, updateContentAuth, register } from './redux/authAction';
import { GoogleLogin } from 'react-google-login';

const Auth = () => {

    const dispatch = useDispatch();
    const user = useSelector((state) => state.authState.user);
    const navigate = useNavigate();

    const [isSignup, setIsSignup] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSignup) {
            dispatch(register(user, navigate));
        } else {
            dispatch(login(user, navigate));
        }
    };

    const googleSuccess = async (res) => {
        const result = res?.progileObj;
        const token = res?.tokenId;

        try {
            dispatch(authUser({ user: { result, token } }));
            navigate('/');
        } catch (error) {
            console.log(error?.message);
        }
    };
    const googleFailure = () => {
        console.log("Google login error");
    };

    const handleScreenType = () => {
        setIsSignup(!isSignup);
        dispatch(clearAuthFields());
    };

    return (
        <div className='loginBox'>
            <div className={`boxForm${isSignup === true ? '-signup' : '-login'}`}>
                {isSignup === true ?
                    <h2>CRIAR CONTA</h2> :
                    (
                        <>
                            <h2>Bem Vindo</h2>
                            <p>Faça login para continuar</p>
                        </>
                    )
                }

                <form>
                    {isSignup && (
                        <>
                            <Input
                                type="text"
                                name="name"
                                label="Nome"
                                onChange={(e) => dispatch(updateContentAuth(e))}
                                value={user.name}
                                isRequired={true}
                                className="formInput"
                            />
                            <Input
                                type="text"
                                name="sobrenome"
                                label="Sobrenome"
                                onChange={(e) => dispatch(updateContentAuth(e))}
                                value={user.sobrenome}
                                isRequired={true}
                                className="formInput"
                            />
                            <Input
                                type="text"
                                name="cpf"
                                label="CPF"
                                onChange={(e) => dispatch(updateContentAuth(e))}
                                value={user.cpf}
                                isRequired={true}
                                className="formInput"
                            />
                            <Input
                                type="date"
                                name="dateNascimento"
                                label="Data Nascimento"
                                onChange={(e) => dispatch(updateContentAuth(e))}
                                value={user.dateNascimento}
                                isRequired={true}
                                className="formInput"
                            />
                        </>
                    )}
                    <Input
                        type="text"
                        name="email"
                        label="Email"
                        onChange={(e) => dispatch(updateContentAuth(e))}
                        value={user.email}
                        isRequired={true}
                        className="formInput"
                    />
                    <Input
                        type="password"
                        name="password"
                        label="Senha"
                        onChange={(e) => dispatch(updateContentAuth(e))}
                        value={user.password}
                        isRequired={true}
                        className="formInput"
                    />
                    {isSignup && (
                        <>
                            <Input
                                type="password"
                                name="passwordConfirm"
                                label="Confirmar Senha"
                                onChange={(e) => dispatch(updateContentAuth(e))}
                                value={user.passwordConfirm}
                                isRequired={true}
                                className="formInput"
                            />
                        </>
                    )}
                </form>
                <Button
                    type="submit"
                    name="btnForm"
                    className="btnBlue"
                    text={isSignup ? "Cadastrar" : "Entrar"}
                    onClick={handleSubmit}
                />
                {!isSignup ? (
                    <>
                        <span className='entryWith'>Ou entrar com</span>
                        <GoogleLogin
                            buttonText="Entrar com Google"
                            onSuccess={googleSuccess}
                            onFailure={googleFailure}
                            cookiePolicy="single_host_origin"
                        />
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
            {!isSignup && (
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