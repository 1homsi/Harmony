import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Icon, SearchBar } from "react-native-elements";
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
          onPress={() =>
            navigation.navigate("MainServ", { id: "electricians" })
          }
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
          onPress={() =>
            navigation.navigate("MainServ", { id: "plumbers" })
          }
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
          onPress={() =>
            navigation.navigate("MainServ", { id: "carpenters" })
          }
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
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("MainServ", { id: "handymen" })
          }
          style={styles.button}
        >
          <Text style={styles.buttonText}>Handy Men</Text>
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
    marginBottom: 0,
    marginTop: 15,
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
  containerSearch: {
    backgroundColor: 'transparent',
  },
  itemStyle: {
    padding: 10,
  },
  textInputStyle: {
    height: 50,
    borderWidth: 3,
    paddingLeft: 20,
    margin: 3,
    borderRadius: 10,
    borderColor: '#89CFF0',
    backgroundColor: '#fff',
  },
  // searchIcon: {
  //   position: 'absolute',
  //   top: 10,
  //   left: 10,
  //   color: 'black',
  //   fontSize: 30,
  //   fontWeight: '700',
  // },
});
