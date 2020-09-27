import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Image,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Platform,
} from "react-native";
import {
  Card,
  Button,
  Title,
  Paragraph,
  Appbar,
  ActivityIndicator,
  Avatar,
} from "react-native-paper";
import Constants from "expo-constants";
import { Notifications as LegacyNotifications } from "expo";
import { LinearGradient } from "expo-linear-gradient";
import { connect } from "react-redux";
import { auth, firestore } from "firebase";
import firebase from "firebase";
import { createUserProfileDocument } from "../../Firebase";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
const { width, height } = Dimensions.get("screen");
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const Home = ({ navigation, user }) => {
  const notificationListener = useRef();
  const responseListener = useRef();
  const [notification, setNotification] = useState(false);
  // const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // console.log(user);
    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        setNotification(notification);
        console.log(notification);
      }
    );

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log("response", response);
      }
    );
    (() => registerForPushNotificationsAsync())();
    if (user) {
      setLoading(false);
    }

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }
    if (token) {
      const res = await firestore()
        .collection("tokens")
        .doc(user.id)
        .set({ token }, { merge: true });
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  }

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
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        // justifyContent: "space-around",
      }}
    >
      <StatusBar barStyle="light-content" backgroundColor="#9A1458" />
      <Appbar.Header style={{ backgroundColor: "#9A1458" }}>
        <Appbar.Content
          title="Bridget Marie"
          subtitle={`Welcome ${user && user.user_nicename}`}
        />
        <Avatar.Text
          size={50}
          style={{ backgroundColor: "#9A1458" }}
          label={user && user.user_nicename.slice(0, 1)}
        />
      </Appbar.Header>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Image
          source={require("../../assets/hero.jpg")}
          style={{ width: width, height: width / 1.15, resizeMode: "contain" }}
        />
        <Title style={{ fontSize: 28, fontWeight: "bold", marginTop: 20 }}>
          New Eve Planner
        </Title>
      </View>

      <View style={styles.cardContainer}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  card: {
    width: width / 2.5,
    height: width / 5,
    marginHorizontal: 5,
    marginVertical: 5,
    elevation: 6,
    backgroundColor: "transparent",
    justifyContent: "center",
    borderRadius: 15,
  },
});
const mapStateToProps = (state) => {
  // console.log("state=>", state);
  return {
    user: state.auth.user,
  };
};
export default connect(mapStateToProps)(Home);
