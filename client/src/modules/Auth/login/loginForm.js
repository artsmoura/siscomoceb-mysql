import { Field, Formik } from "formik";
import React from "react";
import { loginFormSchema } from "../../../utils/yupSchemas";
import { useDispatch } from "react-redux";
import { login } from "../redux/authAction";
import { Box, FormControl, FormErrorMessage, FormLabel, IconButton, Input, Stack } from "@chakra-ui/react";

const loginForm = () => {

    const dispatch = useDispatch()

    const [showPassword, setShowPassword] = useState(false)
    const seePassword = () => setShowPassword(!showPassword)

    const submit = (value) => {
        dispatch(login(value))
    }

    const initialValues = {
        txt_usuario: '',
        txt_senha: ''
    };


    <Formik
        initialValues={initialValues}
        validationSchema={loginFormSchema}
        onSubmit={(values, action) => {
            action.resetForm();
            dispatch(submit(values));
        }}
    >
        {({ handleSubmit, errors, touched }) => (
            <Stack as={Form} onSubmit={handleSubmit}>
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
                <Button
                    type="submit"
                    name="btnForm"
                    className="btnBlue"
                    text={"Cadastrar"}
                />
            </Stack>
        )}
    </Formik>
}

export default loginForm