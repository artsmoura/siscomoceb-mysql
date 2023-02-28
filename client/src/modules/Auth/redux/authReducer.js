import { AUTH_USER, CLEAR_AUTH_FIELDS, CONSULT_CEP_SUCCESS, GET_USER_DATA_SUCCESS, LIST_CITY_SUCCESS, LIST_STATE_SUCCESS, LOGOUT, UPDATE_CONTENT_AUTH, UPDATE_CONTENT_USER_DATA } from "./authAction";

const userInicialState = {
    name: '',
    sobrenome: '',
    email: '',
    cpf: '',
    dateNascimento: '',
    password: '',
    passwordConfirm: '',
    sexo: '',
    phone: '',
    civilState: '',
    state: '',
    cep: '',
    city: '',
    address: ''
};

const userLocalStorage = localStorage.getItem('profile') ? JSON.parse(localStorage.getItem('profile')) : [];

const inicialState = {
    user: userLocalStorage,
    states: [],
    cities: [],
    userData: []
};

export default (state = inicialState, action) => {
    switch (action.type) {
        case UPDATE_CONTENT_AUTH:
            return {
                ...state,
                user: {
                    ...state.user,
                    [action.payload.target.name]: action.payload.target.value
                }
            };
        case UPDATE_CONTENT_USER_DATA:
            return {
                ...state,
                userData: {
                    ...state.userData,
                    [action.payload.target.name]: action.payload.target.value
                }
            };
        case AUTH_USER:
            localStorage.setItem('profile', JSON.stringify({ ...action.payload }));
            return {
                ...state,
                user: action.payload
            };
        case CLEAR_AUTH_FIELDS:
            return {
                ...state,
                user: userInicialState
            };
        case LOGOUT:
            localStorage.clear();
            return {
                ...state,
                user: userInicialState
            };
        case LIST_STATE_SUCCESS:
            return {
                ...state,
                states: action.payload.map(state => ({
                    id: state.id,
                    name: state.nome
                }))
            };
        case LIST_CITY_SUCCESS:
            return {
                ...state,
                cities: action.payload
            };
        case CONSULT_CEP_SUCCESS:
            return {
                ...state,
                userData: {
                    ...state.userData,
                    state: action.payload.state,
                    city: action.payload.city,
                    address: action.payload.street + ' ' + action.payload.neighborhood,
                }
            };
        case GET_USER_DATA_SUCCESS:
            return {
                ...state,
                userData: action.payload
            };
        default:
            return state;
    }
};