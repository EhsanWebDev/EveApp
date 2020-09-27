import React from "react";
import { View, Text, StyleSheet, ScrollView, YellowBox } from "react-native";
import Cons from "expo-constants";
import { ActivityIndicator, TextInput, Button } from "react-native-paper";
import { showMessage } from "react-native-flash-message";
import AsyncStorage from "@react-native-community/async-storage";

class Notes extends React.Component {
  state = {
    date: 0,
    loading: true,

    events: "",
    insights: "",
    bodyTemp: "",
    fluid: "",
    evePlan: "",
    changes: "",
  };
  // const [date, setDate] = React.useState(0);
  //   useEffect(() => {
  //     setDate(route.params.day);
  // }, [date]);

  componentDidMount() {
    console.log(this.props.route.params);
    this.setState({ date: this.props.route.params.day }, async () => {
      try {
        let data = await AsyncStorage.getItem(`${this.state.date.dateString}`);
        let dates = await AsyncStorage.getItem("marked_dates");
        console.log("dates=>", dates);
        if (data !== null) {
          let dataToDisp = JSON.parse(data);
          const {
            events,
            evePlan,
            insights,
            changes,
            bodyTemp,
            fluid,
          } = dataToDisp;
          this.setState({
            events,
            evePlan,
            insights,
            changes,
            bodyTemp,
            fluid,
          });
        }

        this.setState({ loading: false });

        // console.log("data got=>", dataToDisp);
      } catch (error) {
        console.log(error);
      }
    });
  }

  // Handlers
  handleNotesChange = async () => {
    const {
      date,
      events,
      evePlan,
      insights,
      bodyTemp,
      fluid,
      changes,
    } = this.state;
    const data = { events, insights, bodyTemp, fluid, evePlan, changes };
    if (
      events !== "" ||
      evePlan !== "" ||
      insights !== "" ||
      bodyTemp !== "" ||
      changes !== "" ||
      fluid !== ""
    ) {
      const dataToBeSaved = JSON.stringify(data);

      const notesData = [`${date.dateString}`, dataToBeSaved];
      const oldDates = await AsyncStorage.getItem("marked_dates");
      // console.log("old dates=>", oldDates);
      if (oldDates !== null) {
        console.log("oldDates =>", oldDates);
        const parsedDates = JSON.parse(oldDates);
        console.log("parsed Dates =>", parsedDates[0]);
        parsedDates.push(date.dateString);

        var dates = ["marked_dates", JSON.stringify(parsedDates)];
        const obj = {};
        obj[date.dateString] = { selected: true, selectedColor: "#c44569" };
        // console.log(obj);
        this.props.route.params.marked(obj);
        console.log("parsed Dates =>", parsedDates);
      } else {
        var dates = ["marked_dates", JSON.stringify([date.dateString])];
        const obj = {};
        obj[date.dateString] = { selected: true, selectedColor: "#c44569" };
        // console.log(obj);
        this.props.route.params.marked(obj);
      }
      // const dates = [date];

      // console.log(date.dateString);

      try {
        // console.log(dates);
        await AsyncStorage.multiSet([notesData, dates]);
        showMessage({
          message: "Changes Saved ...!",
          floating: true,
          position: "top",
          icon: "success",
          type: "success",
          animationDuration: 350,
          duration: 1200,
          titleStyle: { fontSize: 16, fontWeight: "bold" },
        });
      } catch (error) {
        console.log(error);
        showMessage({
          message: "Error Occurred...!",
          floating: true,
          position: "top",
          icon: "danger",
          type: "danger",
          animationDuration: 350,
          duration: 1200,
          titleStyle: { fontSize: 16, fontWeight: "bold" },
        });
      }
    }

    console.log(data);
  };

  render() {
    YellowBox.ignoreWarnings([
      "Non-serializable values were found in the navigation state",
    ]);
    const {
      date,
      events,
      evePlan,
      insights,
      bodyTemp,
      fluid,
      changes,
      loading,
    } = this.state;

    if (date !== 0 && loading !== true) {
      return (
        <ScrollView style={styles.container}>
          {/* <Text>Notes {date.dateString} </Text> */}
          <View style={styles.notes_container}>
            <View style={styles.row}>
              <Text style={[styles.head, { width: "40%" }]}>Item</Text>
              <Text style={[styles.head, { width: "60%" }]}>
                Notes ({date.dateString}){" "}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={[styles.body, { width: "40%" }]}>
                Appointments or events
              </Text>
              <TextInput
                multiline
                numberOfLines={4}
                value={events}
                onChangeText={(events) => this.setState({ events })}
                style={[styles.input, { width: "60%" }]}
              />
            </View>
            <View style={styles.row}>
              <Text style={[styles.body, { width: "40%" }]}>
                Spiritual insights
              </Text>
              <TextInput
                multiline
                numberOfLines={4}
                style={[styles.input, { width: "60%" }]}
                value={insights}
                onChangeText={(insights) => this.setState({ insights })}
              />
            </View>
            <View style={styles.row}>
              <Text style={[styles.body, { width: "40%" }]}>
                Basal Body temperature
              </Text>
              <TextInput
                multiline
                numberOfLines={3}
                style={[styles.input, { width: "60%" }]}
                value={bodyTemp}
                onChangeText={(bodyTemp) => this.setState({ bodyTemp })}
              />
            </View>
            <View style={styles.row}>
              <Text style={[styles.body, { width: "40%" }]}>
                Cervical Fluid
              </Text>
              <TextInput
                multiline
                numberOfLines={3}
                style={[styles.input, { width: "60%" }]}
                value={fluid}
                onChangeText={(fluid) => this.setState({ fluid })}
              />
            </View>
            <View style={styles.row}>
              <Text style={[styles.body, { width: "40%" }]}>
                How well did you follow your New Eve Plan today? Your prayers,
                diet, confidence, rhythm and influence?
              </Text>
              <TextInput
                multiline
                numberOfLines={4}
                style={[styles.input, { width: "60%" }]}
                value={evePlan}
                onChangeText={(evePlan) => this.setState({ evePlan })}
              />
            </View>
            <View style={styles.row}>
              <Text style={[styles.body, { width: "40%" }]}>
                What changes do you want to make tomorrow?
              </Text>
              <TextInput
                multiline
                numberOfLines={4}
                style={[styles.input, { width: "60%" }]}
                value={changes}
                onChangeText={(changes) => this.setState({ changes })}
              />
            </View>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              marginTop: 10,
              marginHorizontal: 20,
            }}
          >
            <Button
              mode="contained"
              style={{ borderRadius: 8, backgroundColor: "#7fb069" }}
              onPress={() => this.handleNotesChange()}
            >
              Save
            </Button>
          </View>
        </ScrollView>
      );
    } else {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: Cons.statusBarHeight,
    marginHorizontal: 3,
  },
  notes_container: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    // marginVertical: 2,
  },
  head: {
    width: "50%",
    backgroundColor: "#27ae60",
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    borderColor: "#000",
    borderBottomColor: "#fff",
    borderWidth: 1,
    paddingVertical: 5,
  },
  body: {
    width: "50%",
    // backgroundColor: "#27ae60",
    // color: "white",
    fontSize: 14,
    letterSpacing: 0.5,
    // fontWeight: "bold",
    textAlign: "center",
    paddingHorizontal: 10,
    borderColor: "#000",
    borderWidth: 1,
    borderRightColor: "white",
    borderTopColor: "#fff",
    paddingVertical: 5,
    textAlignVertical: "center",
  },
  input: {
    paddingVertical: 1,
    borderColor: "#000",
    borderWidth: 1,
    borderLeftColor: "transparent",
    backgroundColor: "white",
    borderTopColor: "white",
  },
});

export default Notes;
