import userReducer from "./userReducer";
import balanceReducer from "./balanceReducer";

const { combineReducers } = require("redux");

export const rootReducer = combineReducers({
    userInfo: userReducer,
    balanceInfo: balanceReducer,
});
