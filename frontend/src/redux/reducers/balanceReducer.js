import * as actionTypes from "../action";

const initialState = {
  memeBalance: "0.000",
  supplyBalance: "0.000",
  harvestBalance: 0,
  totalRewards: 0,
  boxInfo: false,
  pendingMfrm: "0.000",
};

const balanceReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.MEME_BALANCE:
      return { ...state, memeBalance: action.payload };
    case actionTypes.SUPPLY_BALANCE:
      return { ...state, supplyBalance: action.payload };
    case actionTypes.TOTAL_REWARDS:
      return { ...state, totalRewards: action.payload };
    case actionTypes.HARVEST_BALANCE:
      return { ...state, harvestBalance: action.payload };
    case actionTypes.BOX_INFO:
      return { ...state, boxInfo: action.payload };
    case actionTypes.PENDING_MFRM:
      return { ...state, pendingMfrm: action.payload };
    default:
      return state;
  }
};

export default balanceReducer;
