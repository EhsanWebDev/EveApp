import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Input from "../../components/input/input";
import { FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import firebase from "firebase";
import { ActivityIndicator } from "react-native-paper";
import { createUserProfileDocument } from "../../Firebase";
import { showMessage } from "react-native-flash-message";
import { createUser } from "../../store/actions/auth";
import { connect } from "react-redux";

class Signup extends Component {
  state = {
    email: "",
    password: "",
    checked: null,
    error: false,
    loading: false,
    displayName: "",
    errorEmail: false,
  };
  handleCheck = () => {
    const { checked } = this.state;
    if (checked) {
      this.setState({ checked: null });
    } else {
      this.setState({ checked: "check" });
    }
  };
  textInputChangeEmail = (val) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(String(val).toLowerCase())) {
      this.setState({
        email: val,
        errorEmail: false,
      });
    } else {
      this.setState({
        email: val,
        errorEmail: "Please enter a valid email address",
      });
    }
  };
  signup = async () => {
    this.setState({ loading: true });
    const { email, password, displayName, errorEmail } = this.state;
    if (
      email.length === 0 ||
      password.length === 0 ||
      displayName.length === 0 ||
      errorEmail
    ) {
      showMessage({
        type: "danger",
        message: "All fields are required",
        duration: 1500,
        icon: "danger",
      });
      //  setLoading(false);
      this.setState({ loading: false });
      return;
    } else {
      const payload = {
        name: displayName,
        email,
        password,
      };
      const res = await this.props.dispatch(createUser(payload));
      // console.log('res', res);
      if (res.status) {
        // setLoading(false);
        this.setState({ loading: false });
        // console.log('User', user);
        // setLoading(false);
        // const token = makeid(5);
        // // console.log(token);
        // const userData = [
        //   {
        //     ...user,
        //     userToken: token,
        //   },
        // ];
        // // console.log(userData);
        // signIn(userData);
      } else {
        // setLoading(false);
        this.setState({ loading: false });
        // alert(res.message);
        showMessage({
          type: "danger",
          message: res.data.message,
          duration: 1500,
          icon: "danger",
        });
      }
    }
    // if (displayName.length <= 0) {
    //   alert("please enter display name");
    //   this.setState({ loading: false });
    //   return;
    // } else {
    //   const { user } = await firebase
    //     .auth()
    //     .createUserWithEmailAndPassword(email, password);
    //   await createUserProfileDocument(user, displayName);
    //   this.setState({
    //     loading: false,
    //     email: "",
    //     password: "",
    //     error: false,
    //   });
    // }

    // this.props.navigation.navigate("Forum", {
    //   uid: user.uid,
    // });

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
            handleChange={(email) => this.textInputChangeEmail(email)}
            value={this.state.email}
            email={true}
          />
          {this.state.errorEmail && (
            <Text style={{ color: "#c0392b", paddingLeft: 40 }}>
              {this.state.errorEmail}
            </Text>
          )}
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
const mapStateToProps = (state) => ({
  user: state.auth.user,
  error: state.auth.error,
});
const mapDispatchToProps = (dispatch) => ({
  dispatch,
});
export default connect(mapStateToProps, mapDispatchToProps)(Signup);
