import React, { useEffect, useState } from "react";

import { createStackNavigator } from "@react-navigation/stack";

import { ActivityIndicator, BottomNavigation, Text } from "react-native-paper";
import { Provider as PaperProvider } from "react-native-paper";
import Home from "./Home/Home";
import EvePlanner from "./EvePlanner/EvePlanner";
import Years from "./Years/Years";
import Notes from "./Notes/Notes";
import ContactUs from "./ContactUs/ContactUs";

import firebase, { auth } from "firebase";

import Forum from "./Forum/Forum";
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
import Chat from "./Forum/Chat";
import Shop from "./Shop/Shop";
import Events from "./Events/Events";
import Courses from "./Courses/Courses";
import UserProfile from "./Forum/UserProfile";

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
  Octicons,
} from "@expo/vector-icons";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import FlashMessage from "react-native-flash-message";
import { NavigationContainer } from "@react-navigation/native";
import { View } from "react-native";
import { connect } from "react-redux";
import { loginUserSuccess } from "../store/actions";
import AsyncStorage from "@react-native-community/async-storage";
import MemberShip from "./Forum/MemberShip";
import Notification from "./Notification";

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
            <Octicons name="dashboard" size={28} color={color} />
          ),
        }}
        component={CourseStackScreen}
      />
      <Tab.Screen
        name="Forum"
        options={{
          tabBarColor: "#2980b9",
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
    <ForumStack.Screen name="MemberShip" component={MemberShip} />
    <ForumStack.Screen name="Notification" component={Notification} />
    {/* <ForumStack.Screen name="MemberShip" component={MemberShip} /> */}
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
  <AuthStack.Navigator headerMode="none" initialRouteName="Login">
    <AuthStack.Screen name="Login" component={Login} />
    <AuthStack.Screen name="Signup" component={Signup} />
  </AuthStack.Navigator>
);

const Navigation = ({ user, dispatch }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // async function onAuthStateChanged(user) {
  //   // console.log(user);
  //   setLoading(false);
  //   if (user) {
  //     console.log(user);
  //     dispatch(loginUserSuccess(user));
  //     //   setUser(user.user);
  //   }
  // }

  // useEffect(() => {
  //   console.log(user, dispatch);

  //   // const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  //   return subscriber; // unsubscribe on unmount
  // }, []);

  React.useEffect(() => {
    // console.log(user);
    setTimeout(async () => {
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem("userToken");
      } catch (e) {
        console.log(e);
      }
      console.log("user token: ", userToken);
      dispatch({ type: "RETRIEVE_TOKEN", user: JSON.parse(userToken) });
      setLoading(false);
    }, 100);
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
    <NavigationContainer>
      <PaperProvider>
        <View style={{ flex: 1 }}>
          {user === null ? <AuthStackScreen /> : <MyTabs />}
        </View>
      </PaperProvider>
    </NavigationContainer>
  );
};

const mapStateToProps = ({ auth }) => {
  console.log(auth);

  return {
    user: auth.user,
  };
};
const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
