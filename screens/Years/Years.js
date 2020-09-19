import React from "react";
import { View, SafeAreaView, StyleSheet, Dimensions } from "react-native";
import { Title, Button, Appbar } from "react-native-paper";
import Cons from "expo-constants";
// import { Container } from './styles';

const year = new Date().getFullYear();
const day = new Date().getDate();

const Years = ({ navigation }) => {
  //   console.log(year + "-" + "01" + "-" + day);
  return (
    <View style={styles.container}>
      <Appbar.Header style={{ backgroundColor: "#9A1458" }}>
        <Appbar.Content title="Bridget Marie" subtitle="Eve Planner" />
      </Appbar.Header>
      <Title style={{ textAlign: "center", marginTop: 20, fontSize: 24 }}>
        Months of the year
      </Title>
      <View style={styles.year_container}>
        <View style={styles.row}>
          <Button
            style={[styles.btn, { padding: 2 }]}
            onPress={() =>
              navigation.navigate("Eve", {
                date: year + "-" + "01" + "-" + "01",
                month: "January",
              })
            }
          >
            January
          </Button>
          <Button
            style={styles.btn}
            onPress={() =>
              navigation.navigate("Eve", {
                date: year + "-" + "02" + "-" + "01",
                month: "February",
              })
            }
          >
            February
          </Button>
          <Button
            style={styles.btn}
            onPress={() =>
              navigation.navigate("Eve", {
                date: year + "-" + "03" + "-" + "01",
                month: "March",
              })
            }
          >
            March
          </Button>
        </View>
        <View style={styles.row}>
          <Button
            style={styles.btn}
            onPress={() =>
              navigation.navigate("Eve", {
                date: year + "-" + "04" + "-" + "01",
                month: "April",
              })
            }
          >
            April
          </Button>
          <Button
            style={styles.btn}
            onPress={() =>
              navigation.navigate("Eve", {
                date: year + "-" + "05" + "-" + "01",
                month: "May",
              })
            }
          >
            May
          </Button>
          <Button
            style={styles.btn}
            onPress={() =>
              navigation.navigate("Eve", {
                date: year + "-" + "06" + "-" + "01",
                month: "June",
              })
            }
          >
            June
          </Button>
        </View>
        <View style={styles.row}>
          <Button
            style={styles.btn}
            onPress={() =>
              navigation.navigate("Eve", {
                date: year + "-" + "07" + "-" + "01",
                month: "July",
              })
            }
          >
            July
          </Button>
          <Button
            style={styles.btn}
            onPress={() =>
              navigation.navigate("Eve", {
                date: year + "-" + "08" + "-" + "01",
                month: "August",
              })
            }
          >
            August
          </Button>
          <Button
            style={styles.btn}
            onPress={() =>
              navigation.navigate("Eve", {
                date: year + "-" + "09" + "-" + "01",
                month: "September",
              })
            }
          >
            September
          </Button>
        </View>
        <View style={styles.row}>
          <Button
            style={styles.btn}
            onPress={() =>
              navigation.navigate("Eve", {
                date: year + "-" + "10" + "-" + "01",
                month: "October",
              })
            }
          >
            October
          </Button>
          <Button
            style={styles.btn}
            onPress={() =>
              navigation.navigate("Eve", {
                date: year + "-" + "11" + "-" + "01",
                month: "November",
              })
            }
          >
            November
          </Button>
          <Button
            style={styles.btn}
            onPress={() =>
              navigation.navigate("Eve", {
                date: year + "-" + "12" + "-" + "01",
                month: "December",
              })
            }
          >
            December
          </Button>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: Cons.statusBarHeight + 20,
  },
  year_container: {
    marginTop: 20,
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 5,
  },
  btn: {
    margin: 3,
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 10,
    width: Dimensions.get("screen").width / 3.5,
  },
});
export default Years;
