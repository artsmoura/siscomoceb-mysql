import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerFormSchema } from "../../../utils/yupSchemas";
import { register } from "../redux/authAction";
import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, IconButton, Input, InputGroup, InputRightElement, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Stack, Switch } from "@chakra-ui/react";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { BsFillQuestionCircleFill } from "react-icons/bs";

const RegisterForm = () => {
    const dispatch = useDispatch()
    const [showPassword, setShowPassword] = useState(false)
    const [autoUsuario, setAutoUsuario] = useState(false)
    const handleAutoUsuario = () => setAutoUsuario(!autoUsuario)
    const seePassword = () => setShowPassword(!showPassword)

    const submit = (values) => {
        dispatch(register({
            ...values,
            usuarioAutomatico: autoUsuario
        }))
    }

    const initialValues = {
        nome: '',
        sobrenome: '',
        usuario: '',
        email: '',
        txt_senha: '',
        txt_usuario: '',
        usuarioAutomatico: ''
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={registerFormSchema}
            onSubmit={(values, action) => {
                action.resetForm()
                dispatch(submit(values))
            }}
        >
            {({ handleSubmit, errors, touched }) => (
                <Stack as={Form} onSubmit={handleSubmit}>
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
                    <Button
                        type='submit'
                        colorScheme='blue'
                    >
                        Cadastrar
                    </Button>
                </Stack>
            )}
        </Formik>
    )
}

export default RegisterForm