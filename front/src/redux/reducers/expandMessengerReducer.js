import { EXPAND_MESSENGER, COLLAPSE_MESSENGER } from "../actions"

const initialState = {
  showMessages: false
}

const expandMesengerReducer = (state = initialState, action) => {
  switch (action.type) {
    case EXPAND_MESSENGER:
      return {
        ...state,
        showMessages: true
      }

    case COLLAPSE_MESSENGER:
      return {
        ...state,
        showMessages: false
      }

    default:
      return state
  }
}

export default expandMesengerReducer
