import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Text,
} from "react-native";

const RegisterScreen = () => {
  const navigation = useNavigation();


  const HandleOption = (option) => {
    navigation.navigate("RegisterTwo", { option: option });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>Choose Job</Text>
      <TouchableOpacity onPress={() => HandleOption("Worker")}>
        <Text>Worker</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => HandleOption("Customer")}>
        <Text>Customer</Text>
      </TouchableOpacity>
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
});
