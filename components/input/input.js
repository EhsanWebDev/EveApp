import React, { Component } from "react";
import { View, TextInput } from "react-native";

class Input extends Component {
  state = {};
  render() {
    return (
      <View
        style={{
          backgroundColor: "#21202E",
          margin: 10,
          // justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextInput
          placeholder={this.props.placeholder || "Enter text here..."}
          // placeholderTextColor="#33414E"
          placeholderTextColor="#fff"
          secureTextEntry={this.props.password ? true : false}
          onChangeText={this.props.handleChange}
          value={this.props.value}
          keyboardType={this.props.email ? "email-address" : "default"}
          style={{
            borderBottomWidth: 1.5,
            width: "90%",
            borderRadius: 10,
            // borderColor: "#33414E",
            borderBottomColor: "#4B97A4",
            padding: 10,
            // color: "#475F69",
            color: "#fff",
            marginBottom: 10,
          }}
        />
      </View>
    );
  }
}

export default Input;
