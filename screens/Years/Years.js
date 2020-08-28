import React from "react";
import { View, SafeAreaView, StyleSheet, Dimensions } from "react-native";
import { Title, Button } from "react-native-paper";
import Cons from "expo-constants";
// import { Container } from './styles';

const year = new Date().getFullYear();
const day = new Date().getDate();

const Years = ({ navigation }) => {
  //   console.log(year + "-" + "01" + "-" + day);
  return (
    <View style={styles.container}>
      <Title style={{ textAlign: "center", fontSize: 24 }}>
        Months of the year
      </Title>
      <View style={styles.year_container}>
        <View style={styles.row}>
          <Button
            mode="contained"
            style={[styles.btn, { padding: 2 }]}
            onPress={() =>
              navigation.navigate("Eve", {
                date: year + "-" + "01" + "-" + day,
              })
            }
          >
            January
          </Button>
          <Button
            mode="contained"
            style={styles.btn}
            onPress={() =>
              navigation.navigate("Eve", {
                date: year + "-" + "02" + "-" + day,
              })
            }
          >
            February
          </Button>
          <Button
            mode="contained"
            style={styles.btn}
            onPress={() =>
              navigation.navigate("Eve", {
                date: year + "-" + "03" + "-" + day,
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
                date: year + "-" + "04" + "-" + day,
              })
            }
          >
            April
          </Button>
          <Button
            style={styles.btn}
            onPress={() =>
              navigation.navigate("Eve", {
                date: year + "-" + "05" + "-" + day,
              })
            }
          >
            May
          </Button>
          <Button
            style={styles.btn}
            onPress={() =>
              navigation.navigate("Eve", {
                date: year + "-" + "06" + "-" + day,
              })
            }
          >
            June
          </Button>
        </View>
        <View style={styles.row}>
          <Button
            mode="contained"
            style={styles.btn}
            onPress={() =>
              navigation.navigate("Eve", {
                date: year + "-" + "07" + "-" + day,
              })
            }
          >
            July
          </Button>
          <Button
            mode="contained"
            style={styles.btn}
            onPress={() =>
              navigation.navigate("Eve", {
                date: year + "-" + "08" + "-" + day,
              })
            }
          >
            August
          </Button>
          <Button
            mode="contained"
            style={styles.btn}
            onPress={() =>
              navigation.navigate("Eve", {
                date: year + "-" + "09" + "-" + day,
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
                date: year + "-" + "10" + "-" + day,
              })
            }
          >
            October
          </Button>
          <Button
            style={styles.btn}
            onPress={() =>
              navigation.navigate("Eve", {
                date: year + "-" + "11" + "-" + day,
              })
            }
          >
            November
          </Button>
          <Button
            style={styles.btn}
            onPress={() =>
              navigation.navigate("Eve", {
                date: year + "-" + "12" + "-" + day,
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
    marginTop: Cons.statusBarHeight + 20,
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
