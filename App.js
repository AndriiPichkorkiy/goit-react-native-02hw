import AppLoading from "expo-app-loading";
import { useState } from "react";
import * as Font from "expo-font";

import LoginScreen from "./Screens/LoginScreen";
import RegistrationScreen from "./Screens/RegistrationScreen";

const loadApplication = async () => {
  await Font.loadAsync({
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  });
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState("Registration");
  const [iasReady, setIasReady] = useState(false);

  if (!iasReady) {
    return (
      <AppLoading
        startAsync={loadApplication}
        onFinish={() => setIasReady(true)}
        onError={console.warn}
      />
    );
  }

  return currentScreen === "Registration" ? (
    <RegistrationScreen changePage={setCurrentScreen} />
  ) : (
    <LoginScreen changePage={setCurrentScreen} />
  );
}
