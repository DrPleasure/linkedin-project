import {
  GET_EXPERIENCES,
  UPDATE_STATE_OF_EXPERIENCES,
  DELETE_EXPERIENCE,
  GET_SELECTEDEXP,
  EDIT_SINGLE_EXPERIENCE,
} from "../actions";

const initialState = {
  experiences: [],
  newExperienceAdded: false,
  seeAllExperiencesButtonClicked: false,
  clickedExp: "",
  deletedExp: false,
  experienceEdited: false,
};

const experiencesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_STATUS_EDITED_EXP":
      return {
        ...state,
        experienceEdited: action.payload,
      };
    case EDIT_SINGLE_EXPERIENCE:
      return {
        ...state,
        experienceEdited: true,
      };

    case GET_SELECTEDEXP:
      return {
        ...state,
        clickedExp: action.payload,
      };
    case DELETE_EXPERIENCE:
      return {
        ...state,
        clickedExp: "",
        experiences: state.experiences.filter(
          (exp) => exp._id !== action.payload
        ),
        deletedExp: true,
      };
    case UPDATE_STATE_OF_EXPERIENCES:
      return {
        ...state,
        newExperienceAdded: action.payload,
      };
    case GET_EXPERIENCES:
      return {
        ...state,
        experiences: action.payload,
        deletedExp: false,
      };

    default:
      return state;
  }
};

export default experiencesReducer;
