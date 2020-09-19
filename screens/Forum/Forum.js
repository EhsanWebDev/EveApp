import React, { Component } from "react";
import { View, SafeAreaView, StyleSheet } from "react-native";
import firebase from "firebase";
import Login from "../Auth/Login";
import {
  Title,
  Button,
  TouchableRipple,
  ActivityIndicator,
  Avatar,
  Caption,
  Text,
  Badge,
} from "react-native-paper";
import cons from "expo-constants";
import { createUserProfileDocument } from "../../Firebase";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
export default class Forum extends Component {
  state = {
    user: null,
    loading: true,
  };
  unsubscribeFromAuth = null;
  componentDidMount() {
    this.unsubscribeFromAuth = firebase
      .auth()
      .onAuthStateChanged(async (user) => {
        if (user) {
          console.log(user.displayName);

          const userRef = await createUserProfileDocument(user);

          // // console.log("user", user);
          userRef.onSnapshot((snap) => {
            this.setState({
              user: {
                id: snap.id,
                ...snap.data(),
              },
              loading: false,
            });
          });
        } else {
          this.setState({ user, loading: false });
        }

        // console.log(user);
      });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
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
    } else if (!this.state.user) {
      return <Login navigation={this.props.navigation} />;
    } else {
      return (
        <View style={{ flex: 1, marginTop: cons.statusBarHeight }}>
          <SafeAreaView style={styles.container}>
            <View style={styles.userInfoSection}>
              <View style={{ flexDirection: "row", marginTop: 15 }}>
                <Avatar.Image
                  source={{
                    uri:
                      "https://api.adorable.io/avatars/80/abott@adorable.png",
                  }}
                  size={80}
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
                    {this.state.user.displayName}
                  </Title>
                  <View
                    style={{ flexDirection: "row", alignItems: "baseline" }}
                  >
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
                  {this.state.user.email}
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
              <TouchableRipple onPress={() => navigation.push("Contact")}>
                <View style={styles.menuItem}>
                  <MaterialIcons name="contact-mail" color="#777" size={25} />
                  <Text style={styles.menuItemText}>Contact Us</Text>
                </View>
              </TouchableRipple>
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
              style={{ backgroundColor: "#c44569" }}
              onPress={() => firebase.auth().signOut()}
            >
              Sign Out
            </Button>
          </View>
        </View>
      );
    }
  }

  // return (
  //   <View>
  //     <Text> textInComponent </Text>
  //   </View>
  // );
}

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
