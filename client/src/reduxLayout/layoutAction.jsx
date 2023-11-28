export const SET_TYPE_MODAL = "SET_TYPE_MODAL";

export const setTypeModal = e => async (dispatch) => {
    dispatch({
        type: SET_TYPE_MODAL,
        payload: e
    });
};

export const closeModal = () => setTypeModal('');