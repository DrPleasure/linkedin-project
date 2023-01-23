import { GET_FEED_POSTS } from "../actions"

const initialState = {
  feedPostArray: []
}

const getFeedPostsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FEED_POSTS:
      return {
        ...state,
        feedPostArray: action.payload
      }
    default:
      return state
  }
}

export default getFeedPostsReducer
