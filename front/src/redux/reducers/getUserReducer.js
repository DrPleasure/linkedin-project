import { GET_USERS } from "../actions"

const initialState = {
  usersFromFetch: []
}

const getUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        usersFromFetch: action.payload
      }

    default:
      return state
  }
}

export default getUserReducer
