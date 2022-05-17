import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { auth, db } from "../../firebase";
import BirthdayPicker from "../components/BirthdayPicker";

const Contract = ({ route }) => {
  const { id } = route.params;
  const [data, setData] = React.useState([]);
  const navigation = useNavigation();
  const [details, setDetails] = useState("");
  const [price, setPrice] = useState("");
  const [notes, setNotes] = useState("");

  //Date
  const [day, setDay] = useState("1");
  const [month, setMonth] = useState("1");
  const [year, setYear] = useState("2022");

  React.useEffect(() => {
    db.collection("Users")
      .doc(auth.currentUser?.email)
      .get()
      .then((doc) => {
        setData(doc.data());
      });
    return () => {
      setData("");
    };
  }, []);

  const handleContract = () => {
    if (notes === "" || price === "" || details === "") {
      alert("Please fill all the fields");
    } else {
      db.collection("Contracts")
        .doc()
        .set({
          Name: data?.Name || "",
          Email: auth.currentUser.email,
          To: id,
          Notes: notes,
          Price: price,
          Details: details,
          Accepted: false,
          Done: false,
          Date: `${year} - ${month} - ${day}`,
        });
    }
    db.collection("Users")
      .doc(auth.currentUser?.email)
      .update({
        Credit: data?.Credit + 1,
      });
    navigation.replace("Home");
  };

  return (
    <View style={styles.container}>
      <View style={styles.topNav}>
        <Text style={styles.title}>Service Form</Text>
      </View>
      <View>
        <Text style={styles.text}>Service Details</Text>
        <TextInput
          style={styles.inputText}
          placeholder="Enter service details"
          value={details}
          onChangeText={(text) => setDetails(text)}
        />
        <Text style={styles.text}>Price</Text>
        <TextInput
          style={styles.inputText}
          keyboardType="numeric"
          placeholder="Enter suggested price"
          value={price}
          onChangeText={(text) => setPrice(text)}
        />
        <Text style={styles.text}>Notes</Text>
        <TextInput
          style={styles.inputText}
          placeholder="Enter Extra Notes"
          value={notes}
          onChangeText={(text) => setNotes(text)}
        />
        <View style={styles.DateContainer}>
          <Text style={styles.text}>Date</Text>
          <BirthdayPicker
            style={styles.DatePicker}
            selectedYear={2022}
            selectedMonth={0}
            selectedDay={27}
            yearsBack={0}
            onYearValueChange={(year, i) => setYear(year)}
            onMonthValueChange={(month, i) => setMonth(month)}
            onDayValueChange={(day, i) => setDay(day)}
          />
        </View>
        <View>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.buttonOutlineOffer}
              onPress={handleContract}
            >
              <Text style={styles.buttonText}>Send</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.replace("Home")}
              style={styles.buttonOutline}
            >
              <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Contract;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: "15%",
    textAlign: "center",
    marginBottom: "5%",
  },
  inputText: {
    borderWidth: 1,
    borderColor: "#000",
    margin: "5%",
    padding: "2%",
    paddingLeft: "5%",
    borderRadius: 10,
  },
  DateContainer: {
    marginHorizontal: "5%",
  },
  text: {
    fontSize: 15,
    marginLeft: "5%",
  },
  buttonsContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonOutlineOffer: {
    backgroundColor: "#89CFF0",
    padding: 17,
    borderRadius: 10,
    alignItems: "center",
    width: "70%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    marginTop: 60,
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
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 17,
  },
});
