import React, { Component } from "react";
import { Text, View, StyleSheet, KeyboardAvoidingView } from "react-native";
import Cons from "expo-constants";
import { Title, Subheading, TextInput, Button } from "react-native-paper";
import RNemail from "react-native-email";
export default class ContactUs extends Component {
  state = {
    name: "",
    email: "",
    subject: "",
    msg: "",
  };
  handleEmail = () => {
    const { name, email, subject, msg } = this.state;
    if ((name !== "" || email !== "", subject !== "", msg !== "")) {
      // console.log("working");
      const to = ["academy@bridgetmariecentre.org"]; // string or array of email addresses
      RNemail(to, {
        // Optional additional arguments
        // cc: ["bazzy@moo.com", "doooo@daaa.com"], // string or array of email addresses
        // bcc: "mee@mee.com", // string or array of email addresses
        subject,
        body: `Hi Bridget Marie Team, This is ${name} \n \n ${msg} \n\n My Email is ${email}`,
      }).catch(console.error);
    }
  };

  render() {
    const { name, email, subject, msg } = this.state;

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
              value={name}
              onChangeText={(e) => this.setState({ name: e })}
              mode="outlined"
              style={{ flex: 4, marginHorizontal: 10 }}
            />
          </View>
          <View style={styles.row}>
            <Subheading style={styles.label}>Email</Subheading>
            <TextInput
              label="Enter Your Email"
              value={email}
              keyboardType="email-address"
              onChangeText={(e) => this.setState({ email: e })}
              mode="outlined"
              style={{ flex: 4, marginHorizontal: 10 }}
            />
          </View>
          <View style={styles.row}>
            <Subheading style={styles.label}>Topic</Subheading>
            <TextInput
              label="Enter Topic Name"
              value={subject}
              onChangeText={(e) => this.setState({ subject: e })}
              mode="outlined"
              style={{ flex: 4, marginHorizontal: 10 }}
            />
          </View>
          <View style={styles.row}>
            <Subheading style={styles.label}>Message</Subheading>
            <TextInput
              label="Enter Your Message"
              multiline
              value={msg}
              onChangeText={(e) => this.setState({ msg: e })}
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
              backgroundColor: "#c44569",
            }}
            onPress={() => this.handleEmail()}
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
