import { StyleSheet, Text, SafeAreaView } from "react-native";
import React from "react";
import { TouchableOpacity, View, FlatList } from "react-native";
import { auth, db } from "../../firebase";
import BottomNav from "../components/BottomNav";
import { TextInput } from "react-native-paper";
import { query, collection, where, getDocs } from "firebase/firestore";

const DisplayAccepted = () => {
  const [data, setData] = React.useState([]);

  const fetchAll = async () => {
    db.collection("Users").get().then((querySnapshot) => {
      querySnapshot.forEach(async (document) => {
        const Collection = db.collection("Contracts").doc(document.id);
        const q = query(
          collection(Collection, auth.currentUser?.email),
          where("Done", "==", false),
        );
        const docSnap = await getDocs(q);
        docSnap.forEach((document) => {
          let Userdata = Object.assign({ id: document.id }, document.data());
          setData((e) => [...e, Userdata]);
          console.log(Userdata);
        });
      });
    });
  };

  React.useEffect(() => {
    fetchAll();
    return () => {
      setData();
    };
  }, []);

  return (
    <SafeAreaView style={styles.Area}>
      <View>
        <Text style={styles.HeadTitlte}>Accepted</Text>
      </View>
      <View style={styles.ListView}>
        <FlatList
          style={styles.list}
          data={data}
          renderItem={({ item }) => (
            <View
              style={styles.containerItem}
              onPress={() => {
                console.log(item.id);
              }}
            >
              <View style={styles.innerContainer}>
                <Text style={styles.title}>
                  {item?.Name.length > 19
                    ? item?.Name.substring(0, 19) + "..."
                    : item.Name}
                </Text>
                <Text style={styles.des}>{item.Email}</Text>
                <Text style={styles.des}>{item.Price}</Text>
                <View style={styles.rating}>
                  <Text style={styles.rateText}>Rate from 0 to 5</Text>
                  <TextInput keyboardType="numeric" style={styles.rateInput}></TextInput>
                </View>
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <View>
        <TouchableOpacity>
          <Text style={styles.ClearBtn}>Clear All</Text>
        </TouchableOpacity>
      </View>
      <BottomNav />
    </SafeAreaView>
  );
};

export default DisplayAccepted;

const styles = StyleSheet.create({
  ListView: {
    width: "100%",
    marginTop: 30,
    alignContent: "center",
    justifyContent: "center",
    flex: 1,
    marginLeft: "15%",
  },
  list: {
    width: "100%",
  },
  Area: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  HeadTitlte: {
    fontSize: 30,
    color: "#000",
    textAlign: "center",
    marginTop: "12%",
  },
  HistoryDetails: {
    fontSize: 20,
    color: "grey",
    marginLeft: "5%",
  },
  Card: {
    width: "100%",
    height: "15%",
    marginTop: "5%",
    marginLeft: "5%",
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "grey",
    shadowOpacity: 0.5,
    borderBottomColor: "#b8b8b8",
    borderBottomWidth: 1,
  },
  Content: {
    flex: 1,
    alignItems: "center",
    marginRight: "5%",
  },
  CatImage: {
    width: "20%",
    height: "70%",
    borderRadius: 50,
    justifyContent: "flex-start",
    backgroundColor: "#89CFF0",
    borderRadius: 10,
    marginLeft: "5%",
  },
  Status: {
    fontSize: 15,
    color: "#000",
    marginTop: "5%",
    marginLeft: "5%",
    backgroundColor: "#32CD32",
    textAlign: "center",
    padding: "2%",
    borderRadius: 5,
  },
  ClearBtn: {
    width: "20%",
    color: "#89CFF0",
    marginTop: "5%",
    marginLeft: "60%",
    fontSize: 20,
    fontWeight: "bold",
  },
  des: {
    width: 230,
  },
  image: {
    borderRadius: 10,
    width: 85,
    height: 85,
  },
  containerItem: {
    backgroundColor: "#89CFF0",
    width: "85%",
    height: 140,
    padding: 15,
    borderRadius: 10,
    marginTop: 25,
    flex: 1,
    flexDirection: "row",
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
  },
  innerContainer: {
    marginLeft: 15,
  },
  rating: {
    flexDirection: "row",
    // justifyContent: "space-between",
    marginTop: "5%",
  },
  icon: {
    marginTop: "5%",
    marginLeft: "5%",
  },
  rateInput: {
    width: "40%",
    borderRadius: 10,
    // marginBottom: "8%",
    marginLeft: "5%",
    borderWidth: 1,
    borderColor: "white",
    padding: "2%",
    fontSize: 15,
    // fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "white",
  },
  rateText: {
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: "6%",
    marginTop: "5%",
    color: "#000",
  }
});
