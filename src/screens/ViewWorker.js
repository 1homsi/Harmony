import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { db } from "../../firebase";
import { Rating, AirbnbRating } from "react-native-ratings";
// import Svg, { Path } from "react-native-svg";

const ViewWorker = ({ route }) => {
  const { id } = route.params;
  const [user, setUser] = React.useState([]);
  const navigation = useNavigation();
  //   const { rating } = this.props;

  //  <Rating
  //   imageSize={20}
  //   readonly
  //   startingValue={rating}
  // //   style={{ styles.rating }}
  // />

  //   ratingCompleted(rating); {
  //     console.log("Rating is: " + rating)
  //   }

  //   const WATER_IMAGE = require("./water.png");

  React.useEffect(() => {
    db.collection("Users")
      .doc(id)
      .get()
      .then((doc) => {
        setUser(doc.data());
      });
    return () => {
      setUser("");
    };
  }, []);

  return (
    <SafeAreaView style={styles.Container}>
      <View style={styles.username}>
        <Text style={styles.usernameText}>{user?.Name}</Text>
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
        <Text style={styles.userDetails}>Specialized in: {user?.Occupation}</Text>
      </View>
      <View style={styles.review}>
        <View style={styles.reviewContainer}>
          <Text style={styles.title}>Customer reviews</Text>
          <View style={styles.totalWrap}>
            <Text>4.7 out of 5</Text>
          </View>
          <Text style={styles.amountText}>40 customer ratings</Text>

          <AirbnbRating
            count={5}
            defaultRating={user?.Rating}
            size={20}

            reviews={["Terrible", "Bad", "OK", "Good", "Amazing"]}
          />
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
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
  Container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  profilePicture: {
    width: "100%",
    height: 250,
    // borderRadius: 100,
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
    // alignItems: "center",
    // justifyContent: "center",
    marginTop: 30,
  },
  usernameText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 20,
    textAlign: "center",
  },
  //   Image: {
  //     width: 110,
  //     height: 110,
  //     borderRadius: 150 / 2,
  //     overflow: "hidden",
  //     borderWidth: 0,
  //     marginBottom: 20,
  //   },
  review: {
    flex: 1,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  reviewContainer: {
    backgroundColor: "transparent",
    // borderRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 40,
    minWidth: "100%",
    marginTop: -35,
    // shadowOffset: { width: 0, height: 5 },
    // shadowOpacity: 1.0,
    // shadowRadius: 2,
    // shadowColor: "rgba(193, 211, 251, 0.5)",
    // elevation: 5,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#323357",
    textAlign: "center",
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
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // marginLeft: 100,
    // flexDirection: "row",
    // width: "100%",
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
    // height: 60,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 17,
  },
});
