import React from 'react';
import * as Yup from 'yup';

export const generalFormSchema = Yup.object().shape({
    tema: Yup.string()
        .min(2, 'Nome muito curto')
        .max(100, 'Nome muito longo')
        .required('Campo Obrigatório'),
    localEvento: Yup.string()
        .min(2, 'Nome muito curto')
        .max(200, 'Nome muito longo')
        .required('Campo Obrigatório'),
    dataHoraInicio: Yup.date()
        .min(new Date(), 'A data de início não pode ser menor que a data e horário atual')
        .required('Campo Obrigatório'),
    dataHoraFim: Yup.date()
        .min(Yup.ref('dataHoraInicio'), 'A data final não pode ser menor que a data de início')
        .required('Campo Obrigatório'),
    dataHoraInicioInscricao: Yup.date()
        .min(new Date(), 'A data de início não pode ser menor que a data e horário atual')
        .required('Campo Obrigatório'),
    dataHoraFimInscricao: Yup.date()
        .min(Yup.ref('dataHoraInicioInscricao'), 'A data final não pode ser menor que a data de início')
        .required('Campo Obrigatório')
});

export const loginFormSchema = Yup.object().shape({
    txt_usuario: Yup.string()
        .required('Campo Obrigatorio'),
    txt_senha: Yup.string()
        .required('Campo Obrigatorio')
})

export const registerFormSchema = Yup.object().shape({
    nome: Yup.string()
        .min(2, 'Nome muito curto')
        .max(50, 'Nome muito longo')
        .required('Campo Obrigatório'),
    sobrenome: Yup.string()
        .min(1, 'Nome muito curto')
        .max(100, 'Nome muito longo')
        .required('Campo Obrigatório'),
    email: Yup.string()
        .email()
        .required('Campo Obrigatório'),
    txt_senha: Yup.string()
        .min(6, 'A senha precisa ter pelo menos 6 caracteres')
        .required('Campo Obrigatório'),
    confirmPassword: Yup.string()
        .required('Campo Obrigatório')
        .oneOf([Yup.ref('txt_senha')], 'As senhas não coincidem'),
    txt_usuario: Yup.string()
        .when(['usuarioAutomatico'],
            (usuarioAutomatico, schema, node) => {
                console.log(usuarioAutomatico)
                console.log(node)
                // if (node.value(usuarioAutomatico))
                //     return this.notRequired()
                // else return this.required()
            }
        ),
    // usuarioAutomatico: Yup.boolean()
    //     .when('txt_usuario', {
    //         is: Yup.ref('txt_usuario') !== '' ? false : true,
    //         then: (schema) => schema.required(),
    //         otherwise: (schema) => schema.notRequired()
    //     }),
})