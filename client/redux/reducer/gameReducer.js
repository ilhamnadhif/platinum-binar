const initialState = {
  games: [],
  gameDetail: {
    id: 0,
    name: "",
    description: "",
    image: "",
    game_url: "",
    play_count: "",
  },
};

const createGameReducer = (state = initialState, action) => {
  if (action.type === "SET_GAME_FROM_API") {
    return {
      ...state,
      games: action.payload,
    };
  }
  if (action.type === "SET_GAME_DETAIL_FROM_API") {
    return {
      ...state,
      gameDetail: {
        ...state.gameDetail,
        [action.formType]: action.formValue,
      },
    };
  }
  return state;
};

export default createGameReducer;
