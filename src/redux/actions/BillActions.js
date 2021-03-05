import { ACTION_TYPES } from "./ActionTypes";

export const addBill = (body) => (dispatch) => {
    dispatch({
        type: ACTION_TYPES.ADD_BILL,
        payload: body
    });
}
export const editBill = (body) => (dispatch) => {
    dispatch({
        type: ACTION_TYPES.EDIT_BILL,
        payload: body
    });
}

export const deleteBill = (id) => (dispatch) => {
    dispatch({
        type: ACTION_TYPES.DELETE_BILL,
        payload: id
    });
}