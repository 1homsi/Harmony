import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "react-native-elements";
import { db } from "../../../firebase";
import BottomNav from "../../components/BottomNav";

const Maintenance = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.bigMain}>
      <View style={styles.topNav}>
        <Text style={styles.title}>Maintenance</Text>
      </View>
      <View style={styles.container}>
        <TouchableOpacity
          // onPress={() =>
          //   navigation.navigate("ResetPassword", { option: "Option" })
          // }
          style={styles.button}
        >
          <Text style={styles.buttonText}>Electrician</Text>
          <Icon
            style={styles.icon}
            color="gray"
            name="keyboard-arrow-right"
            type="materialicons"
            size={35}
          />
        </TouchableOpacity>
        <TouchableOpacity
          // onPress={() =>
          //   navigation.navigate("ResetPassword", { option: "Option" })
          // }
          style={styles.button}
        >
          <Text style={styles.buttonText}>Plumber</Text>
          <Icon
            style={styles.icon}
            color="gray"
            name="keyboard-arrow-right"
            type="materialicons"
            size={35}
          />
        </TouchableOpacity>
        <TouchableOpacity
          // onPress={() =>
          //   navigation.navigate("ResetPassword", { option: "Option" })
          // }
          style={styles.button}
        >
          <Text style={styles.buttonText}>Carpenter</Text>
          <Icon
            style={styles.icon}
            color="gray"
            name="keyboard-arrow-right"
            type="materialicons"
            size={35}
          />
        </TouchableOpacity>
      </View>
      <BottomNav />
    </SafeAreaView>
  );
};

export default Maintenance;

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
    // backgroundColor: "#89CFF0",
    backgroundColor: "transparent",
    padding: 17,
    // borderRadius: 10,
    width: "100%",
    // justifyContent: "center",
    // alignItems: "center",
    marginTop: 10,
    borderBottomColor: "gray",
    borderBottomWidth: 1.5,
  },
  buttonText: {
    color: "black",
    fontWeight: "700",
    fontSize: 20,
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
