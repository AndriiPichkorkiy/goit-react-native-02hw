import { useDispatch, useSelector } from "react-redux";
import { auth } from "../firebase/config";
import { useRoute } from "../route/useRoute";
import { useEffect, useRef } from "react";
import { authStateChangeUser } from "../redux/auth/authOperations";

import NotificationPopup from "react-native-push-notification-popup";
import Popup from "./Popup/Popup";
import { authSlice } from "../redux/auth/authReducer";

const Main = () => {
  const { stateChange } = useSelector((state) => state.auth);
  const dispath = useDispatch();

  useEffect(() => {
    dispath(authStateChangeUser());
  }, []);

  const popup = useRef(null);
  const isThereAnError = useSelector((state) => state.auth.error);

  useEffect(() => {
    if (!isThereAnError) return;
    showPopup(isThereAnError);
    dispath(authSlice.actions.hideError());
  }, [isThereAnError]);

  const showPopup = (error) => {
    popup.current?.show({
      // appIconSource: require('./assets/icon.jpg'),
      // appTitle: "Some App",
      // timeText: "Now",
      title: "There is an error:",
      body: error,
      slideOutTime: 5000,
    });
  };

  const route = useRoute(stateChange);
  return (
    <>
      {route}
      <NotificationPopup
        ref={popup}
        renderPopupContent={Popup}
        shouldChildHandleResponderStart={true}
        shouldChildHandleResponderMove={true}
      />
    </>
  );
};

export default Main;
