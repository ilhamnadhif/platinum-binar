const initialState = {
  users: [],
};

const createUserReducer = (state = initialState, action) => {
  if (action.type === "SET_USER_FROM_API") {
    return {
      ...state,
      users: action.payload,
    };
  }
  return state;
};

export default createUserReducer;
