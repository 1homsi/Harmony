import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "react-native-elements";
import { db } from "../../../firebase";
import BottomNav from "../../components/BottomNav";
import { FlatList, ScrollView } from "react-native-web";

const Tutoring = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.bigMain}>
      <View style={styles.topNav}>
        <Text style={styles.title}>Tutoring</Text>
      </View>
      {/* <ScrollView> */}
      {/* <FlatList> */}
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("MainServ", { id: "pre-k tutors" })
          }
          style={styles.button}
        >
          <Text style={styles.buttonText}>Pre-k Tutors</Text>
          <Icon
            style={styles.icon}
            color="gray"
            name="keyboard-arrow-right"
            type="materialicons"
            size={35}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("MainServ", { id: "elementary tutors" })
          }
          style={styles.button}
        >
          <Text style={styles.buttonText}>Elementary Tutors</Text>
          <Icon
            style={styles.icon}
            color="gray"
            name="keyboard-arrow-right"
            type="materialicons"
            size={35}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("MainServ", { id: "subject tutors" })
          }
          style={styles.button}
        >
          <Text style={styles.buttonText}>Subject Tutors</Text>
          <Icon
            style={styles.icon}
            color="gray"
            name="keyboard-arrow-right"
            type="materialicons"
            size={35}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("MainServ", { id: "general tutors" })
          }
          style={styles.button}
        >
          <Text style={styles.buttonText}>General Tutors </Text>
          <Icon
            style={styles.icon}
            color="gray"
            name="keyboard-arrow-right"
            type="materialicons"
            size={35}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("MainServ", { id: "homework helpers" })
          }
          style={styles.button}
        >
          <Text style={styles.buttonText}>Homework Helpers</Text>
          <Icon
            style={styles.icon}
            color="gray"
            name="keyboard-arrow-right"
            type="materialicons"
            size={35}
          />
        </TouchableOpacity>
      </View>
      {/* </FlatList> */}
      {/* </ScrollView> */}
      <BottomNav />
    </SafeAreaView >
  );
};

export default Tutoring;

const styles = StyleSheet.create({
  bigMain: {
    flex: 1,
  },
  topNav: {
    flexDirection: "row",
    textAlign: "center",
    marginBottom: 10,
    marginTop: 15,
    paddingBottom: 10,
    paddingTop: 10,
  },
  title: {
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 10,
    fontSize: 40,
    fontWeight: "800",
    color: "#000",
  },
  button: {
    backgroundColor: "#89CFF0",
    padding: 17,
    borderRadius: 10,
    width: "90%",
    // justifyContent: "center",
    // alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
    
    height: 100,
  },
  buttonText: {
    color: "black",
    fontWeight: "700",
    fontSize: 20,
    marginTop: 17,
    marginBottom: -20,
    width: "60%",
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  icon: {
    width: "195%",
    right: 0,
    top: -10,
    color: "gray",
    fontSize: 35,
    fontWeight: "700",
    alignItems: "center",
    justifyContent: "center",
  },
});

