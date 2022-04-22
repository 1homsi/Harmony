import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
} from "react-native";
import Items from "../components/Items";
import { db } from "../../firebase";
import BottomNav from "../components/BottomNav";
import { TouchableOpacity } from "react-native-web";
import { Icon } from "react-native-elements";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const HomeScreen = () => {
  const [data, setData] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const fetchAll = () => {
    db.collection("Product")
      .where("ProductTaken", "!=", true)
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
          {/* <TouchableOpacity><FontAwesomeIcon icon="fa-solid fa-bars" /></TouchableOpacity> */}
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
      <View style={styles.gridTopCards}>
        <View style={styles.topCard}>
          <Text>Home</Text>
        </View>
        <View style={styles.topCard}>
          <Text>Home</Text>
        </View>
        <View style={styles.topCard}>
          <Text>Home</Text>
        </View>
      </View>
      <View style={styles.Cat}>
        {/* <Text>
          <Text style={styles.CatTitle}>Categories</Text>
        </Text> */}
        <View style={styles.CatContainer}>
          <View style={styles.CatCard}>
            <Text>Category</Text>
          </View>
          <View style={styles.CatCard}>
            <Text>Category</Text>
          </View>
          <View style={styles.CatCard}>
            <Text>Category</Text>
          </View>
        </View>
        <View style={styles.CatContainer}>
          <View style={styles.CatCard}>
            <Text>Category</Text>
          </View>
          <View style={styles.CatCard}>
            <Text>Category</Text>
          </View>
          <View style={styles.CatCard}>
            <Text>Category</Text>
          </View>
        </View>
      </View>
      <View style={styles.gridBottomCards}>
        <View style={styles.BottomCard}>
          <Text>Offer</Text>
        </View>
        <View style={styles.BottomCard}>
          <Text>Offer</Text>
        </View>
        <View style={styles.BottomCard}>
          <Text>Offer</Text>
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
              title={item.title}
              dis={item.Description}
              img={item.Image}
              isNotFav={true}
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
    width: "170%",
    height: "8%",
    backgroundColor: "#FA7D09",
    borderRadius: 12,
    marginTop: 10,
    marginBottom: 20,
    marginLeft: "3%",
    marginRight: "3%",
    paddingBottom: 50,
    paddingTop: 50,
    paddingLeft: 60,
    paddingRight: 60,
  },
  BottomCard: {
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    height: "8%",
    backgroundColor: "#FA7D09",
    borderRadius: 12,
    marginTop: -30,
    marginBottom: -100,
    marginLeft: "5%",
    marginRight: "5%",
    paddingBottom: 50,
    paddingTop: 50,
    height: "75%",
   
  },
  gridBottomCards: {
    width: "40%",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    // marginTop: 20,
    marginBottom: -230,
    
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
    marginTop: 0,
    marginBottom: -50,

  },
  CatCard: {
    alignItems: "center",
    justifyContent: "center",
    width: "27%",
    height: "50%",
    backgroundColor: "#FA7D09",
    borderRadius: 12,
    marginTop: 30,
    marginBottom: 25,
    marginLeft: "2%",
    marginRight: "2%",
    paddingBottom: 50,
    paddingTop: 50,
    paddingLeft: 20,
    paddingRight: 20,
  },
  Cat: {
    width: "100%",
    height: "5%",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    marginTop: -20,
    marginBottom: 70,
  },
  headIcon: {
    marginLeft: "5%",
    fontSize: 30,
    fontWeight: "800",
    color: "#000",

  },

});
