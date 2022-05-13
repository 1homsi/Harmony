import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  Image
} from "react-native";
import { auth, db } from "../../firebase";
import { useNavigation } from "@react-navigation/native";
import BottomNav from "../components/BottomNav";


export default function Option() {

  const [user, setUser] = React.useState([]);

  React.useEffect(() => {
    db.collection("Users").doc(auth.currentUser?.email).get().then((doc) => {
      setUser(doc.data());
    }).catch((error) => {
      alert(error);
    });
    return () => {
      setUser([]);
    };
  }, []);

  const navigation = useNavigation();

  const handleSignOut = () =>
    Alert.alert(
      "Sign Out",
      "Are you sure, you want Sign Out?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",

          onPress: () => {
            auth
              .signOut()
              .then(() => {
                navigation.replace("Login");
              })
              .catch((error) => alert(error.message));
          }
        },
      ]
    );
  return (
    <>
      {auth.currentUser ?
        <SafeAreaView style={styles.bigMain} >
          <View style={styles.topNav}>
            <Text style={styles.title}>Settings</Text>
          </View>
          <View style={styles.container}>
            {!user?.Worker ?
              <View style={styles.UserInfo}>
                <View style={styles.outerImage}>
                  {user?.Image != "" ?
                    <>
                      <Image source={{ uri: user?.Image }} style={styles.Image} />
                    </>
                    :
                    <Image style={styles.Image} source={require("../images/Profile.png")} />
                  }
                </View>
                <View style={styles.Inner}>
                  <Text style={styles.nameSec}>{user?.Name}</Text>
                  <Text style={styles.emailSec}>{auth.currentUser?.email}</Text>
                  {user?.Worker ?
                    <Text style={styles.emailSec}>Worker</Text>
                    :
                    <></>
                  }
                </View>
              </View>
              :
              <></>
            }

            <TouchableOpacity
              onPress={() => navigation.navigate("Profile")}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("ResetPassword", { option: "Option" })}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Change Password</Text>
            </TouchableOpacity>
            {user?.Admin ?
              <TouchableOpacity
                onPress={() => navigation.navigate("AdminMain")}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Admin Panel</Text>
              </TouchableOpacity>
              : <></>
            }
            <TouchableOpacity onPress={handleSignOut} style={styles.buttonOutline}>
              <Text style={styles.buttonText}>Sign out</Text>
            </TouchableOpacity>
          </View>
          <BottomNav />
        </SafeAreaView >
        :
        <>
          <Text>Loading...</Text>
        </>
      }
    </>
  );
}

const styles = StyleSheet.create({
  animation: {
    marginTop: 2,
    marginLeft: "auto",
    width: "20%",
    height: "100%",
  },
  Inner: {
    marginLeft: 20,
  },
  UserInfo: {
    borderWidth: 0.5,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    padding: 20,
    width: "100%",
    flexDirection: "row",
    marginBottom: 20,
  },
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
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 10,
    fontSize: 40,
    fontWeight: "800",
    color: "#000",
  },
  nameSec: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: "800",
    color: "#000",
  },
  emailSec: {
    marginTop: 10,
    fontSize: 15,
  },
  button: {
    backgroundColor: "#89CFF0",
    padding: 17,
    borderRadius: 10,
    alignItems: "center",
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    elevation: 10,
    shadowColor: "#000",
  },
  buttonOutline: {
    backgroundColor: "gray",
    padding: 17,
    borderRadius: 10,
    alignItems: "center",
    width: "65%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    elevation: 10,
    shadowColor: "#000",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 17,
  },
  Image: {
    width: 110,
    height: 110,
  },
  outerImage: {
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 100,
    borderRadius: 150 / 2,
    overflow: "hidden",
    borderWidth: 0,
    borderColor: "orange"
  },

});
