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

const Contract = ({ route }) => {
  const { id } = route.params;
  const [data, setData] = React.useState()
  const navigation = useNavigation();

  const [details, setDetails] = useState("");
  const [price, setPrice] = useState("");
  const [notes, setNotes] = useState("");



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
    db.collection("Contracts").doc(id).collection(auth.currentUser?.email).doc().set({
      //TODO: Fix name email and location
      Name: "",
      Email: "",
      Location: "",
      Notes: notes,
      Price: price,
      Details: details,
    })
    navigation.replace("Home")
  };


  return (
    <SafeAreaView style={styles.bigMain} >
      <View style={styles.topNav}>
        <Text style={styles.title}>Service Form</Text>
      </View>
      <ScrollView>
        <View style={styles.form}>
          <View style={styles.input}>
            <Text style={styles.text}>Service Details</Text>
            <TextInput
              style={{ height: 40 }}
              placeholder="Enter service details"
              value={details}
              onChangeText={(text) => setDetails(text)}
            />
          </View>
          <View style={styles.input}>
            <Text style={styles.text}>Price</Text>
            <TextInput
              style={{ height: 40 }}
              placeholder="Enter suggested price"
              value={price}
              onChangeText={(text) => setPrice(text)}
            />
          </View>
          <View style={styles.input}>
            <Text style={styles.text}>Notes</Text>
            <TextInput
              style={{ height: 40 }}
              placeholder="Enter Extra Notes"
              value={notes}
              onChangeText={(text) => setNotes(text)}
            />
          </View>
        </View>
      </ScrollView>
      <View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            onPress={() => navigation.replace("Home")}
            style={styles.buttonOutline}
          >
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonOutlineOffer}
            onPress={handleContract}
          >
            <Text style={styles.buttonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView >
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
    height: "30%",
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
