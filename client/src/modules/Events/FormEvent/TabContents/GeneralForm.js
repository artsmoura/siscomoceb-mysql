import { Box, Button, FormControl, FormErrorMessage, FormLabel, Input, Stack, Textarea } from '@chakra-ui/react';
import React from 'react';
import { Field, Form, Formik } from "formik";
import { useDispatch } from 'react-redux';
import { createEvent } from '../../redux/eventsAction';

import { generalFormSchema } from '../../../../utils/yupSchemas';

const GeneralForm = () => {

    const dispatch = useDispatch();

    const initialValues = {
        tema: '',
        localEvento: '',
        descricaoEvento: '',
        programacao: '',
        dataHoraInicio: '',
        dataHoraFim: '',
        dataHoraInicioInscricao: '',
        dataHoraFimInscricao: ''
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={generalFormSchema}
            onSubmit={(values, action) => {
                action.resetForm();
                dispatch(createEvent(values));
            }}
        >
            {({ handleSubmit, errors, touched }) => (
                <Stack as={Form} onSubmit={handleSubmit}>
                    <Box p={3}>
                        <FormControl variant="floating" isRequired isInvalid={!!errors.tema && touched.tema}>
                            <Field
                                as={Input}
                                placeholder=" "
                                name='tema'
                            />
                            <FormLabel>Nome do Evento</FormLabel>
                            <FormErrorMessage>{errors.tema}</FormErrorMessage>
                        </FormControl>
                    </Box>

                    <Box p={3}>
                        <FormControl variant="floating" isRequired isInvalid={!!errors.localEvento && touched.localEvento}>
                            <Field
                                as={Input}
                                placeholder=" "
                                name='localEvento'
                            />
                            <FormLabel>Local do Evento</FormLabel>
                            <FormErrorMessage>{errors.localEvento}</FormErrorMessage>
                        </FormControl>
                    </Box>

                    <Box p={3}>
                        <FormControl variant="floating" isInvalid={!!errors.descricaoEvento && touched.descricaoEvento}>
                            <Field
                                as={Textarea}
                                placeholder=" "
                                name='descricaoEvento'
                            />
                            <FormLabel>Descrição do Evento</FormLabel>
                            <FormErrorMessage>{errors.descricaoEvento}</FormErrorMessage>
                        </FormControl>
                    </Box>

                    <Box p={3}>
                        <FormControl variant="floating" isInvalid={!!errors.programacao && touched.programacao}>
                            <Field
                                as={Textarea}
                                placeholder=" "
                                name='programacao'
                            />
                            <FormLabel>Programação do Evento</FormLabel>
                            <FormErrorMessage>{errors.programacao}</FormErrorMessage>
                        </FormControl>
                    </Box>

                    <Stack direction={'row'} justify='space-between'>
                        <Box p={3} w='100%'>
                            <FormControl variant="floating" isRequired isInvalid={!!errors.dataHoraInicio && touched.dataHoraInicio}>
                                <Field
                                    as={Input}
                                    placeholder=" "
                                    name='dataHoraInicio'
                                    type='datetime-local'
                                />
                                <FormLabel>Data Início do Evento</FormLabel>
                                <FormErrorMessage>{errors.dataHoraInicio}</FormErrorMessage>
                            </FormControl>
                        </Box>

                        <Box p={3} w='100%'>
                            <FormControl variant="floating" isRequired isInvalid={!!errors.dataHoraFim && touched.dataHoraFim}>
                                <Field
                                    as={Input}
                                    placeholder=" "
                                    name='dataHoraFim'
                                    type='datetime-local'
                                />
                                <FormLabel>Data Final do Evento</FormLabel>
                                <FormErrorMessage>{errors.dataHoraFim}</FormErrorMessage>
                            </FormControl>
                        </Box>
                    </Stack>

                    <Stack direction={'row'} justify='space-between'>
                        <Box p={3} w='100%'>
                            <FormControl variant="floating" isRequired isInvalid={!!errors.dataHoraInicioInscricao && touched.dataHoraInicioInscricao}>
                                <Field
                                    as={Input}
                                    placeholder=" "
                                    name='dataHoraInicioInscricao'
                                    type='datetime-local'
                                />
                                <FormLabel>Data Início das Inscrições</FormLabel>
                                <FormErrorMessage>{errors.dataHoraInicioInscricao}</FormErrorMessage>
                            </FormControl>
                        </Box>

                        <Box p={3} w='100%'>
                            <FormControl variant="floating" isRequired isInvalid={!!errors.dataHoraFimInscricao && touched.dataHoraFimInscricao}>
                                <Field
                                    as={Input}
                                    placeholder=" "
                                    name='dataHoraFimInscricao'
                                    type='datetime-local'
                                />
                                <FormLabel>Data Final das Inscrições</FormLabel>
                                <FormErrorMessage>{errors.dataHoraFimInscricao}</FormErrorMessage>
                            </FormControl>
                        </Box>
                    </Stack>
                    <Button
                        type='submit'
                        colorScheme='blue'
                    >
                        Salvar
                    </Button>
                </Stack>
            )}
        </Formik>
    );
};

export default GeneralForm;