import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/button';
import './auth.css';
import { authUser, clearAuthFields, login, updateContentAuth, register } from './redux/authAction';
import { GoogleLogin } from 'react-google-login';
import { Box, FormControl, FormLabel, IconButton, Input, InputGroup, InputRightElement, Popover, Stack, Switch, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverHeader, PopoverBody, Flex, FormErrorMessage } from '@chakra-ui/react';
import { Field, Form, Formik } from "formik";
import { IoIosEye, IoIosEyeOff } from 'react-icons/io';
import { BsFillQuestionCircleFill } from 'react-icons/bs';
import { loginFormSchema, registerFormSchema } from '../../utils/yupSchemas';

const Auth = () => {

    const dispatch = useDispatch();
    const user = useSelector((state) => state.authState.user);
    const navigate = useNavigate();

    const [isSignup, setIsSignup] = useState(false);
    const [showPassword, setShowPassword] = useState(false)
    const [autoUsuario, setAutoUsuario] = useState(false)
    const handleAutoUsuario = () => setAutoUsuario(!autoUsuario)
    const seePassword = () => setShowPassword(!showPassword)

    const submit = (value) => {
        if (isSignup) {
            dispatch(register(user));
        } else {
            dispatch(login(value));
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

    const initialValues = isSignup ? {
        nome: '',
        sobrenome: '',
        usuario: '',
        email: '',
        txt_senha: '',
        txt_usuario: '',
        usuarioAutomatico: ''
    } : {
        txt_usuario: '',
        txt_senha: ''
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

                <Formik
                    initialValues={initialValues}
                    validationSchema={!isSignup ? loginFormSchema : registerFormSchema}
                    onSubmit={(values, action) => {
                        action.resetForm();
                        dispatch(submit(values));
                    }}
                >
                    {({ handleSubmit, errors, touched }) => (
                        <Stack as={Form} onSubmit={handleSubmit}>
                            {isSignup === false ?
                                <>
                                    <Box p={3}>
                                        <FormControl variant="floating" isRequired isInvalid={!!errors.txt_usuario && touched.txt_usuario}>
                                            <Field
                                                as={Input}
                                                placeholder=" "
                                                name='txt_usuario'
                                            />
                                            <FormLabel>Email</FormLabel>
                                            <FormErrorMessage>{errors.txt_usuario}</FormErrorMessage>
                                        </FormControl>
                                    </Box>

                                    <Box p={3}>
                                        <FormControl variant="floating" isRequired isInvalid={!!errors.txt_senha && touched.txt_senha}>
                                            <InputGroup size='md'>
                                                <Field
                                                    as={Input}
                                                    placeholder=" "
                                                    name='txt_senha'
                                                    type={showPassword ? 'text' : 'password'}
                                                />
                                                <FormLabel>Senha</FormLabel>
                                                <InputRightElement>
                                                    <IconButton
                                                        aria-label='Mostar Senha'
                                                        icon={showPassword ? <IoIosEyeOff /> : <IoIosEye />}
                                                        onClick={seePassword}
                                                    />
                                                </InputRightElement>
                                            </InputGroup>
                                            <FormErrorMessage>{errors.txt_senha}</FormErrorMessage>
                                        </FormControl>
                                    </Box>
                                </>
                                :
                                <>
                                    <Box p={3}>
                                        <FormControl variant="floating" isRequired isInvalid={!!errors.nome && touched.nome}>
                                            <Field
                                                as={Input}
                                                placeholder=" "
                                                name='nome'
                                            />
                                            <FormLabel>Nome</FormLabel>
                                            <FormErrorMessage>{errors.nome}</FormErrorMessage>
                                        </FormControl>
                                    </Box>
                                    <Box p={3}>
                                        <FormControl variant="floating" isRequired isInvalid={!!errors.sobrenome && touched.sobrenome}>
                                            <Field
                                                as={Input}
                                                placeholder=" "
                                                name='sobrenome'
                                            />
                                            <FormLabel>Sobrenome</FormLabel>
                                            <FormErrorMessage>{errors.sobrenome}</FormErrorMessage>
                                        </FormControl>
                                    </Box>
                                    <Box p={3}>
                                        <FormControl variant="floating" isRequired isInvalid={!!errors.email && touched.email}>
                                            <Field
                                                as={Input}
                                                placeholder=" "
                                                name='email'
                                            />
                                            <FormLabel>Email</FormLabel>
                                            <FormErrorMessage>{errors.email}</FormErrorMessage>
                                        </FormControl>
                                    </Box>
                                    <Box p={3}>
                                        <FormControl variant="floating" isRequired isInvalid={!!errors.txt_senha && touched.txt_senha}>
                                            <InputGroup size='md'>
                                                <Field
                                                    as={Input}
                                                    placeholder=" "
                                                    name='txt_senha'
                                                    type={showPassword ? 'text' : 'password'}
                                                />
                                                <FormLabel>Senha</FormLabel>
                                                <InputRightElement>
                                                    <IconButton
                                                        aria-label='Mostar Senha'
                                                        icon={showPassword ? <IoIosEyeOff /> : <IoIosEye />}
                                                        onClick={seePassword}
                                                    />
                                                </InputRightElement>
                                            </InputGroup>
                                            <FormErrorMessage>{errors.txt_senha}</FormErrorMessage>
                                        </FormControl>
                                    </Box>
                                    <Box p={3}>
                                        <FormControl variant="floating" isRequired isInvalid={!!errors.confirmPassword && touched.confirmPassword}>
                                            <InputGroup size='md'>
                                                <Field
                                                    as={Input}
                                                    placeholder=" "
                                                    name='confirmPassword'
                                                    type={showPassword ? 'text' : 'password'}
                                                />
                                                <FormLabel>Confirmar Senha</FormLabel>
                                                <InputRightElement>
                                                    <IconButton
                                                        aria-label='Mostar Senha'
                                                        icon={showPassword ? <IoIosEyeOff /> : <IoIosEye />}
                                                        onClick={seePassword}
                                                    />
                                                </InputRightElement>
                                            </InputGroup>
                                            <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
                                        </FormControl>
                                    </Box>
                                    <Box p={3}>
                                        <FormControl variant="floating" isRequired isDisabled={autoUsuario}>
                                            <Field
                                                as={Input}
                                                placeholder=" "
                                                name='usuario'
                                            />
                                            <FormLabel>Usuário</FormLabel>
                                        </FormControl>
                                    </Box>
                                    <Box p={3}>
                                        <Flex alignItems='space-arround'>
                                            <FormControl display='flex' alignItems='center'>
                                                <FormLabel htmlFor='usuarioAutomatico' mb='0'>
                                                    Usuário Automatico
                                                </FormLabel>
                                                <Field
                                                    as={Switch}
                                                    id='usuarioAutomatico'
                                                    onChange={handleAutoUsuario}
                                                // value={autoUsuario}
                                                />
                                                <FormErrorMessage>{errors.usuarioAutomatico}</FormErrorMessage>
                                            </FormControl>
                                            <Popover>
                                                <PopoverTrigger>
                                                    <IconButton
                                                        aria-label='Dica usuario automatico'
                                                        icon={<BsFillQuestionCircleFill />}
                                                    />
                                                </PopoverTrigger>
                                                <PopoverContent>
                                                    <PopoverArrow />
                                                    <PopoverCloseButton />
                                                    <PopoverHeader>Usuário Automatico</PopoverHeader>
                                                    <PopoverBody>Ao selecionar a opção de usuário automatico. O sistema define seu usuario com o seu primeiro e ultimo nome separado por um '.' (ponto). <br />ex: nome.sobrenome</PopoverBody>
                                                </PopoverContent>
                                            </Popover>
                                        </Flex>
                                    </Box>
                                </>
                            }
                            <Button
                                type="submit"
                                name="btnForm"
                                className="btnBlue"
                                text={isSignup ? "Cadastrar" : "Entrar"}
                            />
                        </Stack>
                    )}
                </Formik>

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