import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Image,
  ImageBackground,
  FlatList,
} from "react-native";
import Items from "../components/Items";
import { auth, db } from "../../firebase";
import BottomNav from "../components/BottomNav";
import { query, collection, where, getDocs } from "firebase/firestore";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const HomeScreen = () => {
  const navigation = useNavigation();

  React.useEffect(() => {
    if (!auth.currentUser) {
      navigation.replace("Login");
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.Top}>
        <View>
          <Text placeholder="Test" style={styles.HeadTitlte}>
            Home
          </Text>
        </View>
      </View>
      <View style={styles.Cat}>
        <Text>
          <Text style={styles.CatTitle}>Services</Text>
        </Text>
        <View style={styles.CatContainer}>
          <TouchableOpacity
            style={styles.CatCard}
            onPress={() => navigation.navigate("Maintenance")}
          >
            <ImageBackground
              source={require("../images/maintenance.png")}
              resizeMode="cover"
              style={styles.CatImage}
            >
              <Text style={styles.text}>Maintenance</Text>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.CatCard}
            onPress={() => navigation.navigate("HomeCare")}
          >
            <ImageBackground
              source={require("../images/home-care.png")}
              resizeMode="cover"
              style={styles.CatImage}
            >
              <Text style={styles.text}>Home Care</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
        <View style={styles.CatContainer}>
          <TouchableOpacity
            style={styles.CatCard}
            onPress={() => navigation.navigate("HomeDesign")}
          >
            <ImageBackground
              source={require("../images/home-design.png")}
              resizeMode="cover"
              style={styles.CatImage}
            >
              <Text style={styles.text}>Home Design</Text>
            </ImageBackground>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.CatCard}
            onPress={() => navigation.navigate("CareTaking")}
          >
            <ImageBackground
              source={require("../images/care-taking.png")}
              resizeMode="cover"
              style={styles.CatImage}
            >
              <Text style={styles.text}>Care Taking</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
        <View style={styles.CatContainer}>
          <TouchableOpacity
            style={styles.CatCard}
            onPress={() => navigation.navigate("Tutoring")}
          >
            <ImageBackground
              source={require("../images/tutor.png")}
              resizeMode="cover"
              style={styles.CatImage}
            >
              <Text style={styles.text}>Tutoring</Text>
            </ImageBackground>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.CatCard}
            onPress={() => navigation.navigate("MainServ", { id: "driver" })}
          >
            <ImageBackground
              source={require("../images/delivery.png")}
              resizeMode="cover"
              style={styles.CatImage}
            >
              <Text style={styles.text}>Delivery</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
        <View style={styles.CatContainer}>
          <TouchableOpacity
            style={styles.CatCard3}
            onPress={() => navigation.navigate("CarService")}
            resizeMode="cover"
          >
            <ImageBackground
              source={require("../images/delivery.png")}
              resizeMode="cover"
              style={styles.CatImage}
            >
              <Text style={styles.text}>Car Service</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bottomNav}>
        <BottomNav />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  HeadTitlte: {
    marginLeft: "5%",
    fontSize: 30,
    fontWeight: "800",
    color: "#000",
  },
  CatTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#000",
  },
  Top: {
    flexDirection: "row",
    textAlign: "center",
    marginTop: "10%",
  },
  ListView: {
    width: "100%",
    marginTop: 120,
    alignContent: "center",
    justifyContent: "center",
    flex: 1,
    marginLeft: "15%",
  },
  list: {
    width: "100%",
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "white",
    height: "10%",
    width: "100%",
    position: "absolute",
    bottom: 0,
  },
  bottomNavItem: {
    alignItems: "center",
    justifyContent: "center",
    color: "black",
  },
  bottomNavItemAdd: {
    color: "black",
    zIndex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fc5c65",
    borderColor: "white",
    borderWidth: 8,
    paddingTop: 35,
    paddingHorizontal: 21,
    paddingBottom: 35,
    borderRadius: 100,
    marginBottom: 40,
  },
  topCard: {
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    height: "8%",
    backgroundColor: "#FA7D09",
    borderRadius: 12,
    marginTop: 10,
    marginBottom: 20,
    marginLeft: "8%",
    marginRight: "8%",
    paddingBottom: 35,
    paddingTop: 35,
    paddingLeft: 60,
    paddingRight: 60,
  },

  gridTopCards: {
    width: "50%",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 80,
  },
  CatContainer: {
    width: "100%",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: -70,
    marginLeft: -50,
  },
  CatCard: {
    elevation: 10,
    shadowColor: "#52006A",
    alignItems: "center",
    justifyContent: "center",
    width: "30%",
    height: "60%",
    backgroundColor: "white",
    borderRadius: 12,
    marginTop: 40,
    marginBottom: 40,
    marginLeft: "10%",
  },
  CatCard3: {
    elevation: 10,
    shadowColor: "#52006A",
    alignItems: "center",
    justifyContent: "center",
    width: "30%",
    height: "60%",
    backgroundColor: "white",
    borderRadius: 12,
    marginTop: 40,
    marginBottom: 40,
    marginLeft: "10%",
  },

  Cat: {
    marginTop: "50%",
    width: "100%",
    height: "13%",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  },

  CatImage: {
    width: "90%",
    height: "90%",
    marginTop: 5,
    borderRadius: 50,
  },

  text: {
    color: "black",
    fontSize: 13,
    lineHeight: 50,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: "55%",
  },
  bottomNav: {
    justifyContent: "space-around",
    height: 600,
    width: "100%",
    position: "absolute",
    marginTop: "120%",
  },
});
