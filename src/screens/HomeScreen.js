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
  FlatList,
} from "react-native";
import Items from "../components/Items";
import { db } from "../../firebase";
import BottomNav from "../components/BottomNav";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const HomeScreen = () => {
  const [data, setData] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const fetchAll = () => {
    db.collection("Users")
      .where("Worker", "==", true)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let Userdata = Object.assign({ id: doc.id }, doc.data());
          setData((e) => [...e, Userdata]);
        });
      });
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
        {/* <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
        /> */}
      </View>
      <View style={styles.Cat}>
        <Text>
          <Text style={styles.CatTitle}>Categories</Text>
        </Text>
        <View style={styles.CatContainer}>
          <TouchableOpacity style={styles.CatCard}>
            <Text>Category</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.CatCard}>
            <Text>Category</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.CatCard}>
            <Text>Category</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.CatContainer}>
          <TouchableOpacity style={styles.CatCard}>
            <Text>Category</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.CatCard}>
            <Text>Category</Text>
          </TouchableOpacity>
          {/* <View style={styles.CatCard}>
            <Text>Category</Text>
          </View> */}
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
            <Items
              id={item.id}
              title={item.Name}
              img={item.Image}
            />
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
    marginTop: 100,
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
    height: "50%",
    backgroundColor: "#89CFF0",
    borderRadius: 12,
    marginTop: 10,
    marginBottom: 25,
    marginLeft: "1%",
    marginRight: "1%",
    paddingBottom: 40,
    paddingTop: 40,
    paddingLeft: 40,
    paddingRight: 40,
  },
  Cat: {
    marginTop: 100,
    width: "100%",
    height: "3%",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  },

});
