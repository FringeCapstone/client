import React, {useEffect, useState} from 'react'
import {KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {auth} from "../firebase";
import {useNavigation} from "@react-navigation/native";
import profileScreen from "./ProfileScreen";
import firestore from '@react-native-firebase/firestore';
import firebase from "firebase/compat";
const SignUpScreen = () =>
{
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user =>
        {
            // after user logs/signs in, redirect to profile
            if (user)
            {
                alert(`Account Successfully Created with ${user.email}`);
                navigation.replace("Profile");
            }
        })
        return unsubscribe;
    })

    const handleSignUp = () =>
    {
        auth
            .createUserWithEmailAndPassword(email,password)
            .then(userCredentials => {
                const user = userCredentials.user;
                const userToken = user.getIdToken().then(token => {
                    // push to firestore here
                    const firestore = firebase.firestore();
                    firestore.collection("users").doc(user.uid).set({
                        email: user.email,
                        accountCreationTime: firebase.firestore.FieldValue.serverTimestamp()
                    })
                        .then(() => console.log("New User Added Successfully."))
                        .catch((error) => console.log(error.message));
                }).catch(error => console.log(error.message));
            })
            .catch(error => alert(error.message));
    }
    return (
        <KeyboardAvoidingView>
            <View style = {styles.inputContainer}>
                <TextInput
                    style = {styles.input}
                    placeholder="Email"
                    value = {email}
                    onChangeText={text => setEmail(text)}
                />

                <TextInput
                    style = {styles.input}
                    placeholder="Password"
                    value = {password}
                    onChangeText={text => setPassword(text) }
                    secureTextEntry
                />
            </View>
            <TouchableOpacity
                onPress = {handleSignUp}
                style={[styles.button, styles.buttonOutline]}>
                <Text style ={styles.buttonOutLineText}> Submit </Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    )
}
export default SignUpScreen

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    input:{
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 5,
        marginTop: 5
    },
    inputContainer: {
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40
    },
    button: {
        backgroundColor: 'azure',
        width: '80%',
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
    }

});