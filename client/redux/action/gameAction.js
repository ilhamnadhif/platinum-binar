import axios from "axios";

export const getGameFromAPI = () => {
  return (dispatch) => {
    axios
      .get(`${process.env.api}/game`)
      .then((res) => {
        dispatch({ type: "SET_GAME_FROM_API", payload: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const getGameDetailFromAPI = (name) => {
  return (dispatch) => {
    axios
      .get(`${process.env.api}/game/${name}`)
      .then((res) => {
        const { id, name, description, image, game_url, play_count } = res.data;
        dispatch({
          type: "SET_GAME_DETAIL_FROM_API",
          formType: "id",
          formValue: id,
        });
        dispatch({
          type: "SET_GAME_DETAIL_FROM_API",
          formType: "name",
          formValue: name,
        });
        dispatch({
          type: "SET_GAME_DETAIL_FROM_API",
          formType: "description",
          formValue: description,
        });
        dispatch({
          type: "SET_GAME_DETAIL_FROM_API",
          formType: "image",
          formValue: image,
        });
        dispatch({
          type: "SET_GAME_DETAIL_FROM_API",
          formType: "game_url",
          formValue: game_url,
        });
        dispatch({
          type: "SET_GAME_DETAIL_FROM_API",
          formType: "play_count",
          formValue: play_count,
        }).cat;
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
