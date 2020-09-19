import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, YellowBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  ActivityIndicator,
  Provider as PaperProvider,
} from "react-native-paper";
import { BottomNavigation, Text } from "react-native-paper";
import Home from "./screens/Home/Home";
import EvePlanner from "./screens/EvePlanner/EvePlanner";
import Years from "./screens/Years/Years";
import Notes from "./screens/Notes/Notes";
import ContactUs from "./screens/ContactUs/ContactUs";
import FlashMessage from "react-native-flash-message";
import firebase, { auth } from "firebase";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reducer from "./store/reducers";
import logger from "redux-logger";
import Forum from "./screens/Forum/Forum";
import Login from "./screens/Auth/Login";
import Signup from "./screens/Auth/Signup";
import Chat from "./screens/Forum/Chat";
import Shop from "./screens/Shop/Shop";
import Events from "./screens/Events/Events";
import Courses from "./screens/Courses/Courses";
import UserProfile from "./screens/Forum/UserProfile";

const middlewares = [logger];
const store = createStore(reducer, {}, applyMiddleware(...middlewares));

const HomeStack = createStackNavigator();
const ForumStack = createStackNavigator();
const ShopStack = createStackNavigator();
const EveStack = createStackNavigator();
const CourseStack = createStackNavigator();

const AuthStack = createStackNavigator();
import {
  Ionicons,
  MaterialIcons,
  FontAwesome5,
  SimpleLineIcons,
} from "@expo/vector-icons";
YellowBox.ignoreWarnings([
  "Setting a timer",
  "Non-serializable values were found in the navigation state",
]);

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

const Tab = createMaterialBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator labeled={false} screenOptions={{}}>
      <Tab.Screen
        name="Home"
        options={{
          tabBarColor: "#9A1458",
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-home" size={28} color={color} />
          ),
        }}
        component={HomeStackScreen}
      />
      <Tab.Screen
        name="Eve"
        options={{
          tabBarColor: "#9A1458",
          tabBarBadge: true,
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="event-available" size={28} color={color} />
          ),
        }}
        component={EveStackScreen}
      />
      <Tab.Screen
        name="Courses"
        options={{
          tabBarColor: "#1B1464",

          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="book-open" size={28} color={color} />
          ),
        }}
        component={CourseStackScreen}
      />
      <Tab.Screen
        name="Forum"
        options={{
          tabBarColor: "#1289A7",
          // tabBarBadge: true,
          tabBarIcon: ({ color }) => (
            <SimpleLineIcons name="user" size={24} color={color} />
          ),
        }}
        component={ForumStackScreen}
      />
      <Tab.Screen
        name="Shop"
        options={{
          tabBarColor: "#009432",
          // tabBarBadge: true,
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="add-shopping-cart" size={28} color={color} />
          ),
        }}
        component={ShopStackScreen}
      />
    </Tab.Navigator>
  );
}

const HomeStackScreen = (props) => (
  <HomeStack.Navigator headerMode="none">
    <HomeStack.Screen name="Home" component={Home} />
  </HomeStack.Navigator>
);

const ForumStackScreen = () => (
  <ForumStack.Navigator headerMode="none">
    <ForumStack.Screen name="Forum" component={Forum} />
    <ForumStack.Screen name="Chat" component={Chat} />
    <ForumStack.Screen name="Profile" component={UserProfile} />
    <ForumStack.Screen name="Events" component={Events} />
    <ForumStack.Screen name="Contact" component={ContactUs} />
  </ForumStack.Navigator>
);
const ShopStackScreen = () => (
  <ShopStack.Navigator headerMode="none">
    <ShopStack.Screen name="Shop" component={Shop} />
  </ShopStack.Navigator>
);
const CourseStackScreen = () => (
  <CourseStack.Navigator headerMode="none">
    <CourseStack.Screen name="Courses" component={Courses} />
  </CourseStack.Navigator>
);
const EveStackScreen = () => (
  <EveStack.Navigator headerMode="none">
    <EveStack.Screen name="Years" component={Years} />
    <EveStack.Screen name="Eve" component={EvePlanner} />

    <EveStack.Screen name="Notes" component={Notes} />
  </EveStack.Navigator>
);

const AuthStackScreen = () => (
  <AuthStack.Navigator headerMode="none">
    <AuthStack.Screen name="Login" component={Login} />
    <AuthStack.Screen name="Signup" component={Signup} />
  </AuthStack.Navigator>
);

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  function onAuthStateChanged(user) {
    // console.log(user);
    setLoading(false);
    if (user) {
      console.log(user);
      setUser(user.user);
    }
  }

  useEffect(() => {
    console.log(user);
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);
  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          backgroundColor: "#21202E",
        }}
      >
        <ActivityIndicator size="large" color="#56BCCB" />
      </View>
    );
  }
  return (
    <Provider store={store}>
      <NavigationContainer>
        <PaperProvider>
          <View style={{ flex: 1 }}>
            {user !== null ? <MyTabs /> : <AuthStackScreen />}
          </View>
        </PaperProvider>
        <FlashMessage position="top" />
      </NavigationContainer>
    </Provider>
  );
}
