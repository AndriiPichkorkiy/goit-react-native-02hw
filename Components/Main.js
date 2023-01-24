import { useDispatch, useSelector } from "react-redux";
import { auth } from "../firebase/config";
import { useRoute } from "../route/useRoute";
import { useEffect, useState } from "react";
import { authStateChangeUser } from "../redux/auth/authOperations";

const Main = () => {
  const { stateChange } = useSelector((state) => state.auth);
  const dispath = useDispatch();

  useEffect(() => {
    dispath(authStateChangeUser());
  }, []);

  const route = useRoute(stateChange);
  return route;
};

export default Main;
