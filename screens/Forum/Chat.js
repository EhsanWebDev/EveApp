// @refresh reset

import React, { useState, useEffect, useCallback } from "react";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import AsyncStorage from "@react-native-community/async-storage";
import { StyleSheet, TextInput, View, YellowBox, Button } from "react-native";
import * as firebase from "firebase";
import "firebase/firestore";
import { ActivityIndicator } from "react-native-paper";
import { StatusBar } from "expo-status-bar";

YellowBox.ignoreWarnings(["Setting a timer for a long period of time"]);

const db = firebase.firestore();
const chatsRef = db.collection("chats");

export default function Chat({ route, navigation }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    readUser();
    const unsubscribe = chatsRef.onSnapshot((querySnapshot) => {
      const messagesFirestore = querySnapshot
        .docChanges()
        .filter(({ type }) => type === "added")
        .map(({ doc }) => {
          const message = doc.data();
          //createdAt is firebase.firestore.Timestamp instance
          //https://firebase.google.com/docs/reference/js/firebase.firestore.Timestamp
          return { ...message, createdAt: message.createdAt.toDate() };
        })
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      appendMessages(messagesFirestore);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);
  function getColor(username) {
    let sumChars = 0;
    for (let i = 0; i < username.length; i++) {
      sumChars += username.charCodeAt(i);
    }

    const colors = [
      "#e67e22", // carrot
      "#2ecc71", // emerald
      "#3498db", // peter river
      "#8e44ad", // wisteria
      "#e74c3c", // alizarin
      "#1abc9c", // turquoise
      "#2c3e50", // midnight blue
    ];
    return colors[sumChars % colors.length];
  }
  const renderBubble = (props) => {
    // let username = props.currentMessage.user.name;
    // let color = getColor(username);
    return (
      <Bubble
        {...props}
        textStyle={{
          right: {
            color: "white",
            padding: 5,
          },
          left: {
            color: "#000",
            padding: 5,
          },
        }}
        wrapperStyle={{
          left: {
            backgroundColor: "#F1F0F0",
          },
          right: {
            backgroundColor: "#0099FF",
          },
        }}
      />
    );
  };

  const appendMessages = useCallback(
    (messages) => {
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, messages)
      );
    },
    [messages]
  );

  async function readUser() {
    // const user = await AsyncStorage.getItem("user");
    const user = route.params.user;
    console.log(user);
    const myUser = {};
    myUser.name = user.user_nicename;
    myUser._id = user.id;
    myUser.email = user.user_email;

    if (user) {
      setUser(myUser);
    }
  }
  // async function handlePress() {
  //   const _id = Math.random().toString(36).substring(7);
  //   const user = { _id, name };
  //   await AsyncStorage.setItem("user", JSON.stringify(user));
  //   setUser(user);
  // }
  async function handleSend(messages) {
    console.log("user =>", user);
    const writes = messages.map((m) => chatsRef.add(m));
    await Promise.all(writes);
  }
  const handleAvatar = (props) =>
    navigation.push("Profile", {
      props: props,
    });

  if (loading) {
    return (
      <View style={styles.container}>
        <StatusBar style="light" />
        <ActivityIndicator size="large" color="#56BCCB" />
      </View>
    );
  }
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        user={user}
        renderUsernameOnMessage={true}
        onSend={handleSend}
        onPressAvatar={handleAvatar}
        alwaysShowSend
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#21202E",
    alignItems: "center",
    justifyContent: "center",
    // padding: 30,
  },
  input: {
    height: 50,
    width: "100%",
    borderWidth: 1,
    padding: 15,
    marginBottom: 20,
    borderColor: "gray",
  },
});
