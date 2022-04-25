import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { db } from '../../firebase';

const ViewWorker = ({ route }) => {
    const { id } = route.params;
    const [user, setUser] = React.useState([]);
    const navigation = useNavigation();

    React.useEffect(() => {
        db.collection("Users").doc(id).get().then((doc) => {
            setUser(doc.data());
        });
        return () => {
            setUser("")
        }
    }, []);

    return (
        <View style={styles.Container}>
            <Text>{user?.Name}</Text>
        </View>
    )
}

export default ViewWorker

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})