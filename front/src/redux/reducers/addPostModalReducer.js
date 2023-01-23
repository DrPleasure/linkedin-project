import { HIDE_WRITE_A_POST, SHOW_WRITE_A_POST } from "../actions"

const initialState = {
  show: false
}

const addPostModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_WRITE_A_POST:
      return {
        ...state,
        show: true
      }
    case HIDE_WRITE_A_POST:
      return {
        ...state,
        show: false
      }
    default:
      return state
  }
}

export default addPostModalReducer
