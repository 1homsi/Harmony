import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Text,
  View,
} from "react-native";

const RegisterScreen = () => {
  const navigation = useNavigation();


  const HandleOption = (option) => {
    navigation.navigate("RegisterTwo", { option: option });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.HeadTitlte}>Choose Job</Text>
      <TouchableOpacity style={styles.Card} onPress={() => HandleOption("Worker")}>
        <Text style={styles.CardTitle}>Worker</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.Card} onPress={() => HandleOption("Customer")}>
        <Text style={styles.CardTitle}>Customer</Text>
      </TouchableOpacity>
      <View style={styles.ReturnView}>
        <Text
          style={styles.Return}
          onPress={() => {
            navigation.replace("Login");
          }}
        >
          Already have an account?
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    
  },
  HeadTitlte: {
    marginTop: "10%",
    marginBottom: "5%",
    marginLeft: "4%",
    fontSize: 30,
    fontWeight: "900",
    color: "#000",
  },
  Card: {
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    height: "8%",
    backgroundColor: "#FA7D09",
    borderRadius: 12,
    marginTop: 10,
    marginBottom: 20,
    marginLeft: "5%",
    marginRight: "5%",
    paddingBottom: 70,
    paddingTop: 70,
    paddingLeft: 60,
    paddingRight: 60,
  },
  CardTitle: {
    marginLeft: "4%",
    fontSize: 25,
    fontWeight: "800",
    color: "#000",
  },
  Return: {
    marginTop: "50%",
    fontWeight: "bold",
    color: "#003f5c",
    marginTop: 20,
  },
  ReturnView: {
    fontWeight: "bold",
    color: "#fff",
    marginTop: 300,
  },
});
