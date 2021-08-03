import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider, useDispatch } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../redux/store";
import { setHasLogin, setUser } from "../redux/action/globalAction";
import { useEffect } from "react";
import axios from "axios";

const ChildComponent = ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("jwtToken")) {
      axios
        .get(`${process.env.api}/auth/user`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        })
        .then((result) => {
          if (result.data.Google) {
            dispatch(setUser("id", result.data.id));
            dispatch(setUser("username", result.data.username));
            dispatch(setUser("email", result.data.email));
            dispatch(setUser("total_score", result.data.total_score));
            dispatch(setUser("picture", result.data.Google.picture));
            dispatch(setUser("provider", result.data.provider));
          }
          if (result.data.Local) {
            dispatch(setUser("id", result.data.id));
            dispatch(setUser("username", result.data.username));
            dispatch(setUser("email", result.data.email));
            dispatch(setUser("total_score", result.data.total_score));
            dispatch(setUser("picture", null));
            dispatch(setUser("provider", result.data.provider));
          }
          dispatch(setHasLogin(true));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      dispatch(setHasLogin(false));
    }
  });
  return <> {children}</>;
};
function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ChildComponent>
          <Component {...pageProps} />
        </ChildComponent>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
