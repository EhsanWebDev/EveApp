import { firestore } from "firebase";
import React, { useState } from "react";
import { View } from "react-native";
import { showMessage } from "react-native-flash-message";
import { Appbar, Button, TextInput } from "react-native-paper";

// import { Container } from './styles';

const Notification = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  async function sendPushNotification(token, title, body) {
    const message = {
      to: token,
      sound: "default",
      title: title,
      body: body,
      data: { data: "goes here" },
    };

    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
  }

  const setToAll = async () => {
    if (title.trim().length === 0 || body.trim().length === 0) {
      showMessage({
        message: "All Fields are required",
        duration: 1200,
        titleStyle: { fontSize: 14, fontWeight: "bold" },
        type: "warning",
      });
      return;
    } else {
      const users = await firestore().collection("tokens").get();
      users.docs.map((user) =>
        sendPushNotification(user.data().token, title, body)
      );
      setTitle("");
      setBody("");
      showMessage({
        message: "Sending to all users",
        duration: 1000,
        type: "success",
      });
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header style={{ backgroundColor: "#9A1458" }}>
        <Appbar.Content
          title="Bridget Marie"
          subtitle={`Customize your notification`}
        />
      </Appbar.Header>
      <View style={{ marginHorizontal: 20, marginVertical: 20 }}>
        <TextInput
          mode="outlined"
          label="Enter notification title"
          onChangeText={(val) => setTitle(val)}
          value={title}
        />
        <TextInput
          mode="outlined"
          label="Enter notification body"
          multiline
          numberOfLines={4}
          style={{ marginTop: 10 }}
          onChangeText={(val) => setBody(val)}
          value={body}
        />
        <Button
          mode="contained"
          style={{ marginTop: 20, backgroundColor: "#7fb069" }}
          onPress={() => setToAll()}
        >
          Send notifications
        </Button>
      </View>
    </View>
  );
};

export default Notification;
