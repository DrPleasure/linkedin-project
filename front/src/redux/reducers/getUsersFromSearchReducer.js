import { USER_SEARCH_SUBMITTED } from "../actions";

const initialState = {
  searchResults: [],
};

const getUsersFromSearchReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_SEARCH_SUBMITTED:
      return {
        ...state,
        searchResults: action.payload,
      };
    default:
      return state;
  }
};

export default getUsersFromSearchReducer;
