import {
  SAVE_SELECTED_FEED_POST,
  UPDATE_CHANGED_TEXT,
  REMOVE_SELECTED_FEED_POST
} from "../actions"

const initialState = {
  selectedPost: {}
}

const selectedFeedPostReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_SELECTED_FEED_POST:
      return {
        ...state,
        selectedPost: action.payload
      }

    case REMOVE_SELECTED_FEED_POST:
      return {
        ...state,
        selectedPost: {}
      }

    case UPDATE_CHANGED_TEXT:
      return {
        ...state,
        selectedPost: { ...state.selectedPost, text: action.payload }
      }

    default:
      return state
  }
}

export default selectedFeedPostReducer
