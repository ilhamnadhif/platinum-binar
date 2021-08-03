const initialState = {
  hasLogin: false,
  user: {
    id: 0,
    username: "",
    email: "",
    total_score: 0,
    picture: "",
    provider: ""
  },
};

const createAuthReducer = (state = initialState, action) => {
  if (action.type === "SET_HASLOGIN") {
    return {
      ...state,
      hasLogin: action.payload,
    };
  }
  if (action.type === "SET_USER_AUTH") {
    return {
      ...state,
      user: {
        ...state.user,
        [action.formType]: action.formValue,
      },
    };
  }
  return state;
};

export default createAuthReducer;
