import {
  GET_IS_FETCHED,
  GET_MY_PROFILEDETAILS,
  CHANGE_PROFILE_DETAILS,
} from "../actions";

const initialState = {
  detailsData: [],
  isFetched: false,
};

const myProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MY_PROFILEDETAILS:
      return {
        ...state,
        detailsData: action.payload,
      };
    case GET_IS_FETCHED:
      return {
        ...state,
        isFetched: action.payload,
      };
    case CHANGE_PROFILE_DETAILS:
      return {
        ...state,
        detailsData: action.payload,
      };

    default:
      return state;
  }
};

export default myProfileReducer;
