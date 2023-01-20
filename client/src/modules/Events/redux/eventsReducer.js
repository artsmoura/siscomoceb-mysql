import { CLEAR_FORM_INPUT, EVENTS_CREATE_SUCCESS, EVENTS_LOAD_SUCCESS, EVENT_LOAD_SUCCESS, UPDATE_ACCOMMODATION, UPDATE_CONTENT_EVENT } from './eventsAction';

const eventoInicialState = {
    nomeEvento: '',
    descricaoEvento: '',
    tema: '',
    localEvento: '',
    image: '',
    dataHoraInicio: '',
    dataHoraFim: '',
    dateStartSub: '',
    dateEndSub: '',
    programacao: '',
    dataHoraInicioInscricao: '',
    dataHoraFimInscricao: '',
    idadeMinima: ''
};

const inicialState = {
    events: [],
    event: eventoInicialState,
};

export default (state = inicialState, action) => {
    switch (action.type) {
        case EVENTS_LOAD_SUCCESS:
            return {
                ...state,
                events: action.payload
            };
        case EVENTS_CREATE_SUCCESS:
            return {
                ...state,
                events: [
                    ...state.evetos,
                    action.payload
                ]
            };
        case UPDATE_CONTENT_EVENT:
            if (action.payload.target.type === 'checkbox') {
                return {
                    ...state,
                    event: {
                        ...state.event,
                        accommodation: [
                            ...state.event.accommodation.map((item) => item.name === action.payload.target.name ?
                                {
                                    ...item,
                                    checked: action.payload.target.checked,
                                    valor: action.payload.target.checked === true ? state.event.accommodation.valor : ''
                                } : item
                            )
                        ]
                    }
                };
            }
            else {
                return {
                    ...state,
                    event: {
                        ...state.event,
                        [action.payload.target.name]: action.payload.target.value
                    }
                };
            }
        case UPDATE_ACCOMMODATION:
            return {
                ...state,
                event: {
                    ...state.event,
                    accommodation: [
                        ...state.event.accommodation.map((item) => item.name === action.payload.target.name.replace('valor ', '') ?
                            { ...item, valor: action.payload.target.value } : item
                        )
                    ]
                }
            };
        case EVENT_LOAD_SUCCESS:
            console.log('entrou??');
            return {
                ...state,
                event: action.payload
            };
        case CLEAR_FORM_INPUT:
            return inicialState;
        default:
            return state;
    }
};

