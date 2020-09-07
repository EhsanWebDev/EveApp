import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, YellowBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider as PaperProvider } from "react-native-paper";

import Home from "./screens/Home/Home";
import EvePlanner from "./screens/EvePlanner/EvePlanner";
import Years from "./screens/Years/Years";
import Notes from "./screens/Notes/Notes";
import ContactUs from "./screens/ContactUs/ContactUs";
import FlashMessage from "react-native-flash-message";
import firebase from "firebase";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reducer from "./store/reducers";
import logger from "redux-logger";
import Forum from "./screens/Forum/Forum";
import Login from "./screens/Auth/Login";
import Signup from "./screens/Auth/Signup";
import Chat from "./screens/Forum/Chat";
const middlewares = [logger];
const store = createStore(reducer, {}, applyMiddleware(...middlewares));

const HomeStack = createStackNavigator();

YellowBox.ignoreWarnings([
  "Setting a timer",
  "Non-serializable values were found in the navigation state",
]);

const HomeStackScreen = (props) => (
  <HomeStack.Navigator headerMode="none">
    <HomeStack.Screen name="Home" component={Home} />
    <HomeStack.Screen name="Years" component={Years} />
    <HomeStack.Screen name="Eve" component={EvePlanner} />
    <HomeStack.Screen name="Notes" component={Notes} />
    <HomeStack.Screen name="Contact" component={ContactUs} />
    <HomeStack.Screen name="Forum" component={Forum} />
    <HomeStack.Screen name="Login" component={Login} />
    <HomeStack.Screen name="Signup" component={Signup} />
    <HomeStack.Screen name="Chat" component={Chat} />
  </HomeStack.Navigator>
);

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <PaperProvider>
          <HomeStackScreen />
        </PaperProvider>
        <FlashMessage position="top" />
      </NavigationContainer>
    </Provider>
  );
}
