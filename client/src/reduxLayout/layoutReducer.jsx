import { SET_TYPE_MODAL } from "./layoutAction";

const inicialState = {
    modal: ''
};

export default (state = inicialState, action) => {
    switch (action.type) {
        case SET_TYPE_MODAL:
            return {
                ...state,
                modal: action.payload
            };
        default:
            return state;
    }
};