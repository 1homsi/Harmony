import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, Alert } from "react-native";
import React from "react";
import { auth, db } from "../../firebase";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";


const Profile = () => {
  const [user, setUser] = React.useState([]);
  const navigation = useNavigation();

  React.useEffect(() => {
    db.collection("Users").doc(auth.currentUser?.email).get().then((doc) => {
      setUser(doc.data());
    });
    return () => {
      setUser("")
    }
  }, []);

  const handleDeleteUser = () =>
    Alert.alert(
      "Delete Account",
      "Are you sure, you want to delete your account?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",

          onPress: () => {
            auth.currentUser
              .delete()
              .then(() => {
                navigation.replace("Home");
              })
              .catch((error) => {
                alert(error.message);
              });
          },
        },
      ]
    );

  return (
    <SafeAreaView>
      <View style={styles.Top}>
        <Text style={styles.HeadTitlte}>Profile</Text>
      </View>
      <View style={styles.ListView}>
        <Image source={require("../images/Profile.png")} style={user?.Worker ? [styles.image, { marginTop: 10 }] : [styles.image]}></Image>
        <View>
          <Text style={[styles.dataName, styles.title]}>{user?.Name}</Text>
          <Text style={styles.dataEmail}>{auth.currentUser?.email}</Text>
          {user?.Worker ?
            <Text style={styles.dataWorker}>Worker</Text>
            : <></>
          }
        </View>
        <View style={styles.icon} >
          <Icon name="edit" type="FontAwesome5" color="#fff" size={25} onPress={() => { }} />
        </View>
      </View>
      <View style={styles.ListView}>
        <View style={styles.Inner}>
          <Text style={styles.title}>Address</Text>
          <Text style={styles.dataAdress}>{user?.Location}</Text>
        </View>
        <View style={[styles.icon, { marginTop: 15 }]} >
          <Icon name="edit" type="FontAwesome5" color="#fff" size={25} onPress={() => { }} />
        </View>
      </View>
      {user?.Worker ?
        <View style={styles.ListView}>
          <View style={styles.Inner}>
            <Text style={styles.title}>Phone</Text>
            <Text style={styles.dataAdress}>{user?.Phone}</Text>
          </View>
          <View style={[styles.icon, { marginTop: 12 }]} >
            <Icon name="edit" type="FontAwesome5" color="#fff" size={25} onPress={() => { }} />
          </View>
        </View>
        :
        <></>
      }
      {user?.Worker ?
        <View style={styles.ListView}>
          <View style={styles.Inner}>
            <Text style={styles.title}>Occupation</Text>
            <Text style={styles.dataAdress}>{user?.Occupation}</Text>
          </View>
          <View style={[styles.icon, { marginTop: 12 }]} >
            <Icon name="edit" type="FontAwesome5" color="#fff" size={25} onPress={() => { }} />
          </View>
        </View>
        :
        <></>
      }
      <View style={styles.DeleteContainer}>
        <TouchableOpacity onPress={handleDeleteUser} style={styles.buttonOutlineRed}>
          <Text style={styles.buttonText}>Delete Account</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.replace("Option")} style={styles.buttonOutline}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView >
  );
};

export default Profile;

const styles = StyleSheet.create({
  DeleteContainer: {
    flex: 1,
    alignItems: "center",
  },
  icon: {
    marginTop: 27,
    marginLeft: 10,
  },
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
    width: "90%",
    marginLeft: "5%",
    padding: 20,
    paddingLeft: 10,
    backgroundColor: "gray",
    alignContent: "center",
    justifyContent: "center",
    marginTop: 20,
    borderRadius: 10,
  },

  image: {
    width: "20%",
    height: 65,
    borderRadius: 50,
    marginLeft: "5%",
  },
  dataName: {
    marginTop: 10,
    color: "white",
    fontSize: 15,
    marginLeft: "8%",
  },

  Inner: {
    marginLeft: -150,
  },
  dataEmail: {
    marginTop: 5,
    color: "white",
    fontSize: 15,
    marginLeft: "8%",
  },
  dataWorker: {
    marginTop: 5,
    color: "white",
    fontSize: 15,
    marginLeft: "8%",
  },
  title: {
    color: "#89CFF0",
    fontSize: 20,
  },
  dataAdress: {
    color: "white",
    fontSize: 15,
  },
  buttonOutline: {
    backgroundColor: "gray",
    padding: 17,
    borderRadius: 10,
    alignItems: "center",
    width: "63%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    height: 60,
  },
  buttonOutlineRed: {
    backgroundColor: "red",
    padding: 17,
    borderRadius: 10,
    alignItems: "center",
    width: "70%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    height: 60,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 17,
  },
});
