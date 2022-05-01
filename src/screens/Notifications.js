import { StyleSheet, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { useNavigation } from "@react-navigation/native";
import {
  RefreshControl,
  TouchableOpacity,
  View,
  Image,
  ImageBackground,
  FlatList,
} from "react-native";
import Items from "../components/Items";
import { auth, db } from "../../firebase";
import BottomNav from "../components/BottomNav";
import { Icon } from 'react-native-elements';

const Notifications = () => {
    return (
        <SafeAreaView style={styles.Area}>
            <View>
                <Text style={styles.HeadTitlte}>Notifications</Text>
            </View>

            <View style={styles.Content}>
                <View style={styles.Card}>
                    <View style={styles.CatImage}>

                    </View>
                    <View>
                    <Text style={styles.HistoryDetails}>
                        details details details
                    </Text>
                    </View>
                    
                </View>
                
                <TouchableOpacity >
                    <Text style={styles.ClearBtn}>
                        Clear All
                    </Text>
                </TouchableOpacity>
            </View>
            <BottomNav />

        </SafeAreaView>
    )
}

export default Notifications

const styles = StyleSheet.create({
    Area: {
        flex: 1,
        alignItems: "center",
        flex: 1,
        backgroundColor: "#fff",
        
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
        width: "90%",
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
        width: "100%",
        height: "80%",
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
        marginLeft: "70%",
        fontSize: 20,
        fontWeight: "bold",
    },
})