import React, { Component } from "react";
import { View, SafeAreaView, StyleSheet, StatusBar } from "react-native";
import firebase from "firebase";
import {
  Title,
  Button,
  TouchableRipple,
  ActivityIndicator,
  Avatar,
  Caption,
  Text,
  Badge,
  Appbar,
} from "react-native-paper";
import cons from "expo-constants";
import { createUserProfileDocument } from "../../Firebase";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import RNemail from "react-native-email";
import {
  Ionicons,
  MaterialIcons,
  Feather,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { connect } from "react-redux";
import { logout } from "../../store/actions";
import { SIGNOUT } from "../../store/actions/auth";
class Forum extends Component {
  state = {
    user: null,
    loading: true,
  };
  unsubscribeFromAuth = null;
  componentDidMount() {
    if (this.props.user) {
      this.setState({ loading: false, user: this.props.user });
    }
    // this.unsubscribeFromAuth = firebase
    //   .auth()
    //   .onAuthStateChanged(async (user) => {
    //     if (user) {
    //       console.log(user.displayName);

    //       const userRef = await createUserProfileDocument(user);

    //       // // console.log("user", user);
    //       userRef.onSnapshot((snap) => {
    //         this.setState({
    //           user: {
    //             id: snap.id,
    //             ...snap.data(),
    //           },
    //           loading: false,
    //         });
    //       });
    //     } else {
    //       this.setState({ user, loading: false });
    //     }

    //     // console.log(user);
    //   });
  }
  handleEmail = () => {
    // console.log("working");
    const to = ["admin@bridgetmariecentre.org"]; // string or array of email addresses
    RNemail(to, {
      // Optional additional arguments
      // cc: ["bazzy@moo.com", "doooo@daaa.com"], // string or array of email addresses
      // bcc: "mee@mee.com", // string or array of email addresses
      subject: "",
      body: ``,
    }).catch(console.error);
  };
  componentWillUnmount() {}
  handleLogout = async () => {
    // await firebase.auth().signOut();
    this.props.dispatch(SIGNOUT());
  };
  render() {
    const { navigation } = this.props;
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
    }

    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" backgroundColor="#9A1458" />
        <Appbar.Header style={{ backgroundColor: "#9A1458" }}>
          <Appbar.Content
            title="Bridget Marie"
            subtitle={`Welcome to your profile page`}
          />
          <Avatar.Text
            size={50}
            style={{ backgroundColor: "#9A1458" }}
            label={this.state.user && this.state.user.user_nicename.slice(0, 1)}
          />
        </Appbar.Header>
        <SafeAreaView style={styles.container}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: "row", marginTop: 25 }}>
              <Avatar.Image
                source={require("../../assets/regular.png")}
                size={80}
                style={{
                  marginLeft: -15,
                  backgroundColor: "#9A1458",
                }}
              />
              <View style={{ marginLeft: 20 }}>
                <Title
                  style={[
                    styles.title,
                    {
                      marginTop: 15,
                      marginBottom: 5,
                    },
                  ]}
                >
                  {this.state.user && this.state.user.user_nicename}
                </Title>
                <View style={{ flexDirection: "row", alignItems: "baseline" }}>
                  <Badge
                    size={14}
                    style={{
                      backgroundColor: "green",
                      marginRight: 5,
                      marginBottom: 3,
                    }}
                  ></Badge>
                  <Caption style={styles.caption}>online</Caption>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.userInfoSection}>
            {/* <View style={styles.row}> */}
            {/* <Icon name="map-marker-radius" color="#777777" size={20} /> */}
            {/* <Text style={{ color: "#777777", marginLeft: 20 }}>
                  Kolkata, India
                </Text>
              </View>
              <View style={styles.row}> */}
            {/* <Icon name="phone" color="#777777" size={20} /> */}
            {/* <Text style={{ color: "#777777", marginLeft: 20 }}>
                  +91-900000009
                </Text>
              </View> */}
            <View style={styles.row}>
              <MaterialIcons name="email" color="#777777" size={20} />
              <Text style={{ color: "#777777", marginLeft: 20 }}>
                {this.state.user && this.state.user.user_email}
              </Text>
            </View>
            <View style={styles.row}>
              <Feather
                name={
                  this.state.user && this.state.user.membership_id
                    ? "user-check"
                    : "user-x"
                }
                color="#777777"
                size={20}
              />
              <Text style={{ color: "#777777", marginLeft: 20 }}>
                {this.state.user && this.state.user.membership_id
                  ? "Member"
                  : "You're not a member"}
              </Text>
            </View>
          </View>
          {/* 
            <View style={styles.infoBoxWrapper}>
              <View
                style={[
                  styles.infoBox,
                  {
                    borderRightColor: "#dddddd",
                    borderRightWidth: 1,
                  },
                ]}
              >
                <Title>₹140.50</Title>
                <Caption>Wallet</Caption>
              </View>
              <View style={styles.infoBox}>
                <Title>12</Title>
                <Caption>followers</Caption>
              </View>
            </View> */}

          <View style={styles.menuWrapper}>
            {this.state.user && this.state.user.membership_id ? (
              <TouchableRipple
                onPress={() =>
                  this.props.navigation.push("Chat", {
                    user: this.state.user,
                  })
                }
              >
                <View style={styles.menuItem}>
                  <Ionicons name="ios-chatboxes" color="#777" size={25} />
                  <Text style={styles.menuItemText}>Forum Chat</Text>
                </View>
              </TouchableRipple>
            ) : (
              <TouchableRipple
                onPress={() => this.props.navigation.push("MemberShip")}
              >
                <View style={styles.menuItem}>
                  <Ionicons
                    name="ios-chatboxes"
                    color="#9A1458"
                    size={25}
                    style={{ paddingTop: 10 }}
                  />
                  <Text
                    style={[
                      styles.menuItemText,
                      { color: "#9A1458", flex: 1, marginHorizontal: 60 },
                    ]}
                  >
                    Forum is for members only ! Click to buy one
                  </Text>
                </View>
              </TouchableRipple>
            )}

            {/* <TouchableRipple onPress={() => {}}>
                <View style={styles.menuItem}> */}
            {/* <Icon name="credit-card" color="#FF6347" size={25} /> */}
            {/* <Text style={styles.menuItemText}>Payment</Text>
                </View>
              </TouchableRipple> */}
            <TouchableRipple onPress={() => navigation.push("Events")}>
              <View style={styles.menuItem}>
                <MaterialIcons name="event" color="#777" size={25} />
                <Text style={styles.menuItemText}>Events</Text>
              </View>
            </TouchableRipple>
            <TouchableRipple onPress={() => this.handleEmail()}>
              <View style={styles.menuItem}>
                <MaterialIcons name="contact-mail" color="#777" size={25} />
                <Text style={styles.menuItemText}>
                  admin@bridgetmariecentre.org
                </Text>
              </View>
            </TouchableRipple>
            {/* {this.state.user && this.state.user.id === "11" && ( */}
            <TouchableRipple
              onPress={() => navigation.navigate("Notification")}
            >
              <View style={styles.menuItem}>
                <MaterialIcons
                  name="notifications-active"
                  color="#777"
                  size={25}
                />
                <Text style={styles.menuItemText}>Send Notifications</Text>
              </View>
            </TouchableRipple>
            {/* )} */}

            {/* <TouchableRipple onPress={() => {}}>
                <View style={styles.menuItem}>
                  <MaterialIcons name="settings" color="#777777" size={25} />
                  <Text style={styles.menuItemText}>Settings</Text>
                </View>
              </TouchableRipple> */}
          </View>
        </SafeAreaView>
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            marginBottom: 20,
            marginHorizontal: 20,
          }}
        >
          <Button
            mode="contained"
            style={{ backgroundColor: "#9A1458" }}
            onPress={() => this.handleLogout()}
          >
            Sign Out
          </Button>
        </View>
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  // console.log("state=>", state);
  return {
    user: state.auth.user,
  };
};
const mapDispatchToProps = (dispatch) => ({
  dispatch,
});
export default connect(mapStateToProps, mapDispatchToProps)(Forum);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
    flexDirection: "row",
    height: 100,
  },
  infoBox: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: "#777777",
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
  },
});
