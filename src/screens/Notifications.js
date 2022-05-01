import { StyleSheet, Text, SafeAreaView } from 'react-native'
import React from 'react'

const Notifications = () => {
    return (
        <SafeAreaView>
            <Text style={styles.HeadTitlte}>Notifications</Text>
        </SafeAreaView>
    )
}

export default Notifications

const styles = StyleSheet.create({
    HeadTitlte: {
        marginLeft: "5%",
        fontSize: 30,
        color: "#000",
    },
})