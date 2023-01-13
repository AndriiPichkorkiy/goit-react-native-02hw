// import AppLoading from "expo-app-loading";
import { useCallback, useEffect, useState } from "react";
import * as Font from "expo-font";

import LoginScreen from "./Screens/LoginScreen";
import RegistrationScreen from "./Screens/RegistrationScreen";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  BottomTabBar,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import PostScreen from "./Screens/mainScreens/PostScreen";
import CreateScreen from "./Screens/mainScreens/CreateScreen";
import ProfileScreen from "./Screens/mainScreens/ProfileScreen";

import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
// import { Text, TouchableOpacity, View } from "react-native";
// import { getHeaderTitle } from "@react-navigation/elements";
import BtnLogOut from "./Components/BtnLogOut/BtnLogOut";
import BackBtn from "./Components/BackBtn/BackBtn";
import CommentsScreen from "./Screens/mainScreens/CommentsScreen";
import MapScreen from "./Screens/mainScreens/MapScreen";

const loadApplication = async () => {
  await Font.loadAsync({
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  });
};

const Stack = createNativeStackNavigator();
const MainStack = createNativeStackNavigator();
const MainTab = createBottomTabNavigator();

const useRoute = (isAuth, setIsAuth) => {
  if (!isAuth) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Registration"
          component={RegistrationScreen}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Login"
          // component={LoginScreen}
        >
          {(props) => <LoginScreen {...props} setIsAuth={setIsAuth} />}
        </Stack.Screen>
      </Stack.Navigator>
    );
  }

  const MainTabs = () => (
    <MainTab.Navigator
      // tabBar={(props) => (
      //   <BottomTabBar
      //     {...props}
      //     state={{ ...props.state, routes: props.state.routes.slice(0, 3) }}
      //   ></BottomTabBar>
      // )}
      tabBarOptions={{ showLabel: false }}
      screenOptions={{
        headerStyle: {
          boxShadow: "0px 0.5px 0px rgba(0, 0, 0, 0.3)",

          // backdropFilter: "blur(13.5914px)",
        },
        tabBarActiveTintColor: "white",
        tabBarActiveBackgroundColor: "#FF6C00",
        tabBarInactiveTintColor: "rgba(33, 33, 33, 0.8)",
        tabBarItemStyle: {
          borderRadius: 90,
          marginTop: 4,
          marginBottom: 4,
          maxWidth: 70,
          margin: 8,
        },
        tabBarStyle: {
          justifyContent: "space-between",
          alignItems: "center",
        },
      }}
    >
      <MainTab.Screen
        options={{
          title: "Публікації",
          tabBarIcon: ({ focused, size, color }) => {
            return <Ionicons name="grid-outline" size={size} color={color} />;
          },
          headerRight: () => <BtnLogOut />,
          headerTitleAlign: "center",
        }}
        name="Posts"
        component={PostScreen}
      />
      <MainTab.Screen
        options={({ navigation }) => ({
          title: "Створити публікацію",
          tabBarIcon: ({ focused, size, color }) => {
            return <Ionicons name="add" size={size} color={color} />;
          },
          headerLeft: () => (
            // <BackBtn onPress={() => navigation.navigate("Posts")} />
            <BackBtn onPress={() => navigation.goBack()} />
          ),
          headerTitleAlign: "center",
          tabBarStyle: { display: "none" },
        })}
        name="createPost"
        component={CreateScreen}
      />
      <MainTab.Screen
        options={{
          title: "Профіль",
          tabBarIcon: ({ focused, size, color }) => {
            return <Feather name="user" size={size} color={color} />;
          },
          headerTitleAlign: "center",
          headerTransparent: true,
          headerShown: false,
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </MainTab.Navigator>
  );

  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="Home"
        component={MainTabs}
        options={{
          headerShown: false,
        }}
      />
      <MainStack.Screen
        options={{
          title: "Коментарії",
          tabBarStyle: { display: "none" },
          headerTitleAlign: "center",
        }}
        name="Comments"
        component={CommentsScreen}
      />
      <MainStack.Screen
        options={{
          title: "Карта",
          tabBarStyle: { display: "none" },
          headerTitleAlign: "center",
        }}
        name="MapScreen"
        component={MapScreen}
      />
    </MainStack.Navigator>
  );
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

  // if (!iasReady) {
  //   return (
  //     <AppLoading
  //       startAsync={loadApplication}
  //       onFinish={() => setIasReady(true)}
  //       onError={console.warn}
  //     />
  //   );
  // }

  const route = useRoute(isAuth, setIsAuth);
  return (
    <NavigationContainer onLayout={onLayoutRootView}>
      {route}
    </NavigationContainer>
  );
}
