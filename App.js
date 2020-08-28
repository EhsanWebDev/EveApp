import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider as PaperProvider } from "react-native-paper";

import Home from "./screens/Home/Home";
import EvePlanner from "./screens/EvePlanner/EvePlanner";
import Years from "./screens/Years/Years";

const HomeStack = createStackNavigator();

const HomeStackScreen = (props) => (
  <HomeStack.Navigator headerMode="none">
    <HomeStack.Screen name="Home" component={Home} />
    <HomeStack.Screen name="Years" component={Years} />
    <HomeStack.Screen name="Eve" component={EvePlanner} />
  </HomeStack.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <PaperProvider>
        <HomeStackScreen />
      </PaperProvider>
    </NavigationContainer>
  );
}
