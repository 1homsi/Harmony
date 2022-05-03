import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
// import { TextInput } from "react-native-paper";
import DatePicker from "react-native-datepicker";
import TimePicker from "react-native-simple-time-picker";
// import { FlatList } from "react-native-web";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const Contract = () => {
  // const [time, setTime] = useState("");
  // const [showDatePicker, setShowDatePicker] = useState(false);

  // const openDatePicker = () => {
  //   setShowDatePicker(true);
  // };

  // const onCancel = () => {
  //   // You should close the modal in here
  //   setShowDatePicker(false);
  // };

  // const onConfirm = (date) => {
  //   // You should close the modal in here
  //   setShowDatePicker(false);

  //   // The parameter 'date' is a Date object so that you can use any Date prototype method.
  //   console.log(date.getDate());
  // };
  
  const navigation = useNavigation();
  const [date, setDate] = useState("09-10-2021");
  const [selectedHours, setSelectedHours] = useState(0);
  const [selectedMinutes, setSelectedMinutes] = useState(0);

  return (
    <SafeAreaView style={styles.bigMain}>
      <View style={styles.topNav}>
        <Text style={styles.title}>Service Form</Text>
      </View>
      <View style={styles.form}>
        <View style={styles.input}>
          <Text style={styles.text}>Service Details</Text>
          <TextInput
            style={{ height: 40 }}
            placeholder="Enter service details"
            // onChangeText={(newText) => setText(newText)}
            //   defaultValue={text}
          />
        </View>
        <View style={styles.input}>
          <Text style={styles.text}>Price</Text>
          <TextInput
            style={{ height: 40 }}
            placeholder="Enter service details"
            // onChangeText={(newText) => setText(newText)}
            //   defaultValue={text}
          />
        </View>
        <View style={styles.input}>
          <Text style={styles.text}>Date</Text>
          {/* <DatePicker
          options={{
            backgroundColor: "#090C08",
            textHeaderColor: "#FFA25B",
            textDefaultColor: "#F6E7C1",
            selectedTextColor: "#fff",
            mainColor: "#F4722B",
            textSecondaryColor: "#D6C7A1",
            borderColor: "rgba(122, 146, 165, 0.1)",
          }}
          current="2020-07-13"
          selected="2020-07-23"
          mode="calendar"
          minuteInterval={30}
          style={styles.datePicker}
        /> */}
          <View style={styles.container}>
            <DatePicker
              style={styles.datePickerStyle}
              date={date}
              mode="date"
              placeholder="select date"
              format="DD/MM/YYYY"
              minDate="01-01-1900"
              maxDate="01-01-2000"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: "absolute",
                  right: -5,
                  top: 4,
                  marginLeft: 0,
                },
                dateInput: {
                  borderColor: "gray",
                  alignItems: "flex-start",
                  borderWidth: 0,
                  borderBottomWidth: 1,
                },
                placeholderText: {
                  fontSize: 17,
                  color: "gray",
                },
                dateText: {
                  fontSize: 17,
                },
              }}
              onDateChange={(date) => {
                setDate(date);
              }}
            />
          </View>
        </View>
        <View style={styles.input}>
          <Text style={styles.text}>Time</Text>
          <Text>
            Selected Time: {selectedHours}:{selectedMinutes}
          </Text>
          {/* <TimePicker
          selectedHours={selectedHours}
          //initial Hourse value
          selectedMinutes={selectedMinutes}
          //initial Minutes value
          onChange={(hours, minutes) => {
            setSelectedHours(hours);
            setSelectedMinutes(minutes);
          }}
        /> */}
        </View>
        <View style={styles.input}>
          <Text style={styles.text}>Worthy Notes</Text>
          <TextInput
            style={{ height: 40 }}
            placeholder="Enter your notes"
            // onChangeText={(newText) => setText(newText)}
            //   defaultValue={text}
          />
        </View>
        <View style={styles.buttonsContainer}>
        <TouchableOpacity
          onPress={() => navigation.replace("Home")}
          style={styles.buttonOutline}
        >
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
          <TouchableOpacity
            // onPress={() => navigation.replace("Contract")}
            style={styles.buttonOutlineOffer}
          >
            <Text style={styles.buttonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Contract;

const styles = StyleSheet.create({
  bigMain: {
    flex: 1,
  },
  topNav: {
    flexDirection: "row",
    textAlign: "center",
    marginBottom: 0,
    marginTop: 5,
    paddingBottom: 10,
    paddingTop: 10,
  },
  title: {
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 10,
    fontSize: 40,
    fontWeight: "800",
    color: "#000",
  },
  form: {
    flex: 1,
  },
  // datePicker: {
  //   marginTop: 20,
  //   marginBottom: 10,
  //   marginLeft: 10,
  //   fontSize: 40,
  //   fontWeight: "800",
  //   color: "#000",
  //   borderColor: "rgba(122, 146, 165, 0.1)",
  //   borderWidth: 1,
  //   borderRadius: 10,
  //   width: "100%",
  //   marginTop: 10,
  //   borderBottomColor: "gray",
  //   borderBottomWidth: 1.5,
  //   backgroundColor: "#090C08",
  //   height: "10%",
  // },
  datePickerStyle: {
    width: 250,
    position: "relative",
  },
  container: {
    // flex: 1,
    padding: 5,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "transparent",
    width: "100%",
  },
  timePickerStyle: {
    width: "100%",
    padding: 0,
    margin: 0,
  },
  input: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 10,
    // alignContent: "center",
    // alignItems: "center",
    // justifyContent: "center",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: "white",
    height: "15%",
    width: "90%",
    marginTop: 10,
    borderBottomColor: "gray",
    borderBottomWidth: 1.5,
  },
  text: {
    fontSize: 18,
    fontWeight: "900",
    color: "#89CFF0",
    marginLeft: 0,
    marginTop: 3,
    marginBottom: 0,
    marginRight: 10,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    bottom: 20,
  },
  buttonOutlineOffer: {
    backgroundColor: "#89CFF0",
    padding: 17,
    borderRadius: 10,
    alignItems: "center",
    width: "40%",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 15,
    marginBottom: 45,
    height: 60,
  },
  buttonOutline: {
    backgroundColor: "gray",
    padding: 17,
    borderRadius: 10,
    alignItems: "center",
    width: "40%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    height: 60,
    marginBottom: 65,
    marginRight: 15,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 17,
  },
});
