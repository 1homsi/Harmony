import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { db } from "../../firebase";

const Delivery = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Text>Delivery</Text>
    </View>
  );
};

export default Delivery;

// const styles = StyleSheet.create({
//   Container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });
