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
          placeholderTextColor="#33414E"
          secureTextEntry={this.props.password ? true : false}
          onChangeText={this.props.handleChange}
          value={this.props.value}
          keyboardType={this.props.email ? "email-address" : "default"}
          style={{
            borderWidth: 1,
            width: "90%",
            borderRadius: 10,
            borderColor: "#33414E",
            padding: 10,
            color: "#475F69",
          }}
        />
      </View>
    );
  }
}

export default Input;
