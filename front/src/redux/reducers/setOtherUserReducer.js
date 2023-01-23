import { OTHER_USER_SELECTED, GET_CURRENT_USER_DATA } from "../actions";

const initialState = {
  selectedUser: {},
  currentUserDetails: {},
};

const setOtherUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CURRENT_USER_DATA:
      return {
        ...state,
        currentUserDetails: action.payload,
      };
    case OTHER_USER_SELECTED:
      return {
        ...state,
        selectedUser: action.payload,
      };

    default:
      return state;
  }
};

export default setOtherUserReducer;
