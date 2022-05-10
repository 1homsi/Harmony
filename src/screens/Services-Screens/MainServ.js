import { StyleSheet, Text, View, FlatList, RefreshControl } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { auth, db } from '../../../firebase'
import { query, collection, where, getDocs } from "firebase/firestore";
import Items from '../../components/Items';

const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
};

const MainServ = ({ route }) => {
    const navigation = useNavigation()
    const { id } = route.params;
    const [data, setData] = React.useState([]);
    const [refreshing, setRefreshing] = React.useState(false);

    const fetchAll = async () => {
        const q = query(
            collection(db, "Users"),
            where("status", "==", "free"),
            where("Worker", "==", true),
            where("SubService", "==", id)
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
        <View style={styles.Container}>
            <Text style={styles.title}>{id}</Text>
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
        </View>
    )
}

export default MainServ

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',

    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 50,
        marginBottom: 5,
        color: '#000',
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
})