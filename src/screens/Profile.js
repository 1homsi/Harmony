import { StyleSheet, Text, View, SafeAreaView, FlatList, Image } from "react-native";
import Items from "../components/Items";
import React from "react";

const Profile = () => {
  return (
    <SafeAreaView>
      <View style={styles.Top}>
        <Text style={styles.HeadTitlte}>Profile</Text>
      </View>
      <View style={styles.ListView}>
        <Image source={require("../images/Profile.png")} style={styles.image}></Image>
        <View>
          <Text style={styles.dataName}>Ali Fouani</Text>
          <Text style={styles.dataEmail}>fouani_2002@hotmail.com</Text>
        </View>
      </View>
    </SafeAreaView >
  );
};

export default Profile;

const styles = StyleSheet.create({
  HeadTitlte: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    marginBottom: 15,
  },

  Top: {
    marginTop: 50,
  },

  ListView: {
    flexDirection: "row",
    width: "80%",
    marginLeft: 40,
    padding: 20,
    backgroundColor: "gray",
    alignContent: "center",
    justifyContent: "center",
    marginTop: 20,
    borderRadius: 10,
  },

  image: {
    width: "25%",
    height: 70,
    borderRadius: 50,
  },

  dataName: {
    marginTop: 10,
    color: "white",
    fontSize: 15,
    marginLeft: "10%",
  },

  dataEmail: {
    color: "white",
    fontSize: 15,
    marginLeft: "10%",
  },
});
