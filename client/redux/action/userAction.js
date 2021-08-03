import axios from "axios";

export const getUserFromAPI = () => {
  return (dispatch) => {
    axios
      .get(`${process.env.api}/user`)
      .then((res) => {
        dispatch({ type: "SET_USER_FROM_API", payload: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
