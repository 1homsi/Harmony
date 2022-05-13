import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Platform,
} from "react-native";
import React from "react";
import { Icon } from "react-native-elements";
import { auth, db } from "../../firebase";
import BottomNav from "../components/BottomNav";
import Review from "../components/Review";

const WorkerProfile = ({ navigation, route }) => {
  const [user, setUser] = React.useState({});
  const [Reviews, setReviews] = React.useState([]);
  const [sum, setSum] = React.useState(0);

  React.useEffect(() => {
    db.collection("Users")
      .doc(auth.currentUser?.email)
      .get()
      .then((user) => {
        setUser(user.data());
      });

    db.collection("Reviews")
      .where("WorkerR", "==", auth.currentUser?.email)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setReviews((e) => [...e, doc.data()]);
          setSum((e) => e + 1);
        });
      });


    return () => {
      setUser({});
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{user.Name}</Text>
      <View style={styles.imageContainer}>
        {user?.Image ? (
          <Image source={{ uri: user?.Image }} style={styles.image} />
        ) : (
          <Image
            source={require("../images/Profile.png")}
            style={styles.image}
          />
        )}
      </View>
      <View>
        <Text style={styles.userName}>
          {user?.Email} - {user?.Busy ? "Busy" : "Free"}
        </Text>
        <Text style={styles.userBio}>
          {user?.Bio} - {user?.Occupation}
        </Text>
        <Text style={styles.userBio}>{user?.Location}</Text>
        <View style={styles.followersAndFollowing}>
          <Text style={styles.Finner}>People Rated: {sum}</Text>
        </View>
        <View style={styles.Controlls}>
          <TouchableOpacity
            style={styles.Button}
            onPress={() => navigation.navigate("Profile")}
          >
            <Text style={styles.ButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: "3%",
          }}
        >
          <View style={{ flex: 1, height: 1, backgroundColor: "black" }} />
        </View>
        <View style={styles.UserPosts}>
          <FlatList
            style={styles.list}
            showsVerticalScrollIndicator={false}
            data={Reviews}
            renderItem={({ item }) => (
              <View>
                  <Text style={styles.postTitle}>Reviews: Rating and Comments</Text>
                <View style={styles.postContainer}>
                  <View style={styles.postInfo}>
                    <Text style={styles.postDescription}>Rating: {item.Rating}</Text>
                    <Text style={styles.postDescription}>Comments: {item.Comment}</Text>
                  </View>
                </View>
              </View>

            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
      <View style={styles.bottomNav}>
        <BottomNav />
      </View>
    </View >
  );
};

export default WorkerProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: "15%",
  },
  imageContainer: {
    marginTop: "7%",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 180,
    height: 180,
    borderRadius: 100,
  },
  userName: {
    marginTop: "5%",
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "center",
  },
  userBio: {
    paddingHorizontal: "6%",
    marginTop: "5%",
    fontSize: 15,
    textAlign: "center",
  },
  followersAndFollowing: {
    paddingHorizontal: "10%",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: "5%",
  },
  Finner: {
    color: "#000",
    fontWeight: "bold",
  },
  Controlls: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: "5%",
    paddingHorizontal: Platform.OS === "ios" ? "5%" : "8%",
  },
  Button: {
    backgroundColor: "#89CFF0",
    padding: 10,
    paddingHorizontal: 60,
    borderRadius: 10,
  },
  ButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
  ButtonOutline: {
    borderWidth: 1,
    borderColor: "#000",
    padding: 10,
    paddingHorizontal: 50,
    borderRadius: 10,
  },
  ButtonTextOutline: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 15,
  },
  UserPosts: {
    marginTop: "5%",
    paddingHorizontal: "10%",
    flexDirection: "row",
  },
  postContainer: {
    marginTop: "5%",
    width: "100%",
  },
  postImageContainer: {
    flex: 1,
  },
  postImage: {
    width: 280,
    height: 280,
    alignSelf: "center",
    borderRadius: 10,
    marginBottom: "1%",
  },
  postInfo: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: "5%",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: "2%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    
  },
  postDescription: {
    textAlign: "center",
    fontSize: 15,
    textAlignVertical: "center",
  },
  postTitle: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: "3%",
  },
  list: {
    flex: 1,
    marginBottom: "5%",
  },
  bottomNav: {
    justifyContent: "space-around",
    height: 600,
    width: "100%",
    position: "absolute",
    marginTop: "120%",
  },

});
