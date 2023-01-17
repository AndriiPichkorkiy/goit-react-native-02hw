import PostScreen from "../Screens/MainScreens/PostScreen.jsx";
import CreateScreen from "../Screens/MainScreens/CreateScreen.jsx";
import ProfileScreen from "../Screens/MainScreens/ProfileScreen.jsx";

import LoginScreen from "../Screens/AuthScreens/LoginScreen";
import RegistrationScreen from "../Screens/AuthScreens/RegistrationScreen";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  BottomTabBar,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";

import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import BtnLogOut from "../Components/BtnLogOut/BtnLogOut";
import BackBtn from "../Components/BackBtn/BackBtn";
import CommentsScreen from "../Screens/PostsScreens/CommentsScreen";
import MapScreen from "../Screens/PostsScreens/MapScreen";

const Stack = createNativeStackNavigator();
const MainStack = createNativeStackNavigator();
const MainTab = createBottomTabNavigator();

export const useRoute = (isAuth, setIsAuth) => {
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
        >
          {(props) => <LoginScreen {...props} setIsAuth={setIsAuth} />}
        </Stack.Screen>
      </Stack.Navigator>
    );
  }

  const MainTabs = () => (
    <MainTab.Navigator
      tabBarOptions={{ showLabel: false }}
      screenOptions={{
        headerStyle: {
          boxShadow: "0px 0.5px 0px rgba(0, 0, 0, 0.3)",
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
