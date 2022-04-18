import { StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { auth } from '../../../firebase'

const RegisterScreenPart2 = () => {
    const navigation = useNavigation()
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                navigation.replace("Home");
            }
        });
        return unsubscribe;
    }, []);

    const handleSignUp = () => {
        if (password !== Otherpassword) {
            alert("Passwords do not match");
        } else {

            db.collection("Users").doc(email).set({
                Name: name,
                Email: email,
            })

            auth
                .createUserWithEmailAndPassword(email, password)
                .then((userCredentials) => {
                    const user = userCredentials.user;
                })
                .catch((error) => alert(error.message));
        }
    };
    return (
        <View>
            <Text>RegisterScreenPart2</Text>

        </View>
    )
}

export default RegisterScreenPart2

const styles = StyleSheet.create({})