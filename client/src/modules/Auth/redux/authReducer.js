import { AUTH_USER, CLEAR_AUTH_FIELDS, CONSULT_CEP_SUCCESS, LIST_CITY_SUCCESS, LIST_STATE_SUCCESS, LOGOUT, UPDATE_CONTENT_AUTH } from "./authAction";

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

const userLocalStorage = JSON.parse(localStorage.getItem('profile'));
const profileData = userLocalStorage ? userLocalStorage.result : {};

const inicialState = {
    user: Object.assign(
        {},
        userInicialState,
        ...Object.keys(userInicialState).map(keys => keys in profileData && { [keys]: profileData[keys] })
    ),
    states: [],
    cities: []
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
        case AUTH_USER:
            localStorage.setItem('profile', JSON.stringify({ ...action.payload }));
            return {
                ...state,
                userData: [action.payload?.result]
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
                user: {
                    ...state.user,
                    state: action.payload.state,
                    city: action.payload.city,
                    address: action.payload.street + ' ' + action.payload.neighborhood,
                }
            };
        default:
            return state;
    }
};