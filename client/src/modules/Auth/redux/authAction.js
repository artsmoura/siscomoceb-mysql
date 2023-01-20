import axios from 'axios';
import * as api from '../../../api/index.js';

export const UPDATE_CONTENT_AUTH = "UPDATE_CONTENT_AUTH";
export const AUTH_USER = "AUTH_USER";
export const CLEAR_AUTH_FIELDS = "CLEAR_AUTH_FIELDS";
export const LOGOUT = "LOGOUT";
export const LIST_STATE_SUCCESS = "LIST_STATE_SUCCESS";
export const LIST_CITY_SUCCESS = "LIST_CITY_SUCCESS";
export const CONSULT_CEP_SUCCESS = "CONSULT_CEP_SUCCESS";

export const updateContentAuth = e => async (dispatch) => {
    dispatch({
        type: UPDATE_CONTENT_AUTH,
        payload: e
    });
};

export const authUser = (user) => async (dispatch) => {
    dispatch({
        type: AUTH_USER,
        payload: user
    });
};

export const clearAuthFields = () => ({
    type: CLEAR_AUTH_FIELDS
});

export const logout = () => ({
    type: LOGOUT
});

export const register = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.registerUser(formData);
        dispatch(authUser(data));
        navigate('/');

    } catch (error) {
        console.log(error.message);
    }
};

export const login = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.loginUser(formData);
        dispatch(authUser(data));
        navigate('/');
    } catch (error) {
        console.log(error.message);
    }
};

const listStateSuccess = (states) => async (dispatch) => {
    dispatch({
        type: LIST_STATE_SUCCESS,
        payload: states
    });
};

export const listState = () => async (dispatch) => {
    try {
        const { data } = await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
        dispatch(listStateSuccess(data));
    } catch (error) {
        console.log(error.message);
    }
};

const listCitySuccess = (city) => async (dispatch) => {
    dispatch({
        type: LIST_CITY_SUCCESS,
        payload: city
    });
};

export const listCity = (state) => async (dispatch) => {
    try {
        const { data } = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state.id}/distritos`);
        dispatch(listCitySuccess(data));
    } catch (error) {
        console.log(error.message);
    }
};

const consultCEPSuccess = (cep) => async (dispatch) => {
    dispatch({
        type: CONSULT_CEP_SUCCESS,
        payload: cep
    });
};

export const consultCEP = (cep) => async (dispatch) => {
    const cepClear = cep.replace(/\D/g, '');
    try {
        const { data } = await axios.get(`https://brasilapi.com.br/api/cep/v2/${cepClear}`);
        dispatch(consultCEPSuccess(data));
    } catch (error) {
        console.log(error.message);
    }
};