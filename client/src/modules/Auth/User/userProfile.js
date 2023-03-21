import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Selectbox from '../../../components/Selectbox/selectbox';
import { consultCEP, getUser, listCity, listState, updateUserData } from '../redux/authAction';
import File64 from '../../../components/File64/file64';
import { BiCamera } from 'react-icons/bi';
import './user.css';
import { Box, FormControl, FormErrorMessage, FormLabel, Heading, HStack, Input, Select, Stack, Button, ButtonGroup } from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { adjustDate } from '../../../utils';

const UserProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const authState = useSelector((state) => state.authState.user);
    const user = useSelector((state) => state.authState.userData);

    useEffect(() => {
        dispatch(getUser(authState.cod_usuario));
    }, []);

    const handleSelect = (e) => {
        dispatch(updateUserData({
            ...e,
            value: e.target.value.value
        }));
    };

    const optionGender = [
        {
            id: 1,
            name: 'Masculino',
            value: 'masculino'
        },
        {
            id: 0,
            name: 'Feminino',
            value: 'feminino'
        }
    ];

    const optionCivilState = [
        {
            id: 1,
            name: "Casado",
            value: "casado"
        },
        {
            id: 2,
            name: "Solteiro",
            value: "solteiro"
        },
        {
            id: 3,
            name: "Divorciado",
            value: "divorciado"
        },
        {
            id: 4,
            name: "Viúvo",
            value: "viuvo"
        }
    ];

    const initialUserValues = {
        txt_nome_completo: user.txt_nome_completo ? user.txt_nome_completo : '',
        email: authState.txt_email_usuario ? authState.txt_email_usuario : '',
        txt_cpf: user.txt_cpf ? user.txt_cpf : '',
        dte_nascimento: user.dte_nascimento ? adjustDate(user.dte_nascimento, 'dte_nascimento') : '',
        txt_celular: user.txt_celular ? user.txt_celular : '',
        cep: user.cep ? user.cep : '',
        dsc_estado_civil: user.dsc_estado_civil ? user.dsc_estado_civil : '',
        bln_sexo: user.bln_sexo ? user.bln_sexo : ''
    };

    return (
        <HStack bg={'white'} w={'1100px'}>
            <Box
                w='180px'
                h='180px'
                position={'relative'}
                padding={'110px'}
                alignSelf={'start'}
            >
                <File64
                    label={<BiCamera />}
                    className={'inputFileProfile'}
                    action={updateUserData}
                    alt={'imagem perfil'}
                    text={"Alterar Imagem Perfil"}
                />
            </Box>

            <Formik
                initialValues={initialUserValues}
                validationSchema={''}
                onSubmit={(values, action) => {
                    action.resetForm();

                }}
            >
                {({ handleSubmit, errors, touched, values }) => (
                    <Stack as={Form} w={'80%'} onSubmit={handleSubmit}>
                        <Box p={3}>
                            <FormControl variant="floating" isRequired isInvalid={!!errors.tema && touched.tema}>
                                <Field
                                    as={Input}
                                    placeholder=" "
                                    name='txt_nome_completo'
                                />
                                <FormLabel>Nome Completo</FormLabel>
                                <FormErrorMessage>{errors.tema}</FormErrorMessage>
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
                            <FormControl variant="floating" isRequired isInvalid={!!errors.txt_cpf && touched.txt_cpf}>
                                <Field
                                    as={Input}
                                    placeholder=" "
                                    name='txt_cpf'
                                />
                                <FormLabel>CPF</FormLabel>
                                <FormErrorMessage>{errors.txt_cpf}</FormErrorMessage>
                            </FormControl>
                        </Box>

                        <Box p={3}>
                            <FormControl variant="floating" isRequired isInvalid={!!errors.dte_nascimento && touched.dte_nascimento}>
                                <Field
                                    as={Input}
                                    placeholder=" "
                                    name='dte_nascimento'
                                    type='date'
                                />
                                <FormLabel>Data Nascimento</FormLabel>
                                <FormErrorMessage>{errors.dte_nascimento}</FormErrorMessage>
                            </FormControl>
                        </Box>

                        <Box p={3}>
                            <FormControl variant="floating" isRequired isInvalid={!!errors.txt_celular && touched.txt_celular}>
                                <Field
                                    as={Input}
                                    placeholder=" "
                                    name='txt_celular'
                                />
                                <FormLabel>Celular</FormLabel>
                                <FormErrorMessage>{errors.txt_celular}</FormErrorMessage>
                            </FormControl>
                        </Box>
                        <Box p={3}>
                            <FormControl variant="floating" isRequired isInvalid={!!errors.txt_celular && touched.txt_celular}>
                                <Field
                                    as={Select}
                                    placeholder={values.dsc_estado_civil}
                                    name='dsc_estado_civil'
                                >
                                    {optionCivilState.map(civilState => (
                                        <option key={civilState.id} value={civilState.value}>{civilState.name}</option>
                                    ))}
                                </Field>
                                <FormLabel>Estado Civil</FormLabel>
                                <FormErrorMessage>{errors.txt_celular}</FormErrorMessage>
                            </FormControl>
                        </Box>
                        <Box p={3}>
                            <FormControl variant="floating" isRequired isInvalid={!!errors.txt_celular && touched.txt_celular}>
                                <Field
                                    as={Select}
                                    placeholder={optionGender.find(value => value.id === values.bln_sexo)}
                                    name='bln_sexo'
                                >
                                    {optionGender.map(gender => (
                                        <option key={gender.id} value={gender.id}>{gender.name}</option>
                                    ))}
                                </Field>
                                <FormLabel>Sexo</FormLabel>
                                <FormErrorMessage>{errors.txt_celular}</FormErrorMessage>
                            </FormControl>
                        </Box>
                        <ButtonGroup justifyContent={'center'} padding={2}>
                            <Button
                                colorScheme='blue'
                                onClick={() => navigate('/')}
                            >
                                Cancelar
                            </Button>
                            <Button
                                type='submit'
                                colorScheme='blue'
                            >
                                Salvar
                            </Button>
                        </ButtonGroup>
                    </Stack>
                )}
            </Formik>
        </HStack >
    );
};

export default UserProfile;