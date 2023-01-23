import { SHOW_SEARCH_RESULTS, HIDE_SEARCH_RESULTS } from "../actions"

const initialState = {
  show: false
}

const displayUserSearchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_SEARCH_RESULTS:
      return {
        ...state,
        show: true
      }
    case HIDE_SEARCH_RESULTS:
      return {
        ...state,
        show: false
      }
    default:
      return state
  }
}
export default displayUserSearchReducer
