import React from "react";
import { View, Text, ScrollView } from "react-native";
import {
  List,
  Title,
  ActivityIndicator,
  TextInput,
  Button,
} from "react-native-paper";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-community/async-storage";
import { showMessage } from "react-native-flash-message";
class EvePlanner extends React.Component {
  state = {
    expanded: false,

    date: 0,
    month: "",
    loading: true,
    marked: {},
    marked_dates: [],
    union: "",
    confidence: "",
    diet: "",
    rhythm: "",
    influence: "",
  };

  handleUnionChange = async () => {
    const { union, month } = this.state;
    try {
      await AsyncStorage.setItem(`${month}_union`, union);
      showMessage({
        message: "Saved Changes...!",
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
  };
  handleConfidenceChange = async () => {
    const { confidence, month } = this.state;
    try {
      await AsyncStorage.setItem(`${month}_confidence`, confidence);
      showMessage({
        message: "Saved Changes...!",
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
  };
  handleDietChange = async () => {
    const { diet, month } = this.state;
    try {
      await AsyncStorage.setItem(`${month}_diet`, diet);
      showMessage({
        message: "Saved Changes...!",
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
  };
  handleRhythmChange = async () => {
    const { rhythm, month } = this.state;
    try {
      await AsyncStorage.setItem(`${month}_rhythm`, rhythm);
      showMessage({
        message: "Saved Changes...!",
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
  };
  handleInfluenceChange = async () => {
    const { influence, month } = this.state;
    try {
      await AsyncStorage.setItem(`${month}_influence`, influence);
      showMessage({
        message: "Saved Changes...!",
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
          let markedDates = await AsyncStorage.getItem("marked_dates");
          console.log("marked_datssss => ", markedDates);
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
              return (obj[date] = { selected: true, selectedColor: "#6c5ce7" });
            });
            console.log("marked_dates => ", obj);
            this.setState({
              marked: obj,
            });
          }
          this.setState({
            union,
            confidence,
            diet,
            rhythm,
            influence,
            loading: false,
          });
          console.log(union, confidence);
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
  render() {
    const {
      union,
      date,
      loading,
      confidence,
      rhythm,
      influence,
      diet,
      marked_dates,
    } = this.state;
    console.log("Marked Array=>", this.state.marked);
    if (date !== 0 && loading !== true) {
      return (
        <ScrollView
          style={{
            flex: 1,
            backgroundColor: "white",
            marginTop: Constants.statusBarHeight,
          }}
        >
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
                id="1"
                style={{
                  marginVertical: 5,
                  marginHorizontal: 10,
                  borderColor: "#777",
                  borderWidth: 1,
                  borderBottomColor: "transparent",
                }}
              >
                <View
                  style={{
                    marginHorizontal: 20,
                    paddingVertical: 5,
                    paddingBottom: 20,
                  }}
                >
                  <Text style={{ textAlign: "justify", letterSpacing: 1.2 }}>
                    How can I connect better with God this month? What is His
                    vision for my family & career at this time?
                  </Text>
                  <TextInput
                    mode="outlined"
                    label="Enter your text"
                    value={union}
                    multiline
                    numberOfLines={4}
                    style={{ marginTop: 10 }}
                    onChangeText={(union) => this.setState({ union })}
                  />
                  <Button
                    mode="contained"
                    style={{ marginTop: 10 }}
                    onPress={() => this.handleUnionChange()}
                  >
                    Save
                  </Button>
                </View>
              </List.Accordion>
              <List.Accordion
                title="My New Eve Confidence"
                id="2"
                style={{
                  marginVertical: 5,
                  marginHorizontal: 10,
                  borderColor: "#777",
                  borderWidth: 1,
                  borderBottomColor: "transparent",
                }}
              >
                <View
                  style={{
                    marginHorizontal: 20,
                    paddingVertical: 5,
                    paddingBottom: 20,
                  }}
                >
                  <Text style={{ textAlign: "justify", letterSpacing: 1.5 }}>
                    What do I need to soar like an eagle so that I can hit my
                    goals for this month?
                  </Text>
                  <TextInput
                    mode="outlined"
                    label="Enter your text"
                    value={confidence}
                    multiline
                    numberOfLines={4}
                    style={{ marginTop: 10 }}
                    onChangeText={(confidence) => this.setState({ confidence })}
                  />
                  <Button
                    mode="contained"
                    style={{ marginTop: 10 }}
                    onPress={() => this.handleConfidenceChange()}
                  >
                    Save
                  </Button>
                </View>
              </List.Accordion>
              <List.Accordion
                title="My New Eve Diet"
                id="3"
                style={{
                  marginVertical: 5,
                  marginHorizontal: 10,
                  borderColor: "#777",
                  borderWidth: 1,
                  borderBottomColor: "transparent",
                }}
              >
                <View
                  style={{
                    marginHorizontal: 20,
                    paddingVertical: 5,
                    paddingBottom: 20,
                  }}
                >
                  <Text style={{ textAlign: "justify", letterSpacing: 1.5 }}>
                    What does my body need? What changes do I need to make to my
                    diet this month?
                  </Text>
                  <TextInput
                    mode="outlined"
                    label="Enter your text"
                    value={diet}
                    multiline
                    numberOfLines={4}
                    style={{ marginTop: 10 }}
                    onChangeText={(diet) => this.setState({ diet })}
                  />
                  <Button
                    mode="contained"
                    style={{ marginTop: 10 }}
                    onPress={() => this.handleDietChange()}
                  >
                    Save
                  </Button>
                </View>
              </List.Accordion>
              <List.Accordion
                title="My New Eve Rhythm"
                id="4"
                style={{
                  marginVertical: 5,
                  marginHorizontal: 10,
                  borderColor: "#777",
                  borderWidth: 1,
                  borderBottomColor: "transparent",
                }}
              >
                <View
                  style={{
                    marginHorizontal: 20,
                    paddingVertical: 5,
                    paddingBottom: 20,
                  }}
                >
                  <Text style={{ textAlign: "justify", letterSpacing: 1.5 }}>
                    How can I support my body’s daily & month rhythms this
                    month?
                  </Text>
                  <TextInput
                    mode="outlined"
                    label="Enter your text"
                    value={rhythm}
                    multiline
                    numberOfLines={4}
                    style={{ marginTop: 10 }}
                    onChangeText={(rhythm) => this.setState({ rhythm })}
                  />
                  <Button
                    mode="contained"
                    style={{ marginTop: 10 }}
                    onPress={() => this.handleRhythmChange()}
                  >
                    Save
                  </Button>
                </View>
              </List.Accordion>
              <List.Accordion
                title="My New Eve Influence"
                id="5"
                style={{
                  marginVertical: 5,
                  marginHorizontal: 10,
                  borderColor: "#777",
                  borderWidth: 1,
                  borderBottomColor: "transparent",
                }}
              >
                <View
                  style={{
                    marginHorizontal: 20,
                    paddingVertical: 5,
                    paddingBottom: 20,
                  }}
                >
                  <Text style={{ textAlign: "justify", letterSpacing: 1.5 }}>
                    What are my career, business and relationship goals for this
                    month?
                  </Text>
                  <TextInput
                    mode="outlined"
                    label="Enter your text"
                    value={influence}
                    multiline
                    numberOfLines={4}
                    style={{ marginTop: 10 }}
                    onChangeText={(influence) => this.setState({ influence })}
                  />
                  <Button
                    mode="contained"
                    style={{ marginTop: 10 }}
                    onPress={() => this.handleInfluenceChange()}
                  >
                    Save
                  </Button>
                </View>
              </List.Accordion>
            </View>
          </List.Accordion>

          <List.Accordion title="My New Eve Daily Planner " id="2">
            <List.Item title="Item 2" />
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
                  console.log("date", date);
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

export default EvePlanner;
