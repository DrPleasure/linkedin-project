export const UPDATE_STATE_OF_EXPERIENCES = "UPDATE_STATE_OF_EXPERIENCES"
export const GET_USERS = "GET_USERS"
export const USER_SEARCH_SUBMITTED = "USER_SEARCH_SUBMITTED"
export const SHOW_SEARCH_RESULTS = "SHOW_SEARCH_RESULTS"
export const HIDE_SEARCH_RESULTS = "HIDE_SEARCH_RESULTS"
export const EXPAND_MESSENGER = "EXPAND_MESSENGER"
export const COLLAPSE_MESSENGER = "COLLAPSE_MESSENGER"
export const GET_EXPERIENCES = "GET_EXPERIENCES"
export const GET_MY_PROFILEDETAILS = "GET_MY_PROFILEDETAILS"
export const GET_IS_FETCHED = "GET_IS_FETCHED"
export const CHANGE_PROFILE_DETAILS = "CHANGE_PROFILE_DETAILS"
export const OTHER_USER_SELECTED = "OTHER_USER_SELECTED"
export const DELETE_EXPERIENCE = "DELETE_EXPERIENCE"
export const GET_SELECTEDEXP = "GET_SELECTEDEXP"
export const EDIT_SINGLE_EXPERIENCE = "EDIT_SINGLE_EXPERIENCE"
export const SHOW_WRITE_A_POST = "SHOW_WRITE_A_POST"
export const HIDE_WRITE_A_POST = "HIDE_WRITE_A_POST"
export const GET_FEED_POSTS = " GET_FEED_POSTS"
export const ADD_NEW_FEED_POST = "ADD_NEW_FEED_POST"
export const SAVE_SELECTED_FEED_POST = "SAVE_SELECTED_FEED_POST"
export const REMOVE_SELECTED_FEED_POST = "REMOVE_SELECTED_FEED_POST"

export const SHOW_EDIT_POST_MODAL = "SHOW_EDIT_POST_MODAL"
export const HIDE_EDIT_POST_MODAL = "HIDE_EDIT_POST_MODAL"
export const UPDATE_CHANGED_TEXT = "UPDATE_CHANGED_TEXT"
export const SHOW_EDIT_DROPDOWN = "SHOW_EDIT_DROPDOWN"
export const HIDE_EDIT_DROPDOWN = "HIDE_EDIT_DROPDOWN"
export const GET_CURRENT_USER_DATA = "GET_CURRENT_USER_DATA"
export const SHOW_DELETE_MODAL = "SHOW_DELETE_MODAL"
export const HIDE_DELETE_MODAL = "HIDE_DELETE_MODAL"

//constants to use for fetching data

const baseEndPoint = "https://striveschool-api.herokuapp.com/api/profile/"

const options = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mzk2ZjAxM2M5NmRmYjAwMTUyMWE1YmEiLCJpYXQiOjE2NzA4MzYyNDMsImV4cCI6MTY3MjA0NTg0M30.y7kED45MhN6V7jWF7PwyZ4DryRe6OJ6b9-so68M-zaE",
    "Content-Type": "application/json"
  }
}

// action to get the info of users from the api

export const getUsersAction = () => {
  return async (dispatch) => {
    console.log("----------------fetching Users---------------------")

    try {
      let resp = await fetch(baseEndPoint, options)
      if (resp.ok) {
        let data = await resp.json()
        let fetchedUsers = data

        console.log("Users are ->", fetchedUsers)
        dispatch({
          type: GET_USERS,
          payload: fetchedUsers
        })
      } else {
        console.log("error")
      }
    } catch (error) {
      console.log(error)
    }
  }
}

// action for the user search

export const sendUserSearchAction = (filteredUsers) => {
  return {
    type: "USER_SEARCH_SUBMITTED",
    payload: filteredUsers
  }
}

// action to make the user search results display

export const showUserSearchAction = () => {
  return {
    type: "SHOW_SEARCH_RESULTS"
  }
}

//action to his the user search results display

export const hideUserSearchAction = () => {
  return {
    type: "HIDE_SEARCH_RESULTS"
  }
}

// action to expand and collapse the messenger

//action for getting the experiences

export const getExperiencesAction = (userId) => {
  const experiencesUrl = `https://striveschool-api.herokuapp.com/api/profile/${userId}/experiences`
  const getOptions = {
    method: "GET",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mzk2ZjAxM2M5NmRmYjAwMTUyMWE1YmEiLCJpYXQiOjE2NzA4MzYyNDMsImV4cCI6MTY3MjA0NTg0M30.y7kED45MhN6V7jWF7PwyZ4DryRe6OJ6b9-so68M-zaE"
    }
  }
  return async (dispatch) => {
    try {
      let response = await fetch(experiencesUrl, getOptions)
      if (response.ok) {
        let data = await response.json()
        dispatch({
          type: GET_EXPERIENCES,
          payload: data
        })
      } else {
        console.log("en error occured while fetching the experiences")
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const expandMessengerAction = () => {
  return {
    type: "EXPAND_MESSENGER"
  }
}

export const collapseMessengerAction = () => {
  return {
    type: "COLLAPSE_MESSENGER"
  }
}

// get My Profile Details Fetching Action

const baseUrlMe = "https://striveschool-api.herokuapp.com/api/profile/me"

export const getMyProfileDetailsAction = () => {
  return async (dispatch) => {
    console.log(
      "----------------fetching My Profile Details---------------------"
    )

    try {
      let response = await fetch(baseUrlMe, options)
      if (response.ok) {
        let data = await response.json()
        let myProfileDetailsData = data

        console.log("My Profile Details are ->", myProfileDetailsData)
        dispatch({
          type: GET_MY_PROFILEDETAILS,
          payload: myProfileDetailsData
        })
        dispatch({
          type: GET_IS_FETCHED,
          payload: true
        })
      } else {
        console.log("error fetching data")
      }
    } catch (error) {
      console.log(error)
    }
  }
}

// Change Profile Details Fetching Action

export const changeProfileDetailsAction = (details) => {
  console.log("🚀 changeProfileDetailsAction ~ details", details)

  return async (dispatch) => {
    const optionsPut = {
      method: "PUT",
      body: JSON.stringify(details),
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mzk2ZjAxM2M5NmRmYjAwMTUyMWE1YmEiLCJpYXQiOjE2NzA4MzYyNDMsImV4cCI6MTY3MjA0NTg0M30.y7kED45MhN6V7jWF7PwyZ4DryRe6OJ6b9-so68M-zaE",
        "Content-Type": "application/json"
      }
    }
    console.log("----------------CHANGING My Profile Details------------------")

    try {
      let response = await fetch(baseEndPoint, optionsPut)
      if (response.ok) {
        console.log("Profile Details sucessfully updated ->", response)
      } else {
        console.log("Error changing profile details")
      }
    } catch (error) {
      console.log("🚀 error", error)
    }
  }
}

// change state of selected user to get their profile

//POST method for experience modal

export const addExperienceAction = (experience, userId) => {
  const postUrl = `https://striveschool-api.herokuapp.com/api/profile/:${userId}/experiences`
  return async (dispatch) => {
    const optionsPost = {
      method: "POST",
      body: JSON.stringify(experience),
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mzk2ZjAxM2M5NmRmYjAwMTUyMWE1YmEiLCJpYXQiOjE2NzA4MzYyNDMsImV4cCI6MTY3MjA0NTg0M30.y7kED45MhN6V7jWF7PwyZ4DryRe6OJ6b9-so68M-zaE",
        "Content-Type": "application/json"
      }
    }

    try {
      const response = await fetch(postUrl, optionsPost)
      if (response.ok) {
        dispatch({
          type: UPDATE_STATE_OF_EXPERIENCES,
          payload: true
        })
      } else {
        console.log(
          "sorry, an error occured while trying to add a new experience"
        )
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const otherUserProfileAction = (user) => {
  return {
    type: "OTHER_USER_SELECTED",
    payload: user
  }
}

//DELETE experience action

export const deleteExperienceAction = (userId, expId) => {
  const deleteExperienceUrl = `https://striveschool-api.herokuapp.com/api/profile/${userId}/experiences/${expId}`

  const deleteOptions = {
    method: "DELETE",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mzk2ZjAxM2M5NmRmYjAwMTUyMWE1YmEiLCJpYXQiOjE2NzA4MzYyNDMsImV4cCI6MTY3MjA0NTg0M30.y7kED45MhN6V7jWF7PwyZ4DryRe6OJ6b9-so68M-zaE"
    }
  }
  console.log("deleteding experience - DELETE method")
  return async (dispatch) => {
    try {
      let response = await fetch(deleteExperienceUrl, deleteOptions)
      if (response.ok) {
        dispatch({
          type: DELETE_EXPERIENCE,
          payload: expId
        })
      } else {
        console.log("en error occured while fetching the experiences")
      }
    } catch (error) {
      console.log(error)
    }
  }
}

// feed page modal show and hide actions

export const showAddPostModalAction = () => {
  return {
    type: "SHOW_WRITE_A_POST"
  }
}
export const hideAddPostModalAction = () => {
  return {
    type: "HIDE_WRITE_A_POST"
  }
}

// getting the posts for the feed
const baseEndPointPosts = "https://striveschool-api.herokuapp.com/api/posts/"

export const getFeedPostsAction = () => {
  return async (dispatch) => {
    console.log("----------------Fetching Feed Posts---------------------")

    try {
      let resp = await fetch(baseEndPointPosts, options)
      if (resp.ok) {
        let data = await resp.json()
        let fetchedPosts = data

        console.log("Users are ->", fetchedPosts)
        dispatch({
          type: GET_FEED_POSTS,
          payload: fetchedPosts
        })
      } else {
        console.log("error")
      }
    } catch (error) {
      console.log(error)
    }
  }
}

// adding new feed post
export const addingNewFeedPostAction = (newFeedPost) => {
  return async (dispatch) => {
    console.log("----------------Adding New Feed Post---------------------")

    try {
      let resp = await fetch(baseEndPointPosts, {
        method: "POST",
        body: JSON.stringify(newFeedPost),
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mzk2ZjAxM2M5NmRmYjAwMTUyMWE1YmEiLCJpYXQiOjE2NzA4MzYyNDMsImV4cCI6MTY3MjA0NTg0M30.y7kED45MhN6V7jWF7PwyZ4DryRe6OJ6b9-so68M-zaE",
          "Content-Type": "application/json"
        }
      })
      if (resp.ok) {
        alert("Post added")
      } else {
        console.log("error")
      }
    } catch (e) {
      console.log(e)
    }
  }
}

//gets the exp id when clicking on the pen icon
export const getSingleExpAction = (exp) => {
  return {
    type: GET_SELECTEDEXP,
    payload: exp
  }
}

//action for PUT method on single experience

export const editExperienceAction = (updatedExperience, userId, expId) => {
  const putUrl = `https://striveschool-api.herokuapp.com/api/profile/${userId}/experiences/${expId}`
  return async (dispatch) => {
    const optionsPut = {
      method: "PUT",
      body: JSON.stringify(updatedExperience),
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mzk2ZjAxM2M5NmRmYjAwMTUyMWE1YmEiLCJpYXQiOjE2NzA4MzYyNDMsImV4cCI6MTY3MjA0NTg0M30.y7kED45MhN6V7jWF7PwyZ4DryRe6OJ6b9-so68M-zaE",
        "Content-Type": "application/json"
      }
    }

    try {
      const response = await fetch(putUrl, optionsPut)
      if (response.ok) {
        dispatch({
          type: EDIT_SINGLE_EXPERIENCE,
          payload: updatedExperience
        })
      } else {
        console.log(
          "sorry, an error occured while trying to edd a new experience"
        )
      }
    } catch (error) {
      console.log(error)
    }
  }
}

// saving the selected feed post

export const saveSelectedFeedPostAction = (post) => {
  return {
    type: "SAVE_SELECTED_FEED_POST",
    payload: post
  }
}
export const myPostUnClickedAction = (post) => {
  return {
    type: "REMOVE_SELECTED_FEED_POST",
    payload: post
  }
}

// show the edit post modal

export const showEditPostModalAction = () => {
  return {
    type: "SHOW_EDIT_POST_MODAL"
  }
}
export const hideEditPostModalAction = () => {
  return {
    type: "HIDE_EDIT_POST_MODAL"
  }
}

// edit feed post action
export const editMyFeedPostAction = (editFeedPost, postId) => {
  console.log(
    "-------------------editing feed post------------------",
    editFeedPost
  )
  return async (dispatch) => {
    const optionsPut = {
      method: "PUT",
      body: JSON.stringify(editFeedPost),
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mzk2ZjAxM2M5NmRmYjAwMTUyMWE1YmEiLCJpYXQiOjE2NzA4MzYyNDMsImV4cCI6MTY3MjA0NTg0M30.y7kED45MhN6V7jWF7PwyZ4DryRe6OJ6b9-so68M-zaE",
        "Content-Type": "application/json"
      }
    }
    console.log("-------------CHANGING My Feed Post-----------------")
    try {
      let response = await fetch(baseEndPointPosts + postId, optionsPut)
      if (response.ok) {
        console.log("Post content successfully updated ->", response)
      } else {
        console.log("Error changing your post content")
      }
    } catch (error) {
      console.log("🚀 error", error)
    }
  }
}

// delete post action
export const deleteMyFeedPostAction = (deleteFeedPost, postId) => {
  console.log(
    "-------------------deleting feed post------------------",
    deleteFeedPost
  )
  return async (dispatch) => {
    const optionsDelete = {
      method: "DELETE",
      body: JSON.stringify(deleteFeedPost),
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mzk2ZjAxM2M5NmRmYjAwMTUyMWE1YmEiLCJpYXQiOjE2NzA4MzYyNDMsImV4cCI6MTY3MjA0NTg0M30.y7kED45MhN6V7jWF7PwyZ4DryRe6OJ6b9-so68M-zaE",
        "Content-Type": "application/json"
      }
    }
    console.log("-------------DELETING My Feed Post-----------------")
    try {
      let response = await fetch(baseEndPointPosts + postId, optionsDelete)
      if (response.ok) {
        alert("Post deleted")
      } else {
        console.log("Error deleting")
      }
    } catch (error) {
      console.log("🚀 error", error)
    }
  }
}

// update the text that is stored in the selected feed post
export const updateSelectedFeedPost = (editFeedPost) => {
  return {
    type: "UPDATE_CHANGED_TEXT",
    payload: editFeedPost
  }
}

//show and hide the edit options
export const editShowToggleAction = () => {
  return {
    type: "SHOW_EDIT_DROPDOWN"
  }
}
export const hideShowAction = () => {
  return {
    type: "HIDE_EDIT_DROPDOWN"
  }
}

//get a current user data based on id

export const getCurrentUserAction = (userId) => {
  const currentUserUrl = `https://striveschool-api.herokuapp.com/api/profile/${userId}`
  return async (dispatch) => {
    try {
      let response = await fetch(currentUserUrl, options)
      if (response.ok) {
        let data = await response.json()
        dispatch({
          type: GET_CURRENT_USER_DATA,

          payload: data
        })
         } else {
        console.log(
          "error while fetching current user data for random user page"
        )
      }
    } catch (error) {
      console.log(error)
    }
  }
}

// show and hide the delete modal
export const showDeleteModalAction = () => {
  return {
    type: "SHOW_DELETE_MODAL"
  }
}
export const hideDeleteModalAction = () => {
  return {
    type: "HIDE_DELETE_MODAL"
  }
}

// Add Picture to Experience

export const submitFileData = async (image, userId, expId) => {
  const formData = new FormData()

  formData.append("experience", image)

  const optionsPost = {
    method: "POST",
    body: formData,
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mzk2ZjAxM2M5NmRmYjAwMTUyMWE1YmEiLCJpYXQiOjE2NzA4MzYyNDMsImV4cCI6MTY3MjA0NTg0M30.y7kED45MhN6V7jWF7PwyZ4DryRe6OJ6b9-so68M-zaE"
    }
  }

  try {
    let res = await fetch(
      `https://striveschool-api.herokuapp.com/api/profile/${userId}/experiences/${expId}/picture`,
      optionsPost
    )
    console.log(res)
    window.location.reload()
  } catch (error) {
    console.log(error)
  }
}
