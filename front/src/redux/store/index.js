import { configureStore, combineReducers } from "@reduxjs/toolkit";
import displayUserSearchReducer from "../reducers/displayUserSearchReducer";
import expandMesengerReducer from "../reducers/expandMessengerReducer";
import getUserReducer from "../reducers/getUserReducer";
import getUsersFromSearchReducer from "../reducers/getUsersFromSearchReducer";
import experiencesReducer from "../reducers/experiencesReducer";
import myProfileReducer from "../reducers/myProfileReducer";
import setOtherUserReducer from "../reducers/setOtherUserReducer";
import addPostModalReducer from "../reducers/addPostModalReducer";
import getFeedPostsReducer from "../reducers/getFeedPostsReducer";
import selectedFeedPostReducer from "../reducers/selectedFeedPostReducer";
import editFeedPostModalReducer from "../reducers/editFeedPostModalReducer";
import localStorage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

// configureStore will set up the Redux Store for us!

const persistConfig = {
  key: "root",
  storage: localStorage,
};

const bigReducer = combineReducers({
  // cart: cartReducer,
  users: getUserReducer,
  usersFromSearchFilter: getUsersFromSearchReducer,
  showUsers: displayUserSearchReducer,
  messenger: expandMesengerReducer,
  experiences: experiencesReducer,
  myProfile: myProfileReducer,
  otherUser: setOtherUserReducer,

  showPostModal: addPostModalReducer,
  feedPosts: getFeedPostsReducer,
  editThisPost: selectedFeedPostReducer,
  editPostModal: editFeedPostModalReducer,
});

const persistedReducer = persistReducer(persistConfig, bigReducer);

export const store = configureStore({
  reducer: persistedReducer, // here there's place for just 1 value!
});

export const persistor = persistStore(store);

// now the store is ready! let's INJECT IT into our REACT APP!
// we do it in the src/index.js file
