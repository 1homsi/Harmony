import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { auth, db } from "../../../firebase";
import { Icon } from "react-native-elements";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Otherpassword, setOtherPassword] = useState("");
  const [name, setName] = useState("");

  const navigation = useNavigation();

  return (
    <>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Text style={styles.head}>Register</Text>
        <Image
          style={styles.HeaderImage}
          source={require("../../images/Login.png")}
        />

        <View style={styles.inputContainer}>
          <TextInput
            placeholderTextColor="#003f5c"
            placeholder="Name"
            value={name}
            onChangeText={(text) => setName(text)}
            style={styles.input}
          />
          <TextInput
            placeholderTextColor="#003f5c"
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
          />
          <TextInput
            placeholderTextColor="#003f5c"
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.input}
            secureTextEntry
          />
          <TextInput
            placeholderTextColor="#003f5c"
            placeholder="Repeat Password"
            value={Otherpassword}
            onChangeText={(text) => setOtherPassword(text)}
            style={styles.input}
            secureTextEntry
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("RegisterTwo")} style={styles.button}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
        <Text
          style={styles.GoToLogin}
          onPress={() => {
            navigation.replace("Login");
          }}
        >
          Already a user?
        </Text>
      </KeyboardAvoidingView>
    </>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  HeaderImage: {
    marginBottom: 30,
    width: 200,
    height: 200,
  },
  head: {
    color: "#003f5c",
    fontWeight: "bold",
    fontSize: 40,
    marginTop: 25,
    marginBottom: 20,
  },
  IntroText: {
    color: "#003f5c",
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 30,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    borderWidth: 2,
    borderColor: "#003f5c",
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 15,
    marginTop: 10,
    fontWeight: "bold",
  },
  buttonContainer: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#89CFF0",
    width: "100%",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  GoToLogin: {
    fontWeight: "bold",
    marginTop: 25,
    color: "#003f5c",
    fontSize: 18,
  },
});
