import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Input from "../../components/input/input";
import { FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import firebase from "firebase";
import { ActivityIndicator } from "react-native-paper";
import { createUserProfileDocument } from "../../Firebase";

class Signup extends Component {
  state = {
    email: "",
    password: "",
    checked: null,
    error: false,
    loading: false,
    displayName: "",
  };
  handleCheck = () => {
    const { checked } = this.state;
    if (checked) {
      this.setState({ checked: null });
    } else {
      this.setState({ checked: "check" });
    }
  };
  signup = async () => {
    this.setState({ loading: true });
    const { email, password, displayName } = this.state;
    const { user } = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    createUserProfileDocument(user, { displayName });

    this.setState({
      loading: false,
      email: "",
      password: "",
      error: false,
    });
    this.props.navigation.navigate("Forum", {
      uid: user.uid,
    });

    // firebase
    //   .auth()
    //   .createUserWithEmailAndPassword(email, password)
    //   .then((userCredentials) => {
    //     // console.log(userCredentials.user.uid);
    //     this.setState({
    //       loading: false,
    //       email: "",
    //       password: "",
    //       error: false,
    //     });
    //     this.props.navigation.navigate("Forum", {
    //       uid: userCredentials.user.uid,
    //     });
    //   })
    //   .catch((error) => {
    //     this.setState({ error: error.message, loading: false });
    //     console.log(this.state);
    //   });
  };
  render() {
    if (this.state.loading) {
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
    } else {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            backgroundColor: "#21202E",
          }}
        >
          <Text
            style={{
              color: "#56BCCB",
              textAlign: "center",
              fontSize: 32,
              marginVertical: 30,
              letterSpacing: 15,
            }}
          >
            SIGNUP
          </Text>
          <Text
            style={{
              color: "#56BCCB",
              textAlign: "center",
              fontSize: 18,
              marginVertical: 2,
              letterSpacing: 5,
            }}
          ></Text>
          <Input
            placeholder="Enter Your Display Name"
            handleChange={(name) => this.setState({ displayName: name })}
            value={this.state.displayName}
          />
          <Input
            placeholder="Enter email"
            handleChange={(email) => this.setState({ email })}
            value={this.state.email}
            email={true}
          />
          <Input
            placeholder="Enter password"
            password={true}
            handleChange={(password) => this.setState({ password })}
            value={this.state.password}
          />
          {this.state.error ? (
            <Text
              style={{
                textAlign: "center",
                width: "100%",
                fontSize: 13,
                color: "#56BCCB",
              }}
            >
              {this.state.error}
            </Text>
          ) : null}
          <LinearGradient
            colors={["#353446", "#2D3C41"]}
            start={[0.1, 0]}
            end={[0.9, 1]}
            style={{
              marginTop: 40,
              width: "90%",
              alignSelf: "center",
              borderRadius: 15,
            }}
          >
            <TouchableOpacity
              style={{ padding: 10 }}
              onPress={() => this.signup()}
            >
              <Text
                style={{
                  color: "#447D88",
                  textAlign: "center",
                  // fontWeight: "bold",
                  fontSize: 16,
                }}
              >
                SIGNUP
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      );
    }
  }
}

export default Signup;
