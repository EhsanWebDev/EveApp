import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, YellowBox, LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import FlashMessage from "react-native-flash-message";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reducer from "./store/reducers";
import logger from "redux-logger";

import Navigation from "./screens/Navigation";
import thunk from "redux-thunk";

const middlewares = [logger, thunk];
const store = createStore(reducer, {}, applyMiddleware(...middlewares));

YellowBox.ignoreWarnings([
  "Setting a timer",
  "Non-serializable values were found in the navigation state",
  "Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in %s.%s, the componentWillUnmount method",
]);

// console.disableYellowBox = true;

export default function App() {
  console.disableYellowBox = true;
  return (
    <Provider store={store}>
      <Navigation />
      <FlashMessage position="top" />
    </Provider>
  );
}
