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