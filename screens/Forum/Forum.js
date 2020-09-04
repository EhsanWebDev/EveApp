import React, { Component } from "react";
import { Text, View } from "react-native";
import firebase from "firebase";
import Login from "../Auth/Login";
export default class Forum extends Component {
  state = {
    user: null,
  };
  unsubscribeFromAuth = null;
  componentDidMount() {
    this.unsubscribeFromAuth = firebase
      .auth()
      .onAuthStateChanged(async (user) => {
        console.log(user);
        //   if (user) {
        //     // const userRef = await createUserProfileDocument(user);
        //     // // console.log("user", user);
        //     // userRef.onSnapshot((snap) => {
        //     //   this.props.setCurrentUser({
        //     //     id: snap.id,
        //     //     ...snap.data(),
        //     //   });
        //     // });
        //   } else {
        //     this.props.setCurrentUser(user);
        //   }

        // console.log(user);
      });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
  render() {
    if (!this.state.user) {
      return <Login navigation={this.props.navigation} />;
    }
    // return (
    //   <View>
    //     <Text> textInComponent </Text>
    //   </View>
    // );
  }
}
