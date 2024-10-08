import React, {useEffect, useState} from 'react'
import {KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {auth} from "../firebase";
import {useNavigation} from "@react-navigation/native";
import profileScreen from "./ProfileScreen";

const LoginScreen = () =>
{
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const navigation = useNavigation();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user =>
        {
            // after user logs/signs in, redirect to profile
            if (user)
            {
                alert(`logged in as ${user.email}`);
                navigation.replace("Profile");
            }
        })
        return unsubscribe;
    })

    const handleSignUp = () =>
    {
        navigation.replace("SignUp");
        // auth
        //     .createUserWithEmailAndPassword(email,password)
        //     .then(userCredentials => {
        //         const user = userCredentials.user;
        //         console.log("Registered with: ", user.email);
        //     })
        //     .catch(error => alert(error.message));
    }

    const handleLogIn = () =>
    {
        auth
            .signInWithEmailAndPassword(email,password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log("Logged in with: ", user.email);
            })
            .catch(error => alert(error.message));
    }

    return(
        <KeyboardAvoidingView
            style={styles.container}
            behavior={"padding"}>
            <View style = {styles.inputContainer}>
                <TextInput
                    placeholder="Email"
                    value = {email}
                    onChangeText={text => setEmail(text)}
                    style = {styles.myInput}
                />

                <TextInput
                    placeholder="Password"
                    value = {password}
                    onChangeText={text => setPassword(text) }
                    style = {styles.myInput}
                    secureTextEntry = {!isPasswordVisible}
                />
                <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                    <Text> 👁️ </Text>
                </TouchableOpacity>

            </View>
            <View
                style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress = {handleLogIn}
                    style={styles.button}>
                    <Text style ={styles.buttonText}> Login </Text>
                </TouchableOpacity>

            </View>
            <View
                style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress = {handleSignUp}
                    style={[styles.button, styles.buttonOutline]}>
                    <Text style ={styles.buttonOutLineText}> Don't have an account? Sign up here! </Text>
                </TouchableOpacity>

            </View>
        </KeyboardAvoidingView>
    );
}
export default LoginScreen

const styles ={
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    myInput:{
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 5,
        marginTop: 5,
        width: '100%'
    },
    inputContainer: {
        width: '80%'
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40
    },
    button: {
        backgroundColor: 'azure',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center'
    },
    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: 'azure',
        borderWidth: 2
    },
    buttonOutLineText: {
        fontWeight: '700',
        fontSize: 16
    },
    buttonText: {
        fontWeight: '700',
        fontSize: 16
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    }

};