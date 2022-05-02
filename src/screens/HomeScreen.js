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
  const [data, setData] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  React.useEffect(() => {
    if (!auth.currentUser) {
      navigation.replace("Login");
    }
  }, []);

  const fetchAll = async () => {
    const q = query(
      collection(db, "Users"),
      where("status", "==", "free"),
      where("Worker", "==", true)
    );

    const docSnap = await getDocs(q)
    docSnap.forEach((doc) => {
      let Userdata = Object.assign({ id: doc.id }, doc.data());
      setData((e) => [...e, Userdata]);
    })
  };

  React.useEffect(() => {
    fetchAll();
    return () => {
      setData();
    };
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setData([]);
    fetchAll();
    wait(1000).then(() => setRefreshing(false));
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
      <View>
      </View>
      <View style={styles.Cat}>
        <Text>
          <Text style={styles.CatTitle}>Categories</Text>
        </Text>
        <View style={styles.CatContainer}>
          <TouchableOpacity
            style={styles.CatCard}
            onPress={() => navigation.replace("Maintenance")}
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
            onPress={() => navigation.replace("HomeCare")}
          >
            <ImageBackground
              source={require("../images/home-care.png")}
              resizeMode="cover"
              style={styles.CatImage}
            >
              <Text style={styles.text}>Home Care</Text>
            </ImageBackground>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.CatCard}
            onPress={() => navigation.replace("HomeDesign")}
          >
            <ImageBackground
              source={require("../images/home-design.png")}
              resizeMode="cover"
              style={styles.CatImage}
            >
              <Text style={styles.text}>Home Design</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
        <View style={styles.CatContainer}>
          <TouchableOpacity
            style={styles.CatCard}
            onPress={() => navigation.replace("CareTaking")}
          >
            <ImageBackground
              source={require("../images/care-taking.png")}
              resizeMode="cover"
              style={styles.CatImage}
            >
              <Text style={styles.text}>Care Taking</Text>
            </ImageBackground>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.CatCard}
            onPress={() => navigation.replace("Delivery")}
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
            onPress={() => navigation.replace("Delivery")}
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
      </View>
      <View style={styles.ListView}>
        <FlatList
          refreshControl={
            <RefreshControl
              style={styles.refresh}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          style={styles.list}
          data={data}
          renderItem={({ item }) => (
            <Items id={item.id} title={item.Name} img={item.Image} Bio={item.Bio} />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <BottomNav />
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
    marginTop: 20,
    flexDirection: "row",
    textAlign: "center",
    marginBottom: 12,
    marginTop: 40,
    paddingBottom: 10,
    paddingTop: 10,
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
    justifyContent: "center",
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
    // width: "100%",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginBottom: -50,
  },
  CatCard: {
    alignItems: "center",
    justifyContent: "center",
    width: "30%",
    height: "60%",
    backgroundColor: "white",
    borderRadius: 12,
    marginTop: 40,
    marginBottom: 50,
    marginLeft: "1%",
    marginRight: "1%",
  },

  // CatCardOne: {
  //   alignItems: "center",
  //   justifyContent: "center",
  //   width: "30%",
  //   height: "30%",
  //   backgroundColor: "#89CFF0",
  //   borderRadius: 12,
  //   marginTop: 40,
  //   marginLeft: "1%",
  //   marginRight: "1%",
  // },

  Cat: {
    marginTop: 100,
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
    marginTop: "52%",
  },
});
