import { StyleSheet, Text, View, KeyboardAvoidingView, Image, TextInput, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { auth, db } from '../../../firebase'

const RegisterScreenPart2 = ({ route }) => {
    const { option } = route.params;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [Otherpassword, setOtherPassword] = useState("");
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [location, setLocation] = useState("");
    const [phone, setPhone] = useState("");
    const [ocupation, setOcupation] = useState("");

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
            if (name !== "" && username !== "" && location !== "" && email !== "" && password !== "") {
                if (option === "Customer") {
                    db.collection("Users").doc(email).set({
                        Name: name,
                        Email: email,
                        Username: username,
                        Location: location,
                    })

                    auth
                        .createUserWithEmailAndPassword(email, password)
                        .then((userCredentials) => {
                            const user = userCredentials.user;
                            auth.signOut()
                                .then(() => {
                                    navigation.replace("Login");
                                })
                        })
                        .catch((error) => alert(error.message));
                }
                else {
                    if (phone !== "" && ocupation !== "") {
                        db.collection("Users").doc(email).set({
                            Name: name,
                            Email: email,
                            Location: location,
                            Phone: phone,
                            Ocupation: ocupation,
                        })

                        auth
                            .createUserWithEmailAndPassword(email, password)
                            .then((userCredentials) => {
                                const user = userCredentials.user;
                                auth.signOut()
                                    .then(() => {
                                        navigation.replace("Login");
                                    })
                            })
                            .catch((error) => alert(error.message));
                    }
                }
            }
        }
    };
    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <Text style={styles.head}>Register</Text>
            <Image
                style={styles.HeaderImage}
                source={require("../../images/Login.png")}
            />
            {option === "Customer" ?
                <>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholderTextColor="#003f5c"
                            placeholder="Name"
                            value={name}
                            onChangeText={(text) => setName(text)}
                            style={styles.input}
                        />
                        <TextInput
                            placeholderTextColor="#003f5c"
                            placeholder="Username"
                            value={username}
                            onChangeText={(text) => setUsername(text)}
                            style={styles.input}
                        />
                        <TextInput
                            placeholderTextColor="#003f5c"
                            placeholder="Email"
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                            style={styles.input}
                        />
                        <TextInput
                            placeholderTextColor="#003f5c"
                            placeholder={option === "Customer" ? "Address" : "Location"}
                            value={location}
                            onChangeText={(text) => setLocation(text)}
                            style={styles.input}
                        />
                        <TextInput
                            placeholderTextColor="#003f5c"
                            placeholder="Password"
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                            style={styles.input}
                            secureTextEntry
                        />
                        <TextInput
                            placeholderTextColor="#003f5c"
                            placeholder="Repeat Password"
                            value={Otherpassword}
                            onChangeText={(text) => setOtherPassword(text)}
                            style={styles.input}
                            secureTextEntry
                        />
                    </View>
                </>
                :
                <>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholderTextColor="#003f5c"
                            placeholder="Name"
                            value={name}
                            onChangeText={(text) => setName(text)}
                            style={styles.input}
                        />
                        <TextInput
                            placeholderTextColor="#003f5c"
                            placeholder="Username"
                            value={username}
                            onChangeText={(text) => setUsername(text)}
                            style={styles.input}
                        />
                        <TextInput
                            placeholderTextColor="#003f5c"
                            placeholder="Email"
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                            style={styles.input}
                        />
                        <TextInput
                            placeholderTextColor="#003f5c"
                            placeholder="Phone number"
                            value={phone}
                            onChangeText={(text) => setPhone(text)}
                            style={styles.input}
                        />
                        <TextInput
                            placeholderTextColor="#003f5c"
                            placeholder="Location"
                            value={location}
                            onChangeText={(text) => setLocation(text)}
                            style={styles.input}
                        />
                        <TextInput
                            placeholderTextColor="#003f5c"
                            placeholder="Ocupation"
                            value={ocupation}
                            onChangeText={(text) => setOcupation(text)}
                            style={styles.input}
                        />
                        <TextInput
                            placeholderTextColor="#003f5c"
                            placeholder="Password"
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                            style={styles.input}
                            secureTextEntry
                        />
                        <TextInput
                            placeholderTextColor="#003f5c"
                            placeholder="Repeat Password"
                            value={Otherpassword}
                            onChangeText={(text) => setOtherPassword(text)}
                            style={styles.input}
                            secureTextEntry
                        />
                    </View>
                </>
            }
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleSignUp} style={styles.button}>
                    <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
            </View>
            <Text
                style={styles.GoToLogin}
                onPress={() => {
                    navigation.replace("Login");
                }}
            >
                Already a user?
            </Text>
        </KeyboardAvoidingView >
    )
}

export default RegisterScreenPart2

const styles = StyleSheet.create({
    HeaderImage: {
        marginBottom: 30,
        width: 200,
        height: 200,
    },
    head: {
        color: "#003f5c",
        fontWeight: "bold",
        fontSize: 40,
        marginTop: 25,
        marginBottom: 20,
    },
    IntroText: {
        color: "#003f5c",
        fontSize: 17,
        fontWeight: "bold",
        marginBottom: 30,
    },
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
    },
    inputContainer: {
        width: "80%",
    },
    input: {
        borderWidth: 2,
        borderColor: "#003f5c",
        backgroundColor: "white",
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderRadius: 15,
        marginTop: 10,
        fontWeight: "bold",
    },
    buttonContainer: {
        width: "80%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 40,
    },
    button: {
        backgroundColor: "#89CFF0",
        width: "100%",
        padding: 20,
        borderRadius: 10,
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 20,
    },
    GoToLogin: {
        fontWeight: "bold",
        marginTop: 25,
        color: "#003f5c",
        fontSize: 18,
    },
})