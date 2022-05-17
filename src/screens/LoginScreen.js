import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { auth, db } from "../../firebase";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    if (auth.currentUser) {
      navigation.replace("Home");
    }
  }, []);

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        db.collection("Users")
          .doc(user.email)
          .get()
          .then((doc) => {
            doc.data()?.Worker
              ? navigation.replace("WorkerProfile")
              : navigation.replace("Home");
          });
      })
      .catch((error) => alert(error.message));
  };

  return (
    <>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Text style={styles.head}>Login</Text>
        <Image
          style={styles.HeaderImage}
          source={require("../images/Login.png")}
        />
        <Text style={styles.IntroText}>
          Please Log into your existing account
        </Text>
        <View style={styles.inputContainer}>
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
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleLogin} style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
        <Text
          style={styles.NotAUser}
          onPress={() => {
            navigation.replace("Register");
          }}
        >
          Not a user? Register!
        </Text>
        <Text
          style={styles.ForgotPassword}
          onPress={() => {
            navigation.replace("ResetPassword", { option: "Login" });
          }}
        >
          Forgot Password?
        </Text>
      </KeyboardAvoidingView>
    </>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  HeaderImage: {
    marginBottom: 15,
    width: 200,
    height: 200,
  },
  head: {
    color: "#003f5c",
    fontWeight: "bold",
    fontSize: 40,
    marginBottom: 30,
  },
  IntroText: {
    color: "#003f5c",
    fontSize: 17,
    fontWeight: "500",
    marginBottom: 30,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "85%",
  },
  input: {
    borderWidth: 2,
    borderColor: "#003f5c",
    backgroundColor: "white",
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 17,
    marginTop: 10,
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
  NotAUser: {
    fontWeight: "bold",
    marginTop: 25,
    color: "#003f5c",
    fontSize: 16,
  },
  ForgotPassword: {
    fontWeight: "bold",
    color: "#003f5c",
    marginTop: 20,
  },
});
