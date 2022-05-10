import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, TouchableOpacity, Text } from "react-native";

const RegisterScreen = () => {
  const navigation = useNavigation();

  const HandleOption = (option) => {
    navigation.navigate("RegisterTwo", { option: option });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.Title}>Sign Up As:</Text>
      <TouchableOpacity
        style={styles.box}
        onPress={() => HandleOption("Worker")}
      >
        <Text style={styles.boxText}>Worker</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.box}
        onPress={() => HandleOption("Customer")}
      >
        <Text style={styles.boxText}>Customer</Text>
      </TouchableOpacity>
      <Text
        style={styles.GoToLogin}
        onPress={() => {
          navigation.replace("Login");
        }}
      >
        Already a user?
      </Text>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },

  Title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#000",
    marginBottom: 30,
  },

  box: {
    width: "85%",
    height: 50,
    backgroundColor: "#89CFF0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderRadius: 10,
  },

  boxText: {
    fontSize: 20,
    fontWeight: "800",
    color: "#fff",
  },

  GoToLogin: {
    fontWeight: "bold",
    marginBottom: 25,
    color: "#003f5c",
    fontSize: 18,
  },
});
