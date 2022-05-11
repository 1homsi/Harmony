import { FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { auth, db, firebase } from '../../../firebase';
import { Icon } from 'react-native-elements';

const AdminMain = () => {
    const navigation = useNavigation();
    const [data, setData] = React.useState([]);

    React.useEffect(() => {
        db.collection('Users')
            .where(firebase.firestore.FieldPath.documentId(), '!=', auth.currentUser?.email)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    let Userdata = Object.assign({ id: doc.id }, doc.data());
                    setData((e) => [...e, Userdata]);
                });
            });

        return () => {
            setData({});
        };
    }, []);


    return (
        <View style={styles.container}>
            <FlatList
                style={styles.list}
                data={data}
                renderItem={({ item }) => (
                    <View>
                        <TouchableOpacity style={styles.containerItem} onPress={() => {
                            navigation.navigate("Worker", { id: item.Email });
                        }}>
                            <View style={styles.innerContainer}>
                                <Text style={styles.title}>{
                                    item?.Name.length > 19 ? item?.Name.substring(0, 19) + "..." : item.Name
                                }</Text>
                                <Text style={styles.des}>{
                                    item.Email
                                }</Text>
                            </View>
                        </TouchableOpacity >
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
};

export default AdminMain;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    button: {
        backgroundColor: "#89CFF0",
        padding: 17,
        borderRadius: 10,
        alignItems: "center",
        width: "90%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
        elevation: 10,
        shadowColor: "#000",
    },
    buttonText: {
        color: "white",
        fontWeight: "700",
        fontSize: 17,
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
        marginLeft: 30,
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