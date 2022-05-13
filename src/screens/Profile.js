import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Alert,
  TextInput,
} from "react-native";
import React from "react";
import { auth, db } from "../../firebase";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

const Profile = () => {
  const [user, setUser] = React.useState([]);
  const [status, setStatus] = React.useState();
  const [editBio, setEditBio] = React.useState(false);
  const [changed, setChanged] = React.useState("");
  const [bio, setBio] = React.useState("");
  const [ImageUrl, setImageUrl] = React.useState("");
  const [selectedImage, setSelectedImage] = React.useState("");
  const [uploadLoading, setUploadLoading] = React.useState(false);

  const navigation = useNavigation();

  const handleStatus = () => {
    db.collection("Users").doc(auth.currentUser?.email).update({
      Busy: !status,
    }).then(() => {
      setStatus(!status);
    });
  };
  const handleBio = () => {
    db.collection("Users").doc(auth.currentUser?.email).update({
      Bio: bio,
    });
  };
  React.useEffect(() => {
    db.collection("Users")
      .doc(auth.currentUser?.email)
      .get()
      .then((doc) => {
        setUser(doc.data());
        setStatus(doc.data().Busy);
        setChanged(doc.data().Busy ? "Busy" : "Free");
        setBio(doc.data().Bio);
      });
    return () => {
      setUser("");
    };
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
                navigation.replace("Login");
              })
              .catch((error) => {
                alert(error.message);
              });
          },
        },
      ]
    );

  let openImagePickerAsync = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      base64: true,
      quality: 1,
    });
    const fileSize = pickerResult.base64.length * (3 / 4) - 2;
    if (fileSize >= 1000000) {
      Alert.alert("Choose a smaller sized image");
    } else {
      return;
    }
    var url =
      Platform.OS === "ios"
        ? pickerResult.uri.replace("file://", "")
        : pickerResult.uri;
    const filename = pickerResult.uri.substring(
      pickerResult.uri.lastIndexOf("/") + 1
    );
    setSelectedImage({
      uri: url,
      name: filename,
      type: "image/jpg",
    });
    onUpload();
  };

  var checkToUpload = setInterval(Up, 30);

  function Up() {
    if (selectedImage === null) {
      return;
    } else {
      if (ImageUrl != "" && uploadLoading === false) {
        db.collection("Users").doc(auth.currentUser?.email).update({
          ImageUrl: ImageUrl,
        });
        navigation.replace("Option");
        clearInterval(checkToUpload);
      }
    }
  }

  const onUpload = async () => {
    setUploadLoading(true);
    const response = await fetch(selectedImage.uri);
    const blob = await response.blob();
    var uploadTask = storage.ref().child(selectedImage.name).put(blob, {
      contentType: "image/jpg",
    });
    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED:
            // console.log("Upload is paused");
            break;
          case firebase.storage.TaskState.RUNNING:
            // console.log("Upload is running");
            break;
        }
      },
      (error) => {
        switch (error.code) {
          case "storage/unauthorized":
            break;
          case "storage/canceled":
            break;
          case "storage/unknown":
            break;
        }
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          // console.log("File available at", downloadURL);
          setImageUrl(downloadURL);
          setUploadLoading(false);
        });
      }
    );
  };

  return (
    <SafeAreaView>
      <View style={styles.Top}>
        <Text style={styles.HeadTitlte}>Profile</Text>
      </View>
      <View style={styles.ListView}>
        {user.image ? (
          <TouchableOpacity nPress={openImagePickerAsync}>
            <Image
              source={{ uri: user?.image }}
              style={
                user?.Worker
                  ? [styles.image, { marginTop: 10 }]
                  : [styles.image]
              }
            ></Image>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={openImagePickerAsync}>
            <Image
              source={require("../images/Profile.png")}
              style={
                user?.Worker
                  ? [styles.image, { marginTop: 10 }]
                  : [styles.image]
              }
            ></Image>
          </TouchableOpacity>
        )}
        <View>
          <Text style={[styles.dataName, styles.title]}>{user?.Name}</Text>
          <Text style={styles.dataEmail}>{auth.currentUser?.email}</Text>
          {user?.Worker ? (
            <Text style={styles.dataWorker}>Worker - {changed}</Text>
          ) : (
            <></>
          )}
        </View>
        <View style={styles.icon}>
          <Icon
            name="edit"
            type="FontAwesome5"
            color="#000"
            size={25}
            onPress={() => {
              if (status == "free") {
                setStatus("busy");
                setChanged("free");
              } else {
                setStatus("free");
                setChanged("busy");
              }
              handleStatus();
            }}
          />
        </View>
      </View>
      <View style={styles.ListView}>
        <View style={styles.Inner}>
          <Text style={styles.title}>Address</Text>
          <Text style={styles.dataAdress}>{user?.Location}</Text>
        </View>
      </View>
      {
        user?.Worker ? (
          <View style={styles.ListView}>
            <View style={styles.Inner}>
              <Text style={styles.title}>Phone</Text>
              <Text style={styles.dataAdress}>{user?.Phone}</Text>
            </View>
          </View>
        ) : (
          <></>
        )
      }
      {
        user?.Worker ? (
          <View style={styles.ListView}>
            <View style={styles.InnerBio}>
              <Text style={styles.title}>Bio </Text>

              {editBio ? (
                <>
                  {user?.Bio == "" ? (
                    <Text style={styles.dataAdress}>No Bio</Text>
                  ) : (
                    <Text style={styles.dataAdress}>{bio}</Text>
                  )}
                </>
              ) : (
                <>
                  <TextInput
                    style={styles.input}
                    placeholder={user?.Bio == "" ? "EditBio" : user?.bio}
                    onChangeText={(text) => {
                      setBio(text);
                    }}
                    value={bio}
                  />
                </>
              )}
            </View>
            <View style={styles.icon}>
              <Icon
                name={editBio ? "edit" : "check"}
                type="FontAwesome5"
                color="gray"
                size={25}
                onPress={() => {
                  if (editBio) {
                    setEditBio(false);
                  } else {
                    handleBio();
                    setEditBio(true);
                  }
                }}
              />
            </View>
          </View>
        ) : (
          <></>
        )
      }
      <View style={styles.DeleteContainer}>
        <TouchableOpacity
          onPress={handleDeleteUser}
          style={styles.buttonOutlineRed}
        >
          <Text style={styles.buttonText}>Delete Account</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.replace("Option")}
          style={styles.buttonOutline}
        >
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
    backgroundColor: "white",
    alignContent: "center",
    justifyContent: "center",
    marginTop: 20,
    borderRadius: 10,
    elevation: 10,
    shadowColor: "#52006A",
  },

  image: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginLeft: "5%",
  },
  dataName: {
    marginTop: 10,
    color: "black",
    fontSize: 15,
    marginLeft: "8%",
  },

  Inner: {
    marginLeft: -250,
  },
  InnerBio: {
    marginLeft: -165,
  },
  dataEmail: {
    marginTop: 5,
    color: "gray",
    fontSize: 15,
    marginLeft: "8%",
  },
  dataWorker: {
    marginTop: 5,
    color: "gray",
    fontSize: 15,
    marginLeft: "8%",
  },
  title: {
    color: "#89CFF0",
    fontSize: 20,
    fontWeight: "bold",
  },
  dataAdress: {
    color: "black",
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
    marginTop: 50,
    height: 60,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 17,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    color: "black",
    fontWeight: "700",
  },
});
