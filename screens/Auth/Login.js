import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Input from "../../components/input/input";
import { FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import firebase from "firebase";
import { ActivityIndicator } from "react-native-paper";
class Login extends Component {
  state = {
    email: "",
    password: "",
    checked: null,
    error: false,
    loading: false,
  };
  handleCheck = () => {
    const { checked } = this.state;
    if (checked) {
      this.setState({ checked: null });
    } else {
      this.setState({ checked: "check" });
    }
  };

  login = (email, password) => {
    this.setState({ loading: true });

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.setState({
          loading: false,
          email: "",
          password: "",
          error: false,
        });
        this.props.navigation.navigate("Home", {
          uid: user.user.uid,
        });
      })
      .catch((error) =>
        this.setState({ error: error.message, loading: false })
      );
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
            LOGIN
          </Text>
          <Input
            placeholder="Enter email"
            handleChange={(email) => this.setState({ email })}
            value={this.state.email}
            email={true}
          />
          <Input
            placeholder="Enter password"
            password={true}
            value={this.state.password}
            handleChange={(password) => this.setState({ password })}
          />
          {this.state.error ? (
            <Text
              style={{
                textAlign: "center",
                marginVertical: 10,
                width: "100%",
                fontSize: 13,
                color: "#56BCCB",
              }}
            >
              {this.state.error}
            </Text>
          ) : null}
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity
              onPress={this.handleCheck}
              style={{
                height: 25,
                width: 25,
                borderWidth: 1,
                borderColor: "#33414E",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#2F3943",
                marginLeft: 30,
                marginRight: 10,
              }}
            >
              <FontAwesome5
                name={this.state.checked}
                size={14}
                color="#4B97A4"
              />
            </TouchableOpacity>
            <Text style={{ color: "#445863", fontSize: 18 }}>Remember me?</Text>
          </View>

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
              onPress={() => this.login(this.state.email, this.state.password)}
            >
              <Text
                style={{
                  color: "#447D88",
                  textAlign: "center",
                  // fontWeight: "bold",
                  fontSize: 16,
                }}
              >
                LOGIN
              </Text>
            </TouchableOpacity>
          </LinearGradient>
          <LinearGradient
            colors={["#353446", "#2D3C41"]}
            start={[0.1, 0]}
            end={[0.9, 1]}
            style={{
              marginTop: 10,
              width: "90%",
              alignSelf: "center",
              borderRadius: 15,
            }}
          >
            <TouchableOpacity
              style={{ padding: 10 }}
              onPress={() => this.props.navigation.push("Signup")}
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

export default Login;