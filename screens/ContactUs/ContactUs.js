import React, { Component } from "react";
import { Text, View, StyleSheet, KeyboardAvoidingView } from "react-native";
import Cons from "expo-constants";
import { Title, Subheading, TextInput, Button } from "react-native-paper";
export default class ContactUs extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Title
          style={{
            letterSpacing: 4,
            marginTop: 20,
            fontSize: 24,
            textAlign: "center",
          }}
        >
          {" "}
          Contact Us{" "}
        </Title>
        <KeyboardAvoidingView
          behavior="height"
          style={{ flex: 1, marginTop: 40 }}
        >
          {/* Row */}
          <View style={styles.row}>
            <Subheading style={styles.label}>Name</Subheading>
            <TextInput
              label="Enter Your Name"
              mode="outlined"
              style={{ flex: 4, marginHorizontal: 10 }}
            />
          </View>
          <View style={styles.row}>
            <Subheading style={styles.label}>Email</Subheading>
            <TextInput
              label="Enter Your Email"
              mode="outlined"
              style={{ flex: 4, marginHorizontal: 10 }}
            />
          </View>
          <View style={styles.row}>
            <Subheading style={styles.label}>Topic</Subheading>
            <TextInput
              label="Enter Topic Name"
              mode="outlined"
              style={{ flex: 4, marginHorizontal: 10 }}
            />
          </View>
          <View style={styles.row}>
            <Subheading style={styles.label}>Message</Subheading>
            <TextInput
              label="Enter Your Message"
              multiline
              numberOfLines={5}
              mode="outlined"
              style={{ flex: 4, marginHorizontal: 10 }}
            />
          </View>
        </KeyboardAvoidingView>
        <View style={{ flex: 0 }}>
          <Button
            mode="contained"
            style={{
              marginBottom: 10,
              elevation: 10,
              marginHorizontal: 10,
              borderRadius: 5,
            }}
          >
            submit
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between",
    marginTop: Cons.statusBarHeight,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  label: {
    flex: 1,
    fontSize: 16,
    paddingLeft: 10,
    fontWeight: "700",
  },
});
