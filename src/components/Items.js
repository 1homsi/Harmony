import { Text, StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const Items = (props) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity style={styles.container} onPress={() => {
            if (props.isNewPage) {
                navigation.replace("Worker", { id: props.id });
            } else {
                console.log(props.id);
            }
        }}>
            {
                props.img ? <Image
                    style={styles.image}
                    source={{ uri: `${props.img}` }} /> :
                    <>
                    </>
            }
            <View style={styles.innerContainer}>
                <Text style={styles.title}>{
                    props.title
                }</Text>
                <Text style={styles.des}>{
                    props?.Bio.length > 75 ?
                        props?.Bio.substring(0, 75) + `... \nPress to read more` : props.Bio
                }</Text>
            </View>
        </TouchableOpacity >
    );
};

export default Items;

const styles = StyleSheet.create({
    des: {
        width: 230
    },
    image: {
        borderRadius: 10,
        width: 85,
        height: 85
    },
    container: {
        backgroundColor: '#89CFF0',
        width: '85%',
        height: 130,
        padding: 15,
        borderRadius: 10,
        marginTop: 25,
        flex: 1,
        flexDirection: 'row',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    innerContainer: {
        marginLeft: 15,
    }
});  