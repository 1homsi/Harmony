import {
  StyleSheet,
  Text,
  View,
  FlatList,
  RefreshControl,
  Image,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { auth, db } from "../../../firebase";
import { query, collection, where, getDocs } from "firebase/firestore";
import Items from "../../components/Items";

const MainServ = ({ route }) => {
  const navigation = useNavigation();
  const { id } = route.params;
  const [data, setData] = React.useState([]);

  const fetchAll = async (Locaiton) => {
    const q = query(
      collection(db, "Users"),
      where("Location", "==", Locaiton),
      where("Worker", "==", true),
      where("SubService", "==", id)
    );

    const docSnap = await getDocs(q);
    docSnap.forEach((doc) => {
      let Userdata = Object.assign({ id: doc.id }, doc.data());
      setData((e) => [...e, Userdata]);
    });
  };

  React.useEffect(() => {
    db.collection("Users")
      .doc(auth.currentUser.email)
      .get()
      .then((doc) => {
        fetchAll(doc.data().Location);
      });

    return () => {
      setData();
    };
  }, []);

  return (
    <View style={styles.Container}>
      <Text style={styles.title}>{id}</Text>
      <View style={styles.ListView}>
        <FlatList
          style={styles.list}
          data={data}
          renderItem={({ item }) => (
            <Items
              id={item.id}
              title={item.Name}
              img={item.Image}
              Bio={item.Bio}
              isNewPage={true}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
};

export default MainServ;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 50,
    marginBottom: 5,
    color: "#000",
  },
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
});
