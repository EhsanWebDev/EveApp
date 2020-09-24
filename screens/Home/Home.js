import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {
  Card,
  Button,
  Title,
  Paragraph,
  Appbar,
  ActivityIndicator,
  Avatar,
} from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { connect } from "react-redux";
import { auth } from "firebase";
import firebase from "firebase";
import { createUserProfileDocument } from "../../Firebase";

const { width, height } = Dimensions.get("screen");
const Home = ({ navigation, user }) => {
  // const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(user);
    if (user) {
      setLoading(false);
    }
  }, []);
  if (loading) {
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
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        // justifyContent: "space-around",
      }}
    >
      <Appbar.Header style={{ backgroundColor: "#9A1458" }}>
        <Appbar.Content
          title="Bridget Marie"
          subtitle={`Welcome ${user && user.user_nicename}`}
        />
        <Avatar.Text
          size={50}
          style={{ backgroundColor: "#9A1458" }}
          label={user && user.user_nicename.slice(0, 1)}
        />
      </Appbar.Header>
      <Image
        source={{
          uri:
            "https://bridgetmariecentre.org/wp-content/uploads/2020/07/BM-Logo-without-white-JPG-1-scaled.jpg",
        }}
        style={{ width: width, height: width / 2.5, resizeMode: "contain" }}
      />
      <View style={styles.cardContainer}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  card: {
    width: width / 2.5,
    height: width / 5,
    marginHorizontal: 5,
    marginVertical: 5,
    elevation: 6,
    backgroundColor: "transparent",
    justifyContent: "center",
    borderRadius: 15,
  },
});
const mapStateToProps = (state) => {
  console.log("state=>", state);
  return {
    user: state.auth.user,
  };
};
export default connect(mapStateToProps)(Home);
