import {
    StyleSheet,
    Text,
    View,
    KeyboardAvoidingView,
    Image,
    TextInput,
    TouchableOpacity,
    Platform
} from 'react-native'
import { Picker } from '@react-native-picker/picker'
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
    const [occupation, setOccupation] = useState("");
    const navigation = useNavigation();
    const [subService, setSubService] = useState("");


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
                        Credit: 0,
                        Image: "",
                        status: "free",
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
                    if (phone !== "" && occupation !== "") {
                        db.collection("Users").doc(email).set({
                            Name: name,
                            Email: email,
                            Location: location,
                            Phone: phone,
                            Occupation: occupation,
                            SubService: subService,
                            Bio: "",
                            Rating: 0,
                            Busy: false,
                            Image: "",
                            status: "free",
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
            {option === "Customer" ?
                <>
                    <Image
                        style={styles.HeaderImage}
                        source={require("../../images/Login.png")}
                    />
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
                        <View style={[styles.PickerContainer, styles.input]}>
                            <Picker
                                itemStyle={{ height: 50 }}
                                selectedValue={location}
                                style={styles.picker}
                                onValueChange={(itemValue, itemIndex) => setLocation(itemValue)}
                            >
                                <Picker.Item label="Lebanon south" value="Lebanon south" />
                                <Picker.Item label="Lebanon north" value="Lebanon north" />
                            </Picker>
                        </View>
                        <View style={[styles.PickerContainerBottom, styles.input]}>
                            <Picker
                                itemStyle={{ height: 50 }}
                                selectedValue={occupation}
                                style={styles.picker}
                                onValueChange={(itemValue, itemIndex) => setOccupation(itemValue)}
                            >
                                <Picker.Item label="Maintenance" value="Maintenance" />
                                <Picker.Item label="Home Design" value="Home Design" />
                                <Picker.Item label="Home Care" value="Home Care" />
                                <Picker.Item label="Health care" value="Health care" />
                                <Picker.Item label="Delivery" value="Delivery" />
                                <Picker.Item label="Cars" value="Cars" />
                                <Picker.Item label="Tutoring" value="Tutoring" />
                            </Picker>
                        </View>
                        <View style={[styles.PickerContainerBottom, styles.input]}>
                            <Picker
                                itemStyle={{ height: 50 }}
                                selectedValue={subService}
                                style={styles.picker}
                                onValueChange={(itemValue, itemIndex) => setSubService(itemValue)}
                            >
                                <Picker.Item label="Maintenance" value="Maintenance" />
                                <Picker.Item label="Home Design" value="Home Design" />
                                <Picker.Item label="Home Care" value="Home Care" />
                                <Picker.Item label="Health care" value="Health care" />
                                <Picker.Item label="Delivery" value="Delivery" />
                                <Picker.Item label="Cars" value="Cars" />
                                <Picker.Item label="Tutoring" value="Tutoring" />
                            </Picker>
                        </View>
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
        marginBottom: 20,
        width: Platform.OS === "ios" ? 200 : 130,
        height: Platform.OS === "ios" ? 200 : 140,
    },
    head: {
        color: "#003f5c",
        fontWeight: "bold",
        fontSize: Platform.OS === "ios" ? 30 : 28,
        marginTop: 25,
        marginBottom: 20,
    },
    IntroText: {
        color: "#003f5c",
        fontSize: 15,
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
        paddingVertical: 10,
        borderRadius: 15,
        marginTop: 10,
        fontWeight: "bold",
    },
    buttonContainer: {
        width: "80%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
    },
    button: {
        backgroundColor: "#89CFF0",
        width: "100%",
        padding: 20,
        top: -22,
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
        marginBottom: 25,
        color: "#003f5c",
        fontSize: 18,
    },
    picker: {
        width: "100%",
        position: 'relative',
    },
    PickerContainerBottom: {
        top: -6,
    },
})