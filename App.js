// import AppLoading from "expo-app-loading";
import { useCallback, useEffect, useState } from "react";
import * as Font from "expo-font";

import { NavigationContainer } from "@react-navigation/native";
import { useRoute } from "./route/useRoute";

const loadApplication = async () => {
  await Font.loadAsync({
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  });
};

export default function App() {
  const [isAuth, setIsAuth] = useState(false);

  // async load font
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await loadApplication();

        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  const route = useRoute(isAuth, setIsAuth);
  return (
    <NavigationContainer onLayout={onLayoutRootView}>
      {route}
    </NavigationContainer>
  );
}
