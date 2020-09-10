import React from "react";
import {
  View,
  Image,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Card, Button, Title, Paragraph } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { connect } from "react-redux";

const { width, height } = Dimensions.get("screen");
const Home = ({ navigation }) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        justifyContent: "space-around",
      }}
    >
      <Image
        source={{
          uri:
            "https://bridgetmariecentre.org/wp-content/uploads/2020/07/BM-Logo-without-white-JPG-1-scaled.jpg",
        }}
        style={{ width: width, height: width / 3, resizeMode: "contain" }}
      />
      <View style={styles.cardContainer}>
        <TouchableOpacity
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "transparent",
          }}
          onPress={() => navigation.push("Courses")}
        >
          <LinearGradient
            // Button Linear Gradient
            colors={["#5f27cd", "#2c3e50"]}
            style={styles.card}
          >
            <Title
              style={{
                color: "white",

                textAlign: "center",
              }}
            >
              Courses
            </Title>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "transparent",
          }}
          onPress={() => navigation.push("Forum")}
        >
          <LinearGradient
            // Button Linear Gradient
            colors={["#5f27cd", "#2c3e50"]}
            style={styles.card}
          >
            <Title
              style={{
                color: "white",

                textAlign: "center",
              }}
            >
              Forum
            </Title>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "transparent",
          }}
          onPress={() => navigation.push("Years")}
        >
          <LinearGradient
            // Button Linear Gradient
            colors={["#5f27cd", "#2c3e50"]}
            style={styles.card}
          >
            <Title
              style={{
                color: "white",

                textAlign: "center",
              }}
            >
              The New Eve Planner
            </Title>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "transparent",
          }}
          onPress={() => navigation.push("Events")}
        >
          <LinearGradient
            // Button Linear Gradient
            colors={["#5f27cd", "#2c3e50"]}
            style={styles.card}
          >
            <Title
              style={{
                color: "white",

                textAlign: "center",
              }}
            >
              Events
            </Title>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "transparent",
          }}
          onPress={() => navigation.push("Shop")}
        >
          <LinearGradient
            // Button Linear Gradient
            colors={["#5f27cd", "#2c3e50"]}
            style={styles.card}
          >
            <Title
              style={{
                color: "white",

                textAlign: "center",
              }}
            >
              Shop
            </Title>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "transparent",
          }}
          onPress={() => navigation.push("Contact")}
        >
          <LinearGradient
            // Button Linear Gradient
            colors={["#5f27cd", "#2c3e50"]}
            style={styles.card}
          >
            <Title
              style={{
                color: "white",

                textAlign: "center",
              }}
            >
              Contact Us
            </Title>
          </LinearGradient>
        </TouchableOpacity>
      </View>
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
  return state;
};
export default connect(mapStateToProps)(Home);
