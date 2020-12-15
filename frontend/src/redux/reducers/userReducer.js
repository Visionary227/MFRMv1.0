import * as actionTypes from "../action";

const initialState = {
    name: "",
};
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.MEME_BALANCE:
            return { ...state, user: action.payload };
        default:
            return state;
    }
};
export default userReducer;
