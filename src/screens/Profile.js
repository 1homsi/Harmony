import { StyleSheet, Text, View, SafeAreaView, FlatList } from "react-native";
import Items from "../components/Items";
import React from "react";

const Profile = () => {
  return (
    <SafeAreaView>
      <View style={styles.Top}>
        <Text style={styles.HeadTitlte}>Profile</Text>
      </View>
      <View style={styles.ListView}>
        <View style={styles.image}></View>
        <View>
          <Text style={styles.dataName}>Ali Fouani</Text>
          <Text style={styles.dataEmail}>fouani_2002@hotmail.com</Text>
        </View>
      </View>
      <View style={styles.ListView2}>
        <Text>My name</Text>
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  HeadTitlte: {
    fontSize: 30,
    fontWeight: "800",
    color: "#000",
  },

  Top: {
    width: "100%",
    marginTop: 20,
    flexDirection: "row",
    textAlign: "center",
    marginBottom: 12,
    marginTop: 40,
    paddingBottom: 10,
    paddingTop: 10,
  },

  ListView: {
    flexDirection: "row",
    width: "80%",
    marginTop: 20,
    marginLeft: "10%",
    backgroundColor: "gray",
    height: "10%",
    marginBottom: 20,
    borderRadius: 10,
    paddingLeft: 15,
    paddingTop: -50,
  },

    ListView2: {
    width: "80%",
    marginBottom: 100,
    // alignContent: "center",
    // justifyContent: "center",
    // flex: 1,
    // backgroundColor: "gray",
    // // height: "10%",
    // marginBottom: 550,
    // borderRadius: 10,
    },
    
//   container: {
//     flex: 1,
//     // justifyContent: "center",
//     // alignItems: "center",
//   },

  image: {
    width: "20%",
    height: "70%",
    marginTop: "4.5%",
    borderRadius: 50,
    backgroundColor: "white",
  },

  dataName: {
    color: "white",
    fontSize: 15,
    marginLeft: "10%",
    marginTop: "7%",
  },

  dataEmail: {
    color: "white",
    fontSize: 15,
    marginLeft: "10%",
    marginTop: "5%",
  },
});
