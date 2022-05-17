import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { auth, db } from "../../firebase";
import { AirbnbRating } from "react-native-ratings";
import { TextInput } from "react-native-paper";

const ViewWorker = ({ route }) => {
  const { id } = route.params;
  const [user, setUser] = React.useState([]);
  const [myuserdata, setMyuserdata] = React.useState([]);
  const [rating, setRating] = React.useState(0);
  const [comment, setComment] = React.useState("");
  const [isReady, setIsReady] = React.useState(true);
  const navigation = useNavigation();

  React.useEffect(() => {
    db.collection("Users")
      .doc(id)
      .get()
      .then((doc) => {
        setUser(doc.data());
      });

    db.collection("Users").doc(auth.currentUser?.email).get().then((doc) => {
      setMyuserdata(doc.data());
    });

    return () => {
      setUser("");
      setMyuserdata({});
    };
  }, []);


  const handleReview = () => {
    db.collection("Reviews").doc().set({
      Rating: parseInt(rating),
      Comment: comment,
      WorkerR: id,
      User: myuserdata.Name,
      Userid: myuserdata.Email,
    }).catch((error) => {
      alert(error);
    });
    setIsReady(false);
  };

  return (
    <SafeAreaView style={styles.Container}>
      <View style={styles.username}>
        <Text style={styles.usernameText}>{user?.Name} {user?.Busy}</Text>
      </View>
      <View style={styles.profilePicture}>
        {user?.Image != "" ? (
          <>
            <Image source={{ uri: user?.Image }} style={styles.Image} />
          </>
        ) : (
          <Image
            style={styles.Image}
            source={require("../images/Profile.png")}
          />
        )}
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.userDetails}>Email: {user?.Email}</Text>
        <Text style={styles.userDetails}>Location: {user?.Location}</Text>
        <Text style={styles.userDetails}>
          Specialized in: {user?.Occupation}
        </Text>
      </View>
      <View style={styles.review}>
        <View style={styles.reviewContainer}>
          {
            isReady ?
              <>
                <Text style={styles.title}>Add your Review:</Text>
                <View style={styles.alignRow}>
                <TextInput style={styles.textInput}
                  placeholder="Write your review here"
                  value={comment}
                  onChangeText={(text) => setComment(text)}
                  numberOfLines={1}
                />
                </View>
                <View style={styles.alignRow}>
                <TextInput style={styles.textInput}
                  keyboardType="numeric"
                  placeholder="Rate your worker"
                  onChangeText={(text) => setRating(text)}
                  numberOfLines={1}
                  maxLength={1}
                />
                </View>
                <TouchableOpacity
                  style={styles.reviewButton}
                  onPress={handleReview}
                >
                  <Text>Submit</Text>
                </TouchableOpacity>
              </>
              :
              <>
                <Text style={styles.title}>Thank you for your review</Text>
              </>
          }


          <View style={styles.ratingWrap}>
            <AirbnbRating
              count={5}
              defaultRating={user?.Rating}
              size={20}
              isDisabled
              reviews={["Terrible", "Bad", "OK", "Good", "Amazing"]}
            />
          </View>
        </View>
      </View>
      {!myuserdata.Worker ?
        <Text style={styles.credit}>My Credit: {myuserdata?.Credit}</Text>
        : <></>
      }
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          onPress={() => {
            myuserdata?.Credit == 0 ?
              alert("You don't have enough credit to hire this worker") :
              navigation.replace("Contract", { id: id });
          }}
          style={styles.buttonOutlineOffer}
        >
          <Text style={styles.buttonText}>Send Offer</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.replace("Home")}
          style={styles.buttonOutline}
        >
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ViewWorker;

const styles = StyleSheet.create({

  credit: {
    marginBottom: 20,
    textAlign: "center",
  },
  Container: {
    flex: 1,
  },
  profilePicture: {
    width: "100%",
    height: 200,
    overflow: "hidden",
    marginTop: -5,
    marginBottom: -27,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  username: {
    width: "100%",
    marginTop: 30,
  },
  usernameText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 20,
    textAlign: "center",
  },
  review: {
    flex: 1,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  reviewContainer: {
    backgroundColor: "transparent",
    paddingHorizontal: 30,
    paddingVertical: 40,
    minWidth: "100%",
    marginTop: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#323357",
    textAlign: "center",
    marginBottom: 10,
  },
  totalWrap: {
    marginTop: 15,
    marginBottom: 5,
    backgroundColor: "#F5F8FF",
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  amountText: {
    fontSize: 16,
    color: "#595B71",
    textAlign: "center",
  },
  detailsContainer: {
    marginTop: 40,
  },
  userDetails: {
    fontSize: 16,
    color: "#595B71",
    textAlign: "center",
    marginBottom: 8,
  },
  buttonsContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: -10,
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
    marginBottom: 20,
  },
  buttonOutlineOffer: {
    backgroundColor: "#89CFF0",
    padding: 17,
    borderRadius: 10,
    alignItems: "center",
    width: "70%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: -20,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 17,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#E6E6E6",
    borderRadius: 10,
    marginBottom: 5,
    width: "100%",
    height: 50,
    fontSize: 16,
    color: "#595B71",
    textAlign: "center",
  },
  ratingWrap: {
    marginTop: -50,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  reviewButton: {
    backgroundColor: "#89CFF0",
    padding: 17,
    borderRadius: 10,
    alignItems: "center",
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  reviewButtonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 17,
  },
  alignRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  }

});
