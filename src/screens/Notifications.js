import { StyleSheet, Text, SafeAreaView } from 'react-native';
import React from 'react';
import {
    TouchableOpacity,
    View,
    FlatList,
} from "react-native";
import Items from "../components/Items";
import { auth, db } from "../../firebase";
import BottomNav from "../components/BottomNav";
import { Icon } from 'react-native-elements';
import { query, collection, where, getDocs } from "firebase/firestore";


const Notifications = ({ navigation }) => {
    const [data, setData] = React.useState([]);

    const fetchAll = async () => {
        db.collection("Users").get().then((querySnapshot) => {
            querySnapshot.forEach(async (document) => {
                const Collection = db.collection("Contracts").doc(document.id);
                const q = query(
                    collection(Collection, document.id),
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
            setData({});
        };
    }, []);


    const handleAccepted = async (id) => {
        db.collection("Users").get().then((querySnapshot) => {
            querySnapshot.forEach(async (document) => {
                const Collection = db.collection("Contracts").doc(document.id);
                const q = query(
                    collection(Collection, document.id),
                    where("Done", "==", false),
                );
                const docSnap = await getDocs(q);
                docSnap.forEach((document) => {
                    if (document.id === id) {
                        Collection.update({
                            Accepted: true,
                        });
                    }
                });
            });
        });
    };

    const handleRejected = async (id) => {
        db.collection("Users").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                db.collection("Contracts").doc(doc.id).collection(doc.id).doc(id).delete().then(() => {
                    setData([]);
                    fetchAll();
                }
                );
            });
        });
    };


    return (
        <SafeAreaView style={styles.Area}>
            <View>
                <Text style={styles.HeadTitlte}>My Contracts</Text>
            </View>
            <View style={styles.ListView}>
                <FlatList
                    style={styles.list}
                    data={data}
                    renderItem={({ item }) => (
                        <View style={styles.containerItem} onPress={() => {
                            console.log(item.id);
                        }}>
                            <View style={styles.innerContainer}>
                                <Text style={styles.title}>{
                                    item?.Name.length > 19 ? item?.Name.substring(0, 19) + "..." : item.Name
                                }</Text>
                                <Text style={styles.des}>{
                                    item.Email
                                }</Text>
                                <Text style={styles.des}>{
                                    item.Price
                                }</Text>
                            </View>
                            {/* {
                                !item.Accepted ?
                                    <TouchableOpacity onPress={handleAccepted(item.id)}>
                                        <Icon
                                            name="check"
                                            type="font-awesome"
                                            size={20}
                                            color="#000"
                                            style={styles.icon}
                                        />
                                    </TouchableOpacity>
                                    : <></>
                            } */}
                            {/* <TouchableOpacity onPress={handleRejected(item.id)}>
                                <Icon
                                    name="cancel"
                                    type="MaterialIcons"
                                    size={20}
                                    color="#000"
                                    style={styles.icon}
                                />
                            </TouchableOpacity> */}


                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
            <BottomNav />
        </SafeAreaView >
    );
};

export default Notifications;

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
        width: 230
    },
    image: {
        borderRadius: 10,
        width: 85,
        height: 85
    },
    containerItem: {
        backgroundColor: '#89CFF0',
        width: '85%',
        height: 115,
        padding: 15,
        borderRadius: 10,
        marginTop: 25,
        flex: 1,
        flexDirection: 'row',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    innerContainer: {
        marginLeft: 15,
    }
});