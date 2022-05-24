const initialState = {
  isLoading: true,
  isSignedIn: false,
  currentUser: null,
  profilePic: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SIGN_IN":
      return {
        ...state,
        isSignedIn: true,
        currentUser: action.payload,
        isLoading: false,
        profilePic: null,
      };
    case "UPDATE_PROFILE":
      return {
        ...state,
        isSignedIn: true,
        currentUser: action.payload,
        isLoading: false,
        profilePic: null,
      };
    case "UPLOAD_PROFILE_IMAGE":
      return {
        ...state,
        profilePic: action.payload,
      };
    case "SIGN_OUT":
      return {
        ...state,
        isSignedIn: false,
        currentUser: null,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default authReducer;
