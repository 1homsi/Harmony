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

const History = () => {
    return (
        <SafeAreaView style={styles.Area}>
            <View>
                <Text style={styles.HeadTitlte}>History</Text>
            </View>

            <View style={styles.Content}>
                <View style={styles.Card}>
                    <Icon
                    name="history"
                    type="material-community"
                    style={styles.CardIcon}
                    />
                    <Text style={styles.HistoryTitle}>
                        House Cleaning
                    </Text>
                    <Text style={styles.HistoryDetails}>
                        details details details
                    </Text>
                    <Text style={styles.Status}>
                         Completed
                    </Text>
                </View>
            </View>
            

            <BottomNav style={styles.Nav}/>
        </SafeAreaView>
    )
}

export default History

const styles = StyleSheet.create({
    Area: {
        flex: 1,
        alignItems: "center",
        flex: 1,
        
    },
    HeadTitlte: {
        fontSize: 30,
        color: "#000",
        textAlign: "center",
        marginTop: "5%",
    },
    HistoryTitle: {
        fontSize: 20,
        color: "#000",
        marginTop: "5%",
    },
    HistoryDetails: {
        fontSize: 15,
        color: "#000",
        marginTop: "5%",
    },
    Card: {
        width: "90%",
        height: "15%",
        marginTop: "5%",
        backgroundColor: "#fff",
        marginLeft: "5%",
        borderRadius: 10,
    },
    CardIcon: {
        color: "#000",
        marginLeft: "5%",
        
    },
    Nav: {
    },
    Content: {
        width: "100%",
        height: "80%",
    },
})