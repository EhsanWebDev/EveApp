import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import {
  List,
  Title,
  ActivityIndicator,
  TextInput,
  Button,
  Appbar,
} from "react-native-paper";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-community/async-storage";
import { showMessage } from "react-native-flash-message";
import Cons from "expo-constants";
class EvePlanner extends React.Component {
  state = {
    expanded: false,

    date: 0,
    month: "",
    loading: true,
    marked: {},
    marked_dates: [],

    union: "",
    unionVal: false,
    confidence: "",
    confidenceVal: false,
    diet: "",
    dietVal: false,
    rhythm: "",
    rhythmVal: false,
    influence: "",
    influenceVal: false,

    five_to_six: "",
    six_to_seven: "",
    seven_to_eight: "",
    eight_to_nine: "",
    nine_to_ten: "",
    ten_to_eleven: "",
    eleven_to_twelve_pm: "",
    twelve_to_one_pm: "",
    one_to_two_pm: "",
    two_to_three_pm: "",
    three_to_four_pm: "",
    four_to_five_pm: "",
    five_to_six_pm: "",
    six_to_seven_pm: "",
    seven_to_eight_pm: "",
  };

  handleUnionChange = async () => {
    const { union, unionVal, month } = this.state;
    if (unionVal) {
      this.setState({ unionVal: false });
    } else {
      try {
        this.setState({ unionVal: true });
        await AsyncStorage.setItem(`${month}_union`, union);
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
  };
  handleConfidenceChange = async () => {
    const { confidence, month, confidenceVal } = this.state;
    if (confidenceVal) {
      this.setState({
        confidenceVal: false,
      });
    } else {
      try {
        this.setState({
          confidenceVal: true,
        });
        await AsyncStorage.setItem(`${month}_confidence`, confidence);
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
  };
  handleDietChange = async () => {
    const { diet, dietVal, month } = this.state;
    if (dietVal) {
      this.setState({ dietVal: false });
    } else {
      try {
        this.setState({ dietVal: true });
        await AsyncStorage.setItem(`${month}_diet`, diet);
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
  };
  handleRhythmChange = async () => {
    const { rhythm, rhythmVal, month } = this.state;
    if (rhythmVal) {
      this.setState({ rhythmVal: false });
    } else {
      try {
        this.setState({ rhythmVal: true });
        await AsyncStorage.setItem(`${month}_rhythm`, rhythm);
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
  };
  handleInfluenceChange = async () => {
    const { influence, influenceVal, month } = this.state;
    if (influenceVal) {
      this.setState({ influenceVal: false });
    } else {
      try {
        this.setState({ influenceVal: true });
        await AsyncStorage.setItem(`${month}_influence`, influence);
        showMessage({
          message: "Changes Saved...!",
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
  };
  async componentDidMount() {
    console.log("Date=>", this.props.route.params.date);
    this.setState(
      {
        date: this.props.route.params.date,
        month: this.props.route.params.month,
      },
      async () => {
        try {
          let union = await AsyncStorage.getItem(`${this.state.month}_union`);
          let diet = await AsyncStorage.getItem(`${this.state.month}_diet`);
          let rhythm = await AsyncStorage.getItem(`${this.state.month}_rhythm`);
          let daily = await AsyncStorage.getItem(`${this.state.month}_daily`);
          if (daily !== null) {
            let parsedDaily = JSON.parse(daily);

            let {
              five_to_six,
              six_to_seven,
              seven_to_eight,
              eight_to_nine,
              nine_to_ten,
              ten_to_eleven,
              eleven_to_twelve_pm,
              twelve_to_one_pm,
              one_to_two_pm,
              two_to_three_pm,
              three_to_four_pm,
              four_to_five_pm,
              five_to_six_pm,
              six_to_seven_pm,
              seven_to_eight_pm,
            } = parsedDaily;
            this.setState({
              five_to_six,
              six_to_seven,
              seven_to_eight,
              eight_to_nine,
              nine_to_ten,
              ten_to_eleven,
              eleven_to_twelve_pm,
              twelve_to_one_pm,
              one_to_two_pm,
              two_to_three_pm,
              three_to_four_pm,
              four_to_five_pm,
              five_to_six_pm,
              six_to_seven_pm,
              seven_to_eight_pm,
            });
          }

          let markedDates = await AsyncStorage.getItem("marked_dates");

          // console.log("marked_datssss => ", markedDates);
          let influence = await AsyncStorage.getItem(
            `${this.state.month}_influence`
          );
          let confidence = await AsyncStorage.getItem(
            `${this.state.month}_confidence`
          );
          if (markedDates !== null) {
            var obj = {};
            const parsedDates = JSON.parse(markedDates);
            console.log("parsed_dats => ", parsedDates);
            parsedDates.map((date) => {
              return (obj[date] = { selected: true, selectedColor: "#c44569" });
            });
            console.log("marked_dates => ", obj);
            this.setState({
              marked: obj,
            });
          }
          if (union !== null) {
            this.setState({ unionVal: true });
          }
          if (confidence !== null) {
            this.setState({ confidenceVal: true });
          }
          if (rhythm !== null) {
            this.setState({ rhythmVal: true });
          }
          if (diet !== null) {
            this.setState({ dietVal: true });
          }
          if (influence !== null) {
            this.setState({ influenceVal: true });
          }
          this.setState({
            union,
            confidence,
            diet,
            rhythm,
            influence,
            loading: false,
          });
          // console.log(union, confidence);
        } catch (error) {
          console.log(error);
        }
      }
    );
    // console.log(this.props.route.params);
  }
  setMarked = (date) => {
    this.setState({ marked: { ...this.state.marked, date } });
  };
  saveTime = async () => {
    const {
      five_to_six,
      six_to_seven,
      seven_to_eight,
      eight_to_nine,
      nine_to_ten,
      ten_to_eleven,
      eleven_to_twelve_pm,
      twelve_to_one_pm,
      one_to_two_pm,
      two_to_three_pm,
      three_to_four_pm,
      four_to_five_pm,
      five_to_six_pm,
      six_to_seven_pm,
      seven_to_eight_pm,

      month,
    } = this.state;

    const data = JSON.stringify({
      five_to_six,
      six_to_seven,
      seven_to_eight,
      eight_to_nine,
      nine_to_ten,
      ten_to_eleven,
      eleven_to_twelve_pm,
      twelve_to_one_pm,
      one_to_two_pm,
      two_to_three_pm,
      three_to_four_pm,
      four_to_five_pm,
      five_to_six_pm,
      six_to_seven_pm,
      seven_to_eight_pm,
    });

    try {
      await AsyncStorage.setItem(`${month}_daily`, data);
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

    console.log(data);
  };
  render() {
    const {
      union,
      unionVal,
      confidenceVal,
      dietVal,
      influenceVal,
      rhythmVal,
      date,
      loading,
      confidence,
      rhythm,
      influence,
      diet,
      marked_dates,
      month,
      five_to_six,
      six_to_seven,
      seven_to_eight,
      eight_to_nine,
      nine_to_ten,
      ten_to_eleven,
      eleven_to_twelve_pm,
      twelve_to_one_pm,
      one_to_two_pm,
      two_to_three_pm,
      three_to_four_pm,
      four_to_five_pm,
      five_to_six_pm,
      six_to_seven_pm,
      seven_to_eight_pm,
    } = this.state;
    console.log("Marked Array=>", this.state.marked);
    if (date !== 0 && loading !== true) {
      return (
        <ScrollView
          style={{
            flex: 1,
            backgroundColor: "white",
            // marginTop: Constants.statusBarHeight,
          }}
        >
          <Appbar.Header style={{ backgroundColor: "#9A1458" }}>
            <Appbar.Content title="Bridget Marie" subtitle={month} />
          </Appbar.Header>
          {/* My Monthly Goals */}
          <List.Accordion title="My Monthly Goals" id="1">
            <View
              style={{
                marginHorizontal: 5,
                paddingBottom: 20,
              }}
            >
              <List.Accordion
                title="My New Eve Union"
                titleStyle={{ color: "white" }}
                id="1"
                style={{
                  marginVertical: 10,
                  marginHorizontal: 10,
                  borderColor: "#777",
                  borderWidth: 1,
                  backgroundColor: "#9A1458",

                  // borderColor: "transparent",
                }}
              >
                <View
                  style={{
                    marginHorizontal: 10,
                    paddingVertical: 15,
                    paddingHorizontal: 15,
                    borderColor: "#000",
                    borderWidth: 1,
                    paddingBottom: 20,
                  }}
                >
                  <Text style={{ textAlign: "justify", letterSpacing: 1.2 }}>
                    How can I connect better with God this month? What is His
                    vision for my family & career at this time?
                  </Text>
                  <TextInput
                    mode={unionVal ? "flat" : "outlined"}
                    label={unionVal ? "" : "Enter your text"}
                    value={union}
                    disabled={unionVal ? true : false}
                    multiline
                    numberOfLines={3}
                    style={styles.goalsInput}
                    onChangeText={(union) => this.setState({ union })}
                  />
                  <Button
                    mode="contained"
                    style={[
                      styles.goalsBtn,
                      {
                        backgroundColor: "#7fb069",
                      },
                    ]}
                    onPress={() => this.handleUnionChange()}
                  >
                    {unionVal ? "Edit" : "Save"}
                  </Button>
                </View>
              </List.Accordion>
              <List.Accordion
                title="My New Eve Confidence"
                titleStyle={{ color: "white" }}
                id="2"
                style={{
                  marginVertical: 5,
                  marginHorizontal: 10,
                  borderColor: "#777",
                  borderWidth: 1,
                  backgroundColor: "#9A1458",
                }}
              >
                <View
                  style={{
                    marginHorizontal: 10,

                    paddingBottom: 20,
                    paddingVertical: 15,
                    paddingHorizontal: 15,
                    borderColor: "#000",
                    borderWidth: 1,
                  }}
                >
                  <Text style={{ textAlign: "justify", letterSpacing: 1.5 }}>
                    What do I need to soar like an eagle so that I can hit my
                    goals for this month?
                  </Text>
                  <TextInput
                    mode={confidenceVal ? "flat" : "outlined"}
                    label={confidenceVal ? "" : "Enter your text"}
                    value={confidence}
                    multiline
                    numberOfLines={3}
                    style={styles.goalsInput}
                    onChangeText={(confidence) => this.setState({ confidence })}
                  />
                  <Button
                    mode="contained"
                    style={[
                      styles.goalsBtn,
                      {
                        backgroundColor: "#7fb069",
                      },
                    ]}
                    onPress={() => this.handleConfidenceChange()}
                  >
                    {confidenceVal ? "Edit" : "save"}
                  </Button>
                </View>
              </List.Accordion>
              <List.Accordion
                title="My New Eve Diet"
                titleStyle={{ color: "white" }}
                id="3"
                style={{
                  marginVertical: 5,
                  marginHorizontal: 10,
                  borderColor: "#777",
                  borderWidth: 1,
                  backgroundColor: "#9A1458",
                }}
              >
                <View
                  style={{
                    marginHorizontal: 10,
                    paddingVertical: 15,
                    paddingHorizontal: 15,
                    borderColor: "#000",
                    borderWidth: 1,
                    paddingBottom: 20,
                  }}
                >
                  <Text style={{ textAlign: "justify", letterSpacing: 1.5 }}>
                    What does my body need? What changes do I need to make to my
                    diet this month?
                  </Text>
                  <TextInput
                    mode={dietVal ? "flat" : "outlined"}
                    label={dietVal ? "" : "Enter your text"}
                    value={diet}
                    multiline
                    numberOfLines={3}
                    style={styles.goalsInput}
                    onChangeText={(diet) => this.setState({ diet })}
                  />
                  <Button
                    mode="contained"
                    style={[
                      styles.goalsBtn,
                      {
                        backgroundColor: "#7fb069",
                      },
                    ]}
                    onPress={() => this.handleDietChange()}
                  >
                    {dietVal ? "Edit" : "save"}
                  </Button>
                </View>
              </List.Accordion>
              <List.Accordion
                title="My New Eve Rhythm"
                titleStyle={{ color: "white" }}
                id="4"
                style={{
                  marginVertical: 5,
                  marginHorizontal: 10,
                  borderColor: "#777",
                  borderWidth: 1,
                  backgroundColor: "#9A1458",
                }}
              >
                <View
                  style={{
                    marginHorizontal: 10,
                    paddingVertical: 15,
                    paddingHorizontal: 15,
                    borderColor: "#000",
                    borderWidth: 1,
                    paddingBottom: 20,
                  }}
                >
                  <Text style={{ textAlign: "justify", letterSpacing: 1.5 }}>
                    How can I support my body’s daily & month rhythms this
                    month?
                  </Text>
                  <TextInput
                    mode={rhythmVal ? "flat" : "outlined"}
                    label={rhythmVal ? "" : "Enter your text"}
                    value={rhythm}
                    multiline
                    numberOfLines={3}
                    style={styles.goalsInput}
                    onChangeText={(rhythm) => this.setState({ rhythm })}
                  />
                  <Button
                    mode="contained"
                    style={[
                      styles.goalsBtn,
                      {
                        backgroundColor: "#7fb069",
                      },
                    ]}
                    onPress={() => this.handleRhythmChange()}
                  >
                    {rhythmVal ? "Edit" : "save"}
                  </Button>
                </View>
              </List.Accordion>
              <List.Accordion
                title="My New Eve Influence"
                titleStyle={{ color: "white" }}
                id="5"
                style={{
                  marginVertical: 5,
                  marginHorizontal: 10,
                  borderColor: "#777",
                  borderWidth: 1,
                  backgroundColor: "#9A1458",
                }}
              >
                <View
                  style={{
                    marginHorizontal: 10,
                    paddingVertical: 15,
                    paddingHorizontal: 15,
                    borderColor: "#000",
                    borderWidth: 1,
                    paddingBottom: 20,
                  }}
                >
                  <Text style={{ textAlign: "justify", letterSpacing: 1.5 }}>
                    What are my career, business and relationship goals for this
                    month?
                  </Text>
                  <TextInput
                    mode={influenceVal ? "flat" : "outlined"}
                    label={influenceVal ? "" : "Enter your text"}
                    value={influence}
                    multiline
                    numberOfLines={3}
                    style={styles.goalsInput}
                    onChangeText={(influence) => this.setState({ influence })}
                  />
                  <Button
                    mode="contained"
                    style={[
                      styles.goalsBtn,
                      {
                        backgroundColor: "#7fb069",
                      },
                    ]}
                    onPress={() => this.handleInfluenceChange()}
                  >
                    {influenceVal ? "Edit" : "save"}
                  </Button>
                </View>
              </List.Accordion>
            </View>
          </List.Accordion>

          <List.Accordion title="My New Eve Daily Planner " id="2">
            <View style={styles.container}>
              {/* <Text>Notes {date.dateString} </Text> */}
              <View style={styles.notes_container}>
                <Title
                  numberOfLines={2}
                  style={{
                    marginHorizontal: 10,
                    fontSize: 18,
                    fontWeight: "bold",
                    letterSpacing: 1,
                    textAlign: "center",
                  }}
                >
                  Convert your New Eve Monthly Goals into a Daily Plan
                </Title>
                <View style={styles.row}>
                  <Text style={[styles.head, { width: "35%" }]}>
                    Time of Day
                  </Text>
                  <Text style={[styles.head, { width: "65%" }]}>Activity</Text>
                </View>
                <View style={styles.row}>
                  <Text
                    style={[
                      styles.body,
                      {
                        width: "35%",
                      },
                    ]}
                  >
                    5am – 6am
                  </Text>
                  <TextInput
                    multiline
                    // numberOfLines={2}
                    // mode="outlined"

                    value={five_to_six}
                    onChangeText={(five_to_six) =>
                      this.setState({ five_to_six })
                    }
                    style={[styles.input, { width: "65%" }]}
                  />
                </View>
                <View style={styles.row}>
                  <Text style={[styles.body, { width: "35%" }]}>6am – 7am</Text>
                  <TextInput
                    multiline
                    value={six_to_seven}
                    onChangeText={(six_to_seven) =>
                      this.setState({ six_to_seven })
                    }
                    style={[styles.input, { width: "65%" }]}
                  />
                </View>
                <View style={styles.row}>
                  <Text style={[styles.body, { width: "35%" }]}>7am – 8am</Text>
                  <TextInput
                    multiline
                    value={seven_to_eight}
                    onChangeText={(seven_to_eight) =>
                      this.setState({ seven_to_eight })
                    }
                    style={[styles.input, { width: "65%" }]}
                  />
                </View>
                <View style={styles.row}>
                  <Text style={[styles.body, { width: "35%" }]}>8am – 9am</Text>
                  <TextInput
                    multiline
                    value={eight_to_nine}
                    onChangeText={(eight_to_nine) =>
                      this.setState({ eight_to_nine })
                    }
                    style={[styles.input, { width: "65%" }]}
                  />
                </View>
                <View style={styles.row}>
                  <Text style={[styles.body, { width: "35%" }]}>
                    9am – 10am
                  </Text>
                  <TextInput
                    multiline
                    value={nine_to_ten}
                    onChangeText={(nine_to_ten) =>
                      this.setState({ nine_to_ten })
                    }
                    style={[styles.input, { width: "65%" }]}
                  />
                </View>
                <View style={styles.row}>
                  <Text style={[styles.body, { width: "35%" }]}>
                    10am – 11am
                  </Text>
                  <TextInput
                    multiline
                    value={ten_to_eleven}
                    onChangeText={(ten_to_eleven) =>
                      this.setState({ ten_to_eleven })
                    }
                    style={[styles.input, { width: "65%" }]}
                  />
                </View>
                <View style={styles.row}>
                  <Text style={[styles.body, { width: "35%" }]}>
                    11am – 12pm
                  </Text>
                  <TextInput
                    multiline
                    value={eleven_to_twelve_pm}
                    onChangeText={(eleven_to_twelve_pm) =>
                      this.setState({ eleven_to_twelve_pm })
                    }
                    style={[styles.input, { width: "65%" }]}
                  />
                </View>
                <View style={styles.row}>
                  <Text style={[styles.body, { width: "35%" }]}>
                    12pm – 1pm
                  </Text>
                  <TextInput
                    multiline
                    value={twelve_to_one_pm}
                    onChangeText={(twelve_to_one_pm) =>
                      this.setState({ twelve_to_one_pm })
                    }
                    style={[styles.input, { width: "65%" }]}
                  />
                </View>
                <View style={styles.row}>
                  <Text style={[styles.body, { width: "35%" }]}>1pm – 2pm</Text>
                  <TextInput
                    multiline
                    value={one_to_two_pm}
                    onChangeText={(one_to_two_pm) =>
                      this.setState({ one_to_two_pm })
                    }
                    style={[styles.input, { width: "65%" }]}
                  />
                </View>
                <View style={styles.row}>
                  <Text style={[styles.body, { width: "35%" }]}>2pm – 3pm</Text>
                  <TextInput
                    multiline
                    value={two_to_three_pm}
                    onChangeText={(two_to_three_pm) =>
                      this.setState({ two_to_three_pm })
                    }
                    style={[styles.input, { width: "65%" }]}
                  />
                </View>
                <View style={styles.row}>
                  <Text style={[styles.body, { width: "35%" }]}>3pm – 4pm</Text>
                  <TextInput
                    multiline
                    value={three_to_four_pm}
                    onChangeText={(three_to_four_pm) =>
                      this.setState({ three_to_four_pm })
                    }
                    style={[styles.input, { width: "65%" }]}
                  />
                </View>
                <View style={styles.row}>
                  <Text style={[styles.body, { width: "35%" }]}>4pm – 5pm</Text>
                  <TextInput
                    multiline
                    value={four_to_five_pm}
                    onChangeText={(four_to_five_pm) =>
                      this.setState({ four_to_five_pm })
                    }
                    style={[styles.input, { width: "65%" }]}
                  />
                </View>
                <View style={styles.row}>
                  <Text style={[styles.body, { width: "35%" }]}>5pm – 6pm</Text>
                  <TextInput
                    multiline
                    value={five_to_six_pm}
                    onChangeText={(five_to_six_pm) =>
                      this.setState({ five_to_six_pm })
                    }
                    style={[styles.input, { width: "65%" }]}
                  />
                </View>
                <View style={styles.row}>
                  <Text style={[styles.body, { width: "35%" }]}>6pm – 7pm</Text>
                  <TextInput
                    multiline
                    value={six_to_seven_pm}
                    onChangeText={(six_to_seven_pm) =>
                      this.setState({ six_to_seven_pm })
                    }
                    style={[styles.input, { width: "65%" }]}
                  />
                </View>
                <View style={styles.row}>
                  <Text style={[styles.body, { width: "35%" }]}>7pm – 8pm</Text>
                  <TextInput
                    multiline
                    value={seven_to_eight_pm}
                    onChangeText={(seven_to_eight_pm) =>
                      this.setState({ seven_to_eight_pm })
                    }
                    style={[styles.input, { width: "65%" }]}
                  />
                </View>
              </View>
              <View style={{ marginTop: 30, marginHorizontal: 40 }}>
                <Button
                  mode="contained"
                  onPress={() => this.saveTime()}
                  style={{ backgroundColor: "#7fb069" }}
                >
                  SAVE CHANGES
                </Button>
              </View>
            </View>
          </List.Accordion>

          <Calendar
            // Initially visible month. Default = Date()
            current={date}
            // current={"2012-03-01"}
            // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
            // minDate={"2012-05-10"}
            // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
            // maxDate={"2012-05-30"}
            // Handler which gets executed on day press. Default = undefined
            onDayPress={(day) => {
              console.log("selected day", day);
              this.props.navigation.navigate("Notes", {
                day,
                marked: (data) => {
                  // console.log("date", date);
                  this.setState({ marked: { ...this.state.marked, ...data } });
                },
              });
            }}
            markedDates={this.state.marked}
            // Handler which gets executed on day long press. Default = undefined
            onDayLongPress={(day) => {
              console.log("selected day", day);
            }}
            // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
            monthFormat={"yyyy MM"}
            // Handler which gets executed when visible month changes in calendar. Default = undefined
            onMonthChange={(month) => {
              console.log("month changed", month);
            }}
            // Hide month navigation arrows. Default = false
            hideArrows={true}
            // Replace default arrows with custom ones (direction can be 'left' or 'right')
            // renderArrow={(direction) => <Arrow />}
            // Do not show days of other months in month page. Default = false
            hideExtraDays={true}
            // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
            // day from another month that is visible in calendar page. Default = false
            // disableMonthChange={true}
            // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
            // firstDay={1}
            // Hide day names. Default = false
            // hideDayNames={true}
            // Show week numbers to the left. Default = false
            // showWeekNumbers={true}
            // Handler which gets executed when press arrow icon left. It receive a callback can go back month
            // onPressArrowLeft={(subtractMonth) => subtractMonth()}
            // Handler which gets executed when press arrow icon right. It receive a callback can go next month
            // onPressArrowRight={(addMonth) => addMonth()}
            // Disable left arrow. Default = false
            // disableArrowLeft={true}
            // Disable right arrow. Default = false
            // disableArrowRight={true}
            // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
            disableAllTouchEventsForDisabledDays={true}
            /** Replace default month and year title with custom one. the function receive a date as parameter. */
            renderHeader={(date) => {
              const monthNames = [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ];

              /*Return JSX*/
              return (
                <Title style={{ color: "#3498db" }}>
                  {monthNames[date.getMonth()]}, {date.getFullYear()}
                </Title>
              );
            }}
          />
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
  },
  notes_container: {
    flex: 1,
    marginHorizontal: 10,
  },
  row: {
    flexDirection: "row",
    overflow: "hidden",
    alignItems: "center",
    borderColor: "#000",
    borderWidth: 1,
    // marginVertical: 2,
  },
  head: {
    width: "50%",
    backgroundColor: "#27ae60",
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    // borderColor: "#000",
    // borderBottomColor: "#fff",
    // borderWidth: 1,
    paddingVertical: 5,
  },
  body: {
    width: "50%",
    // backgroundColor: "#27ae60",
    // color: "white",
    fontSize: 14,

    letterSpacing: 1,
    // fontWeight: "bold",
    textAlign: "center",
    paddingHorizontal: 5,
    // borderColor: "#000",
    // borderWidth: 4,
    // borderRightColor: "#000",
    // borderTopColor: "#fff",
    // paddingVertical: 5,
    textAlignVertical: "center",
    // height: 45,
    height: "100%",
    borderRightColor: "#111",
    borderRightWidth: 1,
  },
  goalsInput: {
    marginVertical: 16,
    fontSize: 18,
    backgroundColor: "white",
  },
  goalsBtn: {
    marginVertical: 10,
    marginHorizontal: 30,
    borderRadius: 8,
  },
  input: {
    // paddingVertical: 1,
    // borderColor: "#000",
    // borderWidth: 1,
    // borderLeftColor: "transparent",
    backgroundColor: "white",
    borderTopColor: "white",
    // height: 40,
  },
});

export default EvePlanner;
